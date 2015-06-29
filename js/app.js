"use strict";
//set initial characters
var characters = ['images/char-boy.png', 'images/char-cat-girl.png','images/char-horn-girl.png', 'images/char-pink-girl.png', 'images/char-princess-girl.png'];
var char = 0;
var listOfCharacter = document.getElementsByTagName('ul')[0];

// Enemies our player must avoid
var Enemy = function(locX,locY,speed) {
    this.width = 80;
    this.height = 50;
    this.x = locX;
    this.y = locY;
    this.sprite = 'images/enemy-bug.png';
    this.speed = speed;

}
//Set of posible Y position
var locationsY = [60,140,220,60,140,220,60,140,220,140,220,60]; 

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    this.x+=(this.speed*dt);
    //reset location and speed when the enemy reach the end of the canvas
    if (this.x > 505){
        this.x = 1;
        this.speed = Math.floor((Math.random()*150)+100);
        var randomNumber = Math.floor(Math.random()*10+1);
        this.y = locationsY[randomNumber]
    };
}

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

var Hero = function(locX, locY) {
    this.width = 50;
    this.height = 50;
    this.y = locY;
    this.x = locX;
    this.sprite = characters[char];
};

Hero.prototype.update = function() {
};

Hero.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

//Player movement
Hero.prototype.handleInput = function(keys) {
    var move = 50;
    switch(keys) {
        case 'left' :
            if (this.x > 1 ){
                this.x-=move;
            };
            break;
        case 'right' :
            if (this.x < 400) {
                this.x+=move;
            };
            break;
        case 'up' :
            if (this.y < 55) {
                this.y = 400;
                updateScore(); 
            } else {
                this.y-=move;
            }
            break;
        case 'down':
            if (this.y < 400) {
                this.y+=move;
            };
    };
};
// change character function
Hero.prototype.updateCharacter = function(selection) {
        switch (selection) {
            case '0':
                char = 0;
                this.sprite = characters[char];
                break;
            case '1':
                char = 1;
                this.sprite = characters[char];
                break;
            case '2':
                char = 2;
                this.sprite = characters[char];
                break;
            case '3' :
                char = 3;
                this.sprite = characters[char];
                break;
            case '4' :
                char = 4;
                this.sprite = characters[char];
                break;
        };               
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

//create new enemies intances, set location and starting speeed
var enemy1 = new Enemy(10,locationsY[0],300);
var enemy2 = new Enemy(10,locationsY[1],200);
var enemy3 = new Enemy(10,locationsY[2],100);
var allEnemies = [enemy1, enemy2, enemy3];
var player = new Hero(200,400);

//Set score board
var scoreBoard = document.getElementById('score');
var score = 0
scoreBoard.innerHTML = ' ' + score;

//function to reset the score
var resetScore = function() {
    score = 0;
    scoreBoard.innerHTML = ' ' + score;
};

//function to update the score
var updateScore = function(){        
    score++;
    scoreBoard.innerHTML = ' ' + score;
};

//Axis-Aligned Bounding box collision algorithm - more info at https://developer.mozilla.org/en-US/docs/Games/Techniques/2D_collision_detection#Collision_Performance
function collision(a, b) {
    return a.x < b.x + b.width &&
        a.x + a.width > b.x &&
        a.y < b.y + b.height &&
        a.y + a.height > b.y;
}

//function to handle collision, reset player position and score
var checkCollisions = function(){
    for (var i = 0; i < allEnemies.length; i++ ){
        if (collision(player,allEnemies[i])) {
            player.x = 200;
            player.y = 400;
            resetScore();
        };
    };    
};
// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };
    player.handleInput(allowedKeys[e.keyCode]);
});

//stops arrows key to move the browser window
document.addEventListener('keydown', function(e){
    e.preventDefault();
})

//Add event listener to list of character and pass argument to the updateCharacter function
listOfCharacter.addEventListener('click', function(e){
    player.updateCharacter(e.target.id);                             
});