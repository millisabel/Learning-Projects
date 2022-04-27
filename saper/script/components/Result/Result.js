export function Result() {
    this.tableBody = null;
    this.data = [];
    this.newDate = null;

    this.init = function () {
        this.tableBody = document.querySelector('tBody');
        if(localStorage.getItem('sapper')  !== null){
            this.data = (JSON.parse(localStorage.getItem('sapper'))).reverse();
        }
    }

    this.add = function(text, time) {
        this.getNewDate(text, time);
        this.addToDate();
        this.setLocalStorage();
        this.show();
    }

    this.setLocalStorage = () => {
        let result= [];
        if(localStorage.getItem('sapper')  !== null){
            result = JSON.parse(localStorage.getItem('sapper'));
        }
        if(result.length >= 10){
            result.shift();
        }
        result.push(this.newDate);
        localStorage.setItem('sapper', JSON.stringify(result));
    }

    this.getNewDate = (text, time) => {
        this.newDate = {
            state: text,
            time: time
        }
    }

    this.addToDate = () => {
        if(this.data.length >= 10){
            this.data.pop();
        }
        this.data.unshift(this.newDate);
    }

    this.show = () => {
        this.tableBody.innerHTML = '';
        this.data.forEach((row, i) => {
            let tr = document.createElement('tr');
            let td = document.createElement('td');
            td.innerHTML = i + 1;
            tr.append(td);
            for(const key in row){
                let td = document.createElement('td');
                td.innerHTML = row[key];
                tr.append(td);
            }
            this.tableBody.append(tr);
        })
    }

    this.init();
    if(this.data){
        this.show();
    }
}