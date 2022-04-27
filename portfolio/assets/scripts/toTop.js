function toTop(selectorItem){
    const item = document.querySelector(selectorItem);

    document.addEventListener('scroll', ()=>{
        if(document.documentElement.scrollTop > document.documentElement.clientHeight){
            item.classList.remove('hidden')
        }
        else{
            item.classList.add('hidden')
        }
    })

    item.addEventListener('click', ()=> {
        item.blur();
    })
}

export default toTop;