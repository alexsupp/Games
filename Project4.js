void setup() {
	size(400, 400)
};

var tileMapChooser = function(x){
    var level;
    if(x===1){
        level = [
            "wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww",
            "w                                     bw",
            "w                                      w",
            "w  rr          rr      rr        rr    w",
            "w         h                            w",
            "w        rr        rr       rr         w",
            "w        rr                 rr         w",
            "w                                      w",
            "w      rr frr             rr  rr       w",
            "w      rr  rr             rr  rr       w",
            "w                                      w",
            "w        rr                 rr         w",
            "w        rr                 rr         w",
            "w                  rr                  w",
            "w                                      w",
            "w  rr          rr      rr        rr    w",
            "w                                      w",
            "w                                      w",
            "wb                                    bw",
            "wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww"];
    }
    else if(x===2){
        level = [
            "wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww",
            "w              r                       w",
            "w              r                       w",
            "w                                      w",
            "w    f                                 w",
            "w     rrrrr    r       r        r      w",
            "w     rb       r       r        r      w",
            "w     r        r       r        r      w",
            "w   rrr        r       r        r      w",
            "w  b           r       r        r      w",
            "w              r       r        r      w",
            "w              r       r               w",
            "w              r       rrrrrrr         w",
            "w           h  r                       w",
            "w                                      w",
            "w                                      w",
            "w              r                       w",
            "w              r                       w",
            "w              r                     b w",
            "wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww"];
    }

    return(level);
};

var gameObj = function(){
    this.currTileMap = [];
    this.gameOver = 0;
    this.currentFrame = 0;
    this.customCharMade = 0;
    this.start = 0;
    this.TILE_WIDTH = 20;
    this.TILE_HEIGHT = 20;
    this.friction = 0.3;
    this.images = [];
    this.rocks = [];
    this.walls = [];
    this.carrots = [];
    this.animals = [];
    this.keyArray = [];
    this.walkSpeed = 1;
    this.runSpeed = 1.3;
    this.xShift = 0;
    this.score = 0;
    this.carrotCount = 100;
    this.printed = 0;
//all enter high scores here
//paste the new printout of scores here
//
    this.highScores = [
{name: "SOUP", score:218},
{name: "SOUP", score:192},
{name: "SOUP", score:168},
{name: "Alex", score:157},
{name: "A Low Score", score:2}];
//
//Paste above
};

var GAME = new gameObj();

//user rabbit
var hareObj = function(x,y){
    this.position = new PVector(x,y);
    this.velocity = new PVector(0,0);
    this.angle = 0;
    this.distance = 0;
    this.currFrame = 0;
    this.imgState = 0;
    this.state = 0;
    this.currSpeed = 0;
    this.size = 15;
    this.score=0;
    this.type = 'h';
    this.index = -1;
};

//NPC rabbits
var rabbitObj = function(x,y){
    this.position = new PVector(x,y);
    this.velocity = new PVector(0,0);
    this.angle = 0;
    this.distance = 0;
    this.currFrame = 0;
    this.imgState = 0;
    this.state = 0;
    this.currSpeed = 0;
    this.size = 15;
    this.type = 'b';
    this.index = -1;
};

var wolfObj = function(x,y){
    this.position = new PVector(x,y);
    this.velocity = new PVector(0,0);
    this.angle = 0;
    this.distance = 0;
    this.currFrame = 0;
    this.imgState = 0;
    this.imageFrame = 0;
    this.state = 0;
    this.currSpeed = 0;
    this.size = 20;
    this.type = 'f';
    this.index = -1;
};

var carrotObj = function(x,y){
    this.position = new PVector(x,y);
    this.size = GAME.TILE_WIDTH;
    this.state = 0;
    this.type = 'c';
    this.index = 0;
};

//x,y at top left
var rockObj = function(x,y){
    this.position = new PVector(x,y);
    this.size = 18;
};

//x,y at top left
var wallObj = function(x,y){
    this.position = new PVector(x,y);
    this.size = GAME.TILE_WIDTH;
};

