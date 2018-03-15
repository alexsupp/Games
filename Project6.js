void setup() {
	size(400, 400)
};
var gameObj = function(){
    this.gameState = 0;
    this.score = 5;
    this.keyArray = [];
    this.catapult = null;
    this.images = [];
    this.obstacles = [];
    this.animals = [];
    this.goalSize=35;
    this.gameStart=0;
    angleMode = "radians";
};

var GAME = new gameObj();

var rockObj = function(x,y,s){
    this.position = new PVector(x,y);
    this.speed = 0;
    this.angle = 0;
    this.size = s;
    this.angleSpeed = 1;
};

var spikeObj = function(x,y,s){
    this.position = new PVector(x,y);
    this.speed = 0;
    this.angle = 0;
    this.size = s;
    this.angleSpeed = 1;
};

//user rabbit
var hareObj = function(x,y){
    this.startPosition = new PVector(x,y);
    this.position = new PVector(x,y);
    this.velocity = new PVector(0,0);
    this.angle = 0;
    this.currFrame = 0;
    this.size = 25;
    this.hit=0;
};

var wolfObj = function(x,y){
    this.startPosition = new PVector(x,y);
    this.position = new PVector(x,y);
    this.velocity = new PVector(0,0);
    this.angle = 0;
    this.currFrame = 0;
    this.size = 30;
    this.state = 0;
    this.hit=0;
};

var spiderObj = function(x,y){
    this.startPosition = new PVector(x,y);
    this.position = new PVector(x,y);
    this.velocity = new PVector(0,0);
    this.angle = 0;
    this.currFrame = 0;
    this.size = 30;
    this.state = 0;
    this.hit=0;
};

var applyDrag = function(a){
    a.speed*=0.98;
};

/*
 * image[0] - grass Tile
 * image[1] - rock image
 * image[2] - spike image
 * image[3] - hare Image
 * image[4] - spider Image
 * image[5] - wolf Image
 */
