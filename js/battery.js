class Battery{
    constructor(gameArea){
        this.gameArea = gameArea;
    
    }

    battery(){
        let battery = document.createElement('div');
        battery.classList.add('battery');
        battery.style.bottom = '' + Math.round(Math.random() * (80 - 6) + 6) + '%';
        this.gameArea.appendChild(battery);

        battery.addEventListener('animationend', () => {
            this.gameArea.removeChild(battery);
        })
    }

    grab(){
        this.gameArea.removeChild(battery);
    }
}