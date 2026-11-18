// Shared navigation; article pages also load this file.
const navbar = document.getElementById('navbar');
if (navbar) {
  window.addEventListener('scroll', () => navbar.classList.toggle('scrolled', window.scrollY > 20), { passive: true });
}
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
if (hamburger && mobileMenu) {
  const setMenuOpen = (open) => {
    hamburger.classList.toggle('open', open);
    mobileMenu.classList.toggle('open', open);
    hamburger.setAttribute('aria-expanded', String(open));
    hamburger.setAttribute('aria-label', open ? '關閉導覽選單' : '開啟導覽選單');
  };
  hamburger.addEventListener('click', () => setMenuOpen(hamburger.getAttribute('aria-expanded') !== 'true'));
  mobileMenu.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
    const focusWasInMenu = mobileMenu.contains(document.activeElement);
    setMenuOpen(false);
    if (focusWasInMenu) hamburger.focus({ preventScroll: true });
  }));
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && hamburger.getAttribute('aria-expanded') === 'true') {
      setMenuOpen(false);
      hamburger.focus();
    }
  });
  document.addEventListener('click', event => {
    if (!mobileMenu.contains(event.target) && !hamburger.contains(event.target)) setMenuOpen(false);
  });
  window.matchMedia('(min-width: 769px)').addEventListener('change', event => {
    if (event.matches) setMenuOpen(false);
  });
}

// Retain native fragment navigation and focus behavior. CSS handles scrolling.
const serviceNames = {
  workshop: '企業內訓 / 工作坊',
  talk: '主題演講（單場）',
  consulting: 'AI 導入顧問'
};
const contactType = document.getElementById('contact-type');
function selectService(service) {
  if (contactType && Object.hasOwn(serviceNames, service)) contactType.value = serviceNames[service];
}
if (contactType) selectService(new URLSearchParams(window.location.search).get('service'));
document.querySelectorAll('[data-service]').forEach(link => {
  link.addEventListener('click', () => selectService(link.dataset.service));
});

// Events describe observed actions only; no form contents or personal data are sent to analytics.
function trackInquiry(eventName, parameters = {}) {
  if (typeof window.gtag === 'function') {
    window.gtag('event', eventName, { page_path: window.location.pathname, ...parameters });
  }
}
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
  contactForm.addEventListener('focusin', () => trackInquiry('inquiry_form_start'), { once: true });
  contactForm.addEventListener('submit', () => {
    const service = Object.keys(serviceNames).find(key => serviceNames[key] === contactType?.value) || 'other';
    trackInquiry('inquiry_submit_attempt', { service_type: service });
    // Native Formspree POST remains responsible for the result page. No success is inferred here.
  });
}
document.querySelectorAll('a[href^="mailto:"]').forEach(link => {
  link.addEventListener('click', () => trackInquiry('inquiry_email_click'));
});
