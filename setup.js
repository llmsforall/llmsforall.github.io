
const tabs = [...document.querySelectorAll('[role="tab"]')];
function selectPlatform(platform) {
  tabs.forEach(tab => {
    const active = tab.dataset.platform === platform;
    tab.setAttribute('aria-selected', String(active));
    tab.tabIndex = active ? 0 : -1;
    document.getElementById(tab.getAttribute('aria-controls')).hidden = !active;
  });
}
document.querySelectorAll('[data-platform]').forEach(control => control.addEventListener('click', () => selectPlatform(control.dataset.platform)));
tabs.forEach((tab, index) => tab.addEventListener('keydown', event => {
  let target;
  if(event.key === 'ArrowRight' || event.key === 'ArrowLeft') target = tabs[1-index];
  if(event.key === 'Home') target = tabs[0];
  if(event.key === 'End') target = tabs[tabs.length-1];
  if(target) { event.preventDefault(); selectPlatform(target.dataset.platform); target.focus(); }
}));
document.querySelectorAll('.copy-command').forEach(button => button.addEventListener('click', async () => {
  try {
    await navigator.clipboard.writeText(button.parentElement.querySelector('code').textContent);
    button.textContent = 'Copied';
    document.getElementById('copy-status').textContent = 'Command copied.';
    setTimeout(() => { button.textContent = 'Copy'; }, 1800);
  } catch {
    document.getElementById('copy-status').textContent = 'Could not copy. Select the command and copy it manually.';
  }
}));
