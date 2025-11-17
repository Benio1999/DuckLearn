(function(){
  const KEY = 'darkTheme';
  function applyTheme(isDark){
    document.documentElement.classList.toggle('dark-theme', !!isDark);
    updateToggleIcon(!!isDark);
  }

  function updateToggleIcon(isDark){
    const btn = document.getElementById('dark-mode-toggle');
    if(!btn) return;
    btn.textContent = isDark ? '☾' : '☼';
    btn.title = isDark ? 'Tema escuro (clicar para desativar)' : 'Ativar tema escuro';
  }

  function toggleTheme(){
    const isDark = document.documentElement.classList.toggle('dark-theme');
    localStorage.setItem(KEY, isDark ? '1' : '0');
    updateToggleIcon(isDark);
  }

  function createToggle(){
    if(document.getElementById('dark-mode-toggle')) return;
    const style = document.createElement('style');
    style.textContent = `#dark-mode-toggle{position:fixed;top:18px;right:18px;z-index:2200;width:44px;height:44px;border-radius:10px;border:none;background:rgba(0,0,0,0.06);color:#222;font-size:20px;display:flex;align-items:center;justify-content:center;cursor:pointer;backdrop-filter: blur(4px);transition:transform .12s ease,background .12s ease}#dark-mode-toggle:hover{transform:translateY(-3px)}.dark-theme #dark-mode-toggle{background:rgba(255,255,255,0.06);color:#fff}`;
    document.head.appendChild(style);

    const btn = document.createElement('button');
    btn.id = 'dark-mode-toggle';
    btn.setAttribute('aria-label','Alternar tema escuro');
    btn.addEventListener('click', toggleTheme);
    document.body.appendChild(btn);
  }

  function init(){
    const stored = localStorage.getItem(KEY);
    const isDark = stored === '1';
    applyTheme(isDark);
    // wait for body then create toggle
    if(document.readyState === 'loading'){
      window.addEventListener('DOMContentLoaded', createToggle);
    } else {
      createToggle();
    }
  }

  // expose helper for console
  window.toggleDarkTheme = toggleTheme;
  window.applyDarkTheme = applyTheme;

  init();
})();