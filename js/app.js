// Enemies our player must avoid
var Enemy = function(locX,locY,speed) {
    this.width = 101;
    this.height = 171;
    this.x = locX;
    this.y = locY;
    this.sprite = 'images/enemy-bug.png';
    this.speed = speed;
}

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    this.x+=(this.speed*dt);
        //reset location and speed when the enemy reach the end of the canvas
        if (this.x > 505){
        this.x = 1;
        this.speed = Math.floor((Math.random()*500)+100);
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
    this.width = 101;
    this.height = 171;
    this.y = locY;
    this.x = locX;
    this.sprite = 'images/char-boy.png';
};

Hero.prototype.update = function() {
    
};

Hero.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
//Player movement
Hero.prototype.handleInput = function(allowedKeys) {
    var move = 50;
    switch(allowedKeys) {
        case 'left' :
            this.x-=move;
            break;
        case 'right' :
            this.x+=move;
            break;
        case 'up' :
            this.y-=move;
            break;
        case 'down':
            this.y+=move;    
    };
};
// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

//create new enemies intances, set location and starting speeed
var enemy1 = new Enemy(10,60,300);
var enemy2 = new Enemy(10,140,200);
var enemy3 = new Enemy(10,220,100);
var allEnemies = [enemy1, enemy2, enemy3];
var player = new Hero(200,400);

//create collision detection function
var checkCollisions = function(){
            console.log(player.x);
            console.log(enemy1.x);
}

//reset the game if the player reach the water
var endRound = function(){
    if (player.y < 50) {
        player.y = 400;
    };
}

endRound();

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
