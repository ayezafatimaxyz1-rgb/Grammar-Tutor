// ===== Mobile nav toggle =====
const navToggle = document.getElementById('nav-toggle');
const mainNav = document.getElementById('main-nav');

navToggle.addEventListener('click', () => {
  const isOpen = mainNav.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', String(isOpen));
});

mainNav.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    mainNav.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
  });
});

// ===== Footer year =====
document.getElementById('year').textContent = new Date().getFullYear();

// ===== Instagram DM helper =====
// Instagram has no public URL parameter to pre-fill a DM's text (unlike
// WhatsApp's wa.me/...?text=), so the closest we can do is copy the
// starter message to the clipboard right as the chat opens, and tell
// the visitor to paste it.
let toastTimer;
function showToast(text) {
  let overlay = document.getElementById('site-toast-overlay');
  let toast = document.getElementById('site-toast');
  if (!overlay) {
    overlay = document.createElement('div');
    overlay.id = 'site-toast-overlay';
    overlay.className = 'site-toast-overlay';

    toast = document.createElement('div');
    toast.id = 'site-toast';
    toast.className = 'site-toast';
    toast.setAttribute('role', 'status');
    toast.innerHTML = `
      <svg class="icon" viewBox="0 0 24 24"><path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg>
      <span class="site-toast-text"></span>
    `;
    overlay.appendChild(toast);
    document.body.appendChild(overlay);
    overlay.addEventListener('click', hideToast);
  }
  toast.querySelector('.site-toast-text').textContent = text;
  overlay.classList.add('visible');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(hideToast, 4500);
}

function hideToast() {
  const overlay = document.getElementById('site-toast-overlay');
  if (overlay) overlay.classList.remove('visible');
}

function wireInstagramMessageCopy(link, getMessage) {
  if (!link) return;
  link.addEventListener('click', () => {
    const message = getMessage();
    if (!message) return;
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(message)
        .then(() => showToast('Message copied! Paste it into the Instagram chat that just opened.'))
        .catch(() => showToast(`Send us: "${message}"`));
    } else {
      showToast(`Send us: "${message}"`);
    }
  });
}

const FOOTER_IG_MESSAGE = "Hi! I'd like to know more about your courses.";
wireInstagramMessageCopy(
  document.querySelector('.footer-social a[aria-label="Message on Instagram"]'),
  () => FOOTER_IG_MESSAGE
);

// ===== Courses =====
const WHATSAPP_NUMBER = '923015095042';
const INSTAGRAM_HANDLE = 'english.with.mahmood.sarwar';

const courses = [
  {
    id: 'fog-2',
    badge: '10% Early-Bird',
    name: 'Fundamentals of Grammar 2.0',
    tagline: 'A complete basic-to-advanced grammar course for CSS/PMS, MDCAT, IBA & one-paper exams.',
    features: [
      'For CSS/PMS, MDCAT, IBA & all one-paper exams',
      'In-class practice & reading tasks',
      'Practice exercises after every class',
      'Quiz after each module',
    ],
    schedule: 'Fri–Sun · 6:00–7:30 PM',
    mode: 'Online / On-campus (xSEL Academy)',
    duration: '2 months',
    installment: 'Or 2 monthly installments of Rs. 5,000 (Rs. 10,000 total)',
    startDate: 'Sept 19, 2026',
    priceOriginal: 10000,
    priceDiscounted: 9000,
    offerEndsAt: '2026-09-06T23:59:59',
  },
  {
    id: 'precis-composition',
    badge: '10% Early-Bird',
    name: 'Precis & Composition',
    tagline: 'Exam-focused writing and comprehension — built for competitive exams.',
    features: [
      '40+ hours of live classes',
      'Exam-oriented practice & guidance',
      'Interactive lessons',
      'Vocabulary and reading tasks',
    ],
    schedule: 'Mon–Thu · 8:00–9:00 PM',
    mode: 'Online / On-campus (xSEL Academy)',
    duration: '2 months',
    installment: 'Or 2 monthly installments of Rs. 5,000 (Rs. 10,000 total)',
    startDate: 'Sept 12, 2026',
    priceOriginal: 10000,
    priceDiscounted: 9000,
    offerEndsAt: '2026-09-08T23:59:59',
  },
  {
    id: 'spoken-english',
    badge: '10% Early-Bird',
    name: 'Spoken English Course',
    tagline: 'A complete 2-month speaking journey — fast-track fluent, confident speaking.',
    features: [
      'Online + on-site classes',
      'Interactive activities & guided speaking drills',
      'Listening comprehension with authentic audio/video',
      'Focused pronunciation improvement',
    ],
    schedule: 'Mon–Thu · 6:00–7:00 PM',
    mode: 'Online + On-site',
    duration: '2 months',
    startDate: 'Sept 15, 2026',
    priceOriginal: 15000,
    priceDiscounted: 13500,
    offerEndsAt: '2026-09-10T23:59:59',
  },
];

function formatPKR(amount) {
  return `Rs. ${amount.toLocaleString('en-PK')}`;
}

function formatCountdown(targetIso) {
  const diff = new Date(targetIso).getTime() - Date.now();
  if (diff <= 0) return null;
  const totalSeconds = Math.floor(diff / 1000);
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  const pad = (n) => String(n).padStart(2, '0');
  return days > 0
    ? `${days}d ${pad(hours)}h ${pad(minutes)}m ${pad(seconds)}s`
    : `${pad(hours)}h ${pad(minutes)}m ${pad(seconds)}s`;
}

const coursesGrid = document.getElementById('courses-grid');

