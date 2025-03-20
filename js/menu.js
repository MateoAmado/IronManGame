class Menu{
    constructor(gameArea){
    this.gameArea = gameArea;
    this.menuMusic = document.getElementById("menuMusic");
    this.menuOptionAudio = document.getElementById('menuOption');
    this.instructionsButton = document.createElement('div');
    this.menuScreen = document.createElement('div');
    this.instructions = document.createElement('div');
    this.goBack = document.createElement('div');
    this.soundMenuButton = document.createElement('div');
    this.playMenuButton = document.createElement('div');
    this.soundMenu = false;
    }

    //soundMenuButton()
    soundMenuButtonTF(){ 
      if(this.soundMenu == true){
       this.soundMenuButton.classList.remove('soundMenuButtonOn');
       this.soundMenuButton.classList.add('soundMenuButtonoff');
       this.soundMenu = false;
       this.stopMenuMusic();
       }
       else{
        this.soundMenuButton.classList.remove('soundMenuButtonoff');
        this.soundMenuButton.classList.add('soundMenuButtonOn');
        this.soundMenu = true;
        this.StartMenuMusic();
       }
    };//soundMenuButton();


// instructionsButton()
    instructionsButtonT(){ 
     this.instructions.classList.add('instructions');
     this.gameArea.appendChild(this.instructions);
     this.playMenuButton.classList.remove('playMenuButton');
     this.instructionsButton.classList.remove('optionsMenuButton');
     this.menuScreen.classList.remove('menu');
     this.goBack.classList.add('goBack');
     this.gameArea.appendChild(this.goBack);
     this.playMenuOptionSound();
    };//instructionsButton()

//goBack()
    goBackT(){ 
    this.playMenuButton.classList.add('playMenuButton');
    this.instructionsButton.classList.add('optionsMenuButton');
    this.menuScreen.classList.add('menu');
    this.instructions.classList.remove('instructions');
    this.goBack.classList.remove('goBack');
    this.playMenuOptionSound();
    };//goBack()

//playMenuButton()
    playMenuButtonT(){
     this.playMenuButton.classList.remove('playMenuButton');
     this.instructionsButton.classList.remove('optionsMenuButton');
     this.menuScreen.classList.remove('menu');
     this.soundMenuButton.classList.remove('soundMenuButtonoff');
     this.soundMenuButton.classList.remove('soundMenuButtonOn');
     this.playMenuOptionSound();
     //start();
    };
//playMenuButton()
StartMenuMusic(){
    this.menuMusic.play();
}

stopMenuMusic(){
    this.menuMusic.pause();
}

playMenuOptionSound() { 
    this.menuOptionAudio.play();
}

//showMenu()
showMenu(){
    this. menuScreen.classList.add('menu');
    this.gameArea.appendChild(this.menuScreen);
    this.playMenuButton.classList.add('playMenuButton');
    this.gameArea.appendChild(this.playMenuButton);
    this.instructionsButton.classList.add('optionsMenuButton');
    this.gameArea.appendChild(this.instructionsButton);
    this.soundMenuButton.classList.add('soundMenuButtonOn');
    this.gameArea.appendChild(this.soundMenuButton);
}//showMenu()
}