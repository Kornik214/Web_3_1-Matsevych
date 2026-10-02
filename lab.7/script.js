document.addEventListener('DOMContentLoaded', () => {
  const menuToggle = document.getElementById('menu-toggle');
  const mobileNav = document.getElementById('mobile-nav');

  if (menuToggle && mobileNav) {
    menuToggle.addEventListener('click', () => {
      const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';

      menuToggle.setAttribute('aria-expanded', !isExpanded);
      mobileNav.classList.toggle('is-open');
    });

    const navLinks = mobileNav.querySelectorAll('a');
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        menuToggle.setAttribute('aria-expanded', 'false');
        mobileNav.classList.remove('is-open');
      });
    });
  }
});