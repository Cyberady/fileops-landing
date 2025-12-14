async function run() {
  const apiKey = document.getElementById("apiKey").value.trim();
  const file = document.getElementById("imageFile").files[0];
  const action = document.getElementById("action").value;
  const result = document.getElementById("result");
  const status = document.getElementById("status");

  if (!apiKey || !file) {
    alert("Please provide API key and image");
    return;
  }

  let endpoint = "";
  if (action === "compress") endpoint = "/compress-image";
  if (action === "resize") endpoint = "/resize-image?width=400";
  if (action === "convert") endpoint = "/convert-image?target_format=jpeg";
  if (action === "watermark") endpoint = "/watermark-image?text=FileOps";

  const formData = new FormData();
  formData.append("file", file);

  status.innerText = "⏳ Processing...";
  result.innerHTML = "";

  try {
    const res = await fetch(
      "https://fileops-api.onrender.com" + endpoint,
      {
        method: "POST",
        headers: { "x-api-key": apiKey },
        body: formData
      }
    );

    if (!res.ok) {
      status.innerText = "❌ API Error";
      return;
    }

    const blob = await res.blob();
    const imgUrl = URL.createObjectURL(blob);

    status.innerText = "✅ Done";

    result.innerHTML = `
      <img src="${imgUrl}" />
      <a href="${imgUrl}" download class="btn secondary">Download</a>
    `;
  } catch (err) {
    status.innerText = "❌ Network error";
  }
}
