
//variables const:
const gameArea = document.getElementById('game_area');
const enemy = new Enemy(gameArea);
const player = new Player(gameArea);
const battery = new Battery(gameArea);
const backgroundMusic = document.getElementById('backgroundMusic');
const menu = new Menu(gameArea);
//clase menu:

menu.showMenu();
//fin clase menu
const hitAudio = document.getElementById('hitAudio');
const hitGem = document.getElementById('collectedGem');
const hitBattery = document.getElementById('hitBattery');
const gameOverSound = document.getElementById('gameOverSound');
const victory = document.getElementById('victory');

//variables let:
//div elements:
let timerDiv = document.createElement('div');
let seconds = document.createElement('div');
let winScreen = document.createElement('div');
let soundButton = document.createElement('div');
let pauseButton = document.createElement('div');
let gameOverReplay = document.createElement('div'); //gameover reset
let resetButton = document.createElement('div');
let healtBar = document.createElement('div');
let gembar = document.createElement('div');

let lives = 3;
let fly = false;
let hit = false;
let gameOver = false;
let gameWin = false;
let flyUp = false;
let flyDown = false;
let sound = true;
let allStonesGrabbed = false;
let paused = false;

//infinite stones:
let blueStone = new Stone(gameArea, 'blue');
let redStone = new Stone(gameArea, 'red');
let pinkStone = new Stone(gameArea, 'pink');
let purpleStone = new Stone(gameArea, 'purple');
let greenStone = new Stone(gameArea, 'green');
let yellowStone = new Stone(gameArea, 'yellow');

//Intervals
let airEnemyInterval; 
let feetEnemyInterval;
let batteryInterval;
let blueStoneInterval;
let redStoneInterval;
let pinkStoneInterval;
let purpleStoneInterval;
let greenStoneInterval;
let yellowStoneInterval;
let timerInterval; 
let secondsElement;



//Listeners:
menu.soundMenuButton.addEventListener('click', () => {
    menu.soundMenuButtonTF();
});

menu.instructionsButton.addEventListener('click', () => {
    menu.instructionsButtonT();
});

menu.goBack.addEventListener('click', () => {
    menu.goBackT();
});

menu.playMenuButton.addEventListener('click', () => {
    menu.playMenuButtonT();
    start();
})



//Teclas para mover al personaje()
document.addEventListener('keydown', (e) => {
    if(!gameOver){
    switch(e.key){
      case 'ArrowUp':
         if(!fly){
          player.jump();
         }
         else{
          if (!player.movementInterval) { 
           player.flyUp();
          }
         }
      break;
      case 'ArrowDown':
      if(fly){
          if (!player.movementInterval) { 
            player.flyDown();
          }
      }
      break;
      case ' ':
         if(!fly){
            player.fly();
            fly = true;
         }
         else{
          fly = false;
         player.goDown();
         }
      break;
    }
}
});

document.addEventListener('keyup', (event) => {
    if(!gameOver){
    if (fly) {
        if (event.key === 'ArrowUp' || event.key === 'ArrowDown') {
            player.clearMovement();
        }
    }
  }
});
//fin Teclas para mover al personaje()

//soundButton()
soundButton.addEventListener('click', () => {
    if(sound == true){
       soundButton.classList.remove('soundButtonOn');
       soundButton.classList.add('soundButtonoff');
       sound = false;
       pauseBackgroundMusic();
    }
    else{
       soundButton.classList.remove('soundButtonoff');
       soundButton.classList.add('soundButtonOn');
       sound = true;
       playBackgroundMusic();
    }
});////soundButton()

//pauseButton();
pauseButton.addEventListener('click', () => {
    if(paused == false && lives != 0){
    document.querySelectorAll('div').forEach(element => {
        element.classList.add('paused');
    });
    clearAllIntervals(); 
    paused = true; 
    pauseButton.classList.remove('pauseButton');
    pauseButton.classList.add('playButton');
    }
    else{
        document.querySelectorAll('div').forEach(element => {
            element.classList.remove('paused');    
        });
        paused = false;
        pauseButton.classList.remove('playButton');
        pauseButton.classList.add('pauseButton');
        resume();
    }
});//pauseButton();


//resetButton()
resetButton.addEventListener('click', () => {
    this.reset();
    menu.playMenuOptionSound();
    resetBackgroundMusic();
});
//resetButton()

//Sonidos:
function appearSoundButton(){
    soundButton.classList.add('soundButtonOn');
    gameArea.appendChild(soundButton);
}

