import {setButtonsHandler} from "./actions/setButtonsHandler.js";
import {getOptions} from "./actions/getOptions.js";
import {Game} from "./components/Game/Game.js";
import {Result} from "./components/Result/Result.js";
import {myMark} from "./myMark/myMark.js";

window.addEventListener('DOMContentLoaded', () => {
    myMark();
    const buttonsCheckLevel = document.querySelectorAll('[data-level]');
    
    const result = new Result();
    let game = null;
    setButtonsHandler(game);
    
    buttonsCheckLevel.forEach((btn) => {
        btn.addEventListener('click', (e) => {
            game = new Game(result);
            game.options = getOptions(btn);
            game.start(result);
        })
    })
})