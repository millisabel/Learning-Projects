import setTranslate from "./setTranslate.js";

function getLocalStorage() {
    const inputsSwitch = document.querySelectorAll('input[name="switch-lang"]');

    if(localStorage.getItem('lang')) {
        const lang = localStorage.getItem('lang');
        setTranslate(lang);
        inputsSwitch.forEach(item => {
            item.checked = item.id === lang && !item.checked;
        })
    }
    if(localStorage.getItem('theme')) {
        const theme = localStorage.getItem('theme');
        document.body.classList.add(theme);
    }
}

export default getLocalStorage;