carrotObj.prototype.draw = function() {
    //normal state then display
    if(this.state===0){
        image(GAME.images[1],this.position.x,this.position.y,20,20);
    }
};

wallObj.prototype.draw = function() {
    image(GAME.images[2],this.position.x,this.position.y,20,20);
};

rockObj.prototype.draw = function() {
    image(GAME.images[3],this.position.x,this.position.y,20,20);
};

hareObj.prototype.draw = function() {

    if(GAME.carrotCount === 0 || this.state===-1){
        GAME.gameOver=1;
    }
    pushMatrix();
    translate(this.position.x+10,this.position.y+10);
    rotate(this.angle+90);
    image(GAME.images[4],-13,-13,26,26);
    popMatrix();

    if(this.position.x < 200)
    {
        GAME.xShift=0;
    }

    else if(this.position.x < 600)
    {
        GAME.xShift = -1*(this.position.x-200);
    }

    else if(this.position.x>=600){
        GAME.xShift = -400;
    }
};

rabbitObj.prototype.draw = function() {
    if(this.state>=0){
        pushMatrix();
        translate(this.position.x+10,this.position.y+10);
        rotate(this.angle+90);
        image(GAME.images[5],-10,-10,20,20);
        popMatrix();
    }
};

wolfObj.prototype.draw = function() {
    if(this.state>=0){
        if(frameCount-this.imageFrame>12&&this.state===0){
            this.imageFrame=frameCount;
            this.imgState++;
            if(this.imgState===3){
                this.imgState=0;
            }
        }

        else if(frameCount-this.imageFrame>8&&this.state===1){
            this.imageFrame=frameCount;
            this.imgState++;
            if(this.imgState===3){
                this.imgState=0;
            }
        }

        pushMatrix();
        translate(this.position.x+10,this.position.y+10);
        rotate(this.angle+90);
        image(GAME.images[6+this.imgState],-15,-15,30,30);
        popMatrix();
    }
};

