const gallery = document.getElementById("gallery");
const title = document.getElementById("title");

// Get category from URL
const params = new URLSearchParams(window.location.search);
const category = params.get("category");

// Fetch JSON
fetch("plants.json")
  .then(res => res.json())
  .then(data => {

    // Validate category (most people forget this)
    if (!data[category]) {
      title.innerText = "Category not found";
      return;
    }

    title.innerText = category + " Plants";

    data[category].forEach(item => {
      const div = document.createElement("div");
      div.className = "card";

      div.innerHTML = `
        <img src="${item.img}" loading="lazy">
        <p class="image-text">${item.text}</p>
      `;

      div.onclick = () => openFullscreen(item.img);

      gallery.appendChild(div);
    });

  })
  .catch(err => {
    console.error("JSON load failed:", err);
  });


// FULLSCREEN
function openFullscreen(src) {
  const fs = document.getElementById("fullscreen");
  const img = document.getElementById("fullImg");

  img.src = src;
  fs.style.display = "flex";
}

document.getElementById("fullscreen").onclick = () => {
  document.getElementById("fullscreen").style.display = "none";
};
