void setup() {
	size(400, 400)
};

//implement a tile map
//
var tileMapChooser = function(x){
    var level1 = [
        "wwwwwwwwwwwwwwwwwwww",
        "w      p           w",
        "w                  w",
        "w  rr          rr  w",
        "w                  w",
        "ws       rr        w",
        "w        rr        w",
        "w                  w",
        "w      rr  rr      w",
        "w      rr  rr      w",
        "w                  w",
        "w        rr        w",
        "w        rr        w",
        "w                  w",
        "w                  w",
        "w  rr          rr  w",
        "w        g         w",
        "w                  w",
        "w                  w",
        "wwwwwwwwwwwwwwwwwwww"];
    var level2 = [
        "wwwwwwwwwwwwwwwwwwww",
        "w                  w",
        "w                  w",
        "w  rr          rr  w",
        "w                  w",
        "w        rr        w",
        "w        rr        w",
        "w                  w",
        "w      rr  rr      w",
        "w      rr  rr      w",
        "w                  w",
        "w        rr        w",
        "w        rr        w",
        "w                  w",
        "w                  w",
        "w  rr          rrrrw",
        "w              rp sw",
        "w              r   w",
        "w              r  gw",
        "wwwwwwwwwwwwwwwwwwww"];

    var level3 = [
        "wwwwwwwwwwwwwwwwwwww",
        "w                  w",
        "w                  w",
        "w  rr          rr  w",
        "w                  w",
        "w        rr        w",
        "w        rr        w",
        "w                  w",
        "w      rr  rr      w",
        "w      rr  rr      w",
        "w                  w",
        "w        rr        w",
        "w        rr        w",
        "w                  w",
        "w                  w",
        "w  rrrrrrrrrrrrrrrrw",
        "w  r            p sw",
        "w  r               w",
        "w  r              gw",
        "wwwwwwwwwwwwwwwwwwww"];
    return level1;
};

var gameObj = function(){
    this.currTileMap = [];
    this.gameOver = 0;
    this.currentFrame = 0;
    this.customCharMade = 0;
    this.start = 0;
    this.TILE_WIDTH = 20;
    this.TILE_HEIGHT = 20;
    this.images = [];
    this.rocks = [];
    this.walls = [];
    this.food = [];
    this.animals = [];
};

var GAME = new gameObj();

//Pig Object
var pigObj = function(x, y){
    this.position = new PVector(x,y);
    this.velocity = new PVector(0,-1);
    this.angle = 0;
    this.distance = 0;
    this.currFrame = 0;
    this.walkFrame = 0;
    this.currImageState = 0;
    this.size = GAME.TILE_WIDTH;
    this.currImage=0;
    this.goal=0;
    this.score=0;
    this.type='p';
};

//Spider Object
var spiderObj = function(x,y){
    this.position = new PVector(x,y);
    this.velocity = new PVector(0,-1);
    this.angle = 0;
    this.distance = 0;
    this.size = GAME.TILE_WIDTH;
    this.currFrame = 0;
    this.score=0;
    this.goal=0;
    this.type='s';
};

//Rock Object
var rockObj = function(x,y){
    this.position = new PVector(x,y);
    this.size = GAME.TILE_WIDTH;
};

//Wall Object
var wallObj = function(x,y){
    this.position = new PVector(x,y);
    this.size = GAME.TILE_WIDTH;
};

//The designated end goal area
var goalObj = function(x,y){
    this.position = new PVector(x,y);
    this.size = GAME.TILE_WIDTH;
};

//Food object
var foodObj = function(x,y){
    this.position = new PVector(x,y);
    this.size = GAME.TILE_WIDTH;
    this.eaten = 0;
};

