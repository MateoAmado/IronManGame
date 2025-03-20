class Player {
    constructor(gameArea) {
        this.gameArea = gameArea;
        this.character = document.getElementById('character');
        this.player = document.createElement('div');
        this.running = document.createElement('div');
        this.jumpingContainer = document.createElement('div');
        this.jumping = document.createElement('div');
        this.flyingHitbox = document.createElement('div');
        this.flying = document.createElement('div');
        this.flyingSteps = document.createElement('div');

        this.movingInterval = null;
        this.game_over = document.createElement('div');
        this.gameOverScreen = document.createElement('div');
        this.player.classList.add('player');
       
        

        this.character.appendChild(this.player);
        this.player.appendChild(this.running);
        this.gameArea.appendChild(this.jumpingContainer); 
        this.jumpingContainer.appendChild(this.jumping); 
        this.gameArea.appendChild(this.flying);
        this.gameArea.appendChild(this.flyingHitbox);
        this.flying.appendChild(this.flyingSteps);
    }

    //run()
    run() {
        this.running.classList.add('run');
    }
    //run()

    //jump()
    jump() {
        
        if (this.running.classList.contains('run')) {
            this.clean();
            this.jumpingContainer.classList.add('jump_container');
            this.jumping.classList.add('jump');

            this.jumpingContainer.addEventListener('animationend', () => {
                this.fall();
            });
            
        }
    }//jump()

    //fly();
    fly(){
        if(this.jumpingContainer.classList.contains('jump_container')){
         this.jumpingContainer.addEventListener('animationend', () =>{
            this.running.classList.remove('run');
            this.flyingSteps.classList.add('player_fly');
            this.flying.classList.add('player_fly_container');
            this.flyingHitbox.classList.add('player_fly_hitbox');
         });
        }
        else{
            this.running.classList.remove('run');
            this.flyingSteps.classList.add('player_fly');
            this.flying.classList.add('player_fly_container');
            this.flyingHitbox.classList.add('player_fly_hitbox');
        }
    }//fly();

    //flyUp()
    flyUp() {
        this.clearMovement();
        this.movementInterval = setInterval(() => {
            let bottomValueUp = parseInt(this.flying.style.bottom) || 6;
            let bottomValueUpHitbox = parseInt(this.flyingHitbox.style.bottom) || 14.5;
           
            if (bottomValueUp < 83 && bottomValueUpHitbox < 83) { 
                this.flying.style.bottom = (bottomValueUp + 2) + '%';
                this.flyingHitbox.style.bottom = (bottomValueUpHitbox + 2) + '%';
            }
        }, 50); 
    }//flyUp()

    //flyDown()
    flyDown() {
        this.clearMovement();
        this.movementInterval = setInterval(() => {
            let bottomValueDown = parseInt(this.flying.style.bottom) || 6; 
            let bottomValueDownHitbox = parseInt(this.flyingHitbox.style.bottom) || 14.5;
            
            if (bottomValueDown > 22 && bottomValueDownHitbox > 22) { 
                this.flying.style.bottom = (bottomValueDown - 2) + '%';
                this.flyingHitbox.style.bottom = (bottomValueDownHitbox - 2) + '%';
            }
        }, 50); 
    }////flyDown()

    //goDown()
    goDown(){
        
        this.clearMovement();
        this.movementInterval = setInterval(() => {
            let bottomValueDown = parseInt(this.flying.style.bottom) || 6;
            let bottomValueDownHitbox = parseInt(this.flyingHitbox.style.bottom) || 14.5;
            if (bottomValueDown > 0 && bottomValueDownHitbox > 14.5) { 
                this.flying.style.bottom = (bottomValueDown - 2) + '%';
                this.flyingHitbox.style.bottom = (bottomValueDownHitbox - 2) + '%';
            }
            if(bottomValueDown == 6){
                
                this.fall();
            }
        }, 50); 
    }////goDown()


    //hit()
    hit(){
        this.running.style.opacity = '0';
        let hit = document.createElement('div');
        let hitImage = document.createElement('div');
        hit.classList.add('hit');
        this.gameArea.appendChild(hit);
        hitImage.classList.add('hit_image');
        hit.appendChild(hitImage);

        hitImage.addEventListener('animationend', () => {
            this.running.style.opacity = '1';
            this.gameArea.removeChild(hit);
          
        });
    }//hit()

    //goDownGameOver()
    goDownGameOver(){
        
        this.clearMovement();
        this.movementInterval = setInterval(() => {
            let bottomValueDown = parseInt(this.flying.style.bottom) || 6;
            let bottomValueDownHitbox = parseInt(this.flyingHitbox.style.bottom) || 14.5;
            if (bottomValueDown > 0 && bottomValueDownHitbox > 14.5) { 
                this.flying.style.bottom = (bottomValueDown - 2) + '%';
                this.flyingHitbox.style.bottom = (bottomValueDownHitbox - 2) + '%';
            }
            if(bottomValueDown == 6){
                

                this.fall();
                this.gameOver();
            }
        }, 50); 
    }////goDownGameOver()

    //gameOver()
    gameOver(){
        if(this.flying.classList.contains('player_fly_container')){
            this.goDownGameOver();
        }
        else if(this.jumpingContainer.classList.contains('jump_container')){
            this.jumpingContainer.addEventListener('animationend', () => {
                this.gameOver();
            })
        }
        else{
        
        this.running.classList.remove('run');
        this.gameArea.appendChild(this.game_over);
        this.game_over.classList.add('game_over');
        

        this.game_over.addEventListener('animationend', () => {
            this.game_over.classList.remove('game_over');
            
            this.gameOverScreen.classList.add('game_over_screen');
            this.gameArea.appendChild(this.gameOverScreen);
           
        });
        }
        

    }
    //gameOver()

    clearMovement() {
        if (this.movementInterval) {
            clearInterval(this.movementInterval);
            this.movementInterval = null;
        }
    }

    fall() {
        this.clean();
        this.run();
    }

    clean() {
        this.running.classList.remove('run');
        this.jumping.classList.remove('jump');
        this.clearMovement();
        this.flyingSteps.classList.remove('player_fly');
        this.flying.classList.remove('player_fly_container');
        this.flyingHitbox.classList.remove('player_fly_hitbox');
        this.jumpingContainer.classList.remove('jump_container');
        this.game_over.classList.remove('game_over');
        this.gameOverScreen.classList.remove('game_over_screen');
    }

    
  
}