var customChar = function(){
    GAME.gameState++;
    var tempX = 0;
    var tempY = 0;

    //grass image
    //
    {
        tempX=10;
        tempY=15;
        background(10, 200, 50);

        for(var i = 0; i<10; i++){
            for(var j = 0; j<10; j++){
                strokeWeight(10);
                stroke(100, 200, 130);
                if(tempX<0){
                    tempX+=40;
                }
                point(tempX,tempY);
                tempX+=40;
            }
            tempX-=420;
            tempY+=40;
        }

        strokeWeight(1);
        stroke(30,240,60);
        fill(30,240,60);

        for(var i = 0; i<15; i++){
            tempX=random(10,width-10);
            tempY=random(30,height-5);

            //left leaf
            beginShape();
            curveVertex(tempX-1,tempY);
            curveVertex(tempX-2,tempY-10);
            curveVertex(tempX-7,tempY-35);
            curveVertex(tempX-12,tempY-35);
            curveVertex(tempX-8,tempY-33);
            curveVertex(tempX-5,tempY-32);
            endShape();

            //middle leaf
            beginShape();
            curveVertex(tempX,tempY);
            curveVertex(tempX,tempY-5);
            curveVertex(tempX-2,tempY-43);
            curveVertex(tempX-7,tempY-43);
            curveVertex(tempX-3,tempY-42);
            curveVertex(tempX-2,tempY-42);
            endShape();

            //right leaf
            beginShape();
            curveVertex(tempX+1,tempY);
            curveVertex(tempX+2,tempY-10);
            curveVertex(tempX+7,tempY-35);
            curveVertex(tempX+12,tempY-35);
            curveVertex(tempX+8,tempY-33);
            curveVertex(tempX+5,tempY-32);
            endShape();
        }
        GAME.images.push(get(0,0,width,height));
    }

    //
    //rock Image
    {
        pushMatrix();
        var num;
        background(0,0,0,0);
        noStroke();
        for(var i = 0; i < 35; i++){
            pushMatrix();
            num = random(100,200);
            fill(num, num*2/3, num*1/3);
            translate(200,200);
            rotate((num-100)*(TWO_PI/10));
            num=random(-80,-60);
            translate(num, num/2);

            quad(-50, -55, 80, -80, 80, 100, -110, 50);
            popMatrix();
        }
        popMatrix();
        GAME.images.push(get(0,0,400,400));
    }

    //
    //spike Image
    {
        background(0,0,0,0);
        pushMatrix();
        fill(0,0,0);
        stroke(0,0,0);
        strokeWeight(1);
        translate(200,200);
        for(var i = 0; i < 6; i++){
            rotate(PI/3);
            triangle(-20,-75,20,-75,0,-200);
        }
        ellipse(0,0,150,150);
        popMatrix();
        GAME.images.push(get(0,0,400,400));
    }

    //
    //hare image
    {
        background(0,0,0,0);
        fill(130,145,130);
        stroke(0,0,0);
        strokeWeight(8);
        //body
        ellipse(200,200,160,280);
        //tail
        stroke(0,0,0);
        ellipse(200,355,80,80);

        //head
        strokeWeight(5);
        stroke(0,0,0);
        fill(170, 170, 170);
        pushMatrix();
        translate(200,90);
        rotate(-0.26);
        ellipse(0,0,130,170);

        //ears
        strokeWeight(10);
        stroke(0, 0, 0);
        fill(140,140,140);
        ellipse(-40,110,35,150);
        ellipse(40,110,35,150);

        strokeWeight(3);
        fill(255, 100, 100);
        stroke(255, 100, 100);
        ellipse(-40,90,20,110);
        ellipse(40,90,20,110);

        //nose
        ellipse(-3,-80,28,28);

        //eyes
        fill(0,0,0);
        noStroke();
        ellipse(-30,-10,25,20);
        ellipse(30,-10,25,20);
        popMatrix();

        GAME.images.push(get(0,0,400,400));
    }

    //Spider
    {
        background(0,0,0,0);
        stroke(0,0,0);
        //body and head
        fill(0,0,0);
        ellipse(200,100,125,115);
        ellipse(200,200,170,180);
        //eyes
        fill(255,255,255);
        ellipse(170,85,20,20);
        ellipse(185,70,20,20);
        ellipse(200,90,20,20);
        ellipse(215,70,20,20);
        ellipse(230,85,20,20);

        //hourglass
        fill(255, 0, 0);
        triangle(180,280,220,280,200,230);
        noStroke();
        triangle(185,220,215,220,200,260);

        //legs
        strokeWeight(21);
        stroke(0, 0, 0);
        line(150,275,70,320);
        line(250,275,330,320);
        line(140,230,40,250);
        line(260,230,360,250);
        line(35,180,140,180);
        line(365,180,260,180);
        line(50,120,150,150);
        line(350,120,250,150);
        strokeWeight(1);

        GAME.images.push(get(0,0,400,400));
    }

    //wolf image1
    {
        background(0,0,0,0);
        strokeWeight(9);
        stroke(80, 80, 80);
        fill(95,95,95);

        //front right leg
        pushMatrix();
        translate(230,90);
        rotate(0.087);
        arc(0,0,30,170,110,430);
        popMatrix();

        //front left leg
        pushMatrix();
        translate(160,135);
        rotate(-0.087);
        arc(0,0,30,170,110,430);
        popMatrix();

        //back right leg
        pushMatrix();
        translate(225,270);
        rotate(3.11);
        arc(0,0,30,170,110,430);
        popMatrix();

        //back left leg
        pushMatrix();
        translate(175,260);
        rotate(3.18);
        arc(0,0,30,170,110,430);
        popMatrix();

        //head and body
        fill(130,130,130);
        noStroke();
        ellipse(200,180,90,280);
        strokeWeight(6);
        stroke(75,75,75);
        triangle(135,110,200,0,265,110);

        //tail
        pushMatrix();
        strokeWeight(15);
        stroke(120,120,120);
        fill(150,150,150);
        translate(165,355);
        rotate(0.908);
        ellipse(0,0,45,125);
        popMatrix();

        //fur
        noStroke();
        fill(160,160,160);
        pushMatrix();
        translate(200,200);
        triangle(-10,-15,10,-15,0,15);
        popMatrix();

        pushMatrix();
        translate(230,180);
        triangle(-10,-15,10,-15,0,15);
        popMatrix();

        pushMatrix();
        translate(180,175);
        triangle(-10,-15,10,-15,0,15);
        popMatrix();

        pushMatrix();
        translate(220,250);
        triangle(-10,-15,10,-15,0,15);
        popMatrix();

        pushMatrix();
        translate(170,230);
        triangle(-10,-15,10,-15,0,15);
        popMatrix();

        pushMatrix();
        translate(190,300);
        triangle(-10,-15,10,-15,0,15);
        popMatrix();

        fill(170,170,170);

        pushMatrix();
        translate(220,210);
        triangle(-10,-15,10,-15,0,15);
        popMatrix();

        pushMatrix();
        translate(190,250);
        triangle(-10,-15,10,-15,0,15);
        popMatrix();

        pushMatrix();
        translate(220,290);
        triangle(-10,-15,10,-15,0,15);
        popMatrix();

        pushMatrix();
        translate(230,130);
        triangle(-10,-15,10,-15,0,15);
        popMatrix();

        pushMatrix();
        translate(205,140);
        triangle(-10,-15,10,-15,0,15);
        popMatrix();

        pushMatrix();
        translate(175,135);
        triangle(-10,-15,10,-15,0,15);
        popMatrix();

        //eyes
        fill(255,255,255);
        strokeWeight(3);
        stroke(0,0,0);
        ellipse(180,85,32,25);
        ellipse(220,85,32,25);
        fill(0,0,0);
        ellipse(180,78,25,10);
        ellipse(220,78,25,10);

        //nose
        fill(0,0,0);
        ellipse(200,8,15,16);

        GAME.images.push(get(0,0,400,400));
    }


};

