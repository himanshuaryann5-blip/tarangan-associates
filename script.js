/* Tarangan Associates website interactions. Calculator rates are illustrative only. */
const BUSINESS_PHONE = '919860773107';
const CALCULATOR_RATES = {
  property: { flat: 1, bungalow: 1.12, commercial: 1.18 },
  tier: {
    essential: { low: 300, high: 450 },
    premium: { low: 450, high: 650 },
    luxury: { low: 700, high: 1100 }
  },
  scope: { design: 0.22, drawings: 0.3, selected: 0.62, full: 1, turnkey: 1.32 },
  rooms: { living: 0.08, bedroom: 0.1, kitchen: 0.16, bathroom: 0.1, wardrobe: 0.08, ceiling: 0.07, furniture: 0.12, painting: 0.05 }
};
const formatINR = n => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(Math.round(n));
const modal = document.querySelector('#consult-modal');
const modalClose = document.querySelector('.modal-close');
let lastFocused = null;
function openModal(service = '') {
  lastFocused = document.activeElement;
  modal.classList.add('open'); modal.setAttribute('aria-hidden', 'false'); document.body.classList.add('modal-open');
  if (service) document.querySelector('#category').value = service.toLowerCase().includes('interior') ? 'Interior Design' : service.toLowerCase().includes('construction') ? 'Civil Construction' : service.toLowerCase().includes('exterior') ? 'Exterior Design' : service.toLowerCase().includes('engineering') ? 'Structural Engineering' : service.toLowerCase().includes('turnkey') ? 'Turnkey Project' : service.toLowerCase().includes('architecture') ? 'Architecture' : '';
  setTimeout(() => document.querySelector('#full-name').focus(), 80);
}
function closeModal() { modal.classList.remove('open'); modal.setAttribute('aria-hidden', 'true'); document.body.classList.remove('modal-open'); if (lastFocused && lastFocused.focus) lastFocused.focus(); }
document.querySelectorAll('[data-consult]').forEach(el => el.addEventListener('click', e => { e.preventDefault(); openModal(); }));
document.querySelectorAll('[data-service]').forEach(el => el.addEventListener('click', e => { e.preventDefault(); openModal(el.dataset.service); }));
modalClose.addEventListener('click', closeModal);
modal.addEventListener('click', e => { if (e.target === modal) closeModal(); });
document.addEventListener('keydown', e => { if (e.key === 'Escape' && modal.classList.contains('open')) closeModal(); if (e.key === 'Tab' && modal.classList.contains('open')) { const focusable = [...modal.querySelectorAll('button,a,input,select,textarea,[tabindex]:not([tabindex="-1"])')].filter(x => !x.disabled); const first = focusable[0], last = focusable[focusable.length - 1]; if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); } else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); } } });
const menuToggle = document.querySelector('.menu-toggle'); const nav = document.querySelector('.nav');
function setNavigationOpen(open) {
  nav.classList.toggle('open', open);
  menuToggle.setAttribute('aria-expanded', String(open));
  menuToggle.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
  menuToggle.querySelector('span').textContent = open ? '×' : '☰';
}
menuToggle.addEventListener('click', () => setNavigationOpen(!nav.classList.contains('open')));
nav.querySelectorAll('.nav-drop > a').forEach(a => a.addEventListener('click', e => {
  const drop = a.closest('.nav-drop');
  if (window.matchMedia('(max-width: 1160px)').matches && !drop.classList.contains('open')) {
    e.preventDefault();
    nav.querySelectorAll('.nav-drop.open').forEach(item => {
      item.classList.remove('open');
      item.querySelector(':scope > a').setAttribute('aria-expanded', 'false');
    });
    drop.classList.add('open');
    a.setAttribute('aria-expanded', 'true');
    return;
  }
  setNavigationOpen(false);
  nav.querySelectorAll('.nav-drop.open').forEach(item => {
    item.classList.remove('open');
    item.querySelector(':scope > a').setAttribute('aria-expanded', 'false');
  });
}));
nav.querySelectorAll('.nav-drop').forEach(drop => {
  const trigger = drop.querySelector(':scope > a');
  drop.addEventListener('mouseenter', () => {
    if (!window.matchMedia('(max-width: 1160px)').matches) trigger.setAttribute('aria-expanded', 'true');
  });
  drop.addEventListener('mouseleave', () => {
    if (!drop.contains(document.activeElement)) trigger.setAttribute('aria-expanded', 'false');
  });
  drop.addEventListener('focusout', e => {
    if (!drop.contains(e.relatedTarget)) {
      trigger.setAttribute('aria-expanded', 'false');
      drop.classList.remove('open');
    }
  });
});
nav.querySelectorAll('.nav-left > a, .dropdown a, .nav-right > a').forEach(a => a.addEventListener('click', () => setNavigationOpen(false)));
nav.querySelector('[data-consult]').addEventListener('click', () => setNavigationOpen(false));
document.addEventListener('keydown', e => {
  if (e.key === 'Escape' && nav.classList.contains('open')) {
    setNavigationOpen(false);
    menuToggle.focus();
  }
});
document.querySelectorAll('[data-prev]').forEach(btn => btn.addEventListener('click', () => { const track = document.getElementById(btn.dataset.prev); track.scrollBy({ left: -track.clientWidth * .8, behavior: 'smooth' }); }));
document.querySelectorAll('[data-next]').forEach(btn => btn.addEventListener('click', () => { const track = document.getElementById(btn.dataset.next); track.scrollBy({ left: track.clientWidth * .8, behavior: 'smooth' }); }));
const revealEls = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) { const observer = new IntersectionObserver(entries => entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add('visible'); observer.unobserve(entry.target); } }), { threshold: .08 }); revealEls.forEach(el => observer.observe(el)); } else revealEls.forEach(el => el.classList.add('visible'));
const heroVideo = document.querySelector('.hero-video');
if (heroVideo) {
  const reduceHeroMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const syncHeroVideo = () => {
    if (reduceHeroMotion.matches) { heroVideo.pause(); return; }
    heroVideo.play().catch(() => heroVideo.classList.add('is-unavailable'));
  };
  heroVideo.addEventListener('error', () => heroVideo.classList.add('is-unavailable'));
  syncHeroVideo();
  reduceHeroMotion.addEventListener('change', syncHeroVideo);
}
const form = document.querySelector('#estimate-form');
const propertyType = document.querySelector('#property-type'); const areaInput = document.querySelector('#area'); const tierInput = document.querySelector('#tier'); const scopeInput = document.querySelector('#scope');
const scopeLabels = { design: 'Design consultation', drawings: '2D / 3D design', selected: 'Selected-room interiors', full: 'Full-home interiors', turnkey: 'Turnkey execution' };
function updateEstimate() {
  const area = Math.max(100, Math.min(50000, Number(areaInput.value) || 100));
  if (Number(areaInput.value) !== area) areaInput.value = area;
  const property = propertyType.value; const tier = tierInput.value; const scope = scopeInput.value;
  const rooms = [...form.querySelectorAll('input[name="room"]:checked')].map(el => el.value);
  const selectedFactor = rooms.length ? Math.min(1.5, Math.max(.35, rooms.reduce((sum, key) => sum + CALCULATOR_RATES.rooms[key], .35))) : .35;
  const scopeFactor = CALCULATOR_RATES.scope[scope]; const propertyFactor = CALCULATOR_RATES.property[property]; const rates = CALCULATOR_RATES.tier[tier];
  let low = area * rates.low * scopeFactor * propertyFactor * selectedFactor;
  let high = area * rates.high * scopeFactor * propertyFactor * selectedFactor;
  // The rate model is a demonstration tool, not an official quotation or supplier price list.
  document.querySelector('#estimate-value').textContent = `${formatINR(low)} – ${formatINR(high)}`;
  document.querySelector('#estimate-sub').textContent = `For ${area.toLocaleString('en-IN')} sq. ft. · ${tier.charAt(0).toUpperCase() + tier.slice(1)} finishes`;
  document.querySelector('#estimate-rate').textContent = `${formatINR(rates.low * scopeFactor * propertyFactor * selectedFactor)}–${formatINR(rates.high * scopeFactor * propertyFactor * selectedFactor)} / sq. ft.`;
  document.querySelector('#estimate-rooms').textContent = `${rooms.length} ${rooms.length === 1 ? 'space' : 'spaces'}`;
  document.querySelector('#estimate-scope').textContent = scopeLabels[scope];
  const summary = `Hello Tarangan Associates, I'd like to discuss an interior project.\nArea: ${area} sq. ft.\nProperty: ${propertyType.options[propertyType.selectedIndex].text}\nFinish: ${tier}\nSpaces: ${rooms.length ? rooms.join(', ') : 'Not selected'}\nScope: ${scopeLabels[scope]}\nIndicative demonstration estimate: ${formatINR(low)}–${formatINR(high)}. I understand this is not an official quotation. Please help me discuss the actual requirements.`;
  document.querySelector('#estimate-whatsapp').href = `https://wa.me/${BUSINESS_PHONE}?text=${encodeURIComponent(summary)}`;
  document.querySelector('#estimate-enquire').onclick = () => { openModal('Interior Design'); document.querySelector('#description').value = `Calculator estimate: ${formatINR(low)}–${formatINR(high)} (demonstration only). Area: ${area} sq. ft.; finish: ${tier}; spaces: ${rooms.join(', ') || 'not selected'}; scope: ${scopeLabels[scope]}.`; };
}
form.addEventListener('input', updateEstimate); form.addEventListener('change', updateEstimate); form.addEventListener('reset', () => setTimeout(updateEstimate, 0)); updateEstimate();
const consultationForm = document.querySelector('#consult-form');
consultationForm.addEventListener('submit', e => {
  e.preventDefault(); const error = document.querySelector('#form-error'); error.textContent = '';
  if (!consultationForm.reportValidity()) { error.textContent = 'Please check the required fields and try again.'; return; }
  const data = new FormData(consultationForm); const phone = String(data.get('phone') || '').trim();
  if (phone.replace(/\D/g, '').length < 8) { error.textContent = 'Please enter a valid phone number.'; document.querySelector('#phone').focus(); return; }
  const lines = [
    'Hello Tarangan Associates, I would like to discuss a project.',
    `Name: ${data.get('name')}`,
    `Phone: ${phone}`,
    `Project category: ${data.get('category')}`,
    `Project location: ${data.get('location')}`,
    data.get('area') ? `Approximate area: ${data.get('area')}` : '',
    data.get('budget') ? `Estimated budget: ${data.get('budget')}` : '',
    data.get('description') ? `Project details: ${data.get('description')}` : ''
  ].filter(Boolean).join('\n');
  const url = `https://wa.me/${BUSINESS_PHONE}?text=${encodeURIComponent(lines)}`;
  window.open(url, '_blank', 'noopener,noreferrer');
  error.textContent = 'WhatsApp opened with your enquiry for review. Please press Send in WhatsApp to submit it.';
});
// Set dynamic year only when it differs from the authored footer year.
const currentYear = new Date().getFullYear();
const copyright = document.querySelector('.footer-bottom > span');
if (copyright && currentYear > 2026) copyright.textContent = `© ${currentYear} Tarangan Associates. All rights reserved.`;