//char images index
/*
 * 0 - grass
 * 1 - carrot
 * 2 - wall
 * 3 - rock
 * 4 - hare
 * 5 - rabbits
 * 6 - wolf1
 * 7 - wolf2
 * 8 - wolf3
*/
var customChar = function(){
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

    //carrot image
    //
    {
        background(0,0,0,0);

        pushMatrix();
        translate(230,160);
        rotate(45);

        //leafs
        strokeWeight(10);
        stroke(10,120,10);
        {
            //left leaf
            beginShape();
            curveVertex(-3,0);
            curveVertex(-6,-15);
            curveVertex(-21,-105);
            curveVertex(-36,-105);
            curveVertex(-24,-99);
            curveVertex(-15,-96);
            endShape();

            //middle leaf
            beginShape();
            curveVertex(0,0);
            curveVertex(0,-15);
            curveVertex(6,-123);
            curveVertex(21,-123);
            curveVertex(10,-126);
            curveVertex(6,-126);
            endShape();

            //right leaf
            beginShape();
            curveVertex(3,0);
            curveVertex(6,-15);
            curveVertex(21,-105);
            curveVertex(36,-105);
            curveVertex(24,-99);
            curveVertex(15,-96);
            endShape();
        }

        //main triangle
        fill(230,130,30);
        noStroke();
        triangle(-40,-5,40,-5,0,250);
        popMatrix();

        GAME.images.push(get(50,50,300,300));
    }

    //wall image
    //
    {
        background(0,0,0,0);
        image(getImage("cute/WallBlock"),0,-200, 400,600);
        GAME.images.push(get(0,0,width,height));
    }

    //rock image
    //
    {
        background(0,0,0,0);
        image(getImage("cute/Rock"),0,-200, 400,600);
        GAME.images.push(get(0,0,width,height));
    }

    //hare image1
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
        rotate(-15);
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

        //array
        pushMatrix();
        rotate(90);
        GAME.images.push(get(0,0,400,400));
        popMatrix();
    }

    //rabbit image1
    {
        fill(220,200,220);
        //body
        ellipse(200,200,160,280);
        //tail
        strokeWeight(2);
        stroke(100,100, 100);
        ellipse(200,355,80,80);

        //head
        strokeWeight(5);
        stroke(0,0,0);
        fill(230, 230, 230);
        pushMatrix();
        translate(200,90);
        rotate(-15);
        ellipse(0,0,130,170);

        //ears
        strokeWeight(7);
        stroke(250, 250, 250);

        ellipse(-40,110,35,150);
        ellipse(40,110,35,150);

        fill(255, 100, 100);
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

        //array
        pushMatrix();
        rotate(90);
        GAME.images.push(get(0,0,400,400));
        popMatrix();
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
        rotate(5);
        arc(0,0,30,170,110,430);
        popMatrix();

        //front left leg
        pushMatrix();
        translate(160,135);
        rotate(-5);
        arc(0,0,30,170,110,430);
        popMatrix();

        //back right leg
        pushMatrix();
        translate(225,270);
        rotate(178);
        arc(0,0,30,170,110,430);
        popMatrix();

        //back left leg
        pushMatrix();
        translate(175,260);
        rotate(182);
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
        rotate(52);
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

        pushMatrix();
        rotate(90);
        GAME.images.push(get(0,0,400,400));
        popMatrix();
    }


    //wolf image2
    {
        background(0,0,0,0);
        strokeWeight(9);
        stroke(80, 80, 80);
        fill(95,95,95);

        //front right leg
        pushMatrix();
        translate(230,120);
        rotate(4);
        arc(0,0,30,170,110,430);
        popMatrix();

        //front left leg
        pushMatrix();
        translate(165,135);
        rotate(-3);
        arc(0,0,30,170,110,430);
        popMatrix();

        //back right leg
        pushMatrix();
        translate(235,310);
        rotate(180);
        arc(0,0,25,170,110,430);
        popMatrix();

        //back left leg
        pushMatrix();
        translate(168,290);
        rotate(182);
        arc(0,0,28,170,110,430);
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
        translate(180,345);
        rotate(29);
        ellipse(0,0,55,110);
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

        pushMatrix();
        rotate(90);
        GAME.images.push(get(0,0,400,400));
        popMatrix();
    }


    //wolf image3
    {
        background(0,0,0,0);
        strokeWeight(9);
        stroke(80, 80, 80);
        fill(95,95,95);

        //front right leg
        pushMatrix();
        translate(230,125);
        rotate(4);
        arc(0,0,30,170,110,430);
        popMatrix();

        //front left leg
        pushMatrix();
        translate(162,95);
        rotate(-2);
        arc(0,0,30,170,110,430);
        popMatrix();

        //back right leg
        pushMatrix();
        translate(235,278);
        rotate(178);
        arc(0,0,25,170,110,430);
        popMatrix();

        //back left leg
        pushMatrix();
        translate(171,295);
        rotate(180);
        arc(0,0,28,170,110,430);
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
        translate(215,345);
        rotate(-17);
        ellipse(0,0,50,100);
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

        pushMatrix();
        rotate(90);
        GAME.images.push(get(0,0,400,400));
        popMatrix();
    }

    GAME.customCharMade = 1;
};

