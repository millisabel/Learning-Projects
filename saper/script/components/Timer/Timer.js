export function Timer(time){
    this.sec = 0;
    this.min = 0;
    this.hrs = 0;
    this.t = null;

    this.tick = () => {
        this.sec++;
        if (this.sec >= 60) {
            this.sec = 0;
            this.min++;
            if (this.min >= 60) {
                this.min = 0;
                this.hrs++;
            }
        }
    }

    this.startTimer = () => {
        this.tick();
    }

    this.stopTimer = () => {
        clearTimeout(this.t);
    }

    this.clearTimer = () => {
        this.sec = 0;
        this.min = 0;
        this.hrs = 0;
        clearTimeout(this.t);
        this.fill();
    }

    this.timer = () => {
        this.t = setTimeout(this.add, 1000);
    }

    this.add = () => {
        this.tick();
        this.fill();
        this.timer();
    }

    this.fill = () => {
        time.textContent = (this.hrs > 9 ? this.hrs : "0" + this.hrs)
            + ":" + (this.min > 9 ? this.min : "0" + this.min)
            + ":" + (this.sec > 9 ? this.sec : "0" + this.sec);
    }
    
    this.add();
}