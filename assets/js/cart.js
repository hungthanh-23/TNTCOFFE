// Giả lập sản phẩm trong giỏ (có thể thay bằng localStorage sau)
let cart = [
  { id: 1, name: "Cà phê sữa đá", price: 25000, qty: 2 },
  { id: 2, name: "Trà đào cam sả", price: 30000, qty: 1 }
];

const tbody = document.querySelector("#cart-table tbody");
const subtotalEl = document.getElementById("subtotal");
const shippingSelect = document.getElementById("shipping");
const shippingFeeEl = document.getElementById("shipping-fee");
const discountEl = document.getElementById("discount");
const grandtotalEl = document.getElementById("grandtotal");

let discount = 0;

function renderCart() {
  tbody.innerHTML = "";
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
}

function updateTotal() {
  const subtotal = getSubtotal();
  const ship = parseInt(shippingSelect.value);
  const total = subtotal + ship - discount;
  shippingFeeEl.textContent = ship.toLocaleString() + "đ";
  discountEl.textContent = discount.toLocaleString() + "đ";
  grandtotalEl.textContent = total.toLocaleString() + "đ";
}

function getSubtotal() {
  return cart.reduce((sum, item) => sum + item.price * item.qty, 0);
}

document.addEventListener("input", e => {
  if (e.target.classList.contains("qty-input")) {
    const idx = e.target.dataset.index;
    cart[idx].qty = parseInt(e.target.value);
    renderCart();
  }
});

document.addEventListener("click", e => {
  if (e.target.classList.contains("remove-btn")) {
    const idx = e.target.dataset.index;
    cart.splice(idx, 1);
    renderCart();
  }
});

shippingSelect.addEventListener("change", updateTotal);

document.getElementById("apply-coupon").addEventListener("click", () => {
  const code = document.getElementById("coupon").value.trim().toUpperCase();
  if (code === "DRINK10") {
    discount = getSubtotal() * 0.1;
    alert("Áp dụng mã giảm giá 10% thành công!");
  } else {
    discount = 0;
    alert("Mã không hợp lệ hoặc hết hạn.");
  }
  updateTotal();
});

document.getElementById("checkout").addEventListener("click", () => {
  const total = grandtotalEl.textContent;
  const payMethod = document.querySelector('input[name="pay"]:checked').value;
  alert(`Đơn hàng của bạn tổng ${total}.\nPhương thức: ${payMethod.toUpperCase()}.\nCảm ơn đã mua hàng!`);
  window.location.href = "confirm.html";
});

renderCart();
