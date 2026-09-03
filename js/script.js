// ===== Anchor-link scroll offset =====
// The header is sticky and its height changes (the offer bar can wrap to
// two lines on narrow screens), so keep the scroll offset in sync instead
// of hardcoding it — otherwise section headings land hidden underneath it.
function updateScrollOffset() {
  const header = document.querySelector('.site-header');
  if (header) {
    document.documentElement.style.scrollPaddingTop = `${header.offsetHeight + 16}px`;
  }
}
updateScrollOffset();
window.addEventListener('resize', updateScrollOffset);
window.addEventListener('load', updateScrollOffset);

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

// ===== Floating chat button =====
const fabWrap = document.getElementById('fab-wrap');
const fabToggle = document.getElementById('fab-toggle');
const fabIconOpen = document.getElementById('fab-icon-open');
const fabIconClose = document.getElementById('fab-icon-close');
const fabStepChannel = document.getElementById('fab-step-channel');
const fabStepCourse = document.getElementById('fab-step-course');
const fabBackBtn = document.getElementById('fab-back-btn');
const fabCourseList = document.getElementById('fab-course-list');
let fabChannel = null;

function resetFabSteps() {
  fabChannel = null;
  fabStepChannel.hidden = false;
  fabStepCourse.hidden = true;
}

function setFabOpen(open) {
  fabWrap.classList.toggle('open', open);
  fabToggle.setAttribute('aria-expanded', String(open));
  fabIconOpen.hidden = open;
  fabIconClose.hidden = !open;
  if (!open) resetFabSteps();
}

fabToggle.addEventListener('click', () => {
  setFabOpen(!fabWrap.classList.contains('open'));
});

document.addEventListener('click', (event) => {
  if (fabWrap.classList.contains('open') && !fabWrap.contains(event.target)) {
    setFabOpen(false);
  }
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && fabWrap.classList.contains('open')) setFabOpen(false);
});

fabBackBtn.addEventListener('click', resetFabSteps);

document.querySelectorAll('#fab-step-channel [data-channel]').forEach((btn) => {
  btn.addEventListener('click', () => {
    fabChannel = btn.dataset.channel;
    wireFabCourseLinks(fabChannel);
    fabStepChannel.hidden = true;
    fabStepCourse.hidden = false;
  });
});

fabCourseList.addEventListener('click', (event) => {
  const trigger = event.target.closest('a[data-course-id]');
  if (!trigger) return;
  if (fabChannel === 'instagram') {
    const message = trigger.dataset.igMessage;
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(message)
        .then(() => showToast('Message copied! Paste it into the Instagram chat that just opened.'))
        .catch(() => showToast(`Send us: "${message}"`));
    } else {
      showToast(`Send us: "${message}"`);
    }
  }
  setFabOpen(false);
});

// ===== Shared course-related state =====
// Populated by loadCourses() below, from content/courses.json — the file
// the /admin content panel edits. Everything that needs course data reads
// from this array rather than a hardcoded list.
const WHATSAPP_NUMBER = '923015095042';
const INSTAGRAM_HANDLE = 'english.with.mahmood.sarwar';
let courses = [];

function slugify(str) {
  return String(str)
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

function formatPKR(amount) {
  return `Rs. ${Number(amount).toLocaleString('en-PK')}`;
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

function wireFabCourseLinks(channel) {
  fabCourseList.querySelectorAll('a[data-course-id]').forEach((link) => {
    const course = courses.find((c) => c.id === link.dataset.courseId);
    const message = course
      ? `Hi! I'd like to know more about the ${course.name} (${course.schedule}). Could you share the schedule, pricing, and enrollment details?`
      : FOOTER_IG_MESSAGE;
    if (channel === 'whatsapp') {
      link.href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    } else {
      link.href = `https://ig.me/m/${INSTAGRAM_HANDLE}`;
      link.dataset.igMessage = message;
    }
  });
}

const coursesGrid = document.getElementById('courses-grid');
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

// ===== Content loaders =====
// Each section's content lives in content/*.json — the files the /admin
// panel edits. A load failure leaves that section as it shipped rather
// than breaking the rest of the page.

async function loadCourses() {
  try {
    const res = await fetch('content/courses.json', { cache: 'no-cache' });
    const data = await res.json();
    courses = (data.courses || []).map((c) => ({ ...c, id: slugify(c.name) }));
  } catch (err) {
    console.error('Could not load content/courses.json', err);
    return;
  }

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

  fabCourseList.innerHTML = courses
    .map((c) => `<a class="fab-course-item" href="#" target="_blank" rel="noopener" data-course-id="${c.id}">${c.name}</a>`)
    .join('') + `<a class="fab-course-item fab-course-item-general" href="#" target="_blank" rel="noopener" data-course-id="general">Something else</a>`;

  tickCountdowns();
  setInterval(tickCountdowns, 1000);
}

async function loadTestimonials() {
  const grid = document.getElementById('reviews-grid');
  if (!grid) return;
  try {
    const res = await fetch('content/testimonials.json', { cache: 'no-cache' });
    const data = await res.json();
    const testimonials = data.testimonials || [];
    const starSvg = '<svg class="icon" viewBox="0 0 24 24" style="width:1em;height:1em;stroke:none;fill:currentColor"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26"/></svg>';
    grid.innerHTML = testimonials.map((t) => {
      const letters = (t.handle || '').replace(/^[^a-zA-Z]+/, '');
      const initial = (letters.charAt(0) || '?').toUpperCase();
      return `
        <div class="review-card">
          <div class="stars">${starSvg.repeat(5)}</div>
          <p>"${t.quote}"</p>
          <div class="review-author">
            <span class="avatar-initial">${initial}</span>
            <div><strong>${t.handle}</strong><span>${t.label}</span></div>
          </div>
        </div>
      `;
    }).join('');
  } catch (err) {
    console.error('Could not load content/testimonials.json', err);
  }
}

async function loadStats() {
  const grid = document.getElementById('stats-grid');
  if (!grid) return;
  try {
    const res = await fetch('content/stats.json', { cache: 'no-cache' });
    const data = await res.json();
    const stats = data.stats || [];
    grid.innerHTML = stats.map((s) => `
      <div class="stat-card">
        <strong>${s.number}</strong>
        <span>${s.label}</span>
      </div>
    `).join('');
  } catch (err) {
    console.error('Could not load content/stats.json', err);
  }
}

async function loadAbout() {
  const p1 = document.getElementById('about-paragraph-1');
  const p2 = document.getElementById('about-paragraph-2');
  if (!p1 || !p2) return;
  try {
    const res = await fetch('content/about.json', { cache: 'no-cache' });
    const data = await res.json();
    p1.textContent = data.paragraph1 || '';
    p2.textContent = data.paragraph2 || '';
  } catch (err) {
    console.error('Could not load content/about.json', err);
  }
}

loadCourses();
loadTestimonials();
loadStats();
loadAbout();
