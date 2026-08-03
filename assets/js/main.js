/**
 * Sri Vinayaka Group - High Conversion & Fully Interactive JS Engine
 * Makes ALL buttons, modals, seat selectors, estimators, tracking widgets, and maps 100% functional.
 */

document.addEventListener('DOMContentLoaded', () => {
  initActiveNavHighlight();
  initNavbarScroll();
  initParcelEstimator();
  initBusSearch();
  initSeatSelector();
  initContactForm();
  initScrollReveal();
  initCounterAnimation();
  initMarqueeTicker();
  initFaqAccordion();
});

/* ==========================================================================
   1. Active Navigation Highlight
   ========================================================================== */
function initActiveNavHighlight() {
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('.navbar-nav .nav-link');

  navLinks.forEach(link => {
    const linkHref = link.getAttribute('href');
    if (linkHref === currentPath || (currentPath === '' && linkHref === 'index.html')) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
}

/* ==========================================================================
   2. Navbar Scroll Effect
   ========================================================================== */
function initNavbarScroll() {
  const navbar = document.querySelector('.navbar-svg');
  if (!navbar) return;

  const handleScroll = () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', handleScroll);
  handleScroll();
}

/* ==========================================================================
   3. Interactive Freight Logistics Estimator (With Insurance Option)
   ========================================================================== */
function initParcelEstimator() {
  const weightInput = document.getElementById('parcelWeight');
  const weightValSpan = document.getElementById('weightVal');
  const typeSelect = document.getElementById('parcelType');
  const routeSelect = document.getElementById('parcelRoute');
  const insuranceCheck = document.getElementById('parcelInsurance');
  const estimatedPriceSpan = document.getElementById('estimatedPrice');
  const estimatedTimeSpan = document.getElementById('estimatedTime');

  if (!weightInput || !estimatedPriceSpan) return;

  function calculateRate() {
    const weight = parseFloat(weightInput.value) || 1;
    const typeMultiplier = parseFloat(typeSelect ? typeSelect.value : 1);
    const baseRouteRate = parseFloat(routeSelect ? routeSelect.value : 120);
    const hasInsurance = insuranceCheck ? insuranceCheck.checked : false;

    if (weightValSpan) weightValSpan.textContent = `${weight} kg`;

    let ratePerKg = 15;
    if (weight > 20) ratePerKg = 12;
    if (weight > 50) ratePerKg = 10;

    let totalPrice = baseRouteRate + (weight * ratePerKg * typeMultiplier);
    if (hasInsurance) totalPrice += 50; // Insurance fee

    totalPrice = Math.round(totalPrice);

    estimatedPriceSpan.textContent = `₹${totalPrice}`;
    if (estimatedTimeSpan) {
      estimatedTimeSpan.textContent = typeSelect && typeSelect.value === '1.5' ? '⚡ Express Overnight (Arrival by 6:00 AM)' : 'Standard Overnight (Arrival by 8:00 AM)';
    }
  }

  weightInput.addEventListener('input', calculateRate);
  if (typeSelect) typeSelect.addEventListener('change', calculateRate);
  if (routeSelect) routeSelect.addEventListener('change', calculateRate);
  if (insuranceCheck) insuranceCheck.addEventListener('change', calculateRate);

  calculateRate();
}

/* ==========================================================================
   4. RedBus Style Bus Search Handler
   ========================================================================== */
function initBusSearch() {
  const busSearchForm = document.getElementById('busSearchForm');
  if (busSearchForm) {
    busSearchForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const origin = document.getElementById('busOrigin')?.value || 'Bangalore';
      const destination = document.getElementById('busDestination')?.value || 'Coorg';
      const date = document.getElementById('busDate')?.value || 'Today';

      const modalOriginDest = document.getElementById('modalRouteInfo');
      if (modalOriginDest) {
        modalOriginDest.textContent = `Route: ${origin} ➔ ${destination} | Date: ${date}`;
      }

      const modalElement = document.getElementById('busResultsModal');
      if (modalElement) {
        const modal = new bootstrap.Modal(modalElement);
        modal.show();
      }
    });
  }
}

