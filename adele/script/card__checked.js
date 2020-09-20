function card(){
    let row = document.querySelectorAll(".supplement__tr");
    let card = document.querySelectorAll(".ingredient-card");
    if(!row || !card){
        return;
    }
    let currentIndex = findActiveItem(card);
    addClass(card, currentIndex, "js__active");
    addClass(row, currentIndex, "js__row__active");
    addListener(card, row, currentIndex);
}

function findActiveItem(items){
    for(let i = 0; i < items.length; i++){
        if(items[i].classList.contains("js__active")){
            return i;
        }
    }
    return 0;
}

function addClass(items, index, className){
    if(!items[index].classList.contains(className)){
        items[index].classList.add(className);
    }
}

function removeClass(items, index, className){
    if(items[index].classList.contains(className)){
        items[index].classList.remove(className);
    }
}

function addListener(card, row, index){
    for(let i = 0; i < row.length; i++ ){
        // to work in ie11
        let indexLast = i;
        row[i].addEventListener("click", function(){
            removeClass(card, index, "js__active");
            removeClass(row, index, "js__row__active");
            index = indexLast;
            addClass(card, indexLast, "js__active");
            addClass(row, indexLast, "js__row__active");
        });
    }
    return index;
}

card();