// Xử lý form liên hệ
document.getElementById("contactForm").addEventListener("submit", (e) => {
  e.preventDefault();
  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const message = document.getElementById("message").value.trim();
  const msgBox = document.getElementById("formMsg");

  if (!name || !email || !message) {
    msgBox.style.color = "red";
    msgBox.textContent = "Vui lòng điền đầy đủ thông tin.";
    return;
  }

  // Giả lập gửi email
  msgBox.style.color = "#007b55";
  msgBox.textContent = "Cảm ơn bạn, thông tin đã được gửi!";
  document.getElementById("contactForm").reset();
});
