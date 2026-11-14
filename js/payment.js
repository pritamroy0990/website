(() => {
  const form = document.getElementById('payment-form');
  if (!form) return;
  const button = document.getElementById('pay-button');
  const status = document.getElementById('payment-status');
  const params = new URLSearchParams(location.search);
  if (params.get('payment') === 'success') {
    status.hidden = false; status.textContent = 'Thank you. Stripe reports that your checkout was completed. Please keep your Stripe receipt for your records.';
  } else if (params.get('payment') === 'cancelled') {
    status.hidden = false; status.textContent = 'Your checkout was cancelled. No payment was completed.';
  }
  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    if (!form.reportValidity()) return;
    const data = new FormData(form);
    const amount = Number(data.get('amount'));
    if (!Number.isFinite(amount) || amount < 1 || amount > 100000) {
      status.hidden = false; status.textContent = 'Enter an amount between $1.00 and $100,000.00.'; return;
    }
    button.disabled = true; button.textContent = 'Connecting securely…'; status.hidden = true;
    try {
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST', headers: {'Content-Type':'application/json'},
        body: JSON.stringify({name:data.get('name'), email:data.get('email'), amount:Math.round(amount*100), reference:data.get('reference'), description:data.get('description')})
      });
      const result = await response.json();
      if (!response.ok || !result.url) throw new Error(result.error || 'Unable to start checkout. Please try again or contact us.');
      location.assign(result.url);
    } catch (error) {
      status.hidden = false; status.textContent = error.message;
      button.disabled = false; button.innerHTML = 'Continue to secure payment <span>↗</span>';
    }
  });
})();
