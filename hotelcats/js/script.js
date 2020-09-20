


function removeClass(item, removeClass) {
    if (!item) {
        console.log(item + ' no find');
        return;
    }
    if (item.classList.toggle(removeClass)) {
        item.classList.remove(removeClass);
    }
}

function addClass(item, addClass) {
    if (!item) {
        console.log(item + ' no find');
        return;
    }
    if (!!item.classList.toggle(addClass)) {
        item.classList.add(addClass);
    }
}

function createItems(newItem, length, parent) {
    if (length === 1) {
        let item = document.createElement(newItem);
        parent.append(item);
        return item;
    }
    for (let i = 0; i < length; i++) {
        let item = document.createElement(newItem);
        parent.append(item);
    }
}
function initBtnMenu(){
    let menu = document.querySelector('.header');
    let boxForBtn = document.querySelector('.header__logo');
    let btn = createBtnClose(menu, boxForBtn);
    addClass(menu, 'js-menu');
    resize(menu, btn);
    window.addEventListener('resize', function(){
        resize(menu, btn);
    });
}

function resize(box, btn){
    if(document.body.offsetWidth > 749){
        if(box.classList.contains('js-menu--close')){
            removeClass(box, 'js-menu--close');
        }
        if(btn.style.display !== 'none'){
            btn.style.display = 'none';
        }
    }
    else{
        if(!box.classList.contains('js-menu--close')){
            addClass(box, 'js-menu--close');

        }
        if(btn.style.display !== 'flex'){
            btn.style.display = 'flex';
        }
    }
}

function createBtnClose(box, parentBtn){
    let btn = createItems('button', 1, parentBtn);
    createItems('span',3, btn);
    btn.classList.add('btn--close');
    btn.addEventListener('click', function(){
        box.classList.toggle('js-menu--close');
    });
    return btn;
}




function initModal() {
    let btnOpenModal = document.querySelectorAll('[data-open-modal]');
    let btnCloseModal = document.querySelectorAll('[data-close-modal]');
    let openModal = null;

    for (let i = 0; i < btnOpenModal.length; i++) {
        btnOpenModal[i].addEventListener('click', function () {
            if(openModal){
                addClass(openModal, 'modal--close');
            }
            openModal = document.querySelector('#' + btnOpenModal[i].getAttribute('data-open-modal'));
            removeClass(openModal, 'modal--close');
            checkHeight(openModal);
        });
    }

    for (let i = 0; i < btnCloseModal.length; i++) {
        btnCloseModal[i].addEventListener('click', function () {
            addClass(openModal, 'modal--close');
            openModal = null;
            checkHeight(openModal);
        })
    }

    if(document.querySelector('#modalFilter')){
        let checkFilter = displayFilter();
        checkFilter();
        window.addEventListener('resize', function(){
            checkFilter();
        });
    }


}

function checkHeight(modal) {
    if(!modal){
        document.body.classList.remove('page--no-scroll');
        return;
    }
    if (modal.firstElementChild.offsetHeight > modal.offsetHeight) {
        modal.style.alignItems = "flex-start";
        document.body.classList.add('page--no-scroll');
    }
    else{
        modal.style.alignItems = "center";
    }
}

function displayFilter(){
    let modal = document.querySelector('#modalFilter .modal__content');
    let parent =document.querySelector('.numbers__content');
    let filter =  document.querySelector('.filter');
    let itemMoved = false;
    function moveFilter() {
        if(document.body.offsetWidth < 1200){
            if(!itemMoved){
                itemMoved = true;
                modal.append(filter);
            }
        }
        else {
            if(itemMoved){
                itemMoved = false;
                parent.prepend(filter);
            }}
    }
    return moveFilter;
    }


// fixme: страница прокручивается вверх
// fixme: прыгает ширина страницы
let isFilter = 0;

function filter() {
    const inputPrice = document.querySelectorAll('input[name="price"]');
    const inputArea = document.querySelectorAll('input[name="area"]');
    const inputEquipment = document.querySelectorAll('input[name="equipment"]');

    const card = document.querySelectorAll('.card--room');
    const cards = [];

    for (let i = 0; i < card.length; i++) {
        cards.push(new Card(card[i]));
    }

    // addInputListener(inputPrice, cards);
    addListener(inputArea, cards);
    addListener(inputEquipment, cards);
}

