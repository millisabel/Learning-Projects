import i18Obj from "./translate.js";

function setTranslate(lang){
    const text = document.querySelectorAll('[data-i18]');
    
    document.documentElement.setAttribute('lang', lang);
    
    text.forEach((item)=>{
        if (item.placeholder) {
            item.placeholder = i18Obj[lang][item.dataset.i18]
            item.textContent = '';
        }
        else{
            item.innerText = i18Obj[lang][item.dataset.i18];
        }
    });
}

export default setTranslate;