//checkCollisioin takes a placeable object
//needs:
//@position
//@size
//@type
//@state
//@index
//@currFrame
var checkCollision = function(a){
    var x = a.position.x+10;
    var y = a.position.y+10;
    var s = a.size;
    var t = a.type;
    var nextState =0;

    //collision using rects
    for(var i = 0; i<GAME.rocks.length; i++){
        if(x-s/2 < GAME.rocks[i].position.x+GAME.rocks[i].size &&
         y-s/2 < GAME.rocks[i].position.y+GAME.rocks[i].size &&
         x+s/2 > GAME.rocks[i].position.x &&
         y+s/2 > GAME.rocks[i].position.y){
            return true;
        }

    }

    //collision using rects
    for(var i = 0; i<GAME.walls.length; i++){
        if(x-s/2 < GAME.walls[i].position.x+GAME.TILE_WIDTH &&
         y-s/2 < GAME.walls[i].position.y+GAME.TILE_WIDTH &&
         x+s/2 > GAME.walls[i].position.x &&
         y+s/2 > GAME.walls[i].position.y){
            return true;
         }
    }

    //check against each animal
    for(var i = 0; i<GAME.animals.length; i++){
        //a dead animal
        if(GAME.animals[i].state===-1){
        }

        //same animal
        else if(a.index===i){
        }

        //collision with another animal
        else if(dist(x,y,GAME.animals[i].position.x+GAME.TILE_WIDTH/2,GAME.animals[i].position.y+GAME.TILE_HEIGHT/2) <= ceil(s/2)+ceil(GAME.animals[i].size/2)){
            //this is a hare or rabbit being eaten
            if(((t==='b'||t==='h')&&(GAME.animals[i].type==='f'))){
                GAME.animals[a.index].state=-1;
                nextState=-1;
                if(t==='h'){
                    GAME.gameOver=1;
                }
            }
            //this is a wolf eating something
            else if(t==='f' && (GAME.animals[i].type==='b'||GAME.animals[i].type==='h')){
                GAME.animals[i].state=-1;
                if(GAME.animals[i].type==='h'){
                    GAME.gameOver=1;
                }
            }
            return true;
        }

        //put rabbit or hare into evade state
        else if(dist(x,y,GAME.animals[i].position.x+GAME.TILE_WIDTH/2,GAME.animals[i].position.y+GAME.TILE_HEIGHT/2) <= (s/2)+(GAME.animals[i].size/2)+80 && (t==='b'||t ==='h') && GAME.animals[i].type==='f'){
            nextState=1;
        }

        //put wolf into chase state
        else if(dist(x,y,GAME.animals[i].position.x+GAME.TILE_WIDTH/2,GAME.animals[i].position.y+GAME.TILE_HEIGHT/2) <= (s/2)+(GAME.animals[i].size/2)+120 && t==='f' && (GAME.animals[i].type==='b'||GAME.animals[i].type==='h')){
            nextState=1;
        }
    }

    //if a rabbit hare or wolf changed state set currFrame -1 to trigger new state
    if(t==='b'||t==='h'||t==='f'){
        if(GAME.animals[a.index].state!==nextState){
            GAME.animals[a.index].currFrame=-1;
        }
        GAME.animals[a.index].state=nextState;
    }
    return false;
};

var checkFood = function(x,y,s){

    for(var i = 0; i<GAME.carrots.length; i++){
            if(x-s/2 < GAME.carrots[i].position.x+GAME.TILE_WIDTH &&
             y-s/2 < GAME.carrots[i].position.y+GAME.TILE_WIDTH &&
             x+s/2 > GAME.carrots[i].position.x &&
             y+s/2 > GAME.carrots[i].position.y &&
             GAME.carrots[i].state===0){
                //eaten state
                GAME.carrots[i].state = -1;
                GAME.carrotCount--;
                return true;
            }
        }
};

hareObj.prototype.move = function(){
    var tempVect = new PVector(0,0);

    if(GAME.keyArray[37])
    {
        tempVect.x += -1;
    }
    if(GAME.keyArray[38])
    {
        tempVect.y += -1;
    }
    if(GAME.keyArray[39])
    {
        tempVect.x += 1;
    }
    if(GAME.keyArray[40])
    {
        tempVect.y += 1;
    }

    if(this.state===0){
        this.currSpeed = GAME.walkSpeed;
    }
    else if(this.state===1){
        this.currSpeed = GAME.runSpeed;
    }

    tempVect.normalize();
    tempVect.mult(this.currSpeed);

    //friction
    this.velocity.mult(GAME.friction);

    //if moving into a wall allow sliding
    this.velocity.add(tempVect);
    this.position.add(this.velocity);
    if(checkCollision(this)){
        this.position.sub(this.velocity);
        this.position.x+=this.velocity.x*this.currSpeed;
        if(checkCollision(this)){
            this.position.x-=this.velocity.x*this.currSpeed;
            this.position.y+=this.velocity.y*this.currSpeed;
            if(checkCollision(this)){
                this.position.y-=this.velocity.y*this.currSpeed;
            }
        }
    }

    this.angle=this.velocity.heading();

    if(checkFood(this.position.x+GAME.TILE_WIDTH/2, this.position.y+GAME.TILE_HEIGHT/2,this.size)){
        this.score+=1;
        GAME.score++;
    }

};

