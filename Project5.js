void setup() {
	size(400, 400)
};
var gameObj = function(){
    this.gameState = 0;
    this.score = 5;
    this.windVelocity = new PVector(-0.5,0);
    this.windFrame = 0;
    this.gravity = new PVector(0,0.3);
    this.keyArray = [];
    this.catapult = null;
    this.images = [];
    this.clouds = [];
    this.rock = null;
    this.targets = [];
    angleMode = "radians";
};


var GAME = new gameObj();

var rockObj = function(x,y){
    this.position = new PVector(x,y);
    this.velocity = new PVector(x,y);
    this.acceleration = new PVector(0, 0);
    this.angle = 0;
    this.size = 16;
    this.density = 15;
    this.dragCoeff = 0.47;
    this.onBand = false;
    this.angleSpeed = 1;
};

var coinObj = function(x,y){
    this.position = new PVector(x,y);
    this.size = 16;
    this.dir = -1;
    this.score = 4;
    this.hit=0;
};

var blimpObj = function(x,y){
    this.position = new PVector(x,y);
    this.size = 40;
    this.score = 3;
    this.hit = 0;
};

var targetObj = function(x,y){
    this.position = new PVector(x,y);
    this.size = 22;
    this.score = 5;
    this.hit = 0;
};

var cloudObj = function(x,y){
    this.position= new PVector(x,y);
    this.speed=random(1,3);
};

var catapultObj = function(x,y){
    this.position = new PVector(x,y);
    this.band = new PVector(0,0);
    this.velocity = new PVector(0,0);
    this.acceleration = new PVector(0,0);
    this.angle = 0;
    this.size = 5;
    this.density = 12;
    this.springCoeff =2;
    this.dragCoeff = 0.8;
    this.stretchLength = 0;
};

var applyDrag = function(a){
    var drag = PVector.sub(GAME.windVelocity, a.velocity);
    drag.mult(0.5* a.dragCoeff * a.size);
    drag.div(a.size*a.density);
    a.acceleration.add(drag);
};

var applyBand = function(a){
    var force = GAME.catapult.band.get();

    force.x=-1*force.x;
    force.normalize();
    force.mult(GAME.catapult.springCoeff*GAME.catapult.stretchLength);
    force.div(a.size*a.density);

    a.acceleration.x+=force.x;
    a.acceleration.y+=force.y*-1;
};

var applyGrav = function(a){
    a.acceleration.add(GAME.gravity);
};