function Card(item) {
    this.card = item;
    this.price = this.card.getAttribute('data-filter-price');
    this.area = this.card.getAttribute('data-filter-area');
    this.equipment = this.card.getAttribute('data-filter-equipment').split(',');
    this.show = true;
}

function addListener(inputs, cards) {
    for (let i = 0; i < inputs.length; i++) {
        inputs[i].addEventListener('click', function () {
            // по какому полю будем фильтровать
            let field = inputs[i].name;
            // сброс при выборе первого инпута
            resetShowCards(cards);

            if(field === 'area'){
                listenerForArea(inputs[i], cards);
            }

            if(field === 'equipment'){
                listenerForEquipment(inputs[i], cards);
            }

            if (isFilter <= 1) {
                showCards(cards);
            }
            console.log(isFilter);
        })
    }
}

function listenerForArea(input, cards){
    if (input.checked) {
        isFilter++;
        for (let j = 0; j < cards.length; j++) {
            if (cards[j].area === input.getAttribute('data-value')) {
                cards[j].show = true;
            }

            if (isFilter > 1) {
                showCards(cards[j]);
            }
        }
    }
    else {
        isFilter--;
        if (!isFilter) {
            for (let j = 0; j < cards.length; j++) {
                cards[j].show = true;
            }
        }
        else{
            for (let j = 0; j < cards.length; j++) {
                if (cards[j].area === input.getAttribute('data-value')) {
                    cards[j].show = false;
                }

                if (isFilter > 1) {
                    showCards(cards[j]);
                }
            }
        }
    }
}

function listenerForEquipment(input, cards) {
    if (input.checked) {
        isFilter++;
        for (let j = 0; j < cards.length; j++) {
            console.log(cards[j].equipment);
            if (cards[j].equipment === input.getAttribute('data-value')) {
            }
        }
    }

}

function resetShowCards(cards) {
    if (!isFilter) {
        for (let j = 0; j < cards.length; j++) {
            cards[j].show = false;
        }
    }
}

function showCards(cards) {
    if (Array.isArray(cards)) {
        for (let i = 0; i < cards.length; i++) {
            showCard(cards[i]);
        }
    } else {
        showCard(cards);
    }

    function showCard(card) {
        if (card.show) {
            card.card.style.display = 'flex';
        } else {
            card.card.style.display = 'none';
        }
    }
}