//check obstacle collision and kill state if true
var checkDeath = function(a){
    for(var i = 0; i < GAME.obstacles.length; i++){
        if(dist(a.position.x,a.position.y,GAME.obstacles[i].position.x,GAME.obstacles[i].position.y)<((a.size+GAME.obstacles[i].size)/2)){
            a.hit=-1;
            return true;
        }
    }
    return false;
};

//set the goal state and lock a's position
var checkGoal = function(a){
    if(a.position.y<GAME.goalSize && a.hit===0){
        a.hit=1;
        a.currFrame = frameCount-GAME.gameStart-180;
        return true;
    }
    else if(a.hit===1){
        return true;
    }
};

//check the bounds based on a's size and take out the component that was going out of bounds
var checkBounds = function(a){
    //if going out of view or hitting another animal
    //off left
    if(a.position.x-a.size/2<0){
        a.position.sub(a.velocity);
        a.position.x=0+a.size/2;
        a.velocity.x = 0;
    }
    //off right
    else if(a.position.x+a.size/2>width){
        a.position.sub(a.velocity);
        a.position.x=width-a.size/2;
        a.velocity.x = 0;
    }
    //off top
    else if(a.position.y-a.size/2<0){
        a.position.sub(a.velocity);
        a.position.y=0+a.size/2;
        a.velocity.y = 0;
    }
    //off bottom
    else if(a.position.y+a.size/2>height){
        a.position.sub(a.velocity);
        a.position.y=height-a.size/2;
        a.velocity.y = 0;

    }
    else{
        return false;
    }

    return true;
};

//checks if near an obstacle and if so it sets the velocity to the path away from the obs
var checkNear = function(a){
    for(var i = 0; i < GAME.obstacles.length; i++){
        if(dist(a.position.x,a.position.y,GAME.obstacles[i].position.x,GAME.obstacles[i].position.y)<(a.size+GAME.obstacles[i].size)){
            a.state = 1;
            a.velocity = a.position.get();
            a.velocity.sub(GAME.obstacles[i].position);
            return true;
        }
    }
};

var checkAnimal = function(a){
    for(var i = 0; i < GAME.animals.length; i++){
        if(dist(a.position.x,a.position.y,GAME.animals[i].position.x,GAME.animals[i].position.y)<(a.size+GAME.animals[i].size+2)/2&&
        dist(a.position.x,a.position.y,GAME.animals[i].position.x,GAME.animals[i].position.y)!==0){
            a.position.sub(a.velocity);
            a.velocity = a.position.get();
            a.velocity.sub(GAME.animals[i].position);
            a.velocity.normalize();
            a.position.add(a.velocity);
            return true;
        }
    }
};

hareObj.prototype.draw = function() {
    pushMatrix();
    translate(this.position.x,this.position.y);
    rotate(this.angle+PI/2);
    image(GAME.images[3],-3-this.size/2,-3-this.size/2,this.size+6,this.size+6);
    popMatrix();
};

hareObj.prototype.move = function(){
    if(checkDeath(this) && this.hit===-1){
        //this.position = this.startPosition.get();
        this.position.y = 380;
        this.hit=0;
    }

    else if(checkGoal(this)&&this.hit>=1){
        this.position.y=GAME.goalSize/2;
        return;
    }

    this.velocity.set(0,0);
    if(GAME.keyArray[37])
    {
        this.velocity.x += -1;
    }
    if(GAME.keyArray[38])
    {
        this.velocity.y += -1;
    }
    if(GAME.keyArray[39])
    {
        this.velocity.x += 1;
    }
    if(GAME.keyArray[40])
    {
        this.velocity.y += 1;
    }
    this.velocity.normalize();
    this.velocity.mult(3);

    this.position.add(this.velocity);
    if(this.velocity.mag()>0){
        this.angle = this.velocity.heading();
    }

    checkAnimal(this);

    if(checkBounds(this)){
        this.velocity.normalize();
        this.velocity.mult(3);
        this.position.add(this.velocity);
        //incase in the corner it will check and set the non zero velocity component and 0 it.
        checkBounds(this);
    }

    if(this.velocity.mag()>0){
        this.angle = this.velocity.heading();
    }


};