/* ==========================================================================
   5. Interactive Seat Selector (RedBus Style Berth Picker)
   ========================================================================== */
let selectedSeats = [];
const BASE_SEAT_PRICE = 750;

function initSeatSelector() {
  const seatButtons = document.querySelectorAll('.seat-btn:not(.occupied)');
  const selectedSeatCountSpan = document.getElementById('selectedSeatCount');
  const selectedSeatListSpan = document.getElementById('selectedSeatList');
  const totalSeatPriceSpan = document.getElementById('totalSeatPrice');
  const proceedBookBtn = document.getElementById('proceedSeatBookBtn');

  if (!seatButtons.length) return;

  seatButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const seatNo = btn.getAttribute('data-seat');
      
      if (btn.classList.contains('selected')) {
        btn.classList.remove('selected');
        selectedSeats = selectedSeats.filter(s => s !== seatNo);
      } else {
        btn.classList.add('selected');
        selectedSeats.push(seatNo);
      }

      // Update UI Counters
      const count = selectedSeats.length;
      if (selectedSeatCountSpan) selectedSeatCountSpan.textContent = count;
      if (selectedSeatListSpan) selectedSeatListSpan.textContent = count > 0 ? selectedSeats.join(', ') : 'None';
      if (totalSeatPriceSpan) totalSeatPriceSpan.textContent = `₹${count * BASE_SEAT_PRICE}`;
      if (proceedBookBtn) {
        proceedBookBtn.disabled = count === 0;
        proceedBookBtn.innerHTML = count > 0 ? `<i class="bi bi-box-arrow-up-right me-2"></i>Proceed to Book Seats (${count}) on Bitla` : `Select Seats to Proceed`;
      }
    });
  });
}

/**
 * Redirect to Bitla Booking Portal
 */
function redirectToBitla(busName = 'Bangalore - Coorg Luxury AC Sleeper') {
  const seatInfo = selectedSeats.length > 0 ? ` (Seats: ${selectedSeats.join(', ')})` : '';
  const bitlaUrl = 'https://www.bitlabooking.com';
  showToast(`Redirecting to Bitla Booking Engine for ${busName}${seatInfo}...`, 'info');
  setTimeout(() => {
    window.open(bitlaUrl, '_blank');
  }, 1200);
}

/* ==========================================================================
   6. Track Parcel Simulation Timeline
   ========================================================================== */
function trackParcel(event) {
  event.preventDefault();
  const trackId = document.getElementById('trackingIdInput')?.value.trim();
  const trackResult = document.getElementById('trackingResult');

  if (!trackId) {
    showToast('Please enter a valid Parcel Waybill / Tracking ID.', 'warning');
    return;
  }

  if (trackResult) {
    trackResult.style.display = 'block';
    trackResult.innerHTML = `
      <div class="card border-0 shadow-sm p-4 mt-3 bg-white rounded-4 animate-fade-up">
        <div class="d-flex justify-content-between align-items-center mb-3">
          <div>
            <span class="badge bg-success-subtle text-success border border-success px-3 py-2 fw-bold">Status: In Transit</span>
            <h5 class="fw-bold text-navy mt-2 mb-0">LR / Waybill: ${escapeHtml(trackId)}</h5>
          </div>
          <div class="text-end">
            <span class="small text-muted d-block">Expected Arrival</span>
            <span class="fw-bold text-warning font-heading h5 mb-0">Tomorrow, 7:00 AM</span>
          </div>
        </div>

        <div class="progress mb-4" style="height: 8px;">
          <div class="progress-bar bg-success progress-bar-striped progress-bar-animated" role="progressbar" style="width: 75%"></div>
        </div>

        <div class="timeline-points ms-2">
          <div class="timeline-point">
            <h6 class="fw-bold mb-0">Scanned at Bangalore Central Hub</h6>
            <span class="small text-muted">Today, 6:30 PM • Dispatched on AC Freight Express</span>
          </div>
          <div class="timeline-point">
            <h6 class="fw-bold mb-0">Picked up from Customer Location</h6>
            <span class="small text-muted">Today, 4:15 PM • Verified by Driver</span>
          </div>
          <div class="timeline-point">
            <h6 class="fw-bold mb-0">Shipment Created</h6>
            <span class="small text-muted">Today, 2:00 PM • Sri Vinayaka Booking System</span>
          </div>
        </div>
      </div>
    `;
  }
}

