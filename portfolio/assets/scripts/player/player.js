function player() {
    const player = document.querySelector('.player');
    const video = player.querySelector('video');
    const playerBtn = player.querySelector('.player__btn');
    const controlPanel = player.querySelector('.player__control');
    const control = {
        btn: {
            play: controlPanel.querySelector('.control__btn--play'),
            mute: controlPanel.querySelector('.control__btn--mute'),
            full: controlPanel.querySelector('.control__btn--full'),
            back: controlPanel.querySelector('.control__btn--back'),
            forward: controlPanel.querySelector('.control__btn--forward'),
            setting: controlPanel.querySelector('.control__btn--setting'),
        },
        progress: {
            volume: controlPanel.querySelector('.control__volume input'),
            time: controlPanel.querySelector('.control__progress input'),
        },
        time: {
            duration: controlPanel.querySelector('.control__time--duration'),
            current: controlPanel.querySelector('.control__time--current'),
        },
        setting: {
            box: controlPanel.querySelector('.control__setting'),
            skip: controlPanel.querySelector('#skip'),
            speed: controlPanel.querySelector('#speed'),
        }
    }
    let value = {
        volume: 0,
        current: 0,
        duration: 0,
        skip: 5,
        speed: 1,
        indexSpeed: 4,
        indexSkip: 0,
    }

    playerBtn.addEventListener('click', () => {
        value.duration = video.duration;
        value.current = video.currentTime;
        value.volume = control.progress.volume.value;
        control.progress.time.max = value.duration;
        control.time.duration.innerText = setTime(value.duration);
        control.time.current.innerText = setTime(value.current);
        setProgress(control.progress.volume, Math.floor(control.progress.volume.value * 100));
        setProgress(control.progress.time, video.currentTime);
        getSkip();
        getSpeed();
        playVideo();
    })

    control.btn.play.addEventListener('click', togglePlay)

    video.addEventListener('click', togglePlay)

    video.addEventListener('timeupdate', () => {
        value.current = video.currentTime / video.duration;
        control.time.current.innerText = setTime(video.currentTime);
        control.progress.time.value = video.currentTime;
        setProgress(control.progress.time, Math.floor((video.currentTime / video.duration) * 100));
    })

    control.progress.time.addEventListener('input', function changeProgress() {
        video.currentTime = this.value;
    })

    control.progress.volume.addEventListener('input', changeVolume)

    control.btn.mute.addEventListener('click', toggleVolume)

    video.addEventListener('ended', () => {
        video.load()
        player.classList.remove('play');
        console.log('ended')
    })

    control.btn.full.addEventListener('click', () => {
        video.requestFullscreen();
    })

    video.addEventListener('fullscreenerror', () => {
        console.log('fullscreenerror')
    })

    control.btn.setting.addEventListener('click', () => {
        control.setting.box.classList.toggle('open');
    })

    control.setting.skip.addEventListener('change', getSkip)

    control.setting.speed.addEventListener('change', () => {
        getSpeed();
        video.playbackRate = value.speed;
    })

    control.setting.speed.addEventListener('selectionchange', () => {
        console.log('selectionchange')
    })

    control.btn.back.addEventListener('click', () => {
        if ((video.currentTime - value.skip) !== 0) {
            video.currentTime -= value.skip;
            if (control.btn.back.disabled) {
            }
        } else {
            video.currentTime = 0;
        }
    })

    control.btn.forward.addEventListener('click', () => {
        if ((video.currentTime + +value.skip) < video.duration) {
            video.currentTime = video.currentTime + +value.skip;
            if (control.btn.back.disabled) {
            }
        } else {
            video.currentTime = video.duration - 1;
        }
    })

    window.addEventListener('resize', ()=>{
        if(window.innerWidth < 678){
            control.setting.speed.size = 1;
            control.setting.skip.size = 1;
        }
        else{
            control.setting.speed.size = 8;
            control.setting.skip.size = 3;
        }
    })

    function getSkip() {
        value.indexSkip = control.setting.skip[control.setting.skip.selectedIndex]
        value.skip = control.setting.skip[control.setting.skip.selectedIndex].value
    }

    function getSpeed() {
        value.indexSpeed = control.setting.speed[control.setting.speed.selectedIndex]
        value.speed = control.setting.speed[control.setting.speed.selectedIndex].value
    }

    function toggleBtnVolume() {
        if (video.volume === 0) {
            control.btn.mute.classList.add('mute');
        } else {
            control.btn.mute.classList.remove('mute');
        }
    }

    function changeVolume() {
        video.volume = this.value;
        value.volume = this.value;
        control.progress.volume.value = this.value;
        setProgress(control.progress.volume, Math.floor(this.value * 100))
        toggleBtnVolume()
    }

    function toggleVolume() {
        if (video.volume === 0) {
            video.volume = value.volume;
        } else {
            video.volume = 0;
        }
        toggleBtnVolume()
    }

    function setProgress(item, value) {
        item.style.background = `linear-gradient(to right, var(--player-active-color) ${value}%, var(--player-color) ${value}%, var(--player-color))`;
    }

    function setTime(time) {
        if (!time || typeof time != "number" || time < 0) {
            return "00:00:00";
        }
        let m = new Date(time * 1000).toISOString().match(/\d\d:\d\d:\d\d/);
        return m ? m[0].split(":").slice(0, 3).join(":") : "00:00:00";
    }

    function togglePlay() {
        if (document.fullscreenElement && document.fullscreenElement.nodeName === 'VIDEO') {
            return;
        }
        if (video.paused) {
            playVideo();
        } else {
            pauseVideo();
        }
    }

    function playVideo() {
        video.play();
        player.classList.remove('pause');
        player.classList.add('play');

    }

    function pauseVideo() {
        video.pause();
        player.classList.remove('play');
        player.classList.add('pause');
    }
}

export default player;



