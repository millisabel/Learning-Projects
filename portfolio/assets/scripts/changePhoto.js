function changePhoto(selectorParentBtn, selectorImages, selectorActive) {
    const parentBtn = document.querySelector(selectorParentBtn);
    const images = document.querySelectorAll(selectorImages);
    let active = parentBtn.querySelector(selectorActive);

    parentBtn.addEventListener('click', (event) => {

            if (event.target.classList.contains('active')) {
                return;
            }
            if (event.target.classList.contains('btn')) {

                let season = event.target.dataset.season;
                images.forEach((img, index) => {
                        img.classList.add('animation');
                        img.src = `./assets/img/gallery/${season}/${index + 1}.jpg`;
                        active = setActiveBtn(event.target);
                        setTimeout(() => img.classList.remove('animation'), 1000);
                    }
                )
            }
        }
    )

    function setActiveBtn(btn) {
        if (active) {
            active.classList.remove('active');
        }
        btn.classList.add('active');
        return btn;
    }

}

export default changePhoto;