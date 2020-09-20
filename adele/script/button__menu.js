function createNav(){
    let navigation = document.querySelector(".navigation");
    if(navigation === null){
        return;
    }
    let menu = document.querySelector(".menu");
    if(menu === null){
        return;
    }
    closeMenu(menu, "menu--close");
    closeMenu(menu, "menu--shiftRight");
    let button = document.querySelector(".menu__button");
    if(button === null) {
        button = createButton(navigation, button);
    }
    button.addEventListener("click", toggleMenu.bind(null, button, menu));
    buttonFixed(button);
    window.addEventListener("scroll", buttonFixed.bind(null, button));
}


function closeMenu(item, className){
    if(!item.classList.contains(className)){
        item.classList.add(className);
    }
}

function toggleMenu(button, menu){
    menu.classList.toggle("menu--close");
    button.classList.toggle("menu__button--close");
    document.body.classList.toggle("page-body--close");

}

function createButton(parent, button){
    button = document.createElement("button");
    button.classList.add("menu__button");
    button.setAttribute("aria-label", "main navigation");
    parent.appendChild(button);
    let span = document.createElement("span");
    button.appendChild(span);
    return button;
}

function buttonFixed(button){
    if(window.pageYOffset > 100){
        if(!button.classList.contains("menu__button--fixed")){
            button.classList.add("menu__button--fixed");
        }
    }
    else{
        button.classList.remove("menu__button--fixed");
    }
}


window.addEventListener("load", function(){
    createNav();
});