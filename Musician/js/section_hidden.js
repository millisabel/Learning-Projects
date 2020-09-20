let sections = document.querySelectorAll(".page>section");
let sectionsTop = getTopItem(sections);

function getTopItem(sections){
    let height = [];
    for(let i = 0; i < sections.length; i++){
        height[i] = sections[i].offsetTop - document.documentElement.clientHeight;
    }
    return height;
}

function hiddenItem(sections){
    for(let i = 0; i < sections.length; i++){
        sections[i].classList.add("hidden");
    }
}

function showItem(sections, sectionsHeight){
    for(let i = 0; i < sections.length; i++){
        if(
            window.pageYOffset >= sectionsHeight[i]) {
            if(sections[i].classList.contains("hidden")){
                sections[i].classList.remove("hidden");
            }
        }
    }
}

window.addEventListener("load", function(){
    if(!window.pageYOffset){
        hiddenItem(sections);
        window.addEventListener("scroll", function(){
            showItem(sections, sectionsTop);
        });
    }
});