function appearPauseButton(){
    pauseButton.classList.add('pauseButton');
    gameArea.appendChild(pauseButton);
}

function playBackgroundMusic() {
    backgroundMusic.play();
}

function pauseBackgroundMusic() {
    backgroundMusic.pause();
}
function resetBackgroundMusic() {
    backgroundMusic.currentTime = 0; 
    backgroundMusic.play(); 
}

function playHitAudio() {
    hitAudio.play();  
}

function playCollectedGemSound() {
    hitGem.play();
}

function playHitBatterySound() {
    hitBattery.play();
}

function playGameOverSound() {
   gameOverSound.play();
}

function playVictorySound() {
    victory.play();
}
//fin Sonidos:

//Resumen del pausa
function resume(){
    if(lives > 0){
     starGenerateBatterys();
     starGenerateStones();
     startGeneratingEnemies();
    }
}

//Cuando se quiera iniciar el juego:
function start(){
menu.stopMenuMusic();
player.run();
healtBar.classList.add('lives_3');
gameArea.appendChild(healtBar);
gembar.classList.add('gemsCollected');
gameArea.appendChild(gembar);
activateTimer();
appearPauseButton();
appearSoundButton();
playBackgroundMusic();
starGenerateBatterys();
starGenerateStones();
startGeneratingEnemies();
gameLoop(); 
startTimer();
}

//gameLoop()
function gameLoop(){
    
    checkCollisionBattery();
    enemyCollisions();
    checkCollisionGems();
    updateHealtBar();
    if(lives > 0 && allStonesGrabbed == false && totalTime > 0){
        requestAnimationFrame(gameLoop);
    } else if(allStonesGrabbed == true){  
        gameWin = true;
        clearAllIntervals();
        document.querySelectorAll('div').forEach(element => {
            element.classList.add('paused');
        });
        showWin();
    }
    else if(lives == 0 || totalTime == 0){
        pauseBackgroundMusic();
        if(player.flying.classList.contains('player_fly_container')){
            player.gameOver();
        }
        else{
        player.gameOver();
        }
        gameOver = true;
        if (gameOver){
            playGameOverSound();
            lives = 0;
            player.game_over.addEventListener('animationend', () => {
                document.querySelectorAll('div').forEach(element => {
                    element.classList.add('paused');
                    showGameOver();
                });
            });
        }
        clearAllIntervals();
    }
    
}//gameLoop();

//Muestra la pantalla del ganador
function showWin(){
    if(gameWin == true){
        pauseBackgroundMusic();
        player.clean();
        playVictorySound();
        winScreen.classList.add('you_win');
        gameArea.appendChild(winScreen);
        removeLife();
        removegemsCollected();
        removeTimer();
        removePause();
        removeSound();
    }
}//showWin();



//Activa el timer
function activateTimer(){
    seconds.id = "seconds";
    seconds.innerHTML = "60";
    timerDiv.classList.add('timer');
    gameArea.appendChild(timerDiv);  // Agregar el contenedor del temporizador al DOM
    timerDiv.appendChild(seconds);   // Agregar el elemento 'seconds' al contenedor
}// activateTimer();


function removeLife(){
    gameArea.removeChild(healtBar);
}

function removegemsCollected(){
    gameArea.removeChild(gembar);
}

function removeTimer(){
    gameArea.removeChild(document.querySelector('.timer'));
    gameArea.removeChild(document.querySelector('#seconds'));
}

function removePause(){
    gameArea.removeChild(pauseButton);
}

function removeSound(){
    gameArea.removeChild(pauseButton);
}

//clearAllIntervals()
function clearAllIntervals(){
    clearInterval(timerInterval);
    clearInterval(airEnemyInterval);
    clearInterval(feetEnemyInterval);
    clearInterval(batteryInterval);
    clearInterval(blueStoneInterval)
    clearInterval(redStoneInterval);
    clearInterval(pinkStoneInterval);
    clearInterval(purpleStoneInterval);
    clearInterval(greenStoneInterval);
    clearInterval(yellowStoneInterval);
}//clearAllIntervals()

//reset()
//resetea el juego
function reset(){
    lives += 3;
    gameOver = false;
    totalTime = 60;
    fly = false;
    timerInterval = setInterval(updateTimer, 1000);
    gameOverReplay.classList.remove('game_over_replay');
    resetButton.classList.remove('restart_button');
    gameArea.removeChild(gameOverReplay);
    player.game_over.classList.remove('game_over');
    document.querySelectorAll('div').forEach(element => {
        element.classList.remove('paused');
    });
    player.clean();
    player.run();
    updateHealtBar();
    setStonesNonGrabbed();
    starGenerateBatterys();
    starGenerateStones();
    startGeneratingEnemies();
    gameLoop();
}//reset()

