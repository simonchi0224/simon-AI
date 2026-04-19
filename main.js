// Navbar scroll
window.addEventListener('scroll', () => {
  document.getElementById('navbar').classList.toggle('scrolled', window.scrollY > 20);
});

// Hamburger
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
if (hamburger) {
  hamburger.addEventListener('click', () => navLinks.classList.toggle('open'));
}

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (target) { e.preventDefault(); target.scrollIntoView({ behavior: 'smooth' }); }
  });
});

// Contact form
function handleSubmit(e) {
  e.preventDefault();
  const btn = e.target.querySelector('button[type="submit"]');
  btn.textContent = '已送出 ✓';
  btn.style.background = '#16a34a';
  btn.disabled = true;
  setTimeout(() => {
    btn.textContent = '送出詢問 →';
    btn.style.background = '';
    btn.disabled = false;
    e.target.reset();
  }, 3000);
  // In production: replace with actual form submission (Formspree, EmailJS, etc.)
  window.location.href = `mailto:Simonchi0224@gmail.com?subject=演講/顧問諮詢&body=來自網站表單的詢問`;
}