rabbitObj.prototype.move = function(){

    var tempVect = new PVector(0,0);

    //eaten state
    if(this.state === -1){
        this.currSpeed = 0;
    }

    //alive
    else{
        //wander state
        if(this.state===0){
            this.currSpeed = GAME.walkSpeed;
            if(frameCount - this.currFrame >= this.distance||this.currFrame===-1){
                this.currFrame = frameCount;
                this.distance = random(50,150);
                this.angle += random(-45,45);
            }
        }

        //evade state
        else if(this.state===1){
            this.currSpeed = GAME.runSpeed;
            if(frameCount - this.currFrame >= this.distance||this.currFrame===-1){
                this.currFrame = frameCount;
                this.distance = random(10,40);

                for(var i = 0; i < GAME.animals.length; i++){
                    if(GAME.animals[i].type==='f'){
                        tempVect = this.position.get();
                        tempVect.sub(GAME.animals[i].position.get());
                    }
                }

                this.angle = tempVect.heading()+random(-80,80);
            }
        }

        tempVect.y = sin(this.angle);
        tempVect.x = cos(this.angle);

        tempVect.normalize();
        tempVect.mult(this.currSpeed);

        //friction
        this.velocity.mult(GAME.friction);


        this.velocity.add(tempVect);
        this.position.add(this.velocity);

        //if moving into a wall allow sliding during a period based on wander and chased distance
        if(this.distance - frameCount + this.currFrame >35 && this.distance - frameCount + this.currFrame <90 ){
            if(checkCollision(this)){
                this.position.sub(this.velocity);
                this.position.x+=this.velocity.x*this.currSpeed;
                if(checkCollision(this)){
                    this.position.x-=this.velocity.x*this.currSpeed;
                    this.position.y+=this.velocity.y*this.currSpeed;
                    if(checkCollision(this)){
                        this.position.y-=this.velocity.y*this.currSpeed;
                        this.position.add(this.velocity);
                    }
                }
            }
        }

        var loopCount = 0;
        var prevAngle = this.angle;
        //if still a collision loop through random opposite angles
        while(checkCollision(this) && loopCount<100){
            this.position.sub(this.velocity);
            this.angle = prevAngle;

            //angle is up
            if((this.angle < -45 && this.angle > -135) || (this.angle > 225 && this.angle < 315)){
                this.angle = random(1,179);
            }
            //angle is right
            else if(this.angle>-45 && this.angle < 45 || this.angle >315 && this.angle < 405){
                this.angle = random(91, 269);
            }
            //angle is down
            else if(this.angle>45 && this.angle < 135){
                this.angle-=random(181,359);
            }
            //angle is left
            else{
                this.angle = random(-89, 89);
            }

            tempVect.x = cos(this.angle);
            tempVect.y = sin(this.angle);

            tempVect.normalize();
            tempVect.mult(this.velocity.mag());

            this.velocity = tempVect.get();
            this.position.add(this.velocity);
            loopCount++;
        }

        this.angle=this.velocity.heading();
        if(checkFood(this.position.x+GAME.TILE_WIDTH/2,this.position.y+GAME.TILE_HEIGHT/2,this.size)===true){
            this.score++;
        }
    }

};

