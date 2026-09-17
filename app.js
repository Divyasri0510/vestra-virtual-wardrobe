const items = [
  { id: 1, name: "Silk Blouse", category: "tops", color: "Ivory", vibe: "Elegant", image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=900&q=80" },
  { id: 2, name: "Wide-Leg Trousers", category: "bottoms", color: "Mocha", vibe: "Tailored", image: "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=900&q=80" },
  { id: 3, name: "Cropped Jacket", category: "outerwear", color: "Taupe", vibe: "Modern", image: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=900&q=80" },
  { id: 4, name: "Leather Tote", category: "accessories", color: "Espresso", vibe: "Refined", image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=900&q=80" },
  { id: 5, name: "Pleated Dress", category: "dresses", color: "Rose", vibe: "Feminine", image: "https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=900&q=80" },
  { id: 6, name: "Cotton Tee", category: "tops", color: "Stone", vibe: "Easy", image: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=900&q=80" },
  { id: 7, name: "Relaxed Denim", category: "bottoms", color: "Indigo", vibe: "Casual", image: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=900&q=80" },
  { id: 8, name: "Statement Scarf", category: "accessories", color: "Sand", vibe: "Layered", image: "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=900&q=80" }
];

const state = { filter: "all", selected: [] };
const grid = document.getElementById("wardrobeGrid");
const allFilterButtons = document.querySelectorAll("[data-filter]");

function filteredItems() {
  return state.filter === "all" ? items : items.filter(function (item) { return item.category === state.filter; });
}

function renderItems() {
  grid.innerHTML = "";
  filteredItems().forEach(function (item) {
    const card = document.createElement("article");
    card.className = "wardrobe-card" + (state.selected.some(function (selected) { return selected.id === item.id; }) ? " selected" : "");
    card.dataset.id = String(item.id);
    card.innerHTML = "<div class=\"card-image\" style=\"background-image: url('" + item.image + "')\"></div>" +
      "<div class=\"card-body\"><div class=\"card-row\"><h3>" + item.name + "</h3><span class=\"piece-tag\">" + item.category + "</span></div>" +
      "<div class=\"card-meta\"><span>" + item.color + "</span><span>" + item.vibe + "</span></div></div>";
    card.addEventListener("click", function () { toggleItem(item); });
    grid.appendChild(card);
  });
}

function toggleItem(item) {
  const index = state.selected.findIndex(function (selected) { return selected.id === item.id; });
  if (index >= 0) {
    state.selected.splice(index, 1);
  } else if (state.selected.length < 4) {
    state.selected.push(item);
  } else {
    window.alert("You can select up to four pieces for one outfit.");
    return;
  }
  renderItems();
  updatePlanner();
}

function updatePlanner() {
  document.querySelectorAll(".slot").forEach(function (slot) {
    const item = state.selected.find(function (selected) { return selected.category === slot.dataset.slot; });
    slot.textContent = item ? item.name : (slot.dataset.slot === "tops" ? "Top" : slot.dataset.slot === "bottoms" ? "Bottom" : slot.dataset.slot === "outerwear" ? "Layer" : "Accessory");
    slot.classList.toggle("filled", Boolean(item));
  });
  const categories = state.selected.map(function (item) { return item.category; });
  const vibe = document.getElementById("vibe");
  const palette = document.getElementById("palette");
  const occasion = document.getElementById("occasion");
  if (categories.indexOf("dresses") >= 0) {
    vibe.textContent = "Dress-forward elegance";
    palette.textContent = "Rose + taupe";
    occasion.textContent = "Date night";
  } else if (categories.indexOf("outerwear") >= 0 && categories.indexOf("bottoms") >= 0) {
    vibe.textContent = "Soft tailoring";
    palette.textContent = "Ivory + mocha";
    occasion.textContent = "Brunch + meetings";
  } else if (categories.indexOf("accessories") >= 0) {
    vibe.textContent = "Weekend polish";
    palette.textContent = "Stone + espresso";
    occasion.textContent = "Coffee run";
  } else {
    vibe.textContent = "Effortless layering";
    palette.textContent = "Ivory + indigo";
    occasion.textContent = "Creative day out";
  }
}

function setFilter(filter) {
  state.filter = filter;
  allFilterButtons.forEach(function (button) { button.classList.toggle("active", button.dataset.filter === filter); });
  renderItems();
}

allFilterButtons.forEach(function (button) { button.addEventListener("click", function () { setFilter(button.dataset.filter); }); });
document.getElementById("generateButton").addEventListener("click", function () {
  const styles = ["Quiet luxury textures", "Weekend editor energy", "Soft statement styling", "Minimal neutral layering"];
  const choice = styles[Math.floor(Math.random() * styles.length)];
  document.getElementById("vibe").textContent = choice;
  document.getElementById("occasion").textContent = state.selected.length ? "Freshly styled" : "Creative day out";
});
document.getElementById("loginButton").addEventListener("click", function () { window.alert("Login is coming soon. Your wardrobe is ready to explore."); });
document.getElementById("addItemButton").addEventListener("click", function () { window.alert("Item upload is coming soon. For now, select any existing wardrobe piece to style it."); });

renderItems();
updatePlanner();