var customChar = function(){
    GAME.gameState++;
    //
    //cloud image
    {
        pushMatrix();
        translate(200,200);
        background(0,0,0,0);
        fill(255,255,255);
        stroke(255,255,255);
        ellipse(-30,5,30,30);//first circle
        ellipse(-20,0,35,35);//second circle
        ellipse(0,0,40,40);//third circle
        ellipse(20,5,30,30);//fourth circle
        popMatrix();
        GAME.images.push(get(155,180,80,40));
    }

    //
    //grass Image
    {
        pushMatrix();
        var x = 200;
        var y = 150;
        background(0,0,0,0);
        strokeWeight(1);
        stroke(30,240,60);
        fill(20,200,50);
        rect(0,y-10,400,400);
        fill(30,240,60);
        var num;

        for(var i = 0; i < 10; i++){
            pushMatrix();
            translate(random(10.0,390.0),0);
            scale(random(1.1,3));
            translate(0,150);

            //left leaf
            beginShape();
            curveVertex(-1,0);
            curveVertex(-2,-10);
            curveVertex(-7,-35);
            curveVertex(-12,-35);
            curveVertex(-8,-33);
            curveVertex(-5,-32);
            endShape();

            //middle leaf
            beginShape();
            curveVertex(0,0);
            curveVertex(0,-5);
            curveVertex(-2,-43);
            curveVertex(-7,-43);
            curveVertex(-3,-42);
            curveVertex(-2,-42);
            endShape();

            //right leaf
            beginShape();
            curveVertex(1,0);
            curveVertex(2,-10);
            curveVertex(7,-35);
            curveVertex(12,-35);
            curveVertex(8,-33);
            curveVertex(5,-32);
            endShape();
            popMatrix();
        }
        popMatrix();
        GAME.images.push(get(0,0,400,400));
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
    //target image
    {
        stroke(0,0,0);
        background(0,0,0,0);
        pushMatrix();
        translate(180,180);
        scale(1.6);
        pushMatrix();
        rotate(-0.436);
        fill(170, 140, 130);
        ellipse(45,80,40,180);
        ellipse(0,45,40,165);
        popMatrix();
        pushMatrix();
        rotate(0.3491);
        fill(0,0,255);
        ellipse(15,0,150,230);
        ellipse(0,0,150,225);
        fill(255,0,0);
        ellipse(0,0,100,150);
        fill(255, 255, 0);
        ellipse(0,0,50,75);
        fill(0,0,0);
        ellipse(0,0,10,15);
        popMatrix();
        popMatrix();
        GAME.images.push(get(0,0,400,400));
    }
};

cloudObj.prototype.draw = function() {
    pushMatrix();
    translate(this.position.x,this.position.y);
    image(GAME.images[0], -40, -20, 80, 40);
    popMatrix();
};

blimpObj.prototype.draw = function(){
    fill(0, 0, 0);
    ellipse(this.position.x+11,this.position.y+14,20,15); //cabin
    fill(255, 255, 255);
    ellipse(this.position.x+14,this.position.y+16,5,5); //window
    ellipse(this.position.x+8,this.position.y+16,5,5); //window
    fill(150,150,150);
    stroke(0,0,0);//border
    ellipse(this.position.x-4,this.position.y,80,30); //bordered main body
    ellipse(this.position.x-4,this.position.y,79,25); //outside in
    ellipse(this.position.x-4,this.position.y,79,16);
    ellipse(this.position.x-4,this.position.y,79,5);
    noStroke();
    ellipse(this.position.x+39,this.position.y,10,20); //rudder
};

coinObj.prototype.draw = function() {
    stroke(200, 180, 0);
    fill(230, 210, 25);
    ellipse(this.position.x, this.position.y, this.size, 16);
    this.size+=this.dir;
    if(this.size<3){
        this.dir*=-1;
    }
    else if(this.size>15){
        this.dir*=-1;
    }
};

targetObj.prototype.draw = function(){
    pushMatrix();
    image(GAME.images[3],this.position.x,this.position.y,28,28);
    popMatrix();
};

cloudObj.prototype.move = function() {
    this.position.x+=this.speed;
    this.speed+=GAME.windVelocity.x*0.02;
    if(this.speed>10){
       this.speed=10;
    }
    else if(this.speed<-10){
        this.speed = -10;
    }
    if(this.position.x < -50){
        this.position.x = width+50;
    }
    else if(this.position.x > width+50){
        this.position.x = -50;
    }
};

rockObj.prototype.draw = function() {
    applyGrav(this);
    applyDrag(this);
    pushMatrix();
    if(GAME.rock.onBand){
        this.angle = GAME.catapult.angle-PI;
        applyBand(this);
        this.velocity.add(this.acceleration);
        if(mouseIsPressed){
            this.position.set(GAME.catapult.position);
            this.position.add(GAME.catapult.band);
            this.acceleration.set(0,0);
            this.velocity.set(0,0);
        }
        translate(this.position.x-GAME.catapult.position.x,this.position.y-GAME.catapult.position.y-30);
        rotate(this.angle);
        translate((this.size/2)+1,0);


        if(this.velocity.mag()<GAME.catapult.velocity.mag()){
            this.velocity.set(GAME.catapult.velocity.x,GAME.catapult.velocity.y);
        }
    }

    else{
        if(this.position.y>390){
            this.position.y=390;
            this.acceleration = this.velocity.get();
            this.velocity.y=0;
            this.acceleration.mult(-0.3);
        }
        translate(this.position.x,this.position.y);
        this.angle+=this.angleSpeed*this.velocity.mag()/(this.size/2);
        rotate(this.angle);
        this.velocity.add(this.acceleration);
    }

    this.position.add(this.velocity);


    image(GAME.images[2], -10, -10, this.size+2, this.size+2);
    popMatrix();
    this.acceleration.set(0,0);
};

catapultObj.prototype.draw = function(){
    pushMatrix();
    translate(this.position.x, this.position.y);
    strokeWeight(1);
    stroke(0,0,0);

    fill(250, 195, 145);
    ellipse(-5,-10,4,38);

    fill(0,0,0);
    rect(-50,0, 80, 10);


    fill(200, 160, 150);
    ellipse(-40,10,16,15);
    ellipse(20,10,15,15);


    applyBand(this);
    applyGrav(this);
    applyDrag(this);
    stroke(255, 100,100);
    strokeWeight(3);
    line(this.band.x,this.band.y-29,5,-29);
    this.stretchLength=2*dist(this.band.x,this.band.y, 0, -29);
    this.velocity.add(this.acceleration);
    this.angle = this.band.heading();
    this.acceleration.set(0,0);

    if((mouseIsPressed)){
        if(dist(0,-29,mouseX-this.position.x,mouseY-this.position.y+29)<100){
            GAME.rock.onBand=true;
            this.band.set((mouseX-this.position.x),(mouseY-this.position.y+29));
        }

        else{
            GAME.rock.onBand=false;
            GAME.rock.position.set(-100,-100);
            this.band.set(0,0);
        }

        if(this.band.mag()>60){
            this.band.normalize();
            this.band.mult(60);
        }
        this.velocity.set(0,0);
    }

    else{
        if(dist(GAME.rock.position.x,GAME.rock.position.y,GAME.catapult.band.x+GAME.catapult.position.x,GAME.catapult.band.y+GAME.catapult.position.y)>(GAME.rock.size/2)){
            if(GAME.rock.onBand){
                GAME.score--;
                GAME.rock.onBand=false;
            }
            this.velocity.mult(0.96);
        }
        this.band.add(this.velocity);
    }

    if(GAME.rock.onBand){
        GAME.rock.draw();
    }

    stroke(255, 100,100);
    strokeWeight(3);
    line(this.band.x,this.band.y-30,-5,-30);
    strokeWeight(1);
    stroke(0,0,0);
    fill(255, 200, 150);
    ellipse(4,-12,5,36);

    popMatrix();
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
    }

    if(mouseIsPressed){
    }
};

