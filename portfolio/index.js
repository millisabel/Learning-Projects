import toggleTheme from './assets/scripts/toggleTheme.js';
import preloadSummerImages from './assets/scripts/preloadSummerImages.js';
import toggleMenu from './assets/scripts/toggleMenu.js';
import changePhoto from './assets/scripts/changePhoto.js';
import getLocalStorage from "./assets/scripts/getLocalStorage.js";
import setLocalStorage from "./assets/scripts/setLocalStorage.js";
import switchLang from "./assets/scripts/switchLang.js";
import myMark from "./assets/scripts/myMark.js";
import player from "./assets/scripts/player/player.js";
import toTop from "./assets/scripts/toTop.js";

window.addEventListener('DOMContentLoaded', () => {
    myMark();
    getLocalStorage();
    preloadSummerImages();
    toggleTheme();
    switchLang();
    toggleMenu('.nav', '.header__btn', '.nav__btn');
    changePhoto('.portfolio__buttons', '.gallery__item img', '.active');
    player();
    toTop('.btn--top');
})

window.addEventListener('beforeunload', setLocalStorage);







