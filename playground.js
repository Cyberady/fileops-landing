async function run() {
  const apiKey = document.getElementById("apiKey").value;
  const file = document.getElementById("imageFile").files[0];
  const action = document.getElementById("action").value;
  const result = document.getElementById("result");

  if (!apiKey || !file) {
    alert("API key & image required");
    return;
  }

  let url = "https://fileops-api.onrender.com";
  let endpoint = "";
  
  if (action === "compress") endpoint = "/compress-image";
  if (action === "resize") endpoint = "/resize-image?width=400";
  if (action === "convert") endpoint = "/convert-image?target_format=jpeg";
  if (action === "watermark") endpoint = "/watermark-image?text=FileOps";

  const formData = new FormData();
  formData.append("file", file);

  result.innerHTML = "Processing...";

  const res = await fetch(url + endpoint, {
    method: "POST",
    headers: {
      "x-api-key": apiKey
    },
    body: formData
  });

  if (!res.ok) {
    result.innerHTML = "❌ Error occurred";
    return;
  }

  const blob = await res.blob();
  const imgUrl = URL.createObjectURL(blob);

  result.innerHTML = `
    <h3>Result</h3>
    <img src="${imgUrl}" style="max-width:100%; border-radius:8px"/>
    <br/><br/>
    <a href="${imgUrl}" download class="btn secondary">Download</a>
  `;
}
