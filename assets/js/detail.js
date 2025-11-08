// Đổi ảnh chính khi click thumbnail
const thumbs = document.querySelectorAll(".thumb");
const mainImg = document.getElementById("main-img");

thumbs.forEach(t => {
  t.addEventListener("click", () => {
    thumbs.forEach(th => th.classList.remove("active"));
    t.classList.add("active");
    mainImg.src = t.src;
  });
});

// Thêm vào giỏ
document.getElementById("add-to-cart").addEventListener("click", () => {
  const qty = document.getElementById("quantity").value;
  alert(`Đã thêm ${qty} sản phẩm vào giỏ hàng!`);
});

// Mua ngay
document.getElementById("buy-now").addEventListener("click", () => {
  window.location.href = "cart.html";
});

// Gửi đánh giá
document.getElementById("submit-review").addEventListener("click", () => {
  const text = document.getElementById("review-text").value.trim();
  if (text) {
    const list = document.querySelector(".review-list");
    const newReview = document.createElement("div");
    newReview.classList.add("review-item");
    newReview.innerHTML = `<p><strong>Bạn:</strong> ${text}</p>`;
    list.appendChild(newReview);
    document.getElementById("review-text").value = "";
    alert("Cảm ơn bạn đã đánh giá!");
  }
});
