void setup() {
	size(400,400);
}
var BRICK_WIDTH = 20;
var BRICK_HEIGHT = 10;
var BALL_WIDTH = 8;
var BALL_HEIGHT = 8;
var bgCOLOR = color(169, 232, 242);


var brickObj = function(x, y) {
    this.x = x;
    this.y = y;
    this.hit = 0;

};

var bulletObj = function(x,y) {
    this.x = x;
    this.y = y;
    this.fired = 0;
};

var ballObj = function(x, y) {
    this.x = x;
    this.y = y;
    this.xDir = 1;
    this.yDir = 1;
};

var paddleObj = function(x) {
    this.x = x;
    this.speed = 2;
};

var bombObjRed = function(x,y){
    this.x = x;
    this.y = y;
    this.yDir = 2;
    this.active = 0;
    this.fadeColor = color(255, 0, 0);
    this.fadeAmount = 0;
    this.fading = 1;
    this.points = 5;
};

var bombObjGreen = function(x,y){
    this.x = x;
    this.y = y;
    this.yDir = 4;
    this.active = 0;
    this.fadeColor = color(0, 255, 0);
    this.fadeAmount = 0;
    this.fading = 1;
    this.points = 10;
};

var coinObj = function(x,y){
    this.x = x;
    this.y = y;
    this.yDir = 2.5;
    this.active=0;
    this.state=0;
    this.stateDir=1;
    this.points = 0;
};

var score = 0;
var gameOver = 0;
var paddle = new paddleObj(200);
var ball = new ballObj(random(0,width-BALL_WIDTH), random(80,height/2));
var bullets = [new bulletObj(), new bulletObj()];
var bulletIndex = 0;
var bricks = [];
var keyArray = [];
var bombs = [];
var currFrameCount = 0;


// initialize the bricks

var x = 0;
var y = 30;
for (var i=0; i<3; i++) {//rows of bricks
    for (var j =0; j < width/BRICK_WIDTH; j++) {//columns of bricks
        bricks.push(new brickObj(x,y));
        x += BRICK_WIDTH;
    }

    x = 0;
    y += BRICK_HEIGHT;
}

brickObj.prototype.draw = function() {

    stroke(0,0,0);
    fill(255, 0, 0);

    rect(this.x, this.y, BRICK_WIDTH, BRICK_HEIGHT);

};

bulletObj.prototype.draw = function() {
    fill(0, 0, 0);

    ellipse(this.x, this.y, 2, 6);

    this.y -= 5;
    if (this.y < 0) {
        this.fire = 0;
    }

    for (var i=0; i<bombs.length; i++) {
        if ((bombs[i].active === 1) && (dist(this.x, this.y, bombs[i].x, bombs[i].y) < 16)) {
            bombs[i].active = 0;
            this.fire = 0;
            score+=bombs[i].points;
        }
    }

};

bombObjRed.prototype.draw = function() {
    noStroke();
    fill(lerpColor(bgCOLOR, this.fadeColor, 0.3*this.fadeAmount));
    ellipse(this.x,this.y,30,30);
    fill(lerpColor(bgCOLOR, this.fadeColor, 0.4*this.fadeAmount));
    ellipse(this.x,this.y,25,25);
    fill(lerpColor(bgCOLOR, this.fadeColor, 0.5*this.fadeAmount));
    ellipse(this.x,this.y,20,20);
    fill(lerpColor(bgCOLOR, this.fadeColor, 0.6*this.fadeAmount));
    ellipse(this.x,this.y,15,15);
    fill(0, 0, 0);
    arc(this.x, this.y-15, 10, 25, 70,110); //top spike
    arc(this.x+15, this.y, 25, 10, 160,200); //right spike
    arc(this.x, this.y+15, 10, 25, 250, 290); //bottom spike
    arc(this.x-15, this.y, 25, 10, -20, 20); //left spike
    arc(this.x-10,this.y-10,15,15, 40,50);
    arc(this.x+10,this.y-10,15,15, 130,140);
    arc(this.x+10,this.y+10,15,15, 220,230);
    arc(this.x-10,this.y+10,15,15, 310,320);
    ellipse(this.x,this.y,10,10);

    if(this.fading === 1){
        this.fadeAmount += 0.05;
    }
    else if(this.fading === 0){
        this.fadeAmount-=0.05;
    }

    if(this.fading === 1 && this.fadeAmount > 1){
        this.fading = 0;
    }
    else if(this.fading === 0 && this.fadeAmount<0){
        this.fading=1;
    }

    if (this.y > 380-BALL_HEIGHT) { // paddle height

        if (dist(this.x,0,paddle.x,0)<40) {

            gameOver = 1;

        }
    }

    this.y+=this.yDir;
};