//setStonesNonGrabbed()
function setStonesNonGrabbed(){
  blueStone.grabbed = false;
  redStone.grabbed = false;
  pinkStone.grabbed = false;
  purpleStone.grabbed = false;
  greenStone.grabbed = false;
  yellowStone.grabbed = false;
  gembar.classList.remove('gemsCollected_1');
  gembar.classList.remove('gemsCollected_2');
  gembar.classList.remove('gemsCollected_3');
  gembar.classList.remove('gemsCollected_4');
  gembar.classList.remove('gemsCollected_5');
  gembar.classList.remove('gemsCollected_6');
  gembar.classList.add('gemsCollected');
}//setStonesNonGrabbed()

//Muestra la pantalla game over
function showGameOver(){ 
    gameOverReplay.classList.add('game_over_replay');
    gameArea.appendChild(gameOverReplay);
    resetButton.classList.add('restart_button');
    gameArea.appendChild(resetButton);
}//showGameOver()

//actualiza la barra de salud
function updateHealtBar(){
   if(lives == 3){
    healtBar.classList.remove('lives_0');
    healtBar.classList.remove('lives_2');
    healtBar.classList.remove('lives_1');
     healtBar.classList.add('lives_3');
   }
   else if(lives == 2){
    healtBar.classList.remove('lives_3');
    healtBar.classList.remove('lives_1');
    healtBar.classList.remove('lives_0');
    healtBar.classList.add('lives_2');
   }
   else if(lives == 1){
    healtBar.classList.remove('lives_2');
    healtBar.classList.remove('lives_3');
    healtBar.classList.remove('lives_0');
    healtBar.classList.add('lives_1');
   }
   else{
    healtBar.classList.remove('lives_2');
    healtBar.classList.remove('lives_3');
    healtBar.classList.remove('lives_1');
    healtBar.classList.add('lives_0');
   }
}//updateHealtBar()

//enemyCollisions()
function enemyCollisions(){
    let playerAction; //saltar/correr
    let example = document.querySelectorAll('.enemyFeet_container, .enemyAir_container');
    example.forEach((element, index) => {
    
   playerAction = updatePlayerAction();
    if(lives == 0){
        player.gameOver();
    }
    else if (!element.classList.contains('processed') && checkCollision(playerAction, element)) {
        
        lives--;
        playHitAudio();
        if(element.classList.contains('enemyFeet_container') && lives != 0){
        player.hit();
        }
        element.classList.add('processed'); 
         }
    });
     
}//enemyCollisions()

//checkCollisionGems()
function checkCollisionGems(){
    let gems = document.querySelectorAll('.infinite_stones');
    gems.forEach(element => {
    let playerActionGem;
    updatePlayerAction(playerActionGem); 
    if (!element.classList.contains('processed') && checkCollision(playerAction, element)) {
        playCollectedGemSound();
        if(lives < 3){
        lives++;
        }
        
        Array.from(element.children).forEach(child => {
            if (child.classList.contains('blue_gem')) {
                blueStone.grabbed = true;
                starGenerateStones();
                child.classList.remove('blue_gem');
                gembar.classList.remove('gemsCollected');
                gembar.classList.add('gemsCollected_1');
            } else if (child.classList.contains('red_gem')) {
                redStone.grabbed = true;
                starGenerateStones();
                child.classList.remove('red_gem');
                gembar.classList.remove('gemsCollected_1');
                gembar.classList.add('gemsCollected_2');
            } else if (child.classList.contains('pink_gem')) {
                pinkStone.grabbed = true;
                starGenerateStones();
                child.classList.remove('pink_gem');
                gembar.classList.remove('gemsCollected_2');
                gembar.classList.add('gemsCollected_3');
            } else if (child.classList.contains('purple_gem')) {
                purpleStone.grabbed = true;
                starGenerateStones();
                child.classList.remove('purple_gem');
                gembar.classList.remove('gemsCollected_3');
                gembar.classList.add('gemsCollected_4');
            } else if (child.classList.contains('green_gem')) {
                greenStone.grabbed = true;
                starGenerateStones();
                child.classList.remove('green_gem');
                gembar.classList.remove('gemsCollected_4');
                gembar.classList.add('gemsCollected_5');
            } else if (child.classList.contains('yellow_gem')) {
                yellowStone.grabbed = true;
                starGenerateStones();
                child.classList.remove('yellow_gem');
                gembar.classList.remove('gemsCollected_5');
                gembar.classList.add('gemsCollected_6');
            }
        });
        element.classList.add('processed');
    }
});
}//checkCollisionGems()

