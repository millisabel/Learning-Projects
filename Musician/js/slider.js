function Slider(section, slid){
    this.section = document.querySelector(section);
    this.slid = document.querySelectorAll(slid);
    this.buttonPrevion =
        createElem(
            "button",
            this.section,
            "previous");
    this.buttonNext =
        createElem(
        "button",
        this.section,
        "next");
    this.paginator =
        createElem(
        "div",
        this.section,
        "paginator");
    this.paginatorItems =
        createPaginator(
        this.slid,
        "button",
        this.paginator,
        "paginator__item");
    this.activeIndex = findActiveSlid(this.slid , "is-active");
}

function createElem(elem, parent, nameClass){
    let button = document.createElement(elem);
    button.classList.add(nameClass);
    parent.appendChild(button);
    return button;
}

function createPaginator(slid, elem, parent, nameClass){
    let paginator = [];
    for (let i = 0; i < slid.length; i++){
        paginator[i] = createElem(elem, parent, nameClass);
    }
    return paginator;
}

function findActiveSlid(arr, findClass){
    for(let i = 0; i < arr.length; i++){
        if(arr[i].classList.contains(findClass)){
            return i;
        }
    }
    return 0;
}

function setActiveElem(arr, activeIndex, classIsActive){
    arr[activeIndex].classList.add(classIsActive);
}

function clickNext(length, activeIndex){
    activeIndex++;
    if(activeIndex >= length){
        activeIndex = 0;
    }
    return activeIndex;
}

function clickPrevious(length, activeIndex){
    activeIndex--;
    if(activeIndex < 0){
        activeIndex = length-1;
    }
    return activeIndex;
}

function clickPaginator(slid, paginatorItems, activeIndex, nextIndex){
    removeAciveItem(slid, paginatorItems, activeIndex);
    addAciveItem(slid, paginatorItems, nextIndex);
    return nextIndex;
}

function checkActive(slid, paginatorItems, activeIndex, func){
    removeAciveItem(slid, paginatorItems, activeIndex);
    activeIndex = func(slid.length, activeIndex);
    addAciveItem(slid, paginatorItems, activeIndex);
    return activeIndex;
}

function removeAciveItem(slid, paginatorItems, activeIndex){
    slid[activeIndex].classList.remove("is-active");
    paginatorItems[activeIndex].classList.remove("is-active");
}

function addAciveItem(slid, paginatorItems, activeIndex){
    slid[activeIndex].classList.add("is-active");
    paginatorItems[activeIndex].classList.add("is-active");
}

window.addEventListener("load", function(){
    let slid1 = new Slider(".slid", ".slider__item");
    setActiveElem(slid1.slid, slid1.activeIndex, "is-active");
    setActiveElem(slid1.paginatorItems, slid1.activeIndex, "is-active");
    slid1.buttonNext.addEventListener("click", function(){
        slid1.activeIndex = checkActive(
            slid1.slid,
            slid1.paginatorItems,
            slid1.activeIndex,
            clickNext,
        );
    });
    slid1.buttonPrevion.addEventListener("click", function(){
        slid1.activeIndex = checkActive(
            slid1.slid,
            slid1.paginatorItems,
            slid1.activeIndex,
            clickPrevious,
        );
    });
    for (let i = 0; i < slid1.slid.length; i++){
        slid1.paginatorItems[i].addEventListener("click", function(){
            slid1.activeIndex = clickPaginator(
                slid1.slid,
                slid1.paginatorItems,
                slid1.activeIndex,
                i,
            );
        });
    }
});