bombObjGreen.prototype.draw = function() {
    noStroke();
    fill(lerpColor(bgCOLOR, this.fadeColor, 0.3*this.fadeAmount));
    ellipse(this.x,this.y,30,30);
    fill(lerpColor(bgCOLOR, this.fadeColor, 0.4*this.fadeAmount));
    ellipse(this.x,this.y,25,25);
    fill(lerpColor(bgCOLOR, this.fadeColor, 0.5*this.fadeAmount));
    ellipse(this.x,this.y,20,20);
    fill(lerpColor(bgCOLOR, this.fadeColor, 0.6*this.fadeAmount));
    ellipse(this.x,this.y,15,15);
    fill(0, 0, 0);
    arc(this.x, this.y-15, 10, 25, 70,110); //top spike
    arc(this.x+15, this.y, 25, 10, 160,200); //right spike
    arc(this.x, this.y+15, 10, 25, 250, 290); //bottom spike
    arc(this.x-15, this.y, 25, 10, -20, 20); //left spike
    arc(this.x-10,this.y-10,15,15, 40,50);
    arc(this.x+10,this.y-10,15,15, 130,140);
    arc(this.x+10,this.y+10,15,15, 220,230);
    arc(this.x-10,this.y+10,15,15, 310,320);
    ellipse(this.x,this.y,10,10);

    if(this.fading === 1){
        this.fadeAmount += 0.05;
    }
    else if(this.fading === 0){
        this.fadeAmount-=0.05;
    }

    if(this.fading === 1 && this.fadeAmount > 1){
        this.fading = 0;
    }
    else if(this.fading === 0 && this.fadeAmount<0){
        this.fading=1;
    }

    if (this.y > 380-BALL_HEIGHT) { // paddle height

        if (dist(this.x,0,paddle.x,0)<40) {

            gameOver = 1;

        }
    }

    this.y+=this.yDir;
};

coinObj.prototype.draw = function() {
    stroke(200, 180, 0);
    fill(230, 210, 25);

    if(this.state === 0){
        ellipse(this.x, this.y, 16, 16);
        this.state=1;
        this.stateDir=1;
    }

    else if(this.state===1){
        ellipse(this.x, this.y, 14, 16);
        this.state+=this.stateDir;
    }

    else if(this.state===2){
        ellipse(this.x, this.y, 12, 16);
        this.state+=this.stateDir;
    }

    else if(this.state===3){
        ellipse(this.x, this.y, 10, 16);
        this.state+=this.stateDir;
    }

    else if(this.state===4){
        ellipse(this.x, this.y, 8, 16);
        this.state+=this.stateDir;
    }

    else if(this.state===5){
        ellipse(this.x, this.y, 6, 16);
        this.state+=this.stateDir;
    }

    else if(this.state===6){
        ellipse(this.x, this.y, 4, 16);
        this.state+=this.stateDir;
    }

    else if(this.state===7){
        ellipse(this.x, this.y, 2, 16);
        this.state+=this.stateDir;
    }

    else if(this.state===8){
        ellipse(this.x, this.y, 2, 16);
        this.state+=this.stateDir;
    }

    else if(this.state===9){
        this.stateDir=-1;
        this.state+=this.stateDir;
    }

    if (this.y > 380-BALL_HEIGHT) { // paddle height
        if (dist(this.x,0,paddle.x,0)<40) {
            paddle.speed+=0.2;
            this.active = 0;
            playSound(getSound("rpg/coin-jingle"));
            score+=10;
        }
    }

    this.y = this.y + this.yDir;
};

paddleObj.prototype.draw = function() {

    fill(255, 0, 0);

    rect(this.x - 40, 380, 80, 10);

};

paddleObj.prototype.move = function(){

    if(keyArray[LEFT]&&this.x>40){
        this.x-=this.speed;
    }

    if(keyArray[RIGHT]&&this.x<width-40){
        this.x+=this.speed;
    }
};

ballObj.prototype.draw = function() {

    fill(0, 4, 255);

    ellipse(this.x+(BALL_WIDTH/2), this.y+(BALL_HEIGHT/2), BALL_WIDTH, BALL_HEIGHT);
    //ellipse(this.x, this.y, BALL_WIDTH, BALL_HEIGHT);

    this.x += this.xDir;

    this.y += this.yDir;



    if (this.x < 0) {   this.xDir = -this.xDir; } //if ball is off left side

    else if (this.x > width-BALL_WIDTH) {    this.xDir = -this.xDir; } //else if ball is off right side

    if (this.y < 0) {   this.yDir = -this.yDir; } //if ball is off the top of the screen

    else if (this.y > 380-BALL_HEIGHT) { // paddle height

       // if ((this.x<paddle.x) && dist(this.x+BALL_WIDTH, 0, paddle.x, 0)<40 ||
         //   (this.x>=paddle.x) && dist(this.x,0,paddle.x,0)<40) {
         if (dist(this.x+BALL_WIDTH/2,0,paddle.x,0)<40) {
            this.yDir = -this.yDir;
        }

        else {
            gameOver = 1;
        }
    }

};