//updatePlayerAction()
function updatePlayerAction(){
 if (player.jumpingContainer.classList.contains('jump_container')) {
    return player.jumpingContainer;
}else if (player.running.classList.contains('run')) {
    return  playerAction = player.running;
}else if (player.flyingHitbox.classList.contains('player_fly_hitbox')) {
    return playerAction = player.flyingHitbox;
}
};//updatePlayerAction()

//startGeneratingEnemies()
function startGeneratingEnemies() {
    airEnemyInterval = setInterval(generateAirEnemy, 1200);
    feetEnemyInterval = setInterval(generateFeetEnemy, 1500);
};
//startGeneratingEnemies()

//starGenerateStones()
function starGenerateStones(){
    if(blueStone.grabbed == false){
    blueStoneInterval = setInterval(generateBlueStone, 7000);
    }
    else{
        if(redStone.grabbed == false){
            clearInterval(blueStoneInterval);
            redStoneInterval = setInterval(generateRedStone, 7000);
        }
        else{
            clearInterval(redStoneInterval);
            if(pinkStone.grabbed == false){
                pinkStoneInterval = setInterval(generatePinkStone, 7000);
            }
            else{
                clearInterval(pinkStoneInterval);
                if(purpleStone.grabbed == false){
                    purpleStoneInterval = setInterval(generatePurpleStone, 7000);
                }
                else{
                 clearInterval(purpleStoneInterval);
                 if(greenStone.grabbed == false){
                    greenStoneInterval = setInterval(generateGreenStone, 7000);
                 }
                 else{
                    clearInterval(greenStoneInterval);
                    if(yellowStone.grabbed == false){
                    yellowStoneInterval = setInterval(generateYellowStone, 7000);
                    }
                    else{
                        clearInterval(yellowStoneInterval);
                        allStonesGrabbed = true;
                    }
                 }
                }
            }

        }

    }
}//starGenerateStones()

function generateBatterys(){
    battery.battery();
}

function generateYellowStone(){
    yellowStone.yellowStone();
}

function generateGreenStone(){
    greenStone.greenStone();
}

function generatePurpleStone(){
    purpleStone.purpleStone();
}

function generatePinkStone(){
    pinkStone.pinkStone();
}

function generateRedStone(){
    redStone.redStone();
}

function generateBlueStone(){
    blueStone.blueStone();
}

function generateFeetEnemy(){
    enemy.feet();
}

function generateStone(){
    stone.blueStone();
}

function generateAirEnemy(){
    enemy.air();
}

//checkCollision()
function checkCollision(div1, div2) {
    const rect1 = div1.getBoundingClientRect();
    const rect2 = div2.getBoundingClientRect();
    
    if (!(rect1.right < rect2.left ||
        rect1.left > rect2.right ||
        rect1.bottom < rect2.top ||
        rect1.top > rect2.bottom)) {
        return true;
    }
}//checkCollision()



//Timer:
function starGenerateBatterys(){
    batteryInterval = setInterval(generateBatterys, 6000);
}

let totalTime = 60;

//checkCollisionBattery()
function checkCollisionBattery(){
    let playerAction;
    let example = document.querySelectorAll('.battery');
    example.forEach(element => {
    
   playerAction = updatePlayerAction();

    if (!element.classList.contains('processed') && checkCollision(playerAction, element)) {
        totalTime = totalTime + 10;
        playHitBatterySound();
        if(totalTime > 60){
            totalTime = 60;
        }
        element.classList.add('processed');
        element.classList.remove('battery'); 
        }
    });
}//checkCollisionBattery();


function startTimer() {
    secondsElement = document.getElementById("seconds"); 

    if (!secondsElement) {
        console.error("Elemento con ID 'seconds' no encontrado");
        return;
    }

    updateTimer();

    timerInterval = setInterval(updateTimer, 1000);
}

function updateTimer() {
    if (totalTime > 0) {
        totalTime--;
        secondsElement.innerHTML = totalTime;
    } else {
        clearInterval(timerInterval);
    }
}
//fin timer
