import setTranslate from "./setTranslate.js";

function switchLang(){
    const inputsSwitch = document.querySelectorAll('input[name="switch-lang"]');

    inputsSwitch.forEach((input)=>{
        input.addEventListener('click', ()=>{
            setTranslate(input.id);
            
        })
    });
}


export default switchLang;