//customChar builds all of the character and tile images and pushes them into the GAME.images array
//
//INDEX
//0 - pigImage1Left
//1 - pigImage2Left
//2 - pigImage3Left
//3 - grassTile
//4 - rockTile
//5 - wallTile
//6 - foodObject
//7 - SpiderObject
var customChar = function(){
    GAME.customCharMade = 1;
    var tempX = 0;
    var tempY = 0;

    //pig image 1
    //
    {
        background(0,0,0,0);
        fill(255,200,200);

        //front back foot
        pushMatrix();
        translate(100,325);
        rotate(20);
        ellipse(0,0,50,150);
        popMatrix();

        //rear back foot
        fill(255,200,200);
        pushMatrix();
        noStroke();
        translate(310,305);
        rotate(-10);
        stroke(0,0,0);
        ellipse(0,0,50,150);
        popMatrix();


        //body
        rotate(-15);
        ellipse(160,275,300,210);
        rotate(15);

        //head
        noStroke();
        ellipse(110,150,180,150);
        stroke(0,0,0);
        arc(110,150,180,150,70,350);

        //nose
        fill(255, 150, 150);
        ellipse(50,165,40,50);
        fill(100, 0, 0);
        ellipse(40,165,10,15);
        ellipse(55,165,10,15);

        //eyes
        fill(255,255,255);
        noStroke();
        ellipse(100,120,20,40);
        ellipse(130,120,20,40);
        fill(0,0,0);
        ellipse(100,131,15,18);
        ellipse(128,131,15,18);

        //mouth
        beginShape();
        curveVertex(80,220);
        curveVertex(85,220);
        curveVertex(110,190);
        curveVertex(100,180);
        curveVertex(45,200);
        curveVertex(45,180);
        endShape();

        //ear
        fill(255, 150, 150);
        beginShape();
        curveVertex(135,100);
        curveVertex(140,90);
        curveVertex(158,48);
        curveVertex(165,50);
        curveVertex(170,105);
        curveVertex(175,100);
        endShape();

        //front front foot
        fill(255,200,200);
        stroke(0,0,0);
        pushMatrix();
        translate(125,315);
        rotate(10);
        arc(0,0,50,165,-20,200);
        popMatrix();

        //rear front foot
        fill(255,200,200);
        pushMatrix();
        noStroke();
        translate(325,300);
        rotate(-20);
        ellipse(0,0,50,170);
        stroke(0,0,0);
        arc(0,0,50,170,-20,200);
        popMatrix();

        GAME.images.push(get(0,0,width,height));
    }

    //pig image 2
    //
    {
        background(0,0,0,0);
        fill(255,200,200);

        //front back foot
        pushMatrix();
        translate(130,325);
        rotate(-10);
        ellipse(0,0,50,150);
        popMatrix();

        //rear back foot
        fill(255,200,200);
        pushMatrix();
        noStroke();
        translate(290,315);
        rotate(20);
        stroke(0,0,0);
        ellipse(0,0,50,150);
        popMatrix();


        //body
        rotate(-15);
        ellipse(160,275,300,210);
        rotate(15);

        //head
        noStroke();
        ellipse(110,150,180,150);
        stroke(0,0,0);
        arc(110,150,180,150,70,350);

        //nose
        fill(255, 150, 150);
        ellipse(50,165,40,50);
        fill(100, 0, 0);
        ellipse(40,165,10,15);
        ellipse(55,165,10,15);

        //eyes
        fill(255,255,255);
        noStroke();
        ellipse(100,120,20,40);
        ellipse(130,120,20,40);
        fill(0,0,0);
        ellipse(100,131,15,18);
        ellipse(128,131,15,18);

        //mouth
        beginShape();
        curveVertex(80,220);
        curveVertex(85,220);
        curveVertex(110,190);
        curveVertex(100,180);
        curveVertex(45,200);
        curveVertex(45,180);
        endShape();

        //ear
        fill(255, 150, 150);
        beginShape();
        curveVertex(135,100);
        curveVertex(140,90);
        curveVertex(158,48);
        curveVertex(165,50);
        curveVertex(170,105);
        curveVertex(175,100);
        endShape();

        //front front foot
        fill(255,200,200);
        stroke(0,0,0);
        pushMatrix();
        translate(130,315);
        rotate(5);
        arc(0,0,50,165,-20,200);
        popMatrix();

        //rear front foot
        fill(255,200,200);
        pushMatrix();
        noStroke();
        translate(310,300);
        rotate(-5);
        ellipse(0,0,50,170);
        stroke(0,0,0);
        arc(0,0,50,170,-20,200);
        popMatrix();

        GAME.images.push(get(0,0,width,height));
    }

    //pig image 3
    //
    {
        background(0,0,0,0);
        fill(255,200,200);

        //front back foot
        pushMatrix();
        translate(120,310);
        rotate(0);
        ellipse(0,0,50,150);
        popMatrix();

        //rear back foot
        fill(255,200,200);
        pushMatrix();
        noStroke();
        translate(315,315);
        rotate(-25);
        stroke(0,0,0);
        ellipse(0,0,50,150);
        popMatrix();


        //body
        rotate(-15);
        ellipse(160,275,300,210);
        rotate(15);

        //head
        noStroke();
        ellipse(110,150,180,150);
        stroke(0,0,0);
        arc(110,150,180,150,70,350);

        //nose
        fill(255, 150, 150);
        ellipse(50,165,40,50);
        fill(100, 0, 0);
        ellipse(40,165,10,15);
        ellipse(55,165,10,15);

        //eyes
        fill(255,255,255);
        noStroke();
        ellipse(100,120,20,40);
        ellipse(130,120,20,40);
        fill(0,0,0);
        ellipse(100,131,15,18);
        ellipse(128,131,15,18);

        //mouth
        beginShape();
        curveVertex(80,220);
        curveVertex(85,220);
        curveVertex(110,190);
        curveVertex(100,180);
        curveVertex(45,200);
        curveVertex(45,180);
        endShape();

        //ear
        fill(255, 150, 150);
        beginShape();
        curveVertex(135,100);
        curveVertex(140,90);
        curveVertex(158,48);
        curveVertex(165,50);
        curveVertex(170,105);
        curveVertex(175,100);
        endShape();

        //front front foot
        fill(255,200,200);
        stroke(0,0,0);
        pushMatrix();
        translate(115,305);
        rotate(15);
        arc(0,0,50,165,-10,200);
        popMatrix();

        //rear front foot
        fill(255,200,200);
        pushMatrix();
        noStroke();
        translate(300,305);
        rotate(-10);
        ellipse(0,0,50,170);
        stroke(0,0,0);
        arc(0,0,50,170,-20,180);
        popMatrix();

        GAME.images.push(get(0,0,width,height));
    }

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

    //rock from kahn
    //
    {
        background(0,0,0,0);
        image(getImage("cute/Rock"),0,-200, 400,600);
        GAME.images.push(get(0,0,width,height));
    }

    //wall from kahn
    //
    {
        background(0,0,0,0);
        image(getImage("cute/WallBlock"),0,-200, 400,600);
        GAME.images.push(get(0,0,width,height));
    }

    //pizza slice
    //
    {
        background(0,0,0,0);
        fill(200,200,0);
        triangle(25,25,375,25,200,375);
        fill(220,220,50);
        triangle(50,100,350,100,200,375);
        fill(255, 0, 0);
        ellipse(150,150,50,50);
        ellipse(250,150,50,50);
        ellipse(200,225,50,50);
        GAME.images.push(get(0,0,width,height));
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
};

var initTileMap = function(){
    for(var i = 0; i < GAME.currTileMap.length; i++){
        for(var j = 0; j < GAME.currTileMap[i].length; j++){
            switch(GAME.currTileMap[i][j]){
                case('w'):
                    GAME.walls.push(new wallObj(j*20, i*20));
                    break;
                case('p'):
                    GAME.animals.push(new pigObj(j*20, i*20));
                    break;
                case('s'):
                    GAME.animals.push(new spiderObj(j*20, i*20));
                    break;
                case('r'):
                    GAME.rocks.push(new rockObj(j*20, i*20));
                    break;
                case('g'):
                    GAME.goal = new goalObj(j*20, i*20);
                    break;
                case('f'):
                    GAME.food.push(new foodObj(j*20, i*20));
                    break;
                default:
                    break;
            }
        }
    }
};

//draw the pig image states will be 3 for walking left, 3 for walking right, 2 for up and 2 for down
//
//Left
//0,1,2,0,...
//
//Right
//3,4,5,3,...
//
//Up
//6,7,6,...
//Down
//8,9,8,...
pigObj.prototype.draw = function() {
    if(this.currFrame + 10 < frameCount)
    {
        this.currFrame=frameCount;

        switch(this.currImageState){
            case(0):
                this.currImage = GAME.images[0];
                this.currImageState = 1;
                break;
            case(1):
                this.currImage = GAME.images[1];
                this.currImageState = 2;
                break;
            case(2):
                this.currImage = GAME.images[2];
                this.currImageState = 0;
                break;
            case(3):
                break;
            default:
                this.currImageState = 0;
                break;
        }
    }

    image(this.currImage,this.position.x,this.position.y,20,20);
};

spiderObj.prototype.draw = function() {
    pushMatrix();
    translate(this.position.x+10,this.position.y+10);
    rotate(this.angle);
    image(GAME.images[7],-10,-10,20,20);

    popMatrix();
};

rockObj.prototype.draw = function() {
    image(GAME.images[4],this.position.x,this.position.y,20,20);
};

wallObj.prototype.draw = function() {
    image(GAME.images[5],this.position.x,this.position.y,20,20);
};

goalObj.prototype.draw = function() {
     var goldCol = color(200, 200, 50,150);
     fill(goldCol);
     rect(this.position.x, this.position.y, GAME.TILE_WIDTH, GAME.TILE_HEIGHT);
};

foodObj.prototype.draw = function() {
    image(GAME.images[6],this.position.x,this.position.y,20,20);
};

var checkCollision = function(x,y,s){

    for(var i = 0; i<GAME.rocks.length; i++){
        if(dist(x,y,GAME.rocks[i].position.x,GAME.rocks[i].position.y) <= (s/2)+(GAME.rocks[i].size/2)){
            return true;
        }
    }

    for(var i = 0; i<GAME.walls.length; i++){
        if(dist(x,y,GAME.walls[i].position.x,GAME.walls[i].position.y) <= (s/2)+(GAME.walls[i].size/2)){
            return true;
        }
    }

    for(var i = 0; i<GAME.animals.length; i++){
        if(x===GAME.animals[i].position.x && y===GAME.animals[i].position.y){}
        else{
            if(GAME.animals[i].position.x===GAME.goal.position.x && GAME.animals[i].position.y===GAME.goal.position.y){}
            else if(dist(x,y,GAME.animals[i].position.x,GAME.animals[i].position.y) <= (s/2)+(GAME.animals[i].size/2)){
                return true;
            }
        }
    }

    return false;
};

var checkFood = function(x,y,s){
    for(var i = 0; i<GAME.food.length; i++){
        if(dist(x,y,GAME.food[i].position.x,GAME.food[i].position.y) <= (s/2)+(GAME.food[i].size/2)){
            GAME.food.splice(i,1);
            return true;
        }
    }
};

var checkGoal = function(x,y,s){
    if(dist(x,y,GAME.goal.position.x+10,GAME.goal.position.y+10) <= (s/2)+(GAME.goal.size/2)){
        return true;
    }
    return false;
};

pigObj.prototype.move = function(){

    if(checkGoal(this.position.x+10, this.position.y+10, this.size===true)){
        this.goal = 1;
        this.score+=10;
        this.position.x=GAME.goal.position.x;
        this.position.y=GAME.goal.position.y;
        return;
    }

    if(this.position.x<20){
        this.position.x=21;
        this.angle = random(-80,80);
    }
    else if(this.position.y>360){
        this.position.y=359;
        this.angle = random(-170, -10);
    }
    else if(this.position.y<20){
        this.position.y=21;
        this.angle = random(10,170);
    }
    else if(this.position.x>360){
        this.position.x=359;
        this.angle = random(100,260);
    }

    if(frameCount - this.walkFrame >= this.distance){
        this.walkFrame = frameCount;
        this.distance = random(100,200);
        this.angle += random(-45,45);
    }

    if(checkFood(this.position.x+10,this.position.y+10,this.size)===true){
        if(this.score<5){
            this.score++;
        }
    }

    if(checkCollision(this.position.x, this.position.y, this.size)===true){
        if((this.angle < -45 && this.angle > -135) || (this.angle > 225 && this.angle < 315)){
            this.angle = random(45,135);
        }
        else if(this.angle>-45 && this.angle < 45 || this.angle >315 && this.angle < 405){
            this.angle = random(135, 225);
        }
        else if(this.angle>45 && this.angle < 135){
            this.angle-=random(225,315);
        }
        else{
            this.angle = random(-45, 45);
        }
    }
    this.velocity.x = sin(this.angle);
    this.velocity.y = -cos(this.angle);
    this.position.add(this.velocity);

    if(checkCollision(this.position.x, this.position.y, this.size)===true){
        this.position.sub(this.velocity);
        if((this.angle < -45 && this.angle > -135) || (this.angle > 225 && this.angle < 315)){
            this.angle = random(45,135);
        }
        else if(this.angle>-45 && this.angle < 45 || this.angle >315 && this.angle < 405){
            this.angle = random(135, 225);
        }
        else if(this.angle>45 && this.angle < 135){
            this.angle-=random(225,315);
        }
        else{
            this.angle = random(-45, 45);
        }

        this.velocity.x = sin(this.angle);
        this.velocity.y = -cos(this.angle);
        this.position.add(this.velocity);
    }



};

spiderObj.prototype.move = function(){

    if(checkGoal(this.position.x, this.position.y, this.size===true)){
        this.goal=1;
        this.score+=10;
        this.position.x=GAME.goal.position.x;
        this.position.y=GAME.goal.position.y;
        return;
    }

    if(this.position.x<20){
        this.position.x=21;
        this.angle = random(-80,80);
    }
    else if(this.position.y>360){
        this.position.y=359;
        this.angle = random(-170, -10);
    }
    else if(this.position.y<20){
        this.position.y=21;
        this.angle = random(10,170);
    }
    else if(this.position.x>360){
        this.position.x=359;
        this.angle = random(100,260);
    }

    if(frameCount - this.currFrame >= this.distance){
        this.currFrame = frameCount;
        this.distance = random(100,200);
        this.angle += random(-45,45);
    }

    if(checkFood(this.position.x,this.position.y,this.size)===true){
        if(this.score<5){
            this.score++;
        }
    }

    if(checkCollision(this.position.x, this.position.y, this.size)===true){
        if((this.angle < -45 && this.angle > -135) || (this.angle > 225 && this.angle < 315)){
            this.angle = random(45,135);
        }
        else if(this.angle>-45 && this.angle < 45 || this.angle >315 && this.angle < 405){
            this.angle = random(135, 225);
        }
        else if(this.angle>45 && this.angle < 135){
            this.angle-=random(225,315);
        }
        else{
            this.angle = random(-45, 45);
        }
    }
    this.velocity.x = sin(this.angle);
    this.velocity.y = -cos(this.angle);
    this.position.add(this.velocity);

    if(checkCollision(this.position.x, this.position.y, this.size)===true){
        this.position.sub(this.velocity);
        if((this.angle < -45 && this.angle > -135) || (this.angle > 225 && this.angle < 315)){
            this.angle = random(45,135);
        }
        else if(this.angle>-45 && this.angle < 45 || this.angle >315 && this.angle < 405){
            this.angle = random(135, 225);
        }
        else if(this.angle>45 && this.angle < 135){
            this.angle-=random(225,315);
        }
        else{
            this.angle = random(-45, 45);
        }
        this.velocity.x = sin(this.angle);
        this.velocity.y = -cos(this.angle);
        this.position.add(this.velocity);
    }
};

var mouseClicked = function(){
    if(!checkCollision(floor(mouseX/20)*20, floor(mouseY/20)*20, 1)){
        GAME.food.push(new foodObj(floor(mouseX/20)*20, floor(mouseY/20)*20));

    }
};

gameObj.prototype.initialize = function(){
    this.currTileMap = tileMapChooser(1);
    this.gameOver = 0;
    this.currentFrame = 0;
    this.customCharMade = 0;
    this.start = 0;
    this.TILE_WIDTH = 20;
    this.TILE_HEIGHT = 20;
    this.images = [];
    /*this.rocks = [];
    this.walls = [];
    this.food = [];
    this.animals = [];
    this.goal = new goalObj();*/
    initTileMap();
};

GAME.initialize();


void draw() {
    if(GAME.customCharMade===0){
        customChar();
    }

    else if(GAME.animals[0].goal===1 && GAME.animals[1].goal===1){
        //draw the grass tile as the background
        for(var i = 0; i < 3; i++){
            for(var j = 0; j < 3; j++){
              image(GAME.images[3],i*200,j*200,200,200);
            }
        }
        stroke(255, 0, 0);
        fill(255, 0, 0);
        textSize(30);
        image(GAME.images[1],40,120,150,150);
        image(GAME.images[7],230,130,150,150);

        if(GAME.animals[0].score>GAME.animals[1].score){

            if(GAME.animals[0].type==='p'){
                text("WINNER",60,300,100,30);
            }

            else{
                text("WINNER",250,300,100,30);
            }
        }
        else if(GAME.animals[0].score<GAME.animals[1].score){
            if(GAME.animals[1].type==='p'){
                text("WINNER",60,300,100,30);
            }

            else{
                text("WINNER",250,300,100,30);
            }
        }
        else{
            textSize(150);
            text("TIE",100,250,150,150);
        }

        textSize(30);
        if(GAME.animals[0].type==='p'){
            text(GAME.animals[0].score,85,80,30,30);
            text(GAME.animals[1].score,285,80,30,30);
        }
        else{
            text(GAME.animals[1].score,85,80,30,30);
            text(GAME.animals[0].score,285,80,30,30);
        }
    }

    else{
        //set black over everything
        background(0,0,0);

        var i = 0;
        var j = 0;
        //draw the grass tile as the background
        for(i = 0; i < 3; i++){
            for(j = 0; j < 3; j++){
              image(GAME.images[3],i*150-25,j*150-25,150,150);
            }
        }

        for(i = 0; i < GAME.rocks.length; i++){
            GAME.rocks[i].draw();
        }

        for(i = 0; i < GAME.walls.length; i++){
            GAME.walls[i].draw();
        }

        for(i = 0; i < GAME.animals.length; i++){
            if(GAME.animals[i].goal===0){
                GAME.animals[i].move();
            }
            GAME.animals[i].draw();

        }

        for(i = 0; i < GAME.food.length; i++){
            GAME.food[i].draw();
        }

        GAME.goal.draw();
    }
};
