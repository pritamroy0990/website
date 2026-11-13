(() => {
  const menuButton = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.primary-nav');
  if (menuButton && nav) {
    menuButton.addEventListener('click', () => {
      const open = menuButton.getAttribute('aria-expanded') === 'true';
      menuButton.setAttribute('aria-expanded', String(!open));
      menuButton.setAttribute('aria-label', open ? 'Open navigation' : 'Close navigation');
      nav.classList.toggle('is-open', !open);
    });
    nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
      menuButton.setAttribute('aria-expanded', 'false');
      menuButton.setAttribute('aria-label', 'Open navigation');
      nav.classList.remove('is-open');
    }));
    document.addEventListener('keydown', e => { if (e.key === 'Escape') { menuButton.setAttribute('aria-expanded','false'); menuButton.setAttribute('aria-label','Open navigation'); nav.classList.remove('is-open'); } });
  }
  document.querySelectorAll('[data-year]').forEach(el => el.textContent = new Date().getFullYear());
  document.querySelectorAll('.faq-question').forEach(button => button.addEventListener('click', () => {
    const expanded = button.getAttribute('aria-expanded') === 'true';
    const answer = document.getElementById(button.getAttribute('aria-controls'));
    button.setAttribute('aria-expanded', String(!expanded));
    const symbol = button.querySelector('[data-faq-symbol]');
    if (symbol) symbol.textContent = expanded ? '+' : '−';
    if (answer) answer.hidden = expanded;
  }));
  const filters = document.querySelectorAll('[data-filter]');
  const galleryItems = document.querySelectorAll('[data-category]');
  filters.forEach(button => button.addEventListener('click', () => {
    const filter = button.dataset.filter;
    filters.forEach(item => item.setAttribute('aria-pressed', String(item === button)));
    let visible = 0;
    galleryItems.forEach(item => { const show = filter === 'all' || item.dataset.category === filter; item.hidden = !show; if (show) visible++; });
    const empty = document.querySelector('[data-gallery-empty]');
    if (empty) empty.hidden = visible > 0;
  }));
  const form = document.querySelector('[data-estimate-form]');
  if (form) {
    const status = form.querySelector('[data-form-status]');
    const submit = form.querySelector('[type="submit"]');
    form.addEventListener('submit', event => {
      event.preventDefault();
      if (!form.reportValidity()) return;
      const data = new FormData(form);
      const values = Object.fromEntries(data.entries());
      const email = (document.body.dataset.businessEmail || '').trim();
      const subject = encodeURIComponent(`Website estimate request — ${values.name || 'New customer'}`);
      const body = encodeURIComponent([
        'New estimate request for Breath Of Kindness Services', '',
        `Name: ${values.name || ''}`, `Email: ${values.email || ''}`, `Phone: ${values.phone || 'Not provided'}`,
        `Service: ${values.service || ''}`, `Project location: ${values.location || 'Not provided'}`,
        `Preferred contact: ${values.contact_method || 'Not specified'}`, `Ideal timing: ${values.timing || 'Not specified'}`, '',
        'Project details:', values.message || '', '', 'Sent from the website estimate form.'
      ].join('\n'));
      const destination = email || values.email;
      if (!destination) {
        if (status) { status.hidden = false; status.className = 'form-status form-status-error'; status.textContent = 'Please enter a valid email address so your request can be prepared.'; }
        return;
      }
      submit.disabled = true;
      submit.textContent = 'Preparing email…';
      const mailto = `mailto:${email || ''}?subject=${subject}&body=${body}`;
      if (status) {
        status.hidden = false;
        status.className = 'form-status';
        status.textContent = email
          ? 'Your email app should open with your estimate request prepared. Please send the email to complete your request.'
          : 'Your request is ready to send. Your email app will open with the details; please address it to the business and send it to complete your request.';
      }
      window.location.href = mailto;
      window.setTimeout(() => { submit.disabled = false; submit.textContent = 'Prepare estimate request'; }, 1800);
    });
  }
  document.querySelectorAll('[data-current-year]').forEach(el => el.textContent = new Date().getFullYear());
})();
