const registerButton = document.querySelectorAll('#register');
const loginButton = document.querySelectorAll('#login');
const container = document.getElementById('container');

registerButton.forEach(btn => {
  btn.addEventListener('click', () => container.classList.add('active'));
});

loginButton.forEach(btn => {
  btn.addEventListener('click', () => container.classList.remove('active'));
});

// Đăng ký / đăng nhập localStorage
const regForm = document.getElementById("register-form");
const logForm = document.getElementById("login-form");

regForm.addEventListener("submit", e => {
  e.preventDefault();
  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("reg-email").value.trim();
  const password = document.getElementById("reg-password").value.trim();
  if (!name || !email || !password) return alert("Vui lòng điền đủ thông tin!");

  localStorage.setItem("user", JSON.stringify({ name, email, password }));
  alert("Đăng ký thành công!");
  container.classList.remove('active');
  regForm.reset();
});

logForm.addEventListener("submit", e => {
  e.preventDefault();
  const email = document.getElementById("login-email").value.trim();
  const password = document.getElementById("login-password").value.trim();
  const user = JSON.parse(localStorage.getItem("user"));
  if (!user) return alert("Bạn chưa có tài khoản!");
  if (email === user.email && password === user.password) {
    alert(`Xin chào ${user.name}!`);
    window.location.href = "index.html";
  } else {
    alert("Sai email hoặc mật khẩu!");
  }
});


document.getElementById("login-form").addEventListener("submit", (e) => {
  e.preventDefault();

  const email = document.getElementById("login-email").value;
  const password = document.getElementById("login-password").value;

  // Kiểm tra thông tin đăng nhập (có thể kết hợp với API hoặc database)
  if (email === "user@example.com" && password === "password123") {
    localStorage.setItem("isLoggedIn", "true");  // Lưu thông tin đăng nhập
    window.location.href = "products.html";  // Chuyển hướng tới trang sản phẩm sau khi đăng nhập thành công
  } else {
    alert("Thông tin đăng nhập sai!");
  }
});

document.getElementById("register-form").addEventListener("submit", (e) => {
  e.preventDefault();
  const name = document.getElementById("name").value;
  const email = document.getElementById("reg-email").value;
  const password = document.getElementById("reg-password").value;

  // Lưu thông tin người dùng mới (có thể kết hợp với API hoặc database)
  alert("Đăng ký thành công!");
  window.location.href = "index.html";  // Chuyển hướng đến trang chủ sau khi đăng ký
});