wolfObj.prototype.draw = function() {
    pushMatrix();
    translate(this.position.x,this.position.y);
    rotate(this.angle+PI/2);
    image(GAME.images[5],-2-this.size/2,-2-this.size/2,this.size+4,this.size+4);
    popMatrix();
};

wolfObj.prototype.move = function(){
    //check death
    if(checkDeath(this) && this.hit===-1){
        //this.position = this.startPosition.get();
        this.position.y = 380;
        this.hit=0;
    }
    //check Goal
    else if(checkGoal(this)&&this.hit>=1){
        this.position.y=GAME.goalSize/2;
        return;
    }

    //checkNear
    //start velocity in the up position if nothing near otherwise velocity is set to away from obs
    if(!checkNear(this)){
        this.velocity.set(0,-1);
    }

    //make sure to normalize and multiply by the standard speed of 3 pixels
    this.velocity.normalize();
    this.velocity.mult(3);
    this.position.add(this.velocity);


    checkAnimal(this);

    //bounds check and reset
    //
    if(checkBounds(this)){
        this.velocity.normalize();
        this.velocity.mult(3);
        this.position.add(this.velocity);
        //incase in the corner it will check and set the non zero velocity component and 0 it.
        checkBounds(this);
    }

    if(this.velocity.mag()>0){
        this.angle = this.velocity.heading();
    }

};

spiderObj.prototype.draw = function() {
    pushMatrix();
    translate(this.position.x,this.position.y);
    rotate(this.angle+PI/2);
    image(GAME.images[4],-this.size/2,-this.size/2,this.size,this.size);
    popMatrix();
};

spiderObj.prototype.move = function(){
    //check death
    if(checkDeath(this) && this.hit===-1){
        //this.position = this.startPosition.get();
        this.position.y = 380;
        this.hit=0;
    }
    //check Goal
    else if(checkGoal(this)&&this.hit>=1){
        this.position.y=GAME.goalSize/2;
        return;
    }

    //checkNear
    //start velocity in the up position if nothing near otherwise velocity is set to away from obs
    if(!checkNear(this)){
        this.velocity.set(0,-1);
    }

    //make sure to normalize and multiply by the standard speed of 3 pixels
    this.velocity.normalize();
    this.velocity.mult(3);
    this.position.add(this.velocity);


    checkAnimal(this);

    //bounds check and reset
    //
    if(checkBounds(this)){
        this.velocity.normalize();
        this.velocity.mult(3);
        this.position.add(this.velocity);
        //incase in the corner it will check and set the non zero velocity component and 0 it.
        checkBounds(this);
    }

    if(this.velocity.mag()>0){
        this.angle = this.velocity.heading();
    }

};

rockObj.prototype.draw = function() {
    pushMatrix();
    translate(this.position.x, this.position.y);
    rotate(this.angle);
    image(GAME.images[1],-1-this.size/2,-1-this.size/2,this.size+2,this.size+2);
    popMatrix();
};

rockObj.prototype.move = function(){
    applyDrag(this);
    //if rock if too far right send it going right
    if(this.position.x-this.size/2 < 0){
        this.speed=random(8,15);
        this.position.x = this.size/2;

    }
    //if rock is too far right send it left
    else if(this.position.x+this.size/2>width){
        this.speed=random(-15,-8);
        this.position.x = width - this.size/2;
    }

    this.position.x += this.speed;
    this.angle+=this.speed/this.size;
};

spikeObj.prototype.draw = function() {

    pushMatrix();
    translate(this.position.x, this.position.y);
    rotate(this.angle);
    image(GAME.images[2],-this.size/2,-this.size/2,this.size,this.size);
    popMatrix();
};

spikeObj.prototype.move = function(){
    applyDrag(this);
    //if rock if too far right send it going right
    if(this.position.x-this.size/2 < 0){
        this.speed=random(8,20);
        this.position.x = this.size/2;

    }
    //if rock is too far right send it left
    else if(this.position.x+this.size/2>width){
        this.speed=random(-20,-8);
        this.position.x = width - this.size/2;
    }

    this.position.x += this.speed;
    this.angle+=this.speed/this.size;
};

