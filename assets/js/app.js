document.getElementById("cta-button").addEventListener("click", function() {
  window.location.href = "products.html";
});

const menuToggle = document.getElementById('mobile-menu');
const nav = document.getElementById('navbar');

menuToggle.addEventListener('click', () => {
  nav.classList.toggle('active');
});