wolfObj.prototype.move = function(){
    var tempVect = new PVector(0,0);
    //wander state
    if(this.state===0){
        this.currSpeed = GAME.walkSpeed;
        if(frameCount - this.currFrame >= this.distance||this.currFrame===-1){
            this.currFrame = frameCount;
            this.distance = random(75,200);
            this.angle += random(-45,45);
        }
    }

    //chase state
    else if(this.state===1){
        this.currSpeed = GAME.runSpeed*1.2;
        if(frameCount - this.currFrame >= this.distance||this.currFrame===-1){
            if(this.currFrame===-1){
                this.distance = random(10,25);
            }
            else{
                this.distance = random(25,50);
            }
            this.currFrame = frameCount;

            var leastDist = -1;
            for(var i = 0; i < GAME.animals.length; i++){
                if((GAME.animals[i].type==='h'||GAME.animals[i].type==='b')&&GAME.animals[i].state!==-1){
                    if(dist(this.position.x,this.position.y,GAME.animals[i].position.x,GAME.animals[i].position.y)<leastDist || leastDist===-1){
                        leastDist = dist(this.position.x,this.position.y,GAME.animals[i].position.x,GAME.animals[i].position.y);
                        tempVect = GAME.animals[i].position.get();
                    }
                }
            }

            tempVect.sub(this.position);
            this.angle = tempVect.heading();
        }
    }

    tempVect.y = sin(this.angle);
    tempVect.x = cos(this.angle);

    tempVect.normalize();
    tempVect.mult(this.currSpeed);

    //friction
    this.velocity.mult(GAME.friction);

    this.velocity.add(tempVect);

    this.position.add(this.velocity);
    var loopCount = 0;
    var prevAngle = this.angle;

    if((this.distance - frameCount + this.currFrame >75 && this.distance - frameCount + this.currFrame <110) || this.distance - frameCount + this.currFrame <30){
        if(checkCollision(this)){
            this.position.sub(this.velocity);
            this.position.x+=this.velocity.x*this.currSpeed;
            if(checkCollision(this)){
                this.position.x-=this.velocity.x*this.currSpeed;
                this.position.y+=this.velocity.y*this.currSpeed;
                if(checkCollision(this)){
                    this.position.y-=this.velocity.y*this.currSpeed;
                    this.position.add(this.velocity);
                }
            }
        }
    }
    while(checkCollision(this) && loopCount<80){
        this.position.sub(this.velocity);
        this.angle = prevAngle;
        this.distance = 2;

        //angle is up
        if((this.angle < -45 && this.angle > -135) || (this.angle > 225 && this.angle < 315)){
            this.angle = random(1,179);
        }
        //angle is right
        else if(this.angle>-45 && this.angle < 45 || this.angle >315 && this.angle < 405){
            this.angle = random(91, 269);
        }
        //angle is down
        else if(this.angle>45 && this.angle < 135){
            this.angle-=random(181,359);
        }
        //angle is left
        else{
            this.angle = random(-89, 89);
        }

        tempVect.x = cos(this.angle);
        tempVect.y = sin(this.angle);

        tempVect.normalize();
        tempVect.mult(this.velocity.mag());

        this.velocity = tempVect.get();
        this.position.add(this.velocity);
        loopCount++;
    }
    this.angle=this.velocity.heading();
};

var keyPressed = function(){
    GAME.keyArray[keyCode]=1;

};

var keyReleased = function(){
    GAME.keyArray[keyCode]=0;
};

    //randomly placing carrotCount carrots
var placeCarrots = function(){
    for(var i = 0; i < GAME.carrotCount; i++){
        var tempCarrot = new carrotObj(random(20,760), random(20,360));
        while(checkCollision(tempCarrot)){
           tempCarrot = new carrotObj(random(20,760), random(20,360));
        }

        for(var j = 0; j<GAME.carrots.length; j++){
            if(dist(tempCarrot.position.x,tempCarrot.position.y,GAME.carrots[j].position.x,GAME.carrots[j].position.y)<tempCarrot.size||checkCollision(tempCarrot)){
                tempCarrot = new carrotObj(random(20,760), random(20,360));
                while(checkCollision(tempCarrot)){
                   tempCarrot = new carrotObj(random(20,760), random(20,360));
                }
                j=0;
            }
        }
        GAME.carrots.push(tempCarrot);
    }

};

