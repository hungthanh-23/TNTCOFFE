// Đăng ký & đăng nhập bằng localStorage
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const loginBtn = document.getElementById("login-btn");
const registerBtn = document.getElementById("register-btn");
const logoutBtn = document.getElementById("logout-btn");
const authSection = document.getElementById("auth-section");
const profileSection = document.getElementById("profile-section");
const userEmail = document.getElementById("user-email");
const orderTable = document.querySelector("#order-table tbody");

// Kiểm tra user đang đăng nhập
if (localStorage.getItem("loggedUser")) {
  showProfile(localStorage.getItem("loggedUser"));
}

// Đăng ký
registerBtn.addEventListener("click", () => {
  const email = emailInput.value.trim();
  const pass = passwordInput.value.trim();
  if (!email || !pass) return alert("Vui lòng nhập đầy đủ thông tin.");
  if (localStorage.getItem(email)) return alert("Email đã tồn tại!");
  localStorage.setItem(email, pass);
  alert("Đăng ký thành công! Bạn có thể đăng nhập ngay.");
});

// Đăng nhập
loginBtn.addEventListener("click", () => {
  const email = emailInput.value.trim();
  const pass = passwordInput.value.trim();
  const savedPass = localStorage.getItem(email);
  if (!savedPass) return alert("Tài khoản không tồn tại!");
  if (savedPass !== pass) return alert("Mật khẩu không đúng!");
  localStorage.setItem("loggedUser", email);
  showProfile(email);
});

// Hiển thị hồ sơ & đơn hàng
function showProfile(email) {
  authSection.classList.add("hidden");
  profileSection.classList.remove("hidden");
  userEmail.textContent = email;
  renderOrders();
}

// Lịch sử đơn hàng mẫu
function renderOrders() {
  const orders = [
    { id: "DS2025-1123", date: "09/11/2025", total: "85.000đ", status: "Đang giao" },
    { id: "DS2025-1078", date: "04/11/2025", total: "65.000đ", status: "Hoàn tất" },
  ];
  orderTable.innerHTML = orders
    .map(o => `<tr><td>${o.id}</td><td>${o.date}</td><td>${o.total}</td><td>${o.status}</td></tr>`)
    .join("");
}

// Đăng xuất
logoutBtn.addEventListener("click", () => {
  localStorage.removeItem("loggedUser");
  profileSection.classList.add("hidden");
  authSection.classList.remove("hidden");
});
