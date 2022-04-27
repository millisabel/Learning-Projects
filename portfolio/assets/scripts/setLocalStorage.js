function setLocalStorage() {
    const lang = document.documentElement.lang;
    const theme = document.body.classList.contains('light') ? 'light' : 'dark';
    localStorage.setItem('lang', lang);
    localStorage.setItem('theme', theme);
}

export default setLocalStorage;