var initTileMap = function(){
    GAME.walls=[];
    GAME.animals=[];
    GAME.rocks=[];
    GAME.carrots=[];
    GAME.carrotCount=100;
    GAME.currFrame = 0;
    GAME.printed=0;
    GAME.gameOver=0;
    for(var i = 0; i < GAME.currTileMap.length; i++){
        for(var j = 0; j < GAME.currTileMap[i].length; j++){
            switch(GAME.currTileMap[i][j]){
                //wall
                case('w'):
                    GAME.walls.push(new wallObj(j*20, i*20));
                    break;
                //hare
                case('h'):
                    GAME.animals.push(new hareObj(j*20, i*20));
                    GAME.animals[GAME.animals.length-1].index=GAME.animals.length-1;
                    break;
                //rabbits
                case('b'):
                    GAME.animals.push(new rabbitObj(j*20, i*20));
                    GAME.animals[GAME.animals.length-1].index=GAME.animals.length-1;
                    break;
                //wolf
                case('f'):
                    GAME.animals.push(new wolfObj(j*20, i*20));
                    GAME.animals[GAME.animals.length-1].index=GAME.animals.length-1;
                    break;
                //rock
                case('r'):
                    GAME.rocks.push(new rockObj(j*20, i*20));
                    break;
                //carrot
                case('c'):
                    GAME.carrots.push(new carrotObj(j*20, i*20));
                    GAME.carrots[GAME.carrots.length-1].index=GAME.carrots.length-1;
                    break;
                default:
                    break;
            }
        }
    }

    placeCarrots();
};

var printHighScores = function(){
    var os = "";
    os+=("this.highScores = [");
    for(var i = 0; i < GAME.highScores.length; i++){
        os+=("\n{name: \"" + GAME.highScores[i].name + "\", score:" + GAME.highScores[i].score + "},");
    }
    os=os.substring(0,os.length-1)+"];\n\//Copy and replace the above statement at line 77";
    println(os);
};

var mouseClicked = function(){
    if(GAME.start===0){
        GAME.start=1;
    }

    //reset and move to level 2 or reset score and 1 if loss
    if(GAME.gameOver){
        if(mouseX>320&&mouseX<378&&mouseY>45&&mouseY<77){
            printHighScores();
        }
        else{
            GAME.xShift=0;
            GAME.start=0;
            GAME.currTileMap=[];
            if(GAME.carrotCount===-1){
                GAME.currTileMap = tileMapChooser(2);
                initTileMap();
            }

            else{
                GAME.score = 0;
                GAME.currTileMap = tileMapChooser(1);
                initTileMap();
            }
        }
    }
};




var highScoresText;

gameObj.prototype.initialize = function(){
    this.currTileMap = tileMapChooser(1);
    this.gameOver = 0;
    this.currentFrame = 0;
    this.customCharMade = 0;
    this.start = 0;
    this.TILE_WIDTH = 20;
    this.TILE_HEIGHT = 20;


    initTileMap();
};

GAME.initialize();


