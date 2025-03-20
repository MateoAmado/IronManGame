class Enemy {
   constructor(gameArea) {
       this.gameArea = gameArea;
   }

   feet() {
       const enemyFeetContainer = document.createElement('div');
       const enemyFeet = document.createElement('div');
       
       enemyFeetContainer.classList.add('enemyFeet_container');
       enemyFeet.classList.add('enemy_feet');
       
       this.gameArea.appendChild(enemyFeetContainer);
       enemyFeetContainer.appendChild(enemyFeet);

       enemyFeetContainer.addEventListener('animationend', () => {
           this.gameArea.removeChild(enemyFeetContainer);
       });
   }

   air() {
       const enemyAirContainer = document.createElement('div');
       const enemyAir = document.createElement('div');

       enemyAirContainer.classList.add('enemyAir_container');
       enemyAirContainer.style.bottom = '' + Math.round(Math.random() * (80 - 20) + 30) + '%';
       enemyAir.classList.add('enemy_air');

       this.gameArea.appendChild(enemyAirContainer);
       enemyAirContainer.appendChild(enemyAir);

       enemyAirContainer.addEventListener('animationend', () => {
           this.gameArea.removeChild(enemyAirContainer);
       });
   }
}
