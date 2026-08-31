/**
 * Sri Vinayaka Group - Modular Navbar & Footer Custom Elements
 * Works synchronously and 100% reliably in all environments (file:// protocol and web servers).
 */

(function () {
  function getNavbarHTML() {
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';

    return `
      <!-- Top Announcement Bar -->
      <div class="top-bar">
        <div class="container d-flex justify-content-between align-items-center flex-wrap gap-2">
          <div class="d-flex align-items-center gap-3 flex-wrap">
            <span><i class="bi bi-telephone-fill text-warning me-1"></i><strong>Helpline:</strong> <a href="tel:9448325657" class="text-white text-decoration-none">9448325657</a> / <a href="tel:9187487973" class="text-white text-decoration-none">9187487973</a> / <a href="tel:9036270239" class="text-white text-decoration-none">9036270239</a></span>
            <span class="d-none d-lg-inline"><i class="bi bi-envelope-fill text-warning me-1"></i><a href="mailto:ruthwick20@gmail.com" class="text-white text-decoration-none">ruthwick20@gmail.com</a></span>
          </div>
          <div class="d-flex align-items-center gap-3">
            <span class="trust-badge-pill"><i class="bi bi-shield-check text-success me-1"></i>Official Bitla Partner</span>
            <a href="contact.html" class="d-none d-sm-inline"><i class="bi bi-geo-alt-fill me-1"></i>Virajpet HQ & Branches</a>
          </div>
        </div>
      </div>

      <!-- Header & Navigation -->
      <nav id="mainNavbar" class="navbar navbar-expand-lg sticky-top navbar-svg">
        <div class="container">
          <a class="navbar-brand d-flex align-items-center" href="index.html">
            <img src="assets/images/logo.webp" alt="Sri Vinayaka Logo" class="me-2">
            <div class="brand-text">
              <span class="brand-title">Sri Vinayaka Group</span>
              <span class="brand-tagline">Driven by Trust</span>
            </div>
          </a>

          <button class="navbar-toggler border-0 shadow-none" type="button" data-bs-toggle="collapse" data-bs-target="#navbarContent" aria-controls="navbarContent" aria-expanded="false" aria-label="Toggle navigation">
            <i class="bi bi-list fs-1 text-navy"></i>
          </button>

          <div class="collapse navbar-collapse" id="navbarContent">
            <ul class="navbar-nav ms-auto align-items-lg-center gap-lg-2">
              <li class="nav-item"><a class="nav-link ${currentPath === 'index.html' || currentPath === '' ? 'active' : ''}" href="index.html">Home</a></li>
              <li class="nav-item"><a class="nav-link ${currentPath === 'about.html' ? 'active' : ''}" href="about.html">About Us</a></li>
              <li class="nav-item"><a class="nav-link ${currentPath === 'sleeper-services.html' ? 'active' : ''}" href="sleeper-services.html">Sleeper Bus</a></li>
              <li class="nav-item"><a class="nav-link ${currentPath === 'logistics.html' ? 'active' : ''}" href="logistics.html">Logistics & Cargo</a></li>
              <li class="nav-item"><a class="nav-link ${currentPath === 'tours.html' ? 'active' : ''}" href="tours.html">Tours & Charters</a></li>
              <li class="nav-item"><a class="nav-link ${currentPath === 'contact.html' ? 'active' : ''}" href="contact.html">Contact & Branches</a></li>
            </ul>
          </div>
        </div>
      </nav>
    `;
  }

  function getFooterHTML() {
    return `
      <!-- Footer -->
      <footer class="site-footer">
        <div class="container">
          <div class="row g-4 mb-5">
            <!-- Col 1: Brand & Registered HQ -->
            <div class="col-lg-4">
              <div class="d-flex align-items-center mb-3">
                <img src="assets/images/logo.webp" alt="Sri Vinayaka Group" style="height: 44px;" class="me-2 rounded">
                <span class="h4 font-heading text-white mb-0 fw-bold">Sri Vinayaka Group</span>
              </div>
              <p class="small text-white-50 mb-3">
                South India's preferred mobility, logistics, and holiday tour provider. Connecting Bangalore, Coorg, Mysore, and major regional hubs with safety, speed, and trust.
              </p>
              <div class="small text-white-50 mb-2">
                <i class="bi bi-geo-alt-fill text-warning me-1"></i><strong>Head Office:</strong> <a href="https://maps.app.goo.gl/wQY96wuksRgB2jsd8?g_st=ic" target="_blank" rel="noopener" class="text-white-50 text-decoration-none">Arji Village, Kallubane, Virajpet, Coorg, Karnataka - 571218 <i class="bi bi-box-arrow-up-right small text-warning ms-1"></i></a>
              </div>
              <div class="small text-white-50 mb-3">
                <i class="bi bi-envelope-fill text-warning me-1"></i><a href="mailto:ruthwick20@gmail.com" class="text-white-50 text-decoration-none">ruthwick20@gmail.com</a>
              </div>
              <div>
                <a href="https://facebook.com" target="_blank" rel="noopener" class="social-link" aria-label="Facebook"><i class="bi bi-facebook"></i></a>
                <a href="https://www.instagram.com/sri_vinayaka_official_" target="_blank" rel="noopener" class="social-link" aria-label="Instagram"><i class="bi bi-instagram"></i></a>
                <a href="https://wa.me/919187487973" target="_blank" rel="noopener" class="social-link" aria-label="WhatsApp"><i class="bi bi-whatsapp"></i></a>
              </div>
            </div>

            <!-- Col 2: Quick Links -->
            <div class="col-6 col-lg-2">
              <h5 class="footer-title font-heading">Quick Links</h5>
              <ul class="footer-links">
                <li><a href="index.html">Home</a></li>
                <li><a href="about.html">About Us</a></li>
                <li><a href="sleeper-services.html">Sleeper Bus</a></li>
                <li><a href="logistics.html">Logistics & Cargo</a></li>
                <li><a href="tours.html">Tours & Charters</a></li>
                <li><a href="contact.html">Contact & Offices</a></li>
              </ul>
            </div>

            <!-- Col 3: Group Verticals -->
            <div class="col-6 col-lg-3">
              <h5 class="footer-title font-heading">Group Verticals</h5>
              <ul class="footer-links">
                <li><a href="sleeper-services.html">Bangalore ↔ Coorg Sleeper</a></li>
                <li><a href="logistics.html">Express Overnight Cargo</a></li>
                <li><a href="tours.html">Coorg & Mysore Holiday Tours</a></li>
                <li><a href="tours.html#charter">Corporate & Group Bus Hire</a></li>
                <li><a href="sleeper-services.html#timetable">24 Boarding Points Timetable</a></li>
              </ul>
            </div>

            <!-- Col 4: Booking & Helplines -->
            <div class="col-lg-3">
              <h5 class="footer-title font-heading">Contact & Booking</h5>
              <p class="small text-white-50 mb-2"><i class="bi bi-telephone-fill text-warning me-1"></i><strong>Helpline:</strong> 9448325657 / 9187487973 / 9036270239</p>
              <p class="small text-white-50 mb-3"><i class="bi bi-credit-card-fill text-warning me-1"></i><strong>E-Payment Support:</strong> 6366967218</p>
              <div class="d-flex flex-column gap-2">
                <button onclick="redirectToBitla()" class="btn btn-gold btn-sm w-100 justify-content-center">
                  <i class="bi bi-box-arrow-up-right me-1"></i>Book on Bitla Portal
                </button>
              </div>
            </div>
          </div>

          <div class="border-top border-secondary pt-4 text-center small text-white-50">
            <p class="mb-0">&copy; 2026 Sri Vinayaka Group. All Rights Reserved. Driven by Trust.</p>
          </div>
        </div>
      </footer>

      <!-- Floating WhatsApp Button -->
      <a href="https://wa.me/919187487973?text=Hello%20Sri%20Vinayaka%20Group,%20I%20have%20an%20enquiry" target="_blank" class="whatsapp-float" aria-label="Chat on WhatsApp">
        <i class="bi bi-whatsapp"></i>
      </a>
    `;
  }

  // Define Web Components
  if (typeof customElements !== 'undefined') {
    if (!customElements.get('site-navbar')) {
      class SiteNavbar extends HTMLElement {
        connectedCallback() {
          this.innerHTML = getNavbarHTML();
        }
      }
      customElements.define('site-navbar', SiteNavbar);
    }

    if (!customElements.get('site-footer')) {
      class SiteFooter extends HTMLElement {
        connectedCallback() {
          this.innerHTML = getFooterHTML();
        }
      }
      customElements.define('site-footer', SiteFooter);
    }
  }

  // Also support direct ID containers immediately
  function renderContainers() {
    const navCont = document.getElementById('site-navbar-container') || document.getElementById('navbar-placeholder');
    if (navCont && !navCont.innerHTML.trim()) {
      navCont.innerHTML = getNavbarHTML();
    }

    const footCont = document.getElementById('site-footer-container') || document.getElementById('footer-placeholder');
    if (footCont && !footCont.innerHTML.trim()) {
      footCont.innerHTML = getFooterHTML();
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', renderContainers);
  } else {
    renderContainers();
  }

  // Global safe fallback for Bitla Portal redirect
  if (typeof window.redirectToBitla !== 'function') {
    window.redirectToBitla = function (busName = 'Bangalore - Coorg Luxury AC Sleeper') {
      const bitlaDirectUrl = 'https://www.simplybus.com/operator/sri-vinayaka-travels';
      const bitlaSearchUrl = `https://www.simplybus.com/search?from=Bangalore&to=Coorg&service=${encodeURIComponent(busName)}`;
      window.open(bitlaSearchUrl, '_blank', 'noopener,noreferrer');
    };
  }
})();
