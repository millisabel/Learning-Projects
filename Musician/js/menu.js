function Navigation(width){
    this.widthMax = width;
    this.nav = document.querySelector(".nav");
    this.menu = document.querySelector(".menu");
    this.button = createButton(this.nav);

    this.nav.classList.add("js-nav");
}

function windowResize(){
    let self = this;
    if(document.body.offsetWidth <= self.widthMax){
        if(!self.nav.classList.contains("js-nav")){
            self.nav.classList.add("js-nav");
        }
        if(!self.menu.classList.contains("js-menu--close")){
            self.menu.classList.add("js-menu--close");
        }
    }
    else{
        if(self.nav.classList.contains("js-nav")){
            self.nav.classList.remove("js-nav");
        }
        if(self.menu.classList.contains("js-menu--close")){
            self.menu.classList.remove("js-menu--close");
        }
    }
}

function createButton(parent){
    let button = document.createElement("button");
    button.classList.add("js-menu__button");
    button.setAttribute("aria-label", "main navigation");
    parent.appendChild(button);
    let span = document.createElement("span");
    button.appendChild(span);
    return button;
}

function toggleMenu(menu, button){
    menu.classList.toggle("js-menu--close");
    button.classList.toggle("js-menu__button--close");
}

window.addEventListener("load", function(){
    let navigation = new Navigation(1300);
    windowResize.call(navigation);
    navigation.button.addEventListener("click", function(){
        toggleMenu(navigation.menu, navigation.button);
    });
    this.onresize = windowResize.bind(navigation);
});