(() => {
  const system = matchMedia('(prefers-color-scheme: dark)');
  const root = document.documentElement;
  let choice;
  try { choice = localStorage.getItem('revive.theme'); } catch {}
  function apply() {
    const theme = ['light', 'dark'].includes(choice) ? choice : system.matches ? 'dark' : 'light';
    root.dataset.theme = theme;
    document.querySelectorAll('[data-choice]').forEach(button => {
      button.setAttribute('aria-pressed', String(button.dataset.choice === theme));
    });
  }
  apply();
  system.addEventListener('change', apply);
  document.addEventListener('DOMContentLoaded', () => {
    apply();
    document.querySelectorAll('[data-choice]').forEach(button => {
      button.addEventListener('click', () => {
        choice = button.dataset.choice;
        try { localStorage.setItem('revive.theme', choice); } catch {}
        apply();
      });
    });
  });
})();