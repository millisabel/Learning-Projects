export function setButtonsHandler(){
    const buttonsActions = document.querySelectorAll('[data-action]');
    const buttonsHome = document.querySelector('[data-action = "startScreen"]');
    const [screenStart, screenGame, screenResult] = document.querySelectorAll('.screen');
    let openScreen = getOpenScreen();

    buttonsActions.forEach((btn, ) => {
        
        btn.addEventListener('click', () => {
            if(btn.dataset.action === 'showTable'){
                openScreen = getOpenScreen();
                screenResult.classList.toggle('state--hide');
                openScreen.classList.toggle('state--hide');
                setBtnHomeState();
            }
            
            if(btn.dataset.action === 'close'){
                openScreen = getOpenScreen();
                screenResult.classList.toggle('state--hide');
                openScreen.classList.toggle('state--hide');
                setBtnHomeState();
            }
            
            if(btn.dataset.action === 'checkLevel'){
                screenStart.classList.add('state--hide');
                screenResult.classList.add('state--hide');
                screenGame.classList.remove('state--hide');
                setBtnHomeState();
            }
            
            if(btn.dataset.action === 'showMenu'){
                screenStart.classList.remove('state--hide');
                screenGame.classList.add('state--hide');
                screenResult.classList.add('state--hide');
                buttonsHome.classList.add('state--hide');
            }

            if(btn.dataset.action === 'startScreen'){
                screenStart.classList.remove('state--hide');
                screenGame.classList.add('state--hide');
                screenResult.classList.add('state--hide');
                buttonsHome.classList.add('state--hide');
            }
        })
    })
    
    function getOpenScreen(){
        if(screenResult.classList.contains('state--hide')){
            if(!screenStart.classList.contains('state--hide')){
                return screenStart;
            }
            if(!screenGame.classList.contains('state--hide')){
                return screenGame;
            }
        }
        return openScreen
    }

    function setBtnHomeState(){
        if(!screenStart.classList.contains('state--hide')){
            buttonsHome.classList.add('state--hide');
        }
        else{
            buttonsHome.classList.remove('state--hide');
        }
    }
}