class Stone {
    constructor(gameArea, color) {
        this.gameArea = gameArea;
        this.color = color;
        this.grabbed = false;
    }

    blueStone(){
        const stoneContainer = document.createElement('div');
        const blueStone = document.createElement('div');

        stoneContainer.classList.add('infinite_stones');
        stoneContainer.style.bottom = '' + Math.round(Math.random() * (80 - 6) + 6) + '%';
        blueStone.classList.add('blue_gem');

        this.gameArea.appendChild(stoneContainer);
        stoneContainer.appendChild(blueStone);

         stoneContainer.addEventListener('animationend', () => {
            this.gameArea.removeChild(stoneContainer);
         })
    }


    redStone(){
            const stoneContainer = document.createElement('div');
            const redStone = document.createElement('div');
    
            stoneContainer.classList.add('infinite_stones');
            stoneContainer.style.bottom = '' + Math.round(Math.random() * (80 - 6) + 6) + '%';
            redStone.classList.add('red_gem');
    
            this.gameArea.appendChild(stoneContainer);
            stoneContainer.appendChild(redStone);
    
             stoneContainer.addEventListener('animationend', () => {
                this.gameArea.removeChild(stoneContainer);
             })
    }

    pinkStone(){
        const stoneContainer = document.createElement('div');
        const pinkStone = document.createElement('div');

        stoneContainer.classList.add('infinite_stones');
        stoneContainer.style.bottom = '' + Math.round(Math.random() * (80 - 6) + 6) + '%';
        pinkStone.classList.add('pink_gem');

        this.gameArea.appendChild(stoneContainer);
        stoneContainer.appendChild(pinkStone);

         stoneContainer.addEventListener('animationend', () => {
            this.gameArea.removeChild(stoneContainer);
         }) 
    }

    purpleStone(){
        const stoneContainer = document.createElement('div');
        const purpleStone = document.createElement('div');

        stoneContainer.classList.add('infinite_stones');
        stoneContainer.style.bottom = '' + Math.round(Math.random() * (80 - 6) + 6) + '%';
        purpleStone.classList.add('purple_gem');

        this.gameArea.appendChild(stoneContainer);
        stoneContainer.appendChild(purpleStone);

         stoneContainer.addEventListener('animationend', () => {
            this.gameArea.removeChild(stoneContainer);
         })
    }

    greenStone(){
        const stoneContainer = document.createElement('div');
        const greenStone = document.createElement('div');

        stoneContainer.classList.add('infinite_stones');
        stoneContainer.style.bottom = '' + Math.round(Math.random() * (80 - 6) + 6) + '%';
        greenStone.classList.add('green_gem');

        this.gameArea.appendChild(stoneContainer);
        stoneContainer.appendChild(greenStone);

         stoneContainer.addEventListener('animationend', () => {
            this.gameArea.removeChild(stoneContainer);
        })
    }

    yellowStone(){
        const stoneContainer = document.createElement('div');
        const yellowStone = document.createElement('div');

        stoneContainer.classList.add('infinite_stones');
        stoneContainer.style.bottom = '' + Math.round(Math.random() * (80 - 6) + 6) + '%';
        yellowStone.classList.add('yellow_gem');

        this.gameArea.appendChild(stoneContainer);
        stoneContainer.appendChild(yellowStone);

         stoneContainer.addEventListener('animationend', () => {
            this.gameArea.removeChild(stoneContainer);
        })
    }


    

}