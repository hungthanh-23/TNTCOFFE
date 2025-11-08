// Sinh mã đơn và ngày giờ tự động
const orderId = "DS" + Math.floor(1000 + Math.random() * 9000);
document.getElementById("order-id").textContent += orderId;

const now = new Date();
document.getElementById("order-date").textContent = now.toLocaleString("vi-VN");

const payMethods = ["VISA/Master", "VNPay/QR", "COD"];
const randomPay = payMethods[Math.floor(Math.random() * payMethods.length)];
document.getElementById("order-pay").textContent = randomPay;