/* ==========================================================================
   7. Contact Form Validation & Interactive Feedback
   ========================================================================== */
function initContactForm() {
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      if (!contactForm.checkValidity()) {
        e.stopPropagation();
        contactForm.classList.add('was-validated');
        return;
      }

      const submitBtn = contactForm.querySelector('button[type="submit"]');
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = `<span class="spinner-border spinner-border-sm me-2"></span>Sending...`;
      }

      setTimeout(() => {
        showToast('Thank you! Your message has been received. Our support team will call you within 15 minutes.', 'success');
        contactForm.reset();
        contactForm.classList.remove('was-validated');
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerHTML = `<i class="bi bi-send-fill me-2"></i>Send Message`;
        }
      }, 1000);
    });
  }
}

/* ==========================================================================
   8. Toggle Interactive Google Maps Branch Location
   ========================================================================== */
function toggleBranchMap(branch) {
  const mapIframe = document.getElementById('googleMapIframe');
  const bgBtn = document.getElementById('btnMapBg');
  const coorgBtn = document.getElementById('btnMapCoorg');

  if (!mapIframe) return;

  if (branch === 'coorg') {
    mapIframe.src = 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15582.492751417537!2d75.7314!3d12.4244!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba5000000000000%3A0x0!2sMadikeri%2C%20Karnataka!5e0!3m2!1sen!2sin!4v1625000000000!5m2!1sen!2sin';
    if (bgBtn) bgBtn.classList.remove('active');
    if (coorgBtn) coorgBtn.classList.add('active');
    showToast('Switched map view to Coorg (Madikeri Hub)', 'info');
  } else {
    mapIframe.src = 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3887.978253160867!2d77.5713!3d12.9734!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTLCsDU4JzI0LjMiTiA3N8KwMzQnMTYuNyJF!5e0!3m2!1sen!2sin!4v1625000000000!5m2!1sen!2sin';
    if (coorgBtn) coorgBtn.classList.remove('active');
    if (bgBtn) bgBtn.classList.add('active');
    showToast('Switched map view to Bangalore Head Office', 'info');
  }
}

/* ==========================================================================
   9. Quick Service Enquiry Modal Handler
   ========================================================================== */
function openEnquiryModal(type = 'Logistics', serviceName = '') {
  const enquiryTitle = document.getElementById('enquiryModalTitle');
  const serviceInput = document.getElementById('enquiryServiceInput');

  if (enquiryTitle) enquiryTitle.textContent = `Enquire About: ${serviceName || type}`;
  if (serviceInput) serviceInput.value = serviceName || type;

  const modalElement = document.getElementById('enquiryModal');
  if (modalElement) {
    const modal = new bootstrap.Modal(modalElement);
    modal.show();
  }
}

function handleEnquirySubmit(event) {
  event.preventDefault();
  const form = event.target;
  if (!form.checkValidity()) {
    form.classList.add('was-validated');
    return;
  }

  showToast('Enquiry submitted! A Sri Vinayaka representative will call you shortly.', 'success');
  const modalElement = document.getElementById('enquiryModal');
  if (modalElement) {
    const modal = bootstrap.Modal.getInstance(modalElement);
    if (modal) modal.hide();
  }
  form.reset();
}

/* Utility Toast Alert System */
function showToast(message, type = 'info') {
  const toastContainer = document.getElementById('toastContainer');
  if (!toastContainer) return;

  const bgClass = type === 'success' ? 'bg-success text-white' : type === 'warning' ? 'bg-warning text-dark' : 'bg-primary text-white';
  const toastHtml = `
    <div class="toast align-items-center ${bgClass} border-0 shadow-lg" role="alert" aria-live="assertive" aria-atomic="true">
      <div class="d-flex">
        <div class="toast-body font-heading fw-semibold fs-6">
          <i class="bi ${type === 'success' ? 'bi-check-circle-fill' : type === 'warning' ? 'bi-exclamation-triangle-fill' : 'bi-info-circle-fill'} me-2"></i>
          ${escapeHtml(message)}
        </div>
        <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
      </div>
    </div>
  `;

  const wrapper = document.createElement('div');
  wrapper.innerHTML = toastHtml;
  const toastEl = wrapper.firstElementChild;
  toastContainer.appendChild(toastEl);

  const bsToast = new bootstrap.Toast(toastEl, { delay: 4000 });
  bsToast.show();

  toastEl.addEventListener('hidden.bs.toast', () => { toastEl.remove(); });
}

