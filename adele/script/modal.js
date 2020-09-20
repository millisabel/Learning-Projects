function modal(){
    let modalOrderNow = document.querySelector(".modal__orderNow");
    let button = document.querySelectorAll("button");
    addListener(button);

    function addListener(button){
        for(let i = 0; i < button.length; i++){
            // to work in ie11
            let index = i;
            //
            if(button[index].classList.contains("orderNow__button")){
                button[index].addEventListener("click", function(){
                    showModal(modalOrderNow);
                })
            }
            if(button[index].classList.contains("button__close")){
                button[index].addEventListener("click", function(){
                    hiddenModal(button[index].parentElement.parentElement);
                })
            }
        }
    }

}

function showModal(modal) {
    modal.classList.add("modal--open");
}

function hiddenModal(modal) {
    modal.classList.remove("modal--open");
}

modal();