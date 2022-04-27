import {Timer} from "../Timer/Timer.js";

export function Game(result) {
    this.options = null;
    this.matrix = [];
    this.field = null;
    this.fieldTime = document.querySelector('.info>.time');
    this.fieldMine = document.querySelector('.info>.count');
    this.time = null;
    this.info = {
        left: false,
        wheel: false,
        right: false,
        currentId: null,
        currenElem: null,
        currenElemMatrix: null,
        mines: 0,
        isMine: 0,
    }
    this.btn = {
        toStart: document.querySelector('[data-action = "startScreen"]'),
        againInResult: document.querySelector('.result__buttons>[data-action = "playAgain"]'),
        againInGame: document.querySelector('.game__buttons>[data-action = "playAgain"]'),
        menuInResult: document.querySelector('.result__buttons>[data-action = "showMenu"]'),
        toStartInGame: document.querySelector('.game__buttons>[data-action="showMenu"]'),
        closeInResult: document.querySelector('.result__buttons>[data-action="close"]')
    }

    const sound = new Audio();

    const addListenerForButtons = () => {

        this.btn.toStart.addEventListener('click', () => {
            this.stop();
        })

        this.btn.againInResult.addEventListener('click', () => {
            this.btn.toStartInGame.classList.remove('state--hide');
            const screenResult = document.querySelector('.screen--result');
            const screenGame = document.querySelector('.screen--game');
            screenResult.classList.add('state--hide');
            screenGame.classList.remove('state--hide');
            
            this.field = null;
            this.matrix = [];
            this.info.isMine = 0;
            this.info.mines = 0;

            this.start();
        })

        this.btn.againInGame.addEventListener('click', () => {
            this.stop();
            this.field = null;
            this.matrix = [];
            this.info.isMine = 0;
            this.info.mines = 0;
            this.start();
        })

        this.btn.toStartInGame.addEventListener('click', () => {
            this.stop()
        })

        this.btn.closeInResult.addEventListener('click', () => {
            this.btn.againInGame.classList.remove('state--hide');
            this.btn.toStartInGame.classList.remove('state--hide');
        })
    }

    addListenerForButtons();

    this.start = function () {
        
        this.matrix = createMatrix(this.options);
        setMines(this.matrix, this.options);
        this.field = createField(this.matrix);
        updateField(this.matrix);

        this.info.mines = this.options.mines;
        this.time = new Timer(this.fieldTime);

        this.btn.menuInResult.classList.remove('state--hide');
        this.btn.againInGame.classList.add('state--hide');
        this.btn.againInResult.classList.add('state--hide');
        
        this.fieldTime.classList.remove('state--hide');
        this.fieldMine.classList.remove('state--hide');
        this.fieldMine.innerHTML = this.info.mines;

        document.body.addEventListener(
            'contextmenu',
            (e) => {
                e.preventDefault()
            });

        this.field.addEventListener(
            'mousedown',
            (e) => {
                if(this.btn.againInResult.classList.contains('state--hide')){
                    this.btn.againInResult.classList.remove('state--hide');
                    this.btn.againInGame.classList.remove('state--hide');
                }
                const currentCell = e.target;
                this.updateInfo(e.button, currentCell);

                if(this.info.left){
                    this.leftClick(currentCell)
                }
                else if(this.info.right){
                    this.rightClick(currentCell)
                }else if(this.info.wheel){
                    this.whileClick(currentCell)
                }else{
                    this.leftClick(currentCell)
                }
            })
    }

    this.stop = function () {
        this.time.clearTimer();
        
        this.field.classList.remove('message');
        this.fieldTime.classList.add('state--hide');
        this.fieldMine.classList.add('state--hide');

        this.btn.againInResult.classList.add('state--hide');
        this.btn.menuInResult.classList.add('state--hide');
        this.btn.againInGame.classList.remove('state--hide');

        this.fieldMine.innerHTML = '';
        this.fieldTime.innerHTML = '';
    }

    this.win = function () {
        sound.src = './sound/win.mp3';
        sound.play();
        
        this.endGame('win');
        const s = this.openAllCell();
        const btnOpenResult = document.querySelector('[data-action="showTable"]');
        const btnStart = this.btn.toStart;
        btnOpenResult.classList.add('state--hide');
        btnStart.classList.add('state--hide');

        const t = setTimeout(function() {
            const screenResult = document.querySelector('.screen--result');
            const game = document.querySelector('.screen--game');
            if(screenResult.classList.contains('state--hide')){
                screenResult.classList.remove('state--hide');
                game.classList.add('state--hide');
            }
            clearTimeout(t);
            btnOpenResult.classList.remove('state--hide');
            btnStart.classList.remove('state--hide');
        }, s)
    }
    this.lose = function () {

        this.endGame('lose');
        const s = this.openAllMines();

        const btnOpenResult = document.querySelector('[data-action="showTable"]');
        const btnStart = this.btn.toStart;
        btnOpenResult.classList.add('state--hide');
        btnStart.classList.add('state--hide');
        
        const t = setTimeout(function() {
            const screenResult = document.querySelector('.screen--result');
            const game = document.querySelector('.screen--game');
            if(screenResult.classList.contains('state--hide')){
                screenResult.classList.remove('state--hide');
                game.classList.add('state--hide');
            }
            clearTimeout(t);
            btnOpenResult.classList.remove('state--hide');
            btnStart.classList.remove('state--hide');
        }, s);


    }
    
    this.endGame = function(state){
        this.time.stopTimer();

        result.add(state, this.fieldTime.textContent);
        
        this.field.classList.add('message', state);
        this.btn.againInResult.classList.remove('state--hide');
        this.btn.againInGame.classList.add('state--hide');
        this.btn.toStartInGame.classList.add('state--hide');
    }

    const createMatrix = function (options) {
        const matrix = [];
        let idCount = 1;
        for (let i = 0; i < options.rows; i++) {
            const row = [];
            for (let j = 0; j < options.columns; j++) {
                row.push({
                    id: idCount++,
                    item: null,
                    column: j,
                    row: i,
                    show: false,
                    flag: false,
                    mine: false,
                    number: 0,
                });
            }
            matrix.push(row);
        }
        return matrix;
    }

    const setMines = function (matrix, options) {
        for (let i = 0; i < options.mines; i++) {
            const cell = getRandomCell(matrix);
            cell.mine = true;

            const cells = getAroundCells(matrix, cell.row, cell.column);

            for (let i = 0; i < cells.length; i++) {
                cells[i].number += 1;
            }
        }
    }

    const getRandomCell = function(matrix) {
        const freeCalls = [];
        for (let row = 0; row < matrix.length; row++) {
            for (let j = 0; j < matrix[row].length; j++) {
                if (!matrix[row][j].mine) {
                    freeCalls.push(matrix[row][j]);
                }
            }
        }
        const index = Math.floor(Math.random() * freeCalls.length);
        return freeCalls[index];
    }

    const getAroundCells = function(matrix, x, y) {
        const cells = [];
        for (let row = -1; row <= 1; row++) {
            for (let j = -1; j <= 1; j++) {
                if (row === 0 && j === 0) {
                    continue;
                }
                const cell = getCell(matrix, x + row, y + j);

                if (cell) {
                    cells.push(cell);
                }
            }
        }
        return cells;
    }

    const getCell = function(matrix, row, y) {
        if (!matrix[row] || !matrix[row][y]) {
            return false;
        }
        return matrix[row][y];
    }

    const createField = function (matrix) {
        const parentField = document.querySelector('.game');
        const field = document.createElement('div');
        parentField.innerHTML = '';
        field.classList.add('field', 'flex');

        for (let i = 0; i < matrix.length; i++) {
            const row = document.createElement('div');
            row.classList.add('field__row');

            for (let j = 0; j < matrix[i].length; j++) {
                const cell = document.createElement('div');
                cell.classList.add('field__cell', 'hide');
                cell.setAttribute('data-cell-id', matrix[i][j].id);
                row.append(cell);
                matrix[i][j].item = cell;
            }

            field.append(row);
        }

        parentField.append(field);
        return field;
    }

    const updateField = function (matrix){
        for (let i = 0; i < matrix.length; i++) {
            for (let j = 0; j < matrix[i].length; j++) {
                const cell = matrix[i][j];
                if (cell.number) {
                    cell.item.innerHTML = cell.number;
                }
            }
        }
    }

    this.updateInfo = function (btn, elem) {
        this.info.left = btn === 0;
        this.info.wheel = btn === 1;
        this.info.right = btn === 2;
        this.info.currentId = +elem.dataset.cellId;
        this.info.currenElem = elem;
        for (let row = 0; row < this.matrix.length; row++) {
            for (let j = 0; j < this.matrix[row].length; j++) {
                if (this.matrix[row][j].id === this.info.currentId) {
                    this.info.currenElemMatrix = this.matrix[row][j];
                }
            }
        }
    }
    
    this.rightClick = function(elem) {
        if(!this.info.currenElemMatrix.show){
            elem.classList.toggle('flag');
            this.info.currenElemMatrix.flag = elem.classList.contains('flag');
            if(this.info.currenElemMatrix.flag){

                sound.src = './sound/flag.mp3';
                sound.play();
               
                this.info.mines -= 1;
            }
            else{
                this.info.mines += 1;
            }
            this.fieldMine.innerHTML = this.info.mines;
            if(this.info.currenElemMatrix.mine ){
                this.info.isMine += 1;
                if(this.info.isMine === this.options.mines){
                    this.win();
                }
            }
        }
    }

    this.leftClick = function(elem){
        if(!this.info.currenElemMatrix.flag){
            elem.classList.remove('hide');
            this.info.currenElemMatrix.show = true;
            
            if(this.info.currenElemMatrix.mine){

                sound.src = './sound/mine.mp3';
                sound.play();
                elem.classList.add('mine');
                this.info.mines -= 1;
                this.fieldMine.innerHTML = this.info.mines;
                this.lose();
            }
        }
        if(!this.info.currenElemMatrix.mine &&
            !this.info.currenElemMatrix.number &&
            !this.info.currenElemMatrix.flag){
            this.openVoid(elem);
        }
    }

    this.whileClick = function(){
        if(!this.info.currenElemMatrix.show || !this.info.currenElemMatrix.number){
            return;
        }
        
        const cells = getAroundCells(this.matrix, this.info.currenElemMatrix.row, this.info.currenElemMatrix.column);
        const countFlags = cells.filter(x => x.flag).length;
        
        if(countFlags === this.info.currenElemMatrix.number){
            cells
                .filter(item => !item.flag && !item.show)
                .forEach(item => {
                    item.show = true;
                    item.item.classList.remove('hide');
                })
        }
        else{
            let cellsGuess = cells
                .filter(item => !item.flag && !item.show)
                .map(cell=> {
                    return cell;
                });
            addGuess();
            setTimeout(removeGuess, 500);

            function addGuess(){
                cellsGuess.forEach(item=>item.item.classList.add('backlight'));
            }

            function removeGuess(){
                cellsGuess.forEach(item=>item.item.classList.remove('backlight'));
            }
        }
    }

    this.openAllMines = function(){
        let arr =[];
        let t = null;
        let s = 0;
        for (let row = 0; row < this.matrix.length; row++) {
            for (let j = 0; j < this.matrix[row].length; j++) {
                if(this.matrix[row][j].mine && !this.matrix[row][j].show){
                    arr.push(this.matrix[row][j]);
                }
            }
        }

        sound.src = './sound/flag.mp3';
        for (let i = 0; i < arr.length; i++) {
            s = 200 * i;
            t = setTimeout(function() {

                sound.play().catch(e=>console.log(e));

                arr[i].item.classList.add('flag');
                clearTimeout(t);
            }, 100 * i)
        }
        return s + 500;
    }

    this.openAllCell = function(){
        let arr =[];
        let t = null;
        let s = 0;
        for (let row = 0; row < this.matrix.length; row++) {
            for (let j = 0; j < this.matrix[row].length; j++) {
                if(!this.matrix[row][j].show && !this.matrix[row][j].flag){
                    arr.push(this.matrix[row][j]);
                }
            }
        }
        for (let i = 0; i < arr.length; i++) {
            s = 200 * i;
            t = setTimeout(function() {
                arr[i].item.classList.remove('hide');
                clearTimeout(t)
            }, 100*i)
        }
        return s;
    }

    this.openVoid = function (){
        const currentCell = this.info.currenElemMatrix;
        let voidCell = new Set();
        let numberCell = new Set();

        getVoidCell(this.matrix, currentCell.row, currentCell.column);

        function getVoidCell(matrix, row, column){
            const cellsAround = getAroundCells(matrix, row, column);
            for (let i = 0; i < cellsAround.length; i++) {
                addVoidCells(cellsAround)
            }
        }

        voidCell.forEach(item=>{
            const cellsAround = getAroundCells(this.matrix, item.row, item.column);
            addVoidCells(cellsAround)
        })

        function addVoidCells(cellsAround){
            for (let i = 0; i < cellsAround.length; i++) {
                if(!cellsAround[i].flag && !cellsAround[i].mine && !cellsAround[i].number){
                    voidCell.add(cellsAround[i])
                }
                else if(cellsAround[i].number){
                    numberCell.add(cellsAround[i]);
                }
            }
        }

        voidCell.forEach(item => item.show = true);
        numberCell.forEach(item => item.show = true);

        voidCell.forEach((item, i) => {
            item.item.classList.remove('hide');

        })
        numberCell.forEach((item) => {
            item.item.classList.remove('hide');

        })
    }
}




