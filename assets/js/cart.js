// ==========================
// CART FUNCTIONALITY (DrinkShop)
// ==========================

// Lấy dữ liệu giỏ hàng từ localStorage hoặc khởi tạo rỗng
let cart = JSON.parse(localStorage.getItem("cart")) || [];

const tbody = document.querySelector("#cart-table tbody");
const subtotalEl = document.getElementById("subtotal");
const shippingSelect = document.getElementById("shipping");
const shippingFeeEl = document.getElementById("shipping-fee");
const discountEl = document.getElementById("discount");
const grandtotalEl = document.getElementById("grandtotal");
const cartBadge = document.querySelector(".nav a[href='cart.html']");

let discount = 0;

// ==========================
// HIỂN THỊ SỐ LƯỢNG TRÊN ICON GIỎ
// ==========================
function updateCartBadge() {
  const count = cart.reduce((sum, item) => sum + item.qty, 0);
  if (!cartBadge) return;
  const oldBadge = cartBadge.querySelector(".cart-count");
  if (oldBadge) oldBadge.remove();

  if (count > 0) {
    const badge = document.createElement("span");
    badge.className = "cart-count";
    badge.textContent = count;
    badge.style.cssText = `
      background: #ff4444;
      color: #fff;
      border-radius: 50%;
      padding: 3px 7px;
      font-size: 12px;
      position: absolute;
      top: -5px;
      right: -10px;
    `;
    cartBadge.style.position = "relative";
    cartBadge.appendChild(badge);
  }
}

// ==========================
// HIỂN THỊ GIỎ HÀNG
// ==========================
function renderCart() {
  if (!tbody) return;
  tbody.innerHTML = "";

  if (cart.length === 0) {
    tbody.innerHTML = `<tr><td colspan="5">🛒 Giỏ hàng của bạn đang trống!</td></tr>`;
    updateCartBadge();
    updateTotal();
    return;
  }

  let subtotal = 0;

  cart.forEach((item, i) => {
    const total = item.price * item.qty;
    subtotal += total;
    tbody.innerHTML += `
      <tr>
        <td>${item.name}</td>
        <td>${item.price.toLocaleString()}đ</td>
        <td><input type="number" min="1" value="${item.qty}" data-index="${i}" class="qty-input"></td>
        <td>${total.toLocaleString()}đ</td>
        <td><button class="remove-btn" data-index="${i}">X</button></td>
      </tr>
    `;
  });

  subtotalEl.textContent = subtotal.toLocaleString() + "đ";
  updateTotal();
  updateCartBadge();
}

// ==========================
// CẬP NHẬT TỔNG TIỀN
// ==========================
function updateTotal() {
  const subtotal = getSubtotal();
  const ship = parseInt(shippingSelect?.value || 0);
  const total = subtotal + ship - discount;
  shippingFeeEl.textContent = ship.toLocaleString() + "đ";
  discountEl.textContent = discount.toLocaleString() + "đ";
  grandtotalEl.textContent = total.toLocaleString() + "đ";
}

// ==========================
// TÍNH TẠM TÍNH
// ==========================
function getSubtotal() {
  return cart.reduce((sum, item) => sum + item.price * item.qty, 0);
}

// ==========================
// THAY ĐỔI SỐ LƯỢNG
// ==========================
document.addEventListener("input", (e) => {
  if (e.target.classList.contains("qty-input")) {
    const idx = e.target.dataset.index;
    cart[idx].qty = parseInt(e.target.value);
    saveCart();
    renderCart();
  }
});

// ==========================
// XÓA SẢN PHẨM
// ==========================
document.addEventListener("click", (e) => {
  if (e.target.classList.contains("remove-btn")) {
    const idx = e.target.dataset.index;
    cart.splice(idx, 1);
    saveCart();
    renderCart();
  }
});

// ==========================
// ÁP DỤNG MÃ GIẢM GIÁ
// ==========================
document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("checkout")?.addEventListener("click", () => {
    const name = document.getElementById("customer-name")?.value.trim() || "";
    const phone = document.getElementById("customer-phone")?.value.trim() || "";
    const email = document.getElementById("customer-email")?.value.trim() || "";
    const address = document.getElementById("customer-address")?.value.trim() || "";

    const subtotal = document.getElementById("subtotal")?.textContent || "0đ";
    const grandtotal = document.getElementById("grandtotal")?.textContent || "0đ";
    const payMethod = document.querySelector('input[name="pay"]:checked')?.value || "COD";

    if (!name || !phone || !address) {
      alert("Vui lòng nhập đầy đủ thông tin khách hàng!");
      return;
    }

    const orderInfo = {
      orderId: "DS" + new Date().getFullYear() + "-" + Math.floor(Math.random() * 90000 + 10000),
      name,
      phone,
      email,
      address,
      subtotal,
      grandtotal,
      payMethod,
      time: new Date().toLocaleString("vi-VN"),
    };

    localStorage.setItem("orderInfo", JSON.stringify(orderInfo));
    localStorage.removeItem("cart");
    window.location.href = "confirm.html";
  });
});


// ==========================
// THANH TOÁN
// ==========================
document.getElementById("checkout")?.addEventListener("click", () => {
  // Lấy thông tin khách hàng
  const name = document.getElementById("customer-name")?.value.trim() || "Không cung cấp";
  const phone = document.getElementById("customer-phone")?.value.trim() || "Không cung cấp";
  const email = document.getElementById("customer-email")?.value.trim() || "Không cung cấp";
  const address = document.getElementById("customer-address")?.value.trim() || "Không cung cấp";

  const total = grandtotalEl.textContent;
  const payMethod = document.querySelector('input[name="pay"]:checked').value;

  // Lưu thông tin sang localStorage
  const orderInfo = {
    name,
    phone,
    email,
    address,
    total,
    payMethod,
    time: new Date().toLocaleString("vi-VN"),
    orderId: "DS" + new Date().getFullYear() + "-" + Math.floor(Math.random() * 99999)
  };
  localStorage.setItem("orderInfo", JSON.stringify(orderInfo));

  // Xóa giỏ hàng và chuyển trang
  localStorage.removeItem("cart");
  window.location.href = "confirm.html";
});


// ==========================
// LƯU GIỎ HÀNG
// ==========================
function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartBadge();
}

// ==========================
// LOAD TRANG
// ==========================
document.addEventListener("DOMContentLoaded", () => {
  renderCart();
  updateCartBadge();
});
shippingSelect?.addEventListener("change", updateTotal);

// ==========================
// HÀM THÊM SẢN PHẨM VÀO GIỎ
// ==========================
function addToCart(product) {
  const existing = cart.find((item) => item.id === product.id);
  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({ ...product, qty: 1 });
  }
  saveCart();
  showPopup(`🛒 Đã thêm <b>${product.name}</b> vào giỏ hàng!`);
  updateCartBadge();
}

// ==========================
// POPUP THÔNG BÁO TRUNG TÂM MÀN HÌNH
// ==========================
function showPopup(message) {
  const oldPopup = document.querySelector(".popup-message");
  if (oldPopup) oldPopup.remove();

  const popup = document.createElement("div");
  popup.className = "popup-message";
  popup.innerHTML = `<div class="popup-content">${message}</div>`;
  document.body.appendChild(popup);

  setTimeout(() => popup.classList.add("show"), 50);
  setTimeout(() => {
    popup.classList.remove("show");
    setTimeout(() => popup.remove(), 400);
  }, 2500);
}

