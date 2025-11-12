// ==============================
//  DỮ LIỆU SẢN PHẨM TWT COFFEE
// ==============================
const products = [
  { id: 1, name: "Cà phê sữa đá", price: 25000, type: "coffee", size: "330ml", flavor: "sweet", caffeine: "yes", img: "assets/images/caphesuada.jpg" },
  { id: 2, name: "Cà phê đen đá", price: 22000, type: "coffee", size: "330ml", flavor: "less-sugar", caffeine: "yes", img: "assets/images/capheden.jpg" },
  { id: 3, name: "Cafe Muối", price: 19000, type: "coffee", size: "330ml", flavor: "sweet", caffeine: "yes", img: "assets/images/cafemuoi.jpg" },
  { id: 4, name: "Trà đào cam sả", price: 30000, type: "tea", size: "500ml", flavor: "sweet", caffeine: "no", img: "assets/images/tradaocamsa.jpg" },
  { id: 5, name: "Trà xanh mật ong", price: 28000, type: "tea", size: "500ml", flavor: "sweet", caffeine: "no", img: "assets/images/traxanhmatong.jpg" },
  { id: 6, name: "Trà tắc xí muội", price: 25000, type: "tea", size: "500ml", flavor: "less-sugar", caffeine: "no", img: "assets/images/tra-tac-ximuoi.jpg" },
  { id: 7, name: "Trà sữa truyền thống", price: 22000, type: "milktea", size: "500ml", flavor: "sweet", caffeine: "no", img: "assets/images/trasuatruyenthong.jpg" },
  { id: 8, name: "Trà sữa matcha", price: 35000, type: "milktea", size: "500ml", flavor: "sweet", caffeine: "no", img: "assets/images/trasuamatcha.jpg" },
  { id: 9, name: "Nước ép táo tươi", price: 35000, type: "juice", size: "330ml", flavor: "no-sugar", caffeine: "no", img: "assets/images/nuoceptaotuoi.jpg" },
  { id: 10, name: "Nước ép cam nguyên chất", price: 32000, type: "juice", size: "500ml", flavor: "sweet", caffeine: "no", img: "assets/images/nuocepcam.jpg" },
  { id: 11, name: "Matcha Latte", price: 32000, type: "matcha", size: "400ml", flavor: "sweet", caffeine: "no", img: "assets/images/matcha-latte.jpg" },
  { id: 12, name: "Soda Chanh Dây", price: 22000, type: "soda", size: "450ml", flavor: "sweet", caffeine: "no", img: "assets/images/soda-chanhday.jpg" },
  { id: 13, name: "Sữa chua Việt Quất", price: 28000, type: "yogurt", size: "330ml", flavor: "sweet", caffeine: "no", img: "assets/images/suachua-vietquat.jpg" },
  { id: 14, name: "Sinh tố Xoài", price: 28000, type: "smoothie", size: "500ml", flavor: "sweet", caffeine: "no", img: "assets/images/sinhto-xoai.jpg" },
];

// ==============================
//  PHẦN TỬ HTML
// ==============================
const grid = document.getElementById("product-grid") || document.getElementById("product-list");
const filters = ["type", "size", "flavor", "caffeine"];
const priceInput = document.getElementById("price");
const priceValue = document.getElementById("price-value");

// ==============================
//  HIỂN THỊ DANH SÁCH SẢN PHẨM
// ==============================
function renderProducts(list) {
  grid.innerHTML = "";

  if (!list.length) {
    grid.innerHTML = `<p class="no-result">Không tìm thấy sản phẩm phù hợp.</p>`;
    return;
  }

  list.forEach(p => {
    grid.insertAdjacentHTML(
      "beforeend",
      `
      <div class="product-card">
        <div class="img-box">
          <img src="${p.img}" alt="${p.name}">
        </div>
        <div class="info">
          <h3>${p.name}</h3>
          <p class="price">${p.price.toLocaleString()}đ</p>
          <div class="details">
            <span>${p.size}</span> • 
            <span>${p.flavor}</span> • 
            <span>${p.caffeine === "yes" ? "Có caffeine" : "Không caffeine"}</span>
          </div>
          <button onclick="addToCart(${p.id})">🛒 Thêm vào giỏ</button>
        </div>
      </div>
      `
    );
  });
}

// Lần đầu hiển thị tất cả
renderProducts(products);

// ==============================
//  ÁP DỤNG BỘ LỌC
// ==============================
function applyFilters() {
  let filtered = products.filter(p => {
    return (
      filters.every(f => {
        const val = document.getElementById(f)?.value || "all";
        return val === "all" || p[f] === val;
      }) && (!priceInput || p.price <= parseInt(priceInput.value))
    );
  });
  renderProducts(filtered);
}

filters.forEach(f => {
  const el = document.getElementById(f);
  if (el) el.addEventListener("change", applyFilters);
});

if (priceInput) {
  priceInput.addEventListener("input", e => {
    priceValue.textContent = parseInt(e.target.value).toLocaleString() + "đ";
    applyFilters();
  });
}

// ==============================
//  THÊM VÀO GIỎ HÀNG (HIỆU ỨNG)
// ==============================
function addToCart(id) {
  const product = products.find(p => p.id === id);
  const toast = document.createElement("div");
  toast.className = "toast";
  toast.textContent = `✅ ${product.name} đã được thêm vào giỏ!`;
  document.body.appendChild(toast);
  setTimeout(() => toast.remove(), 2200);
}


// Chuyển sang trang chi tiết sản phẩm
function viewProduct(id) {
  localStorage.setItem("selectedProduct", id);
  window.location.href = "detail.html";
}
