var config = {
    type: Phaser.AUTO,
    scale: {
        mode: Phaser.Scale.RESIZE,
        width: '100%',
        height: '100%'
    },
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 500 }, 
            debug: false
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

var game = new Phaser.Game(config);
var sprite;
var background;
var backgroundMusic;
var projectiles;
var aliens;
var initialRespawnTime = 1200;
var respawnTimer;
var score = 0;
let currentScene;
let fireCount = 0;
let element;



function preload() {
    // Load assets like images and sprites
    this.load.image('background', '/client/art/backgroundGame.png');
    this.load.image('sprite', '/client/art/sprite.png');
    this.load.audio('backgroundMusic', '/client/art/space.mp3');
    this.load.image('projectile', '/client/art/projectile.png');
    this.load.image('aliens', '/client/art/enemy1.png');

}

function create() {
    // Create game objects and initialize game state
     
    //keep track of current scene
    currentScene = this;
    //doesnt start game until instructions are closed
    if(element.style.display != "none"){
        this.scene.pause();
    }

    //backgroud
    background = this.add.tileSprite(0, 0, window.innerWidth, window.innerHeight, 'background').setOrigin(0).setScrollFactor(0);
    //sprite
    sprite = this.physics.add.sprite(50, 20, 'sprite').setOrigin(0, 1);
    sprite.setScale(1.6);
    sprite.setSize(sprite.width * 1.2, sprite.height * 1.4);
    sprite.setCollideWorldBounds(true);
    this.input.keyboard.on('keydown-SPACE', jump); //trigger jump function
    //music
    backgroundMusic = this.sound.add('backgroundMusic', {loop: true});
    backgroundMusic.play();
    //projectile
    projectiles = this.physics.add.group();
    this.input.keyboard.on('keydown-D', shoot); 
    //reload
    this.input.keyboard.on('keydown-F', reload);
    //enemy1 respawn
    respawnTimer = this.time.addEvent({
        delay: initialRespawnTime,
        callback: respawnAlien,
        callbackScope: this,
        loop: true
    });

    //score tracker
    scoreText = this.add.text(16, 16, 'Score: ' + score, { fontSize: '32px', fill: '#ff0000' });
}


function respawnAlien(){
    //console.log('respawn alien');
    //alien enemies
    aliens = this.physics.add.sprite(game.scale.width, Phaser.Math.Between(90, 640), 'aliens'); //game.scale.width is right border
    aliens.setScale(1.6);
    //fix hitbox
    aliens.setSize(aliens.width * 0.1, aliens.height * 0.3);
    //so it doesnt fall
    aliens.body.allowGravity = false;
    //alien and projectile collider
    this.physics.add.collider(projectiles, aliens, projectileEnemyCollision, null, this);
    //alien and sprite collider
    this.physics.add.collider(sprite, aliens, spriteEnemyCollision, null, this);
    //respawn time reducer
    if(score > 0 && score % 100 === 0 && initialRespawnTime > 100){
        initialRespawnTime -= 100;
        console.log('speed increased');
        respawnTimer.delay = initialRespawnTime;
    }
}




function update() {
    // Update game state 
    background.tilePositionX += 1; //Make background move
    
    //alien enemy movement
    if(aliens && aliens.scene){
        aliens.setVelocityX(-400);
    }

    
}

function jump(event) {
    //console.log('function called');
    event.preventDefault();
 
    sprite.setVelocityY(-500); // Make player jump 
    
  
    
}

function projectileEnemyCollision(projectile, enemy) {
    projectile.destroy(); // Destroy the projectile
    enemy.destroy(); // Destroy the enemy
    //update score
    score += 10; 
    scoreText.setText('Score: ' + score);
}

function spriteEnemyCollision(sprite, enemy){
    sprite.destroy();
    enemy.destroy();
    this.scene.pause();
    var element = document.getElementById("gameOver");
    element.style.display = "block";
}


function shoot() {
    //display reload text immediately when needed
    if (fireCount === 3) {
        reloadText = currentScene.add.text(16, 50, 'Press F to Reload' , { fontSize: '50px', fill: '#ff0000' });
     
    }
    //stop shooting when need reload
    if (fireCount === 4) {
        return; 
    }

    var offsetX = 20; // put the project on the right side of the sprite
    
    // put the projectile in the middle of the sprite
    var offsetY = -sprite.height / 2 - 30; 
    var projectileX = sprite.x + sprite.width / 2 + offsetX;
    var projectileY = sprite.y + sprite.height / 2 + offsetY;
    var projectile = projectiles.create(projectileX, projectileY, 'projectile');
   
    projectile.setVelocityX(800); //set projectile movement
    projectile.body.allowGravity = false; // turn off gravity for projectile

    fireCount += 1;
}

function reload(){
    fireCount = 0;
    reloadText.destroy();
}


function exitInstructionPrompt(){
    element = document.getElementById("instructions");
    element.style.display = "none";
    //start game when instruction prompt closed
    currentScene.scene.restart();
}

function gameReset(){
    score = 0;
    fireCount = 0;
    initialRespawnTime = 1000;
    backgroundMusic.stop();
    currentScene.scene.restart();
    var element = document.getElementById("gameOver");
    element.style.display = "none";
}