window.addEventListener('load', function () {
    initBtnMenu();
    initModal();

    if(document.querySelector('#rooms .slider--rooms')){
        $('#rooms .slider--rooms').slick({
            arrows: true,
            dots: true,
            speed: 800,
            slidesToShow: 1,
            variableWidth: true,
            appendDots: $('#rooms .slider__control'),
            appendArrows: $('#rooms .slider__control'),
            responsive: [
                {
                    breakpoint: 768,
                    settings: {
                        infinite: false,
                        arrows: false,
                        slidesToShow: 1,
                        variableWidth: true,
                    }
                },
            ]
        });
    }

    if(document.querySelector('#reviews .slider--comment')){
        $('#reviews .slider--comment').slick({
            infinite: false,
            initialSlide: 1,
            centerMode: true,
            arrows: false,
            dots: true,
            variableWidth: true,
            currentSlide: $('#rooms .slider__item--active'),
            appendArrows: $('#reviews .slider__control'),
            appendDots: $('#reviews .slider__control'),

            responsive: [
                {
                    breakpoint: 768,
                    settings: {
                        arrows: false,
                    }
                },
                {
                    breakpoint: 1400,
                    settings: {
                        arrows: true,
                    }
                },
            ]
        });
    }
});
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJzY3JpcHQuanMiXSwic291cmNlc0NvbnRlbnQiOlsiXHJcblxyXG5cclxuZnVuY3Rpb24gcmVtb3ZlQ2xhc3MoaXRlbSwgcmVtb3ZlQ2xhc3MpIHtcclxuICAgIGlmICghaXRlbSkge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKGl0ZW0gKyAnIG5vIGZpbmQnKTtcclxuICAgICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICBpZiAoaXRlbS5jbGFzc0xpc3QudG9nZ2xlKHJlbW92ZUNsYXNzKSkge1xyXG4gICAgICAgIGl0ZW0uY2xhc3NMaXN0LnJlbW92ZShyZW1vdmVDbGFzcyk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGFkZENsYXNzKGl0ZW0sIGFkZENsYXNzKSB7XHJcbiAgICBpZiAoIWl0ZW0pIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhpdGVtICsgJyBubyBmaW5kJyk7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG4gICAgaWYgKCEhaXRlbS5jbGFzc0xpc3QudG9nZ2xlKGFkZENsYXNzKSkge1xyXG4gICAgICAgIGl0ZW0uY2xhc3NMaXN0LmFkZChhZGRDbGFzcyk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGNyZWF0ZUl0ZW1zKG5ld0l0ZW0sIGxlbmd0aCwgcGFyZW50KSB7XHJcbiAgICBpZiAobGVuZ3RoID09PSAxKSB7XHJcbiAgICAgICAgbGV0IGl0ZW0gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KG5ld0l0ZW0pO1xyXG4gICAgICAgIHBhcmVudC5hcHBlbmQoaXRlbSk7XHJcbiAgICAgICAgcmV0dXJuIGl0ZW07XHJcbiAgICB9XHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgbGV0IGl0ZW0gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KG5ld0l0ZW0pO1xyXG4gICAgICAgIHBhcmVudC5hcHBlbmQoaXRlbSk7XHJcbiAgICB9XHJcbn1cbmZ1bmN0aW9uIGluaXRCdG5NZW51KCl7XHJcbiAgICBsZXQgbWVudSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5oZWFkZXInKTtcclxuICAgIGxldCBib3hGb3JCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuaGVhZGVyX19sb2dvJyk7XHJcbiAgICBsZXQgYnRuID0gY3JlYXRlQnRuQ2xvc2UobWVudSwgYm94Rm9yQnRuKTtcclxuICAgIGFkZENsYXNzKG1lbnUsICdqcy1tZW51Jyk7XHJcbiAgICByZXNpemUobWVudSwgYnRuKTtcclxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdyZXNpemUnLCBmdW5jdGlvbigpe1xyXG4gICAgICAgIHJlc2l6ZShtZW51LCBidG4pO1xyXG4gICAgfSk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHJlc2l6ZShib3gsIGJ0bil7XHJcbiAgICBpZihkb2N1bWVudC5ib2R5Lm9mZnNldFdpZHRoID4gNzQ5KXtcclxuICAgICAgICBpZihib3guY2xhc3NMaXN0LmNvbnRhaW5zKCdqcy1tZW51LS1jbG9zZScpKXtcclxuICAgICAgICAgICAgcmVtb3ZlQ2xhc3MoYm94LCAnanMtbWVudS0tY2xvc2UnKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYoYnRuLnN0eWxlLmRpc3BsYXkgIT09ICdub25lJyl7XHJcbiAgICAgICAgICAgIGJ0bi5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGVsc2V7XHJcbiAgICAgICAgaWYoIWJveC5jbGFzc0xpc3QuY29udGFpbnMoJ2pzLW1lbnUtLWNsb3NlJykpe1xyXG4gICAgICAgICAgICBhZGRDbGFzcyhib3gsICdqcy1tZW51LS1jbG9zZScpO1xyXG5cclxuICAgICAgICB9XHJcbiAgICAgICAgaWYoYnRuLnN0eWxlLmRpc3BsYXkgIT09ICdmbGV4Jyl7XHJcbiAgICAgICAgICAgIGJ0bi5zdHlsZS5kaXNwbGF5ID0gJ2ZsZXgnO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5cclxuZnVuY3Rpb24gY3JlYXRlQnRuQ2xvc2UoYm94LCBwYXJlbnRCdG4pe1xyXG4gICAgbGV0IGJ0biA9IGNyZWF0ZUl0ZW1zKCdidXR0b24nLCAxLCBwYXJlbnRCdG4pO1xyXG4gICAgY3JlYXRlSXRlbXMoJ3NwYW4nLDMsIGJ0bik7XHJcbiAgICBidG4uY2xhc3NMaXN0LmFkZCgnYnRuLS1jbG9zZScpO1xyXG4gICAgYnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oKXtcclxuICAgICAgICBib3guY2xhc3NMaXN0LnRvZ2dsZSgnanMtbWVudS0tY2xvc2UnKTtcclxuICAgIH0pO1xyXG4gICAgcmV0dXJuIGJ0bjtcclxufVxyXG5cclxuXHJcblxyXG5cbmZ1bmN0aW9uIGluaXRNb2RhbCgpIHtcclxuICAgIGxldCBidG5PcGVuTW9kYWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdbZGF0YS1vcGVuLW1vZGFsXScpO1xyXG4gICAgbGV0IGJ0bkNsb3NlTW9kYWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdbZGF0YS1jbG9zZS1tb2RhbF0nKTtcclxuICAgIGxldCBvcGVuTW9kYWwgPSBudWxsO1xyXG5cclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgYnRuT3Blbk1vZGFsLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgYnRuT3Blbk1vZGFsW2ldLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBpZihvcGVuTW9kYWwpe1xyXG4gICAgICAgICAgICAgICAgYWRkQ2xhc3Mob3Blbk1vZGFsLCAnbW9kYWwtLWNsb3NlJyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgb3Blbk1vZGFsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignIycgKyBidG5PcGVuTW9kYWxbaV0uZ2V0QXR0cmlidXRlKCdkYXRhLW9wZW4tbW9kYWwnKSk7XHJcbiAgICAgICAgICAgIHJlbW92ZUNsYXNzKG9wZW5Nb2RhbCwgJ21vZGFsLS1jbG9zZScpO1xyXG4gICAgICAgICAgICBjaGVja0hlaWdodChvcGVuTW9kYWwpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgYnRuQ2xvc2VNb2RhbC5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIGJ0bkNsb3NlTW9kYWxbaV0uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGFkZENsYXNzKG9wZW5Nb2RhbCwgJ21vZGFsLS1jbG9zZScpO1xyXG4gICAgICAgICAgICBvcGVuTW9kYWwgPSBudWxsO1xyXG4gICAgICAgICAgICBjaGVja0hlaWdodChvcGVuTW9kYWwpO1xyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcblxyXG4gICAgaWYoZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI21vZGFsRmlsdGVyJykpe1xyXG4gICAgICAgIGxldCBjaGVja0ZpbHRlciA9IGRpc3BsYXlGaWx0ZXIoKTtcclxuICAgICAgICBjaGVja0ZpbHRlcigpO1xyXG4gICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdyZXNpemUnLCBmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICBjaGVja0ZpbHRlcigpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuXHJcbn1cclxuXHJcbmZ1bmN0aW9uIGNoZWNrSGVpZ2h0KG1vZGFsKSB7XHJcbiAgICBpZighbW9kYWwpe1xyXG4gICAgICAgIGRvY3VtZW50LmJvZHkuY2xhc3NMaXN0LnJlbW92ZSgncGFnZS0tbm8tc2Nyb2xsJyk7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG4gICAgaWYgKG1vZGFsLmZpcnN0RWxlbWVudENoaWxkLm9mZnNldEhlaWdodCA+IG1vZGFsLm9mZnNldEhlaWdodCkge1xyXG4gICAgICAgIG1vZGFsLnN0eWxlLmFsaWduSXRlbXMgPSBcImZsZXgtc3RhcnRcIjtcclxuICAgICAgICBkb2N1bWVudC5ib2R5LmNsYXNzTGlzdC5hZGQoJ3BhZ2UtLW5vLXNjcm9sbCcpO1xyXG4gICAgfVxyXG4gICAgZWxzZXtcclxuICAgICAgICBtb2RhbC5zdHlsZS5hbGlnbkl0ZW1zID0gXCJjZW50ZXJcIjtcclxuICAgIH1cclxufVxyXG5cclxuZnVuY3Rpb24gZGlzcGxheUZpbHRlcigpe1xyXG4gICAgbGV0IG1vZGFsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI21vZGFsRmlsdGVyIC5tb2RhbF9fY29udGVudCcpO1xyXG4gICAgbGV0IHBhcmVudCA9ZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm51bWJlcnNfX2NvbnRlbnQnKTtcclxuICAgIGxldCBmaWx0ZXIgPSAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmZpbHRlcicpO1xyXG4gICAgbGV0IGl0ZW1Nb3ZlZCA9IGZhbHNlO1xyXG4gICAgZnVuY3Rpb24gbW92ZUZpbHRlcigpIHtcclxuICAgICAgICBpZihkb2N1bWVudC5ib2R5Lm9mZnNldFdpZHRoIDwgMTIwMCl7XHJcbiAgICAgICAgICAgIGlmKCFpdGVtTW92ZWQpe1xyXG4gICAgICAgICAgICAgICAgaXRlbU1vdmVkID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIG1vZGFsLmFwcGVuZChmaWx0ZXIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICBpZihpdGVtTW92ZWQpe1xyXG4gICAgICAgICAgICAgICAgaXRlbU1vdmVkID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICBwYXJlbnQucHJlcGVuZChmaWx0ZXIpO1xyXG4gICAgICAgICAgICB9fVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIG1vdmVGaWx0ZXI7XHJcbiAgICB9XHJcblxyXG5cclxuLy8gZml4bWU6INGB0YLRgNCw0L3QuNGG0LAg0L/RgNC+0LrRgNGD0YfQuNCy0LDQtdGC0YHRjyDQstCy0LXRgNGFXHJcbi8vIGZpeG1lOiDQv9GA0YvQs9Cw0LXRgiDRiNC40YDQuNC90LAg0YHRgtGA0LDQvdC40YbRi1xubGV0IGlzRmlsdGVyID0gMDtcclxuXHJcbmZ1bmN0aW9uIGZpbHRlcigpIHtcclxuICAgIGNvbnN0IGlucHV0UHJpY2UgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdpbnB1dFtuYW1lPVwicHJpY2VcIl0nKTtcclxuICAgIGNvbnN0IGlucHV0QXJlYSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ2lucHV0W25hbWU9XCJhcmVhXCJdJyk7XHJcbiAgICBjb25zdCBpbnB1dEVxdWlwbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ2lucHV0W25hbWU9XCJlcXVpcG1lbnRcIl0nKTtcclxuXHJcbiAgICBjb25zdCBjYXJkID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmNhcmQtLXJvb20nKTtcclxuICAgIGNvbnN0IGNhcmRzID0gW107XHJcblxyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBjYXJkLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgY2FyZHMucHVzaChuZXcgQ2FyZChjYXJkW2ldKSk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gYWRkSW5wdXRMaXN0ZW5lcihpbnB1dFByaWNlLCBjYXJkcyk7XHJcbiAgICBhZGRMaXN0ZW5lcihpbnB1dEFyZWEsIGNhcmRzKTtcclxuICAgIGFkZExpc3RlbmVyKGlucHV0RXF1aXBtZW50LCBjYXJkcyk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIENhcmQoaXRlbSkge1xyXG4gICAgdGhpcy5jYXJkID0gaXRlbTtcclxuICAgIHRoaXMucHJpY2UgPSB0aGlzLmNhcmQuZ2V0QXR0cmlidXRlKCdkYXRhLWZpbHRlci1wcmljZScpO1xyXG4gICAgdGhpcy5hcmVhID0gdGhpcy5jYXJkLmdldEF0dHJpYnV0ZSgnZGF0YS1maWx0ZXItYXJlYScpO1xyXG4gICAgdGhpcy5lcXVpcG1lbnQgPSB0aGlzLmNhcmQuZ2V0QXR0cmlidXRlKCdkYXRhLWZpbHRlci1lcXVpcG1lbnQnKS5zcGxpdCgnLCcpO1xyXG4gICAgdGhpcy5zaG93ID0gdHJ1ZTtcclxufVxyXG5cclxuZnVuY3Rpb24gYWRkTGlzdGVuZXIoaW5wdXRzLCBjYXJkcykge1xyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBpbnB1dHMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICBpbnB1dHNbaV0uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIC8vINC/0L4g0LrQsNC60L7QvNGDINC/0L7Qu9GOINCx0YPQtNC10Lwg0YTQuNC70YzRgtGA0L7QstCw0YLRjFxyXG4gICAgICAgICAgICBsZXQgZmllbGQgPSBpbnB1dHNbaV0ubmFtZTtcclxuICAgICAgICAgICAgLy8g0YHQsdGA0L7RgSDQv9GA0Lgg0LLRi9Cx0L7RgNC1INC/0LXRgNCy0L7Qs9C+INC40L3Qv9GD0YLQsFxyXG4gICAgICAgICAgICByZXNldFNob3dDYXJkcyhjYXJkcyk7XHJcblxyXG4gICAgICAgICAgICBpZihmaWVsZCA9PT0gJ2FyZWEnKXtcclxuICAgICAgICAgICAgICAgIGxpc3RlbmVyRm9yQXJlYShpbnB1dHNbaV0sIGNhcmRzKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYoZmllbGQgPT09ICdlcXVpcG1lbnQnKXtcclxuICAgICAgICAgICAgICAgIGxpc3RlbmVyRm9yRXF1aXBtZW50KGlucHV0c1tpXSwgY2FyZHMpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAoaXNGaWx0ZXIgPD0gMSkge1xyXG4gICAgICAgICAgICAgICAgc2hvd0NhcmRzKGNhcmRzKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhpc0ZpbHRlcik7XHJcbiAgICAgICAgfSlcclxuICAgIH1cclxufVxyXG5cclxuZnVuY3Rpb24gbGlzdGVuZXJGb3JBcmVhKGlucHV0LCBjYXJkcyl7XHJcbiAgICBpZiAoaW5wdXQuY2hlY2tlZCkge1xyXG4gICAgICAgIGlzRmlsdGVyKys7XHJcbiAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCBjYXJkcy5sZW5ndGg7IGorKykge1xyXG4gICAgICAgICAgICBpZiAoY2FyZHNbal0uYXJlYSA9PT0gaW5wdXQuZ2V0QXR0cmlidXRlKCdkYXRhLXZhbHVlJykpIHtcclxuICAgICAgICAgICAgICAgIGNhcmRzW2pdLnNob3cgPSB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAoaXNGaWx0ZXIgPiAxKSB7XHJcbiAgICAgICAgICAgICAgICBzaG93Q2FyZHMoY2FyZHNbal0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgZWxzZSB7XHJcbiAgICAgICAgaXNGaWx0ZXItLTtcclxuICAgICAgICBpZiAoIWlzRmlsdGVyKSB7XHJcbiAgICAgICAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgY2FyZHMubGVuZ3RoOyBqKyspIHtcclxuICAgICAgICAgICAgICAgIGNhcmRzW2pdLnNob3cgPSB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgY2FyZHMubGVuZ3RoOyBqKyspIHtcclxuICAgICAgICAgICAgICAgIGlmIChjYXJkc1tqXS5hcmVhID09PSBpbnB1dC5nZXRBdHRyaWJ1dGUoJ2RhdGEtdmFsdWUnKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNhcmRzW2pdLnNob3cgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoaXNGaWx0ZXIgPiAxKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2hvd0NhcmRzKGNhcmRzW2pdKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5cclxuZnVuY3Rpb24gbGlzdGVuZXJGb3JFcXVpcG1lbnQoaW5wdXQsIGNhcmRzKSB7XHJcbiAgICBpZiAoaW5wdXQuY2hlY2tlZCkge1xyXG4gICAgICAgIGlzRmlsdGVyKys7XHJcbiAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCBjYXJkcy5sZW5ndGg7IGorKykge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhjYXJkc1tqXS5lcXVpcG1lbnQpO1xyXG4gICAgICAgICAgICBpZiAoY2FyZHNbal0uZXF1aXBtZW50ID09PSBpbnB1dC5nZXRBdHRyaWJ1dGUoJ2RhdGEtdmFsdWUnKSkge1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxufVxyXG5cclxuZnVuY3Rpb24gcmVzZXRTaG93Q2FyZHMoY2FyZHMpIHtcclxuICAgIGlmICghaXNGaWx0ZXIpIHtcclxuICAgICAgICBmb3IgKGxldCBqID0gMDsgaiA8IGNhcmRzLmxlbmd0aDsgaisrKSB7XHJcbiAgICAgICAgICAgIGNhcmRzW2pdLnNob3cgPSBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHNob3dDYXJkcyhjYXJkcykge1xyXG4gICAgaWYgKEFycmF5LmlzQXJyYXkoY2FyZHMpKSB7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBjYXJkcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBzaG93Q2FyZChjYXJkc1tpXSk7XHJcbiAgICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICBzaG93Q2FyZChjYXJkcyk7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gc2hvd0NhcmQoY2FyZCkge1xyXG4gICAgICAgIGlmIChjYXJkLnNob3cpIHtcclxuICAgICAgICAgICAgY2FyZC5jYXJkLnN0eWxlLmRpc3BsYXkgPSAnZmxleCc7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgY2FyZC5jYXJkLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcblxyXG5cclxuXG53aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignbG9hZCcsIGZ1bmN0aW9uICgpIHtcclxuICAgIGluaXRCdG5NZW51KCk7XHJcbiAgICBpbml0TW9kYWwoKTtcclxuXHJcbiAgICBpZihkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcm9vbXMgLnNsaWRlci0tcm9vbXMnKSl7XHJcbiAgICAgICAgJCgnI3Jvb21zIC5zbGlkZXItLXJvb21zJykuc2xpY2soe1xyXG4gICAgICAgICAgICBhcnJvd3M6IHRydWUsXHJcbiAgICAgICAgICAgIGRvdHM6IHRydWUsXHJcbiAgICAgICAgICAgIHNwZWVkOiA4MDAsXHJcbiAgICAgICAgICAgIHNsaWRlc1RvU2hvdzogMSxcclxuICAgICAgICAgICAgdmFyaWFibGVXaWR0aDogdHJ1ZSxcclxuICAgICAgICAgICAgYXBwZW5kRG90czogJCgnI3Jvb21zIC5zbGlkZXJfX2NvbnRyb2wnKSxcclxuICAgICAgICAgICAgYXBwZW5kQXJyb3dzOiAkKCcjcm9vbXMgLnNsaWRlcl9fY29udHJvbCcpLFxyXG4gICAgICAgICAgICByZXNwb25zaXZlOiBbXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWtwb2ludDogNzY4LFxyXG4gICAgICAgICAgICAgICAgICAgIHNldHRpbmdzOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGluZmluaXRlOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgYXJyb3dzOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2xpZGVzVG9TaG93OiAxLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXJpYWJsZVdpZHRoOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIF1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBpZihkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcmV2aWV3cyAuc2xpZGVyLS1jb21tZW50Jykpe1xyXG4gICAgICAgICQoJyNyZXZpZXdzIC5zbGlkZXItLWNvbW1lbnQnKS5zbGljayh7XHJcbiAgICAgICAgICAgIGluZmluaXRlOiBmYWxzZSxcclxuICAgICAgICAgICAgaW5pdGlhbFNsaWRlOiAxLFxyXG4gICAgICAgICAgICBjZW50ZXJNb2RlOiB0cnVlLFxyXG4gICAgICAgICAgICBhcnJvd3M6IGZhbHNlLFxyXG4gICAgICAgICAgICBkb3RzOiB0cnVlLFxyXG4gICAgICAgICAgICB2YXJpYWJsZVdpZHRoOiB0cnVlLFxyXG4gICAgICAgICAgICBjdXJyZW50U2xpZGU6ICQoJyNyb29tcyAuc2xpZGVyX19pdGVtLS1hY3RpdmUnKSxcclxuICAgICAgICAgICAgYXBwZW5kQXJyb3dzOiAkKCcjcmV2aWV3cyAuc2xpZGVyX19jb250cm9sJyksXHJcbiAgICAgICAgICAgIGFwcGVuZERvdHM6ICQoJyNyZXZpZXdzIC5zbGlkZXJfX2NvbnRyb2wnKSxcclxuXHJcbiAgICAgICAgICAgIHJlc3BvbnNpdmU6IFtcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBicmVha3BvaW50OiA3NjgsXHJcbiAgICAgICAgICAgICAgICAgICAgc2V0dGluZ3M6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYXJyb3dzOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrcG9pbnQ6IDE0MDAsXHJcbiAgICAgICAgICAgICAgICAgICAgc2V0dGluZ3M6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYXJyb3dzOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIF1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxufSk7Il0sImZpbGUiOiJzY3JpcHQuanMifQ==
