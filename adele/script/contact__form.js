
let form = new Form("contact__form", "input", "textarea", "js-form");
let form2 = new Form("email", "input", null, "js-form");
let form3 = new Form("modal__form", "input", null, "js-form");

function Form(classForm, teg, textarea, newClass){
    this.form = document.querySelector("." + classForm);
    this.inputs = this.form.querySelectorAll(teg);
    this.textarea = findElem(textarea, this.form);
    addNewClass(this.form, newClass);
    addElem(this.inputs, "span");
    addListener(this.inputs, "js-input");
    addListener(this.textarea, "js-textarea");
}

function findElem(teg, parent){
    let elem = parent.querySelector(teg);
    if(elem !== null || elem !== undefined ){
        return elem;
    }
}

function addNewClass(elem, newClass){
    if(!elem.classList.contains(newClass)){
        elem.classList.add(newClass);
    }
}

function addElem(input, newTeg){
    for(let i = 0; i < input.length; i++){
        if(input[i].parentElement.childElementCount === 1){
            createElem(newTeg,input[i].parentElement, input[i].placeholder);
            if(input[i].placeholder !== ""){
                input[i].placeholder = "";
            }
        }
    }
}

function addListener(input, newClass){
    if(!input){
        return;
    }
    if(!input.length){
        input.addEventListener("keyup", function(){
            if(input.value !== ""){
                input.classList.add(newClass);
            }
            else{
                input.classList.remove(newClass);
            }
        })
    }
    else{
        for(let i = 0; i < input.length; i++){
            input[i].addEventListener("keyup", function(){
                if(input[i].value !== ""){
                    input[i].classList.add(newClass);
                }
                else{
                    input[i].classList.remove(newClass);
                }
            })

        }
    }
}

function createElem(teg, label, text){
    let elem = document.createElement(teg);
    elem.innerText = text;
    label.appendChild(elem);
}