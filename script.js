'use strict';
const personal = window.PERSONAL || {};
document.querySelectorAll('[data-copy]').forEach(el => {
  const value = personal[el.dataset.copy];
  if (typeof value === 'string' && value.trim()) el.textContent = value;
});
const messages = {
  yes: { title: 'The beginning of something lovely.', body: 'You’ve just made me smile more than you know. I’m looking forward to us.', reply: 'Yes, I’d love to be your girlfriend. Let’s take that next step together.' },
  time: { title: 'Take the time you need.', body: 'You don’t have to have an answer today. Thank you for hearing me out.', reply: 'Your letter means a lot. I need a little time to think about this.' }
};
const dateMessages = {
  yes: { title: 'It’s a date.', body: 'Now let’s find a time that works for both of us.', reply: 'I’d love to go on a date with you. Let’s sort out the details.' }
};
function celebrate() {
  const stage = document.querySelector('.celebration'); stage.replaceChildren();
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  for (let i = 0; i < 24; i++) {
    const petal = document.createElement('span'); petal.className = 'petal';
    petal.style.setProperty('--x', `${(Math.random() - .5) * 1000}px`);
    petal.style.setProperty('--y', `${(Math.random() - .7) * 700}px`);
    petal.style.setProperty('--r', `${Math.random() * 540}deg`);
    petal.style.animationDelay = `${Math.random() * .3}s`; stage.append(petal);
  }
  setTimeout(() => stage.replaceChildren(), 3400);
}
function showResponse(group, panel, message, trigger) {
  panel.querySelector('h3').textContent = message.title;
  panel.querySelector('.response-body').textContent = message.body;
  panel.querySelector('.reply-preview').textContent = `“${message.reply}”`;
  panel.dataset.reply = message.reply;
  const whatsapp = panel.querySelector('.whatsapp-link');
  const configured = typeof personal.whatsappNumber === 'string' && /^\d{8,15}$/.test(personal.whatsappNumber);
  whatsapp.hidden = !configured; panel.querySelector('.copy-reply').hidden = configured;
  if (configured) whatsapp.href = `https://wa.me/${personal.whatsappNumber}?text=${encodeURIComponent(message.reply)}`;
  panel.querySelector('.copy-status').textContent = configured ? 'Your message will open in WhatsApp for you to send.' : 'Copy your reply and send it in our chat.';
  group.querySelectorAll('button').forEach(button => button.setAttribute('aria-expanded', 'false'));
  trigger.setAttribute('aria-expanded', 'true'); group.hidden = true; panel.hidden = false; panel.focus({ preventScroll: true });
  panel.scrollIntoView({ behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth', block: 'nearest' });
  panel.querySelector('.change-answer').onclick = () => { panel.hidden = true; group.hidden = false; trigger.setAttribute('aria-expanded', 'false'); trigger.focus({ preventScroll: true }); };
}
document.querySelectorAll('[data-answer]').forEach(button => button.addEventListener('click', () => {
  showResponse(document.querySelector('.answers'), document.querySelector('#relationship-response'), messages[button.dataset.answer], button);
  if (button.dataset.answer === 'yes') celebrate();
}));
document.querySelectorAll('[data-date]').forEach(button => button.addEventListener('click', () => {
  showResponse(document.querySelector('.date-answers'), document.querySelector('#date-response'), dateMessages[button.dataset.date], button);
}));
document.querySelectorAll('.copy-reply').forEach(button => button.addEventListener('click', async () => {
  const panel = button.closest('.response'); const status = panel.querySelector('.copy-status'); button.disabled = true;
  try { await navigator.clipboard.writeText(panel.dataset.reply); status.textContent = 'Copied. You can paste it into our chat whenever you’re ready.'; }
  catch { const selection = window.getSelection(); const range = document.createRange(); range.selectNodeContents(panel.querySelector('.reply-preview')); selection.removeAllRanges(); selection.addRange(range); status.textContent = 'Your reply is selected. Press and hold, or use Ctrl/Cmd+C, to copy it.'; }
  finally { button.disabled = false; }
}));