courses.forEach((course) => {
  const card = document.createElement('div');
  card.className = 'course-card';
  card.innerHTML = `
    <span class="course-badge">${course.badge}</span>
    <h3>${course.name}</h3>
    <p class="course-tagline">${course.tagline}</p>
    <ul class="course-features">
      ${course.features.slice(0, 3).map((f) => `
        <li>
          <svg class="icon" viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg>
          <span>${f}</span>
        </li>
      `).join('')}
    </ul>
    <div class="course-schedule">
      <span>${course.schedule}</span>
      <span>${course.mode.split(' (')[0]}</span>
    </div>
    <div class="course-price-row">
      <span class="course-price-old">${formatPKR(course.priceOriginal)}</span>
      <span class="course-price-new">${formatPKR(course.priceDiscounted)}</span>
      <span class="course-price-off">10% OFF</span>
    </div>
    ${course.installment ? `<p class="course-installment">${course.installment}</p>` : ''}
    <p class="course-countdown" data-countdown-for="${course.id}"></p>
    <button class="btn btn-primary" type="button" data-open-course="${course.id}">
      View Details &amp; Enroll
    </button>
  `;
  coursesGrid.appendChild(card);
});

// ===== Countdown ticking (sticky bar + course cards) =====
const offerCountdownEl = document.getElementById('offer-countdown');
let modalCourseId = null;

function tickCountdowns() {
  const soonest = courses
    .map((c) => ({ id: c.id, ms: new Date(c.offerEndsAt).getTime() - Date.now() }))
    .filter((c) => c.ms > 0)
    .sort((a, b) => a.ms - b.ms)[0];

  if (offerCountdownEl) {
    const soonestCourse = soonest && courses.find((c) => c.id === soonest.id);
    offerCountdownEl.textContent = soonestCourse
      ? `${formatCountdown(soonestCourse.offerEndsAt)} on ${soonestCourse.name}`
      : 'New batches enrolling now';
  }

  courses.forEach((course) => {
    const el = document.querySelector(`[data-countdown-for="${course.id}"]`);
    if (!el) return;
    const remaining = formatCountdown(course.offerEndsAt);
    el.innerHTML = remaining
      ? `Offer ends in <strong>${remaining}</strong>`
      : `<strong>Enrollment open</strong> — message us for the next batch date`;
  });

  if (modalCourseId) updateModalCountdown();
}

tickCountdowns();
setInterval(tickCountdowns, 1000);

// ===== Course modal =====
const courseModal = document.getElementById('course-modal');
const modalClose = document.getElementById('modal-close');
const modalBadge = document.getElementById('modal-badge');
const modalTitle = document.getElementById('modal-title');
const modalTagline = document.getElementById('modal-tagline');
const modalFeatures = document.getElementById('modal-features');
const modalMeta = document.getElementById('modal-meta');
const modalPrice = document.getElementById('modal-price');
const modalCountdownValue = document.getElementById('modal-countdown-value');
const modalWhatsapp = document.getElementById('modal-whatsapp');
const modalInstagram = document.getElementById('modal-instagram');

wireInstagramMessageCopy(modalInstagram, () => modalInstagram.dataset.igMessage);

function updateModalCountdown() {
  const course = courses.find((c) => c.id === modalCourseId);
  if (!course) return;
  const remaining = formatCountdown(course.offerEndsAt);
  modalCountdownValue.textContent = remaining || 'Enrollment open now';
}

function openCourseModal(courseId) {
  const course = courses.find((c) => c.id === courseId);
  if (!course) return;
  modalCourseId = courseId;

  modalBadge.textContent = course.badge;
  modalTitle.textContent = course.name;
  modalTagline.textContent = course.tagline;

  modalFeatures.innerHTML = course.features.map((f) => `
    <li>
      <svg class="icon" viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg>
      <span>${f}</span>
    </li>
  `).join('');

  modalMeta.innerHTML = `
    <div><dt>Schedule</dt><dd>${course.schedule}</dd></div>
    <div><dt>Mode</dt><dd>${course.mode}</dd></div>
    <div><dt>Duration</dt><dd>${course.duration}</dd></div>
    <div><dt>Starts</dt><dd>${course.startDate}</dd></div>
  `;

  modalPrice.innerHTML = `
    <span class="course-price-old">${formatPKR(course.priceOriginal)}</span>
    <span class="course-price-new">${formatPKR(course.priceDiscounted)}</span>
    <span class="course-price-off">10% OFF</span>
  `;

  const existingInstallment = document.getElementById('modal-installment');
  if (existingInstallment) existingInstallment.remove();
  if (course.installment) {
    const installmentEl = document.createElement('p');
    installmentEl.id = 'modal-installment';
    installmentEl.className = 'course-installment';
    installmentEl.textContent = course.installment;
    modalPrice.insertAdjacentElement('afterend', installmentEl);
  }

  updateModalCountdown();

  const message = `Hi! I'd like to enroll in the ${course.name} (${course.schedule}). Please share the next steps and payment details.`;
  modalWhatsapp.href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
  modalInstagram.href = `https://ig.me/m/${INSTAGRAM_HANDLE}`;
  modalInstagram.dataset.igMessage = message;

  courseModal.hidden = false;
  document.body.style.overflow = 'hidden';
  modalClose.focus();
}

function closeCourseModal() {
  courseModal.hidden = true;
  modalCourseId = null;
  document.body.style.overflow = '';
}

coursesGrid.addEventListener('click', (event) => {
  const trigger = event.target.closest('[data-open-course]');
  if (!trigger) return;
  openCourseModal(trigger.getAttribute('data-open-course'));
});

modalClose.addEventListener('click', closeCourseModal);
courseModal.addEventListener('click', (event) => {
  if (event.target === courseModal) closeCourseModal();
});
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && !courseModal.hidden) closeCourseModal();
});
