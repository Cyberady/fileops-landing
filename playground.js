async function runPlayground() {
  const apiKey = document.getElementById("apiKey").value;
  const operation = document.getElementById("operation").value;
  const width = document.getElementById("width").value;
  const watermark = document.getElementById("watermark").value;
  const fileInput = document.getElementById("imageFile");

  const status = document.getElementById("status");
  const preview = document.getElementById("preview");
  const previewText = document.getElementById("previewText");
  const downloadLink = document.getElementById("downloadLink");

  if (!apiKey || !fileInput.files.length) {
    status.innerText = "❌ API key and image required";
    return;
  }

  status.innerText = "⏳ Processing...";
  preview.style.display = "none";
  previewText.style.display = "block";

  const file = fileInput.files[0];
  const formData = new FormData();
  formData.append("file", file);

  let endpoint = "";
  let url = "https://fileops-api.onrender.com";

  if (operation === "compress") {
    endpoint = "/compress-image";
  }

  if (operation === "resize") {
    endpoint = `/resize-image?width=${width || ""}`;
  }

  if (operation === "watermark") {
    endpoint = `/watermark-image?text=${watermark || "FileOps"}`;
  }

  if (operation === "convert") {
    endpoint = "/convert-image?target_format=jpeg";
  }

  try {
    const res = await fetch(url + endpoint, {
      method: "POST",
      headers: {
        "x-api-key": apiKey
      },
      body: formData
    });

    if (!res.ok) {
      const text = await res.text();
      status.innerText = "❌ Error: " + text;
      return;
    }

    const blob = await res.blob();
    const objectURL = URL.createObjectURL(blob);

    preview.src = objectURL;
    preview.style.display = "block";
    previewText.style.display = "none";

    downloadLink.href = objectURL;
    downloadLink.querySelector("button").disabled = false;

    status.innerText = "✅ Success";
  } catch (err) {
    status.innerText = "❌ Network error";
  }
}