//ball colliding with a brick
ballObj.prototype.checkCollision = function() {

    var self = this;

    var checkCollideBrick = function(brick) {

        var collide = false;

        if (((self.x > brick.x) && (self.x < (brick.x + BRICK_WIDTH)) && (self.y >

brick.y) && (self.y < (brick.y+BRICK_HEIGHT))) ||

            (((self.x+BALL_WIDTH) > brick.x) && ((self.x+BALL_WIDTH) < (brick.x + BRICK_WIDTH)) &&

(self.y > brick.y) && (self.y < (brick.y+BRICK_HEIGHT))) ||

            ((self.x > brick.x) && (self.x < (brick.x + BRICK_WIDTH)) && ((self.y+BALL_HEIGHT) >

brick.y) && ((self.y+BALL_HEIGHT) < (brick.y+BRICK_HEIGHT))) ||

            (((self.x+BALL_WIDTH) > brick.x) && ((self.x+BALL_WIDTH) < (brick.x + BRICK_WIDTH)) &&

((self.y+BALL_HEIGHT) > brick.y) && ((self.y+BALL_HEIGHT) < (brick.y+BRICK_HEIGHT)))) {

                collide = true;

            }



            return(collide);

    };



    if ((this.y > 29) && (this.y < 61)) {

	var i = 0;

	var brickHit = 0;

	while ((i < bricks.length) && (brickHit === 0)) {

            if (bricks[i].hit === 0) {

                if (checkCollideBrick(bricks[i]))

                    {

                        bricks[i].hit = 1;

			            brickHit = 1;

                        this.yDir = -1.1*this.yDir;
                        this.xDir *= 1.1;

                        var ran = round(random(1,3));
                        var bomb;
                        if(ran === 1){
                            bomb =new bombObjGreen(bricks[i].x+BRICK_WIDTH/2, bricks[i].y+BRICK_HEIGHT);
                        }
                        else if(ran === 2){
                            bomb = new bombObjRed(bricks[i].x+BRICK_WIDTH/2, bricks[i].y+BRICK_HEIGHT);
                        }
                        else if(ran === 3){
                            bomb = new coinObj(bricks[i].x+BRICK_WIDTH/2, bricks[i].y+BRICK_HEIGHT);
                        }

                        bomb.active = 1;
                        bombs.push(bomb);

                        score++;

                    }

            }

	    i++;

        }

    }

};

var keyPressed = function(){
    keyArray[keyCode]=1;

};

var keyReleased = function(){
    keyArray[keyCode]=0;
};

var checkFire = function() {

    if (keyArray[32] === 1) {
        if (currFrameCount < (frameCount - 10)) {

            currFrameCount = frameCount;
            bullets[bulletIndex].fire = 1;
            bullets[bulletIndex].x = paddle.x;
            bullets[bulletIndex].y = 380;
            bulletIndex++;

            if (bulletIndex > 1) {
                bulletIndex = 0;
            }
        }
    }
};

void draw() {
    if(frameCount < 500){
        background(bgCOLOR);
        fill(255,0,0);
        textSize(50);
        text("Alex's Breakout", 5, 100);
        textSize(15);
        text("- Arrow keys to move\n- Spacebar to shoot\n    -Two bullet max\n- Shoot bombs for points\n- Collect coins for points and increased\n  paddle speed\n\n The ball speeds up as the bricks dissapear", 50, 150);

    }

    else{
        if (gameOver === 0) {

            background(bgCOLOR);

            for (var j=0; j < bricks.length; j++) {
                if (bricks[j].hit === 0) {
                    bricks[j].draw();
                }
            }

            ball.draw();

            ball.checkCollision();

            paddle.draw();
            paddle.move();

            checkFire();

            for (i =0; i<2; i++) {
                if (bullets[i].fire === 1) {
                    bullets[i].draw();
                }
            }

            for(i=0; i<bombs.length; i++){
                if(bombs[i].active===1){
                    bombs[i].draw();
                    if(bombs[i].y>height){
                        bombs[i].active=0;
                    }
                }
            }

            fill(255, 0, 0);

            textSize(12);
            text(score, 370, 10);
            text("Paddle speed: ", 250, 10);
            text(paddle.speed.toFixed(1), 336, 10);
        }

        else {
            fill(255, 0, 0);
            textSize(40);
            text("Game Over", 100, 200);
        }
    }
};