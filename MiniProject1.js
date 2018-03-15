void setup() {
	size(400,400);
}
angleMode="radians";

var confettiObj = function(x,y,rN,gN,bN){
    this.r = rN;
    this.g = gN;
    this.b = bN;
    this.x=x;
    this.y=y;
    this.angle = random(0,TWO_PI);
    this.magnitude = random(-4,4);
    this.velocity = new PVector(this.magnitude*cos(this.angle),this.magnitude*sin(this.angle));
};

var gravity = 0.1;
var a = random(1500);
var windSpeed = 0.005;

var balloonObj = function(x,y,rN,gN,bN){
    this.r = rN;
    this.g = gN;
    this.b = bN;
    this.x=x;
    this.y=y;
    this.velocity = new PVector(0,random(-3,-0.5));

    this.pop = 0;

    this.x1 = 0;
    this.y1 = 0;
    this.x2 = this.x1+18;
    this.y2 = this.y1+250;
    this.cx1 = this.x1-7;
    this.cy1 = this.y1+150;
    this.cx2 = this.x2+10;
    this.cy2 = this.y2-100;

    this.cx1Dir = random(0.5,1.25);
    this.cx2Dir = random(1.5,2.5);
    this.x2Dir = random(1,2);
    this.confetti = [];
    this.timeLeft = 180;
};

balloonObj.prototype.draw = function() {
    pushMatrix();
    if(this.pop===0){
        this.y1 = 65;
        this.y2 = 315;
        this.cy1 = this.y1+150;
        this.cy2 = this.y2-100;
        translate(this.x,this.y);
        scale(0.5);
        noStroke();
        fill(this.r,this.g,this.b);
        ellipse(0,0,100,130);
        noFill();
        stroke(0,0,0);
        strokeWeight(5);
        bezier(this.x1, this.y1, this.cx1, this.cy1, this.cx2, this.cy2, this.x2, this.y2);
        this.x2+=5*windSpeed;

        this.cx1 += this.cx1Dir;
        if ((abs(this.cx1 - this.x1) > 25)) {
            this.cx1Dir = -this.cx1Dir;
        }
        this.cx2 += this.cx2Dir;
        if ((abs(this.cx2 - this.x1) > 40)) {this.cx2Dir = -this.cx2Dir;}
        this.x2 += this.x2Dir;
        if ((abs(this.x1 - this.x2) > 45)) {this.x2Dir = -this.x2Dir;}
    }
    else{
        for(var i = 0; i < this.confetti.length; i++){
            this.confetti[i].velocity.mult(0.98);
            this.confetti[i].velocity.y+=gravity;
            noStroke();
            var cR = random(0.5,1.5);
            fill(this.confetti[i].r*cR, this.confetti[i].g*cR, this.confetti[i].b*cR, (this.timeLeft/180)*255);
            ellipse(this.confetti[i].x,this.confetti[i].y,5,5);
            this.confetti[i].x+=this.confetti[i].velocity.x + windSpeed*100;
            this.confetti[i].y+=this.confetti[i].velocity.y;
        }
        this.timeLeft--;
    }
    popMatrix();

};

balloonObj.prototype.move = function() {
    this.x+=windSpeed*50;
    this.y+=this.velocity.y;
    this.y1+=this.velocity.y;
    if(this.y<-200){
        this.y=450;
    }
    if(this.x<-50){
        this.x=450;
    }
    if(this.x>450){
        this.x=-50;
    }
};

var bloons = [];

var init = function(){
    for(var i = 0; i < 5; i++){
        bloons.push(new balloonObj(random(50,350),random(200,380),random(80,255),random(80,255), random(0,150)));
    }
};


var mouseClicked = function(){

    for(var i = 0; i < bloons.length; i++){
        if(dist(mouseX, mouseY, bloons[i].x,bloons[i].y)<30&&bloons[i].pop===0){
            for(var j = 0; j<50; j++){
                var cR = random(0.8,1.5);
                bloons[i].confetti.push(new confettiObj(mouseX, mouseY, bloons[i].r*cR, bloons[i].g*cR, bloons[i].b*cR));
            }
            bloons[i].pop = 1;
        }
    }
};

init();

var changeWind=0;

void draw() {
    if(changeWind+20<frameCount){
        changeWind = frameCount;
        var wind = windSpeed + random(-0.003,0.003);
        windSpeed = constrain(wind, -0.01, 0.01);
    }

    background(3, 102, 202);
    noStroke();
    var n1 = a;
    for (var x=0; x<=400; x+=20) {
        var n2 = 0;
        for (var y=0; y<=400; y+=20) {
            var c = map(noise(n1,n2),0,1,0,255);
            fill(c, c, c+100,200);
            rect(x,y,20,20);
            n2 += 0.05; // step size in noise
        }
        n1 += 0.02; // step size in noise
    }
    a -= windSpeed;  // speed of clouds

    //reset the cursor each frame before checking if it's hovering
    cursor();
    for(var i = 0; i < bloons.length; i++){
        if(bloons[i].timeLeft<=0){
            bloons.splice(i,1);
            bloons.push(new balloonObj(random(50,350),450,random(80,255),random(80,255), random(80,255)));
        }
        //changes cursor on hover of a balloon
        if(dist(mouseX, mouseY, bloons[i].x,bloons[i].y)<30&&bloons[i].pop===0){
            this.cursor(HAND);
        }
        bloons[i].draw();
        bloons[i].move();

    }
};