function toggleTheme(){
    let btn = document.querySelector('.btn--theme');

    btn.addEventListener('click', ()=>{
        document.body.classList.toggle('light');
        btn.blur();
    })
}

export default toggleTheme;