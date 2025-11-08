// Dữ liệu mẫu
const products = [
  { id: 1, name: "Cà phê sữa đá", price: 25000, type: "coffee", size: "330ml", flavor: "sweet", caffeine: "yes", img: "assets/images/product1.jpg" },
  { id: 2, name: "Trà đào cam sả", price: 30000, type: "tea", size: "500ml", flavor: "sweet", caffeine: "no", img: "assets/images/product2.jpg" },
  { id: 3, name: "Nước ép táo tươi", price: 35000, type: "juice", size: "330ml", flavor: "no-sugar", caffeine: "no", img: "assets/images/product3.jpg" },
  { id: 4, name: "Cà phê đen đá", price: 22000, type: "coffee", size: "330ml", flavor: "less-sugar", caffeine: "yes", img: "assets/images/coffee.jpg" },
  { id: 5, name: "Trà xanh mật ong", price: 28000, type: "tea", size: "500ml", flavor: "sweet", caffeine: "no", img: "assets/images/tea.jpg" },
  { id: 6, name: "Nước ép cam nguyên chất", price: 32000, type: "juice", size: "500ml", flavor: "sweet", caffeine: "no", img: "assets/images/juice.jpg" },
];

const grid = document.getElementById("product-grid");
const filters = ["type", "size", "flavor", "caffeine"];
const priceInput = document.getElementById("price");
const priceValue = document.getElementById("price-value");

// render sản phẩm
function renderProducts(list) {
  grid.innerHTML = "";
  if (list.length === 0) {
    grid.innerHTML = "<p>Không tìm thấy sản phẩm phù hợp.</p>";
    return;
  }
  list.forEach(p => {
    grid.innerHTML += `
      <div class="product-card">
        <img src="${p.img}" alt="${p.name}">
        <h3>${p.name}</h3>
        <p>${p.price.toLocaleString()}đ</p>
        <button onclick="addToCart(${p.id})">Thêm vào giỏ</button>
      </div>`;
  });
}

renderProducts(products);

// Lọc sản phẩm
function applyFilters() {
  let filtered = products.filter(p => {
    return filters.every(f => {
      const val = document.getElementById(f).value;
      return val === "all" || p[f] === val;
    }) && p.price <= parseInt(priceInput.value);
  });
  renderProducts(filtered);
}

filters.forEach(f => {
  document.getElementById(f).addEventListener("change", applyFilters);
});
priceInput.addEventListener("input", e => {
  priceValue.textContent = parseInt(e.target.value).toLocaleString() + "đ";
  applyFilters();
});

function addToCart(id) {
  alert("Đã thêm sản phẩm #" + id + " vào giỏ hàng!");
}
