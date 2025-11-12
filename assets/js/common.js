// ==============================
// TỰ ĐỘNG LOAD HEADER & FOOTER
// ==============================
document.addEventListener("DOMContentLoaded", () => {
  fetch("header.html")
    .then(res => res.text())
    .then(data => {
      document.getElementById("header-placeholder").innerHTML = data;
    })
    .catch(err => console.error("Lỗi tải header:", err));

  fetch("footer.html")
    .then(res => res.text())
    .then(data => {
      document.getElementById("footer-placeholder").innerHTML = data;
    })
    .catch(err => console.error("Lỗi tải footer:", err));
});