var keyPressed = function(){
    GAME.keyArray[keyCode] = 1;
};

var keyReleased = function(){
    GAME.keyArray[keyCode] = 0;
};

var mouseClicked = function(){
    if(GAME.gameState===1){
        GAME.gameState++;
        GAME.gameStart=frameCount;
    }
};

var mouseDragged = function(){

};

gameObj.prototype.initialize = function(){
    GAME.images = [];
    GAME.obstacles.push(new rockObj(0, random(60,80),random(40,60)));
    GAME.obstacles.push(new spikeObj(width,  random(140,160),random(40,60)));
    GAME.obstacles.push(new rockObj(0,  random(220,240),random(40,60)));
    GAME.obstacles.push(new spikeObj(width, random(300,320),random(40,60)));
    GAME.animals.push(new wolfObj(100,380));
    GAME.animals.push(new hareObj(200,380));
    GAME.animals.push(new spiderObj(300,380));
};

GAME.initialize();

void draw() {
    //Make chars
    if(GAME.gameState===0){
        customChar();
    }

    //instructions
    else if(GAME.gameState===1){
        background(90,90,90);
        fill(250, 191, 140,230);
        textSize(50);
        textAlign(CENTER,CENTER);
        text("Race to the\nTop",200,65);


        textSize(25);
        fill(50, 150, 240,200);
        textAlign(LEFT,TOP);
        text("-Race the other animals to the top\n"+
            "-Avoid the obstacles moving from\n side to side\n"+
            "-Restart at the bottom if you get hit\n"+
            "-You control the Rabbit",10,135);

        fill(255,255,255,100);
        textSize(18);
        textAlign(CENTER,TOP);
        text("Click anywhere to start",200,360);
    }

    //game loop
    else if (GAME.gameState===2){
        background(0,0,0);

        //draw the grass tile as the background
        for(var i = 0; i < 3; i++){
            for(var j = 0; j < 3; j++){
              image(GAME.images[0],i*200,j*200,200,200);
            }
        }
        noStroke();
        fill(200,200,50,150);
        rect(0,0,width,GAME.goalSize);
        textSize(19);
        fill(255,0,0,200);
        textAlign(RIGHT, TOP);
        text(Math.round(10.0*(frameCount-GAME.gameStart-180)/60.0)/10.0+" sec",400,0);

        for(var i = 0; i < GAME.obstacles.length; i++){
            GAME.obstacles[i].draw();
            GAME.obstacles[i].move();
        }

        //set game state to game over
        //reset to game loop if at least 1 animal is not in goal
        GAME.gameState++;
        for(var i = 0; i < GAME.animals.length; i++){
            GAME.animals[i].draw();
            if(GAME.gameStart+180<frameCount){
                GAME.animals[i].move();
            }
            if(GAME.animals[i].hit<=0&&GAME.animals[i].currFrame===0){
                GAME.gameState=2;
            }
        }

        if(GAME.gameStart+60>frameCount){
            textSize(100);
            textAlign(CENTER,CENTER);
            text("3",200,200);
        }
        else if(GAME.gameStart+120>frameCount){
            textSize(100);
            textAlign(CENTER,CENTER);
            text("2",200,200);
        }
        else if(GAME.gameStart+180>frameCount){
            textSize(100);
            textAlign(CENTER,CENTER);
            text("1",200,200);
        }

    }
    //game Over
    else if(GAME.gameState===3){
        background(100,100,0);
        fill(255, 255, 255);
        textAlign(CENTER,CENTER);
        textSize(10);

        var fastest = -1;
        for(var i = 0; i < GAME.animals.length; i++){
            if(GAME.animals[i].currFrame<fastest||fastest===-1){
                fastest = GAME.animals[i].currFrame;
            }
            GAME.animals[i].position.set(0,0);
            pushMatrix();
            translate(140*i+60, 150);
            scale(4);
            GAME.animals[i].draw();
            popMatrix();
        }

        for(var i = 0; i < GAME.animals.length; i++){
            pushMatrix();
            textSize(7);
            textAlign(CENTER,CENTER);
            translate(140*i+60, 150);
            scale(4);
            if(fastest===GAME.animals[i].currFrame){

                text("Winner\n"+Math.round(10.0*GAME.animals[i].currFrame/60.0)/10.0 + " sec",0,30);
            }
            else{
                text(Math.round(10.0*GAME.animals[i].currFrame/60.0)/10.0+" sec",0,30);
            }
            popMatrix();
        }
    }
};