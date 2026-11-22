// Public portfolio contact form: only insert messages; never read private submissions.
document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('.contact-form');
  if (!form) return;
  const button = form.querySelector('button[type="submit"]');
  if (!button) return;
  const originalLabel = button.textContent;
  const feedback = document.createElement('p');
  feedback.setAttribute('role', 'status');
  feedback.setAttribute('aria-live', 'polite');
  feedback.style.marginTop = '12px';
  form.appendChild(feedback);

  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    if (button.disabled) return;
    feedback.textContent = '';

    const name = form.querySelector('[name="name"]').value.trim();
    const email = form.querySelector('[name="email"]').value.trim();
    const subject = form.querySelector('[name="subject"]').value.trim();
    const message = form.querySelector('[name="message"]').value.trim();
    if (!name || !email || !message || !form.checkValidity()) {
      feedback.style.color = '#b91c1c';
      feedback.textContent = 'Please enter your name, email, and message.';
      form.reportValidity();
      return;
    }
    if (name.length > 120 || email.length > 254 || subject.length > 300 || message.length > 10000) {
      feedback.style.color = '#b91c1c';
      feedback.textContent = 'Please shorten your message or contact details and try again.';
      return;
    }

    button.disabled = true;
    button.textContent = 'Sending…';
    try {
      const client = await window.supabasePromise;
      if (!client) {
        feedback.style.color = '#b91c1c';
        feedback.textContent = 'The contact form is temporarily unavailable. Please try again later.';
        return;
      }
      // No .select(): anonymous visitors must never be able to read stored submissions.
      const { error } = await client.from('contact_submissions').insert({
        name, email, subject: subject || null, message
      });
      if (error) throw error;
      form.reset();
      feedback.style.color = '#166534';
      feedback.textContent = 'Thanks! Your message has been received.';
    } catch (error) {
      console.error('Contact submission failed', error);
      feedback.style.color = '#b91c1c';
      feedback.textContent = 'Message could not be sent. Please try again later.';
    } finally {
      button.disabled = false;
      button.textContent = originalLabel;
    }
  });
});
