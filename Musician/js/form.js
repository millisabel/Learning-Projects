let form = new Form("form", "input",  "js-form");


function Form(classForm, teg, newClass){
    this.form = document.querySelector("." + classForm);
    this.inputs = this.form.querySelectorAll(teg);
    addNewClass(this.form, newClass);
    addListener(this.inputs, "js-input");
}

function addNewClass(elem, newClass){
    if(!elem.classList.contains(newClass)){
        elem.classList.add(newClass);
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