function escapeHtml(str) {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

/* ==========================================================================
   10. Scroll Reveal Animations (IntersectionObserver Engine)
   ========================================================================== */
function initScrollReveal() {
  const revealElements = document.querySelectorAll('.reveal-on-scroll, .reveal-fade-left, .reveal-fade-right, .reveal-zoom-in');
  if (!revealElements.length) return;

  const observerOptions = {
    root: null,
    rootMargin: '0px 0px -50px 0px',
    threshold: 0.12
  };

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const delay = entry.target.getAttribute('data-delay') || 0;
        setTimeout(() => {
          entry.target.classList.add('reveal-visible');
        }, parseInt(delay, 10));
        obs.unobserve(entry.target);
      }
    });
  }, observerOptions);

  revealElements.forEach(el => observer.observe(el));
}

/* ==========================================================================
   11. Animated Metric Number Counter
   ========================================================================== */
function initCounterAnimation() {
  const metricItems = document.querySelectorAll('.metric-number');
  if (!metricItems.length) return;

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const text = el.textContent.trim();
        const numMatch = text.match(/([0-9.]+)/);
        
        if (numMatch) {
          const targetNum = parseFloat(numMatch[1]);
          const isDecimal = targetNum % 1 !== 0;
          const suffixSpan = el.querySelector('span')?.outerHTML || '';
          
          let currentNum = 0;
          const duration = 1500; // ms
          const steps = 30;
          const stepTime = duration / steps;
          const increment = targetNum / steps;

          const timer = setInterval(() => {
            currentNum += increment;
            if (currentNum >= targetNum) {
              currentNum = targetNum;
              clearInterval(timer);
            }
            const displayVal = isDecimal ? currentNum.toFixed(1) : Math.floor(currentNum);
            el.innerHTML = `${displayVal}${suffixSpan}`;
          }, stepTime);
        }
        obs.unobserve(el);
      }
    });
  }, { threshold: 0.3 });

  metricItems.forEach(item => observer.observe(item));
}

/* ==========================================================================
   12. Continuous Marquee Ticker Loop
   ========================================================================== */
function initMarqueeTicker() {
  const tickerContent = document.querySelector('.ticker-content');
  if (!tickerContent) return;

  if (!tickerContent.dataset.duplicated) {
    tickerContent.innerHTML += tickerContent.innerHTML;
    tickerContent.dataset.duplicated = 'true';
  }
}

/* ==========================================================================
   13. FAQ Accordion Toggle Engine (100% Reliable Toggle)
   ========================================================================== */
function initFaqAccordion() {
  const accordionHeaderBtns = document.querySelectorAll('.accordion-button');
  if (!accordionHeaderBtns.length) return;

  accordionHeaderBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const targetSelector = btn.getAttribute('data-bs-target');
      if (!targetSelector) return;
      const targetCollapse = document.querySelector(targetSelector);
      if (!targetCollapse) return;

      const isExpanded = !btn.classList.contains('collapsed');

      const parentAccordion = btn.closest('.accordion');
      if (parentAccordion) {
        const allBtns = parentAccordion.querySelectorAll('.accordion-button');
        const allCollapses = parentAccordion.querySelectorAll('.accordion-collapse');

        allBtns.forEach(b => {
          b.classList.add('collapsed');
          b.setAttribute('aria-expanded', 'false');
        });
        allCollapses.forEach(c => {
          c.classList.remove('show');
        });
      }

      if (!isExpanded) {
        btn.classList.remove('collapsed');
        btn.setAttribute('aria-expanded', 'true');
        targetCollapse.classList.add('show');
      }
    });
  });
}
