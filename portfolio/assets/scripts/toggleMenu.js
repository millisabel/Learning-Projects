function toggleMenu(selectorNav, selectorBtnHeader, selectorBtn) {
    const nav = document.querySelector(selectorNav);
    const btnHeader = document.querySelector(selectorBtnHeader);
    const btnNav = document.querySelector(selectorBtn);
    const main = document.querySelector('main');

    function toggleClassMenu(menu) {
        menu.classList.toggle('open');
        btnHeader.classList.toggle('close');


        if (nav.classList.contains('open')) {
            main.style.opacity = '0.5';
        } else {
            main.style.opacity = '1';
        }
    }

    if (btnNav) {
        btnNav.addEventListener('click', () => {
            toggleClassMenu(nav);
        })
    }

    if (btnHeader) {
        btnHeader.addEventListener('click', () => {
            toggleClassMenu(nav);
        })
    }

    nav.addEventListener('click', (e) => {
        if (!nav.classList.contains('open')) {
            return;
        }
        if (e.target.classList.contains('nav__link')) {
            toggleClassMenu(nav, btnNav);
        }
    })
}

export default toggleMenu;