var mouseDragged = function(){

};

gameObj.prototype.checkCollision = function(){
    for(var i = 0; i < GAME.targets.length; i++){
        if(dist(this.rock.position.x,this.rock.position.y,GAME.targets[i].position.x,GAME.targets[i].position.y) < (GAME.rock.size+GAME.targets[i].size)/2){
            if(GAME.targets[i].hit===0){
                GAME.targets[i].hit=1;
                GAME.score+=GAME.targets[i].score;
            }
        }
    }
};

gameObj.prototype.initialize = function(){
    GAME.catapult = new catapultObj(70,370);
    GAME.rock = new rockObj(0,0);
    GAME.images = [];
    GAME.score = 5;
    GAME.targets.push(new blimpObj(random(150,380),random(25,150)));
    for(var i = 0; i < 2; i++){
        GAME.targets.push(new targetObj(random(250,390),random(350,385)));
    }

    for(var i = 0; i < 3; i++){
        GAME.targets.push(new coinObj(random(300,390),random(10,380)));
    }

    for(var i = 0; i < 5; i++){
        GAME.clouds.push(new cloudObj(random(0,400),random(10,100)));
    }
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
        text("The Catapult\nLauncher",200,65);


        textSize(25);
        fill(50, 150, 240,200);
        textAlign(LEFT,TOP);
        text("-Click and drag the mouse to\n aim the rock\n"+
            "-Hit the targets before you run\n out of rocks\n"+
            "-One point for each shot\n"+
            "-Pay attention to the wind and\n Good Luck!",10,135);

        fill(255,255,255,100);
        textSize(18);
        textAlign(CENTER,TOP);
        text("Click anywhere to start",200,360);
    }

    //game loop
    else if (GAME.gameState===2){

        background(50, 150, 255);
        pushMatrix();
        scale(1.5);
        fill(0,0,0,150);
        rect(0,-1,80,11);
        rect(0,90,80,15);
        fill(255,100,100);
        textSize(12);
        textAlign(TOP,LEFT);
        text("Wind Dir.",0,0,80,20);
        fill(255,180,100);
        textSize(16);
        text("Score: " + GAME.score,0,91,80,20);
        fill(0,0,0,50);
        stroke(0,0,0);
        rect(0,10,80,80);

        noStroke();
        fill(255, 0, 0);
        translate(40,50);
        rotate(GAME.windVelocity.heading());

        rect(-40,-8,65,16);
        triangle(20,-20,40,0,20,20);

        popMatrix();
        for(var i = 0; i<10; i++){
            image(GAME.images[1],i*40,360,40,40);
        }

        if(frameCount>GAME.windFrame+60){
            //GAME.windVelocity.set(random(-0.5,0.5), random(-0.3,0.5));
            //less sparatic
            GAME.windVelocity.x+=random(-0.4,0.4);
            GAME.windVelocity.y+=random(-0.15,0.18);
            if(GAME.windVelocity.y<-2){
                GAME.windVelocity.y+=0.1;
            }
            GAME.windFrame=frameCount;
        }

        for(var i = 0; i < GAME.clouds.length; i++){
            GAME.clouds[i].draw();
            GAME.clouds[i].move();
        }

        GAME.gameState++;
        for(var i = 0; i < GAME.targets.length; i++){
            if(GAME.targets[i].hit===0){
                GAME.targets[i].draw();
                GAME.gameState=2;
            }
        }

        if(!GAME.rock.onBand){
            GAME.rock.draw();
        }

        GAME.checkCollision();
        GAME.catapult.draw();

        if((GAME.score===0&&(GAME.rock.position.x<0||GAME.rock.position.x>400||GAME.rock.velocity.mag()<0.1))||GAME.score<0||GAME.score>=20){
            GAME.gameState++;
        }
    }
    //game Over
    else if(GAME.gameState===3){
        background(0,0,0);
        textAlign(CENTER,CENTER);
        if(GAME.score>=20){
            text("You win\n" + GAME.score + " points",200,200);
        }

        else{
            text("You Lose\n" + GAME.score + " points",200,200);
        }

    }

};