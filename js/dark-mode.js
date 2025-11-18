// dark-mode disabled: remove any existing dark-theme and clear stored pref
(function(){
  try {
    // remove class if present
    document.documentElement.classList.remove('dark-theme');
    // clear stored preference (if set by previous version)
    try { localStorage.removeItem('darkTheme'); } catch(e) {}
  } catch(e) {
    // noop
  }
})();