function Rewind(classItems){
    this.items = document.querySelectorAll(classItems);
    this.itemActive = setActiveItem(
        this.items,
        findActiveSlid(this.items, "is-active"),
        "is-active",
        null);
    this.itemWidth = calcWidthItem(this.items[this.itemActive]);
}

function setActiveItem(arr, activeIndex, classIsActive, nextActive){
    if(nextActive !== null){
        arr[activeIndex].classList.remove(classIsActive);
        arr[nextActive].classList.add(classIsActive);
        return nextActive;
    }
    if(arr[activeIndex].classList.contains(classIsActive)){
        arr[activeIndex].classList.add(classIsActive);
    }
    return activeIndex;
}

function findActiveSlid(arr, findClass){
    for(let i = 0; i < arr.length; i++){
        if(arr[i].classList.contains(findClass)){
            return i;
        }
    }
    return 0;
}

function setListener(arr, indexActive, width){
    let z = 0;
    for (let i = 0; i < arr.length; i++){
        arr[i].addEventListener("click", function(){
            setActiveItem(
                arr,
                indexActive,
                "is-active",
                i);
            z = moveItem(arr, indexActive, i, width, z);
            indexActive = i;
        })
    }
}

function calcWidthItem(elem){
    let styleItem = getComputedStyle(elem);
    let widthItem = Number.parseInt(elem.offsetWidth);
    let marginItem = Number.parseInt(styleItem.marginLeft) + Number.parseInt(styleItem.marginRight);
    return  widthItem + marginItem;
}

function moveItem(arr, indexActive, indexNext, width, z){
    let diff = width*(indexActive - indexNext);
    z += diff;
    for(let i = 0; i < arr.length; i++){
        arr[i].style.transform = "translateX(" + z + "px)";
    }
    return z
}

window.addEventListener("load", function(){
    let arr = new Rewind(".data__item");
    setListener(arr.items, arr.itemActive, arr.itemWidth);
});