void draw() {
    //create the characters
    if(GAME.customCharMade===0){
        customChar();
    }

    //instructions
    else if(GAME.start===0){
        background(90,90,90);
        fill(168, 111, 47);
        textSize(50);
        textAlign(CENTER,CENTER);
        text("The Wolf\nand the Hare",200,65);


        textSize(25);
        fill(255, 200, 100);
        textAlign(LEFT,TOP);
        text("-You control the darker hare \n with the arrow keys\n"+
            "-Collect all of the carrots \n without being caught to win\n"+
            "-Helper rabbits can collect the\n carrots too for no points\n"+
            "-Beware of the Wolf!",10,135);

        fill(255,255,255);
        textSize(18);
        textAlign(CENTER,TOP);
        text("Click anywhere to start",200,360);
    }

    //gameOver
    else if(GAME.gameOver===1){
        background(255,255,0);
        fill(255,0,0);
        textAlign(CENTER, TOP);
        textSize(35);
        //WIN
        if(GAME.carrotCount<=0){

            text("Winner",200,10);
            if(GAME.carrotCount===0){

                //100 Points for clearing the carrots
                GAME.score+=100;

                //30 points for each other rabbit still alive
                for(var i = 0; i<GAME.animals.length; i++){
                    if(GAME.animals[i].type==='b'&&GAME.animals[i].state!==-1){
                        GAME.score+=30;
                    }
                }
                //send to
                GAME.carrotCount=-1;
            }
        }

        //LOSE
        else{
            text("You Lose",200,10);
        }

        if(GAME.printed===0&&GAME.score>0){
            GAME.printed=1;

            var scorePos = 11;
            for(var i = 0; i < GAME.highScores.length&&GAME.score>0; i++){
                if(scorePos===11){
                    if(GAME.score>GAME.highScores[i].score){
                        scorePos=i;
                    }
                    else if(i+1===GAME.highScores.length&&GAME.highScores.length<10){
                        scorePos=GAME.highScores.length;
                    }
                }
                if(scorePos!==11&&scorePos!==GAME.highScores.length){
                    GAME.highScores[GAME.highScores.length-(i-scorePos)]={name:GAME.highScores[GAME.highScores.length-(i-scorePos)-1].name, score:GAME.highScores[GAME.highScores.length-(i-scorePos)-1].score};
                }
            }
            if(scorePos!==11){
                GAME.highScores[scorePos] = {name:"YOUR NAME", score:GAME.score};
            }
        }

        fill(0,0,0);
        rect(320,45,58,32);
        fill(255, 0, 0);
        textAlign(LEFT,TOP);
        textSize(20);
        text("Print",325,50,100,25);

        fill(50,50,200);
        var highScoreText = "HIGHSCORES\n";
        fill(0,0,0);
        textAlign(CENTER,TOP);
        textSize(25);
        text(highScoreText,200,60);
        highScoreText="";
        for(var a =0; a < 3; a++){
            for(var i = 0; i < 10; i++){
                if(a===0){
                    highScoreText+=((i+1)+".");
                }

                else if(i<GAME.highScores.length){
                    if(a===1){
                        highScoreText+=(GAME.highScores[i].name);
                    }
                    else if(a===2){
                        highScoreText+=(GAME.highScores[i].score);
                    }
                }

                highScoreText+="\n";
            }

            textSize(20);
            textAlign(CENTER,TOP);
            text(highScoreText,a*150+50,100);
            highScoreText="";
        }
    }

    //Game running
    else{

        //set black over everything
        background(0,0,0);

        pushMatrix();
        translate(GAME.xShift,0);

        var i = 0;
        var j = 0;
        //draw the grass tile as the background
        for(i = 0; i < 6; i++){
            for(j = 0; j < 3; j++){
              image(GAME.images[0],i*150-25,j*150-25,151,151);
            }
        }


        //cycle through all the rocks
        for(i = 0; i < GAME.rocks.length; i++){
            GAME.rocks[i].draw();
        }

        //cycle through all the walls
        for(i = 0; i < GAME.walls.length; i++){
            GAME.walls[i].draw();
        }

        //cycle through all the animals
        for(i = 0; i < GAME.animals.length; i++){
            GAME.animals[i].move();
            //just in case after a move call they are end up past the walls
            if(GAME.animals[i].position.x>770){
                GAME.animals[i].position.x=760;
            }
            else if(GAME.animals[i].position.x<10){
                GAME.animals[i].position.x=20;
            }
            else if(GAME.animals[i].position.y<10){
                GAME.animals[i].position.y=20;
            }
            else if(GAME.animals[i].position.y>370){
                GAME.animals[i].position.y=360;
            }
            GAME.animals[i].draw();

        }
        //cycle through all the carrots
        for(i = 0; i < GAME.carrots.length; i++){
            GAME.carrots[i].draw();
        }

        popMatrix();

    }

    if(GAME.start){
        strokeWeight(1);
        textAlign(LEFT,TOP);
        textSize(16);
        fill(0,0,0,85);
        rect(-1,-1,96,18);
        if(GAME.carrotCount>=0){
                rect(304,-1,96,18);
            fill(240,160,80);
            text("Carrots: " + GAME.carrotCount,305,0);
        }
        fill(255,255,255);
        text("Score: " + GAME.score,0,0);

    }
};