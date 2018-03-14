// Final project
// Christopher Buehler, Stephanie Marin, Alex Supplee
// Dec. 12, 2105

// This game involves a chicken escaping a coop and farm.
// There are spider enemies and holes to fall through.
// Hay can be jumped and walked through, walls cannot.
// Fences can be cut with wire cutters gained on level 2.
// This game uses many strategies learned in Video Game Design at Virginia Tech.


angleMode = "radians";

void setup() {
	size(400,400)
};

//------------------------------ GAME LEVEL TILEMAPS
// w-wall p-platform f-fence
// r-rotate spider  g-guard spider
// d-door c-coin
// c-chicken
var coopLevel = [
        "                ",
        "wg ppwwwwwwwwwww",
        "w              w",
        "wwwwwwwwwwwwwppw",
        "w              w",
        "w              w",
        "w            www",
        "w             cw",
        "w           pppw",
        "w              w",
        "wppwwwwwwwwwwwww",
        "w             rw",
        "ww             w",
        "w              w",
        "wrwwwwwwww   ppw",
        "w            ppw",
        "w   wwwwwwwwwwww",
        "wc             w",
        "wppc           w",
        "wpp            w",
        "wpp            w",
        "w              w",
        "wpp            w",
        "w     www c   gw",
        "w pp           w",
        "w          wwwww",
        "wpp      pp    w",
        "w   ww         w",
        "w              w",
        "wwwwwwwpp      w",
        "w      pp      w",
        "w              w",
        "wwwwwwwwwwwwwwww"];

var searchLevel = [
        "                                                                 f",
        "     p                         p       cw                        f",
        "     w   wpw                   wwwwwwwwww                        f",
        "c   Xw  p     pwwpw  w                      w          wpp       f",
        "wwwwww        pw  wpwww  ppp                w          w         f",
        "       p      pwppp w    ppp  wppw    ppp   w    wpppw w    pppp f",
        "  pp          pwppwXw         w  w   w   w  w   w      w   w     f",
        "  c   www     pwpppww         w cw   w c w  w   w      w   w     f",
        "  pp         cpwpp  wwww      wppw   wpppw  w    pppp  w   w  c  f",
        "           wwwwwwwppw                w   w  w        w w   w     f",
        "wwwww               w Xw             w   w  w        w w   w     f",
        "w   pp        pp    w wwwwwwwwwww      p    w   wpppw  w    pppp f",
        "w    w  pp  wwwwwwwww      w    p    wwwww  w          w         f",
        "w    w         w    w   p  w  p p      w w  w          w         f",
        "w    w            pcw c w     w        p p  w     w    w      w  f",
        "wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww"];

var chaseLevel = [
    "                                                                                                                                                 ",
    "                                                                                                                                                 ",
    "                                                                                                                                                 ",
    "                                                                                                                                                 ",
    "                                                                                                                                                 ",
    "                                                                                                                                                 ",
    "                                                                                                                                                 ",
    "                                                                                                                                                 ",
    "                                                                                                                                                 ",
    "                                                   w                                                                                             ",
    "                                     w sw          w                                                                                         w   ",
    "                           w         w  w   wpppw  w                            y                                                           www  ",
    "                       w   w   ppp   w  w          w                           ppp                w                     ppp                wwwww ",
    "         ww    ww      w   w         w  w          wsppp                w                   w     w    w         w                        wwwwwww",
    "        www    www     w   wsssssssssw  w          w ppp                w                   w     w    w         w                         fdwwww",
    "wwwwwwwwwww   wwwwwwwwwwwwwwwwwwwwwwww  ww        wwwwwwww wwwww wwww www wwwwwwwwwwww ww wwwwwwwwwwww www wwwwwwwwww wwwwwwwww wwwwwwwwwwwwwwwww"];

var boss_level = [
        "wwwwwwwwwwwwwwww",
        "w              w",
        "w              w",
        "w              w",
        "w              w",
        "w              w",
        "w      pp      w",
        "w  pp          w",
        "w           pppw",
        "wpp    pp      w",
        "w              w",
        "w              w",
        "wppp           w",
        "w              w",
        "w              w",
        "wwwwwwwwwwwwwwww"];

//------------------------------ GLOBALS
var gravity = new PVector(0,0.5);
var keyArray = [];
var xShift = 0;
var yShift = 0;
var currLevelWidth = 0;
var currLevelHeight = 0;
var currentLevel = 0;
var trans = 255;
var t = 0;
var currentFrameCount = 0;
var countingI = 0;
var beginPlease = false;

//------------------------------ OBJECTS

var keyObj = function(x,y){
    this.position = new PVector(x,y);
    this.hit = 0;
    this.type='y';
};

keyObj.prototype.draw = function() {
    if(this.hit === 0){
        //var keyImg = getImage("cute/Key");
        //image(keyImg, this.position.x, this.position.y, 25, 25);
    }
};

//coinObj
var coinObj = function(x,y){
    this.position = new PVector(x,y);
    this.size = 20;
    this.dir = -1;
    this.score = 1;
    this.hit=0;
};

coinObj.prototype.draw = function() {
    if(this.hit===0){
        this.size+=this.dir;
        if(this.size<3){
            this.dir*=-1;
        }
        else if(this.size>20){
            this.dir*=-1;
        }

        strokeWeight(2);
        stroke(200, 180, 0);
        fill(230, 210, 25);
        ellipse(this.position.x+13, this.position.y+13, this.size, 20);
    }
};

var wirecutterObj = function(x,y){
    this.position = new PVector(x,y);
    this.hit = 0;
    this.size = 20;
    this.type = 'x';
};

wirecutterObj.prototype.draw = function() {
    if(this.hit===0){
        strokeWeight(2);
        stroke(200, 180, 0);
        fill(230, 210, 25);
        triangle(this.position.x+12,this.position.y+2,this.position.x+22,this.position.y+22,this.position.x+2,this.position.y+22);
    }
};

// create chicken object
var chickenObj = function(x, y) {

    this.position = new PVector(x, y);
    this.acceleration = new PVector(0,0);
    this.velocity = new PVector(0,0);

    // keeps track of the walking state of the chicken
    this.i = 0;

    // controls the walking speed of the chicken
    this.curFrame = frameCount;

    this.forward = true;
    this.jump = false;

    //list of weapons that can be scrolled through and selected
    //if only one weapon or gun we can change this to a bool
    this.weapons = [];

    //key boolean
    this.hasKey = false;

    //keep track of characters score based on mob kills, coins collected, ...
    this.score = 0;
    this.dead = false;
    this.type = 'k';
    this.hasWirecutters = false;
    this.lives=3;
};

var spiderObj = function(x,y,t){
    this.position = new PVector(x,y);
    this.angle = 0;
    this.speed = 2;
    this.size=24;
    this.type=t;
};

var doorObj = function(x,y){
    this.position = new PVector(x,y);
};

var fenceObj = function(x,y){
    this.position = new PVector(x, y);
};

var wallObj = function(x, y) {

    this.position = new PVector(x, y);
};

var grassObj = function(x,y) {

    this.position = new PVector(x, y);
};

var foxObj = function(x, y) {

    this.position = new PVector(x, y);
    this.velocity = new PVector(0,0);

    // keeps track of the walking state of the fox
    this.i = 0;

    // controls the walking speed of the fox
    this.curFrame = frameCount;
};

var farmerObj = function(x, y) {

    this.position = new PVector(x, y);
    this.velocity = new PVector(0,0);

    // keeps track of the walking state of the fox
    this.i = 0;

    // controls the walking speed of the fox
    this.curFrame = frameCount;

    // 0 = hidden, 1 = unbeaten, 2 = hit, 3 = beaten
    this.state = 0;

    this.score = 100;
};

// create chicken object for animation
var dchickenObj = function(x, y) {

    this.position = new PVector(x, y);

    // keeps track of the walking state of the chicken
    this.i = 0;

    // controls the walking speed of the chicken
    this.curFrame = frameCount;
};

//create chicken object for start screen animation
var dchicken = new dchickenObj(420, 350);

//------------------------------ BOOLEANS
// booleans for different screens
var start = true;
var play = false;
var options = false;
var pause = false;
var instructions = false;
var gameOver = false;
var gameWon = false;

// boolean for sound control
var sound = true;

// booleans tell when objects have been drawn
var chickenMade = false;

// booleans tell when objects have been drawn
var spiderMade = false;

// booleans tell when objects have been drawn
var doorMade = false;

// booleans tell when objects have been drawn
var fenceMade = false;

var foxMade = false;

var sunglassesMade = false;

var woodMade = false;

var hayMade = false;

var farmerMade = false;

//------------------------------ CREATE OBJECTS
//create chicken objetc for start screen animation
var chicken = new chickenObj(25, 350);

// create fox
var fox = new foxObj(-60, 300);

// create farmer
var farmer = new farmerObj(260, 250);

var foxMade = false;

var sunglassesMade = false;

var woodMade = false;

//------------------------------ ARRAYS
// array to track chicken images
var chickens = [];

var spidersImage;
var hayImage;

// 0 = door
var images = [];

// holds door objects
var doors = [];

var coins = [];
var objects = [];

var walls = [];
var grass = [];
var enemies = [];

var fences = [];
var wood = [];
var farmers = [];
var sunglasses = [];
var foxes = [];

//------------------------------ CUSTOM CHARACTERS

// create chicken image and capture it
var chickenImg = function() {

    chickenMade = true;

    noStroke();
    background(0, 0, 0, 0);    // set background of the custom char
    // 0
    noStroke();
    fill(255, 0, 0);
    ellipse(width/2-70, height/2-170, 20, 50);
    fill(255, 255, 0);
    ellipse(width/2-130, height/2-100, 80, 30);
    fill(225, 225, 25);
    ellipse(width/2-80, height/2-40, 100, 250);
    rect(width/2+30, height/2-100, 100, 100);
    rect(width/2+70, height/2-60, 100, 100);
    fill(150, 100, 25);
    ellipse(width/2, height/2+25, 250, 160);
    fill(0, 0, 0);
    ellipse(width/2-90, height/2-130, 20, 20);

    stroke(255, 255, 0);
    strokeWeight(20);
    line(width/2, height/2+100, width/2, height/2+180);
    line(width/2, height/2+100, width/2, height/2+180);

    chickens.push(get(0,0,width,height));

    noStroke();
    background(0, 0, 0, 0);    // set background of the custom char
    // 1
    noStroke();
    fill(255, 0, 0);
    ellipse(width/2-70, height/2-170, 20, 50);
    fill(255, 255, 0);
    ellipse(width/2-130, height/2-100, 80, 30);
    fill(225, 225, 25);
    ellipse(width/2-80, height/2-40, 100, 250);
    rect(width/2+30, height/2-100, 100, 100);
    rect(width/2+70, height/2-60, 100, 100);
    fill(150, 100, 25);
    ellipse(width/2, height/2+25, 250, 160);
    fill(0, 0, 0);
    ellipse(width/2-90, height/2-130, 20, 20);

    stroke(255, 255, 0);
    strokeWeight(20);
    line(width/2-10, height/2+100, width/2-40, height/2+130);
    line(width/2+10, height/2+100, width/2+10, height/2+180);

    chickens.push(get(0,0,width,height));

    noStroke();
    background(0, 0, 0, 0);    // set background of the custom char
    // 2
    noStroke();
    fill(255, 0, 0);
    ellipse(width/2-70, height/2-170, 20, 50);
    fill(255, 255, 0);
    ellipse(width/2-130, height/2-100, 80, 30);
    fill(225, 225, 25);
    ellipse(width/2-80, height/2-40, 100, 250);
    rect(width/2+30, height/2-100, 100, 100);
    rect(width/2+70, height/2-60, 100, 100);
    fill(150, 100, 25);
    ellipse(width/2, height/2+25, 250, 160);
    fill(0, 0, 0);
    ellipse(width/2-90, height/2-130, 20, 20);

    stroke(255, 255, 0);
    strokeWeight(20);
    line(width/2-20, height/2+100, width/2-40, height/2+150);
    line(width/2+20, height/2+100, width/2+30, height/2+180);

    chickens.push(get(0,0,width,height));

    noStroke();
    background(0, 0, 0, 0);    // set background of the custom char
    // 3
    noStroke();
    fill(255, 0, 0);
    ellipse(width/2-70, height/2-170, 20, 50);
    fill(255, 255, 0);
    ellipse(width/2-130, height/2-100, 80, 30);
    fill(225, 225, 25);
    ellipse(width/2-80, height/2-40, 100, 250);
    rect(width/2+30, height/2-100, 100, 100);
    rect(width/2+70, height/2-60, 100, 100);
    fill(150, 100, 25);
    ellipse(width/2, height/2+25, 250, 160);
    fill(0, 0, 0);
    ellipse(width/2-90, height/2-130, 20, 20);

    stroke(255, 255, 0);
    strokeWeight(20);
    line(width/2-20, height/2+100, width/2-40, height/2+180);
    line(width/2+20, height/2+100, width/2+40, height/2+180);

    chickens.push(get(0,0,width,height));

    noStroke();
    background(0, 0, 0, 0);    // set background of the custom char
    // 4
    noStroke();
    fill(255, 0, 0);
    ellipse(width/2-70, height/2-170, 20, 50);
    fill(255, 255, 0);
    ellipse(width/2-130, height/2-100, 80, 30);
    fill(225, 225, 25);
    ellipse(width/2-80, height/2-40, 100, 250);
    rect(width/2+30, height/2-100, 100, 100);
    rect(width/2+70, height/2-60, 100, 100);
    fill(150, 100, 25);
    ellipse(width/2, height/2+25, 250, 160);
    fill(0, 0, 0);
    ellipse(width/2-90, height/2-130, 20, 20);

    stroke(255, 255, 0);
    strokeWeight(20);
    line(width/2-20, height/2+100, width/2-30, height/2+180);
    line(width/2+20, height/2+100, width/2+40, height/2+150);

    chickens.push(get(0,0,width,height));

    noStroke();
    background(0, 0, 0, 0);    // set background of the custom char
    // 5
    noStroke();
    fill(255, 0, 0);
    ellipse(width/2-70, height/2-170, 20, 50);
    fill(255, 255, 0);
    ellipse(width/2-130, height/2-100, 80, 30);
    fill(225, 225, 25);
    ellipse(width/2-80, height/2-40, 100, 250);
    rect(width/2+30, height/2-100, 100, 100);
    rect(width/2+70, height/2-60, 100, 100);
    fill(150, 100, 25);
    ellipse(width/2, height/2+25, 250, 160);
    fill(0, 0, 0);
    ellipse(width/2-90, height/2-130, 20, 20);

    stroke(255, 255, 0);
    strokeWeight(20);
    line(width/2-10, height/2+100, width/2-10, height/2+180);
    line(width/2+10, height/2+100, width/2+40, height/2+130);

    chickens.push(get(0,0,width,height));

    noStroke();
    background(0, 0, 0, 0);    // set background of the custom char
    // 6
    noStroke();
    fill(255, 0, 0);
    ellipse(width/2+70, height/2-170, 20, 50);
    fill(255, 255, 0);
    ellipse(width/2+130, height/2-100, 80, 30);
    fill(225, 225, 25);
    ellipse(width/2+80, height/2-40, 100, 250);
    rect(width/2-130, height/2-100, 100, 100);
    rect(width/2-170, height/2-60, 100, 100);
    fill(150, 100, 25);
    ellipse(width/2, height/2+25, 250, 160);
    fill(0, 0, 0);
    ellipse(width/2+90, height/2-130, 20, 20);

    stroke(255, 255, 0);
    strokeWeight(20);
    line(width/2, height/2+100, width/2, height/2+180);
    line(width/2, height/2+100, width/2, height/2+180);

    chickens.push(get(0,0,width,height));

    noStroke();
    background(0, 0, 0, 0);    // set background of the custom char
    // 7
    noStroke();
    fill(255, 0, 0);
    ellipse(width/2+70, height/2-170, 20, 50);
    fill(255, 255, 0);
    ellipse(width/2+130, height/2-100, 80, 30);
    fill(225, 225, 25);
    ellipse(width/2+80, height/2-40, 100, 250);
    rect(width/2-130, height/2-100, 100, 100);
    rect(width/2-170, height/2-60, 100, 100);
    fill(150, 100, 25);
    ellipse(width/2, height/2+25, 250, 160);
    fill(0, 0, 0);
    ellipse(width/2+90, height/2-130, 20, 20);

    stroke(255, 255, 0);
    strokeWeight(20);
    line(width/2+10, height/2+100, width/2+40, height/2+130);
    line(width/2-10, height/2+100, width/2-10, height/2+180);

    chickens.push(get(0,0,width,height));

    noStroke();
    background(0, 0, 0, 0);    // set background of the custom char
    // 8
    noStroke();
    fill(255, 0, 0);
    ellipse(width/2+70, height/2-170, 20, 50);
    fill(255, 255, 0);
    ellipse(width/2+130, height/2-100, 80, 30);
    fill(225, 225, 25);
    ellipse(width/2+80, height/2-40, 100, 250);
    rect(width/2-130, height/2-100, 100, 100);
    rect(width/2-170, height/2-60, 100, 100);
    fill(150, 100, 25);
    ellipse(width/2, height/2+25, 250, 160);
    fill(0, 0, 0);
    ellipse(width/2+90, height/2-130, 20, 20);

    stroke(255, 255, 0);
    strokeWeight(20);
    line(width/2+20, height/2+100, width/2+40, height/2+150);
    line(width/2-20, height/2+100, width/2-30, height/2+180);

    chickens.push(get(0,0,width,height));

    noStroke();
    background(0, 0, 0, 0);    // set background of the custom char
    // 9
    noStroke();
    fill(255, 0, 0);
    ellipse(width/2+70, height/2-170, 20, 50);
    fill(255, 255, 0);
    ellipse(width/2+130, height/2-100, 80, 30);
    fill(225, 225, 25);
    ellipse(width/2+80, height/2-40, 100, 250);
    rect(width/2-130, height/2-100, 100, 100);
    rect(width/2-170, height/2-60, 100, 100);
    fill(150, 100, 25);
    ellipse(width/2, height/2+25, 250, 160);
    fill(0, 0, 0);
    ellipse(width/2+90, height/2-130, 20, 20);

    stroke(255, 255, 0);
    strokeWeight(20);
    line(width/2-20, height/2+100, width/2-40, height/2+180);
    line(width/2+20, height/2+100, width/2+40, height/2+180);

    chickens.push(get(0,0,width,height));

    noStroke();
    background(50,100,20,0);
    // 10
    noStroke();
    fill(255, 0, 0);
    ellipse(width/2+70, height/2-170, 20, 50);
    fill(255, 255, 0);
    ellipse(width/2+130, height/2-100, 80, 30);
    fill(225, 225, 25);
    ellipse(width/2+80, height/2-40, 100, 250);
    rect(width/2-130, height/2-100, 100, 100);
    rect(width/2-170, height/2-60, 100, 100);
    fill(150, 100, 25);
    ellipse(width/2, height/2+25, 250, 160);
    fill(0, 0, 0);
    ellipse(width/2+90, height/2-130, 20, 20);

    stroke(255, 255, 0);
    strokeWeight(20);
    line(width/2+20, height/2+100, width/2+30, height/2+180);
    line(width/2-20, height/2+100, width/2-40, height/2+150);

    chickens.push(get(0,0,width,height));

    noStroke();
    background(50,100,20,0);
    // 11
    noStroke();
    fill(255, 0, 0);
    ellipse(width/2+70, height/2-170, 20, 50);
    fill(255, 255, 0);
    ellipse(width/2+130, height/2-100, 80, 30);
    fill(225, 225, 25);
    ellipse(width/2+80, height/2-40, 100, 250);
    rect(width/2-130, height/2-100, 100, 100);
    rect(width/2-170, height/2-60, 100, 100);
    fill(150, 100, 25);
    ellipse(width/2, height/2+25, 250, 160);
    fill(0, 0, 0);
    ellipse(width/2+90, height/2-130, 20, 20);

    stroke(255, 255, 0);
    strokeWeight(20);
    line(width/2+10, height/2+100, width/2+10, height/2+180);
    line(width/2-10, height/2+100, width/2-40, height/2+130);

    chickens.push(get(0,0,width,height));
};

var doorImg = function() {
    doorMade = true;
    background(100,60,10);
    stroke(50, 30, 5);
    strokeWeight(20);
    noFill();
    rect(50, 50, 120, 120);
    rect(230, 50, 120, 120);
    rect(50, 230, 120, 120);
    rect(230, 230, 120, 120);
    stroke(220, 180, 30);
    strokeWeight(40);
    ellipse(360, 200, 30, 20);

    images.push(get(0,0,width,height));
};

var fenceImg = function(){
    fenceMade = true;
    background(130, 127, 122);
    images.push(get(0,0, width, height));
};

var spiderImg = function(){
    spiderMade = true;

    background(0,0,0,0);
    //body and head
    noStroke();
    fill(0,0,0);
    ellipse(200,100,100,100);
    ellipse(200,200,180,200);
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
    strokeWeight(20);
    stroke(0, 0, 0);
    line(150,275,70,320);
    line(250,275,330,320);
    line(140,230,40,250);
    line(260,230,360,250);
    line(35,180,140,180);
    line(365,180,260,180);
    line(50,120,150,150);
    line(350,120,250,150);

    spidersImage = (get(0,0,width,height));
};

var woodBlockImg = function() {

    stroke(0, 0, 0);
    fill(150, 100, 20);
    strokeWeight(5);
    for(var i = 0; i < 5; i++) {

        rect((i+1)*80-40, -100, 40, 200);
        rect(i*80, 0, 40, 200);
        rect((i+1)*80-40, 100, 40, 200);
        rect(i*80, 200, 40, 200);
        rect((i+1)*80-40, 300, 40, 200);
    }
    wood.push(get(0,0,width,height));

    background(0, 0, 0, 0);
};

var drawSunglasses = function() {

    background(0, 0, 0, 0);
    var points = [];
    var points2 = [];
    var points3 = [];

    // EXPERIMENT new set of points
    points.push(new PVector(width/2-20, height/2-80));
    points.push(new PVector(width/2+20, height/2-80));
    points.push(new PVector(width/2+100, height/2-110));
    points.push(new PVector(width/2+180, height/2-100));
    points.push(new PVector(width/2+180, height/2-70));
    points.push(new PVector(width/2+150, height/2));
    points.push(new PVector(width/2+50, height/2));
    points.push(new PVector(width/2+10, height/2-60));
    points.push(new PVector(width/2-10, height/2-60));
    points.push(new PVector(width/2-50, height/2));
    points.push(new PVector(width/2-150, height/2));
    points.push(new PVector(width/2-180, height/2-70));
    points.push(new PVector(width/2-180, height/2-100));
    points.push(new PVector(width/2-100, height/2-110));
    points.push(new PVector(width/2-20, height/2-80));

    var midPoint = function(a, b) {

        var m = new PVector((a.x + b.x)/2, (a.y+b.y)/2);
        return m;
    };

    var clearPoints = function(p) {

        p.splice(0, p.length);
    };

    var drawShape = function(p) {

        beginShape();
            for (var i=0; i<p.length; i++)
            {
                vertex(p[i].x, p[i].y);
            }
        endShape();
    };

    // Split result in p2
    var splitPoints = function(p1, p2) {

        clearPoints(p2);
        p2.push(p1[0]);
        for (var i = 0; i<p1.length-2; i++) {
            var m = midPoint(p1[i], p1[i+1]);
            p2.push(m);
            p2.push(p1[i+1]);
        }

        var m = midPoint(p1[i], p1[0]);
        p2.push(m);
        p2.push(points[0]);
    };

    // average
    var averagePoints = function(p1, p2) {
        p2.splice(0, p2.length);
        for (var i = 0; i <p1.length-2; i++) {
            p2.push(midPoint(p1[i], p1[i+1]));
        }
        p2.push(midPoint(p1[i], p1[0]));
        p2.push(p2[0]);
    };

    noFill();
    //drawShape(points);

    splitPoints(points, points2);
    averagePoints(points2, points3);
    //drawShape(points3);

    splitPoints(points3, points);
    averagePoints(points, points2);
    //drawShape(points2);

    fill(20, 10, 80);
    splitPoints(points2, points3);
    averagePoints(points3, points);
    drawShape(points);

    sunglasses.push(get(0, 0, width, height));

    background(0, 0, 0, 0);
};

var farmerImg = function() {

    // regular
    background(0, 0, 0, 0);
    stroke(0, 0, 0);
    noStroke();

    fill(255, 0, 0);
    noStroke();
    ellipse(220, 200, 180, 200); //body
    quad(150, 240, 200, 240, 200, 390, 170, 390); //legs
    quad(240, 240, 290, 240, 270, 390, 240, 390);

    stroke(0, 0, 0);
    strokeWeight(1);
    fill(175, 150, 50);
    ellipse(220, 65, 80, 120); //hat
    ellipse(220, 65, 130, 60); //hat

    stroke(0, 0, 0);
    strokeWeight(5);
    line(220, 140, 220, 280); //pajama buttons
    ellipse(230, 160, 5, 5);
    ellipse(230, 200, 5, 5);
    ellipse(230, 240, 5, 5);

    noStroke();
    fill(230, 200, 160);
    ellipse(220, 90, 80, 90); //face

    fill(220, 220, 220);
    ellipse(185, 100, 30, 30); //beard
    ellipse(195, 120, 30, 30);
    ellipse(215, 130, 30, 30);
    ellipse(225, 130, 30, 30);
    ellipse(245, 120, 30, 30);
    ellipse(255, 100, 30, 30);
    ellipse(210, 110, 30, 30);
    ellipse(230, 110, 30, 30);

    stroke(0, 0, 0);
    strokeWeight(1);
    fill(255, 180, 160);
    ellipse(220, 95, 30, 20); //nose

    fill(255, 255, 255);
    ellipse(240, 78, 20, 18); //eyes
    ellipse(200, 78, 20, 18);
    fill(0);
    ellipse(236, 80, 5, 5);
    ellipse(196, 80, 5, 5);

    stroke(220, 220, 220);
    strokeWeight(10);
    line(190, 70, 210, 72);
    line(250, 70, 230, 72);

    noStroke();
    fill(255, 150, 220);
    rect(150, 380, 50, 20);
    rect(240, 380, 50, 20);
    ellipse(158, 388, 60, 25); //bunny slippers
    ellipse(282, 388, 60, 25);
    ellipse(166, 365, 18, 40);
    ellipse(180, 365, 18, 40);
    ellipse(274, 365, 18, 40);
    ellipse(260, 365, 18, 40);

    fill(255, 0, 0);
    quad(100, 140, 90, 110, 180, 130, 180, 170); //left arm
    quad(100, 140, 90, 110, 40, 180, 60, 180);
    quad(270, 130, 370, 150, 360, 180, 300, 170); //right arm
    quad(340, 170, 370, 150, 380, 260, 360, 270);

    stroke(0, 0, 0);
    strokeWeight(1);
    fill(30, 120, 20);
    ellipse(50, 190, 30, 40);
    ellipse(40, 185, 15, 20);
    ellipse(370, 270, 30, 40);
    ellipse(375, 265, 15, 20);

    image(sunglasses[0], 180, 55, 80, 80);

    farmers.push(get(0,0,width,height));

    // first face wipe
    background(0, 0, 0, 0);
    stroke(0, 0, 0);
    noStroke();

    fill(255, 0, 0);
    noStroke();
    ellipse(220, 200, 180, 200); //body
    quad(150, 240, 200, 240, 200, 390, 170, 390); //legs
    quad(240, 240, 290, 240, 270, 390, 240, 390);

    stroke(0, 0, 0);
    strokeWeight(1);
    fill(175, 150, 50);
    ellipse(220, 65, 80, 120); //hat
    ellipse(220, 65, 130, 60); //hat

    stroke(0, 0, 0);
    strokeWeight(5);
    line(220, 140, 220, 280); //pajama buttons
    ellipse(230, 160, 5, 5);
    ellipse(230, 200, 5, 5);
    ellipse(230, 240, 5, 5);

    noStroke();
    fill(230, 200, 160);
    ellipse(220, 90, 80, 90); //face

    fill(220, 220, 220);
    ellipse(185, 100, 30, 30); //beard
    ellipse(195, 120, 30, 30);
    ellipse(215, 130, 30, 30);
    ellipse(225, 130, 30, 30);
    ellipse(245, 120, 30, 30);
    ellipse(255, 100, 30, 30);
    ellipse(210, 110, 30, 30);
    ellipse(230, 110, 30, 30);

    stroke(0, 0, 0);
    strokeWeight(1);
    fill(255, 180, 160);
    ellipse(220, 95, 30, 20); //nose

    fill(255, 255, 255);
    ellipse(240, 78, 20, 18); //eyes
    ellipse(200, 78, 20, 18);
    fill(0);
    ellipse(236, 80, 5, 5);
    ellipse(196, 80, 5, 5);

    stroke(220, 220, 220);
    strokeWeight(10);
    line(190, 70, 210, 72);
    line(250, 70, 230, 72);

    noStroke();
    fill(255, 150, 220);
    rect(150, 380, 50, 20);
    rect(240, 380, 50, 20);
    ellipse(158, 388, 60, 25); //bunny slippers
    ellipse(282, 388, 60, 25);
    ellipse(166, 365, 18, 40);
    ellipse(180, 365, 18, 40);
    ellipse(274, 365, 18, 40);
    ellipse(260, 365, 18, 40);

    image(sunglasses[0], 180, 55, 80, 80);

    fill(255, 0, 0);
    quad(100, 140, 90, 110, 180, 130, 180, 170); //left arm
    quad(100, 140, 90, 110, 200, 75, 200, 90);
    quad(270, 130, 370, 150, 360, 180, 300, 170); //right arm
    quad(340, 170, 370, 150, 240, 80, 240, 90);

    stroke(0, 0, 0);
    strokeWeight(1);
    fill(30, 120, 20);
    ellipse(200, 90, 40, 30);
    ellipse(245, 90, 40, 30);

    farmers.push(get(0,0,width,height));

    // second face wipe
    background(0, 0, 0, 0);
    stroke(0, 0, 0);
    noStroke();

    fill(255, 0, 0);
    noStroke();
    ellipse(220, 200, 180, 200); //body
    quad(150, 240, 200, 240, 200, 390, 170, 390); //legs
    quad(240, 240, 290, 240, 270, 390, 240, 390);

    stroke(0, 0, 0);
    strokeWeight(1);
    fill(175, 150, 50);
    ellipse(220, 65, 80, 120); //hat
    ellipse(220, 65, 130, 60); //hat

    stroke(0, 0, 0);
    strokeWeight(5);
    line(220, 140, 220, 280); //pajama buttons
    ellipse(230, 160, 5, 5);
    ellipse(230, 200, 5, 5);
    ellipse(230, 240, 5, 5);

    noStroke();
    fill(230, 200, 160);
    ellipse(220, 90, 80, 90); //face

    fill(220, 220, 220);
    ellipse(185, 100, 30, 30); //beard
    ellipse(195, 120, 30, 30);
    ellipse(215, 130, 30, 30);
    ellipse(225, 130, 30, 30);
    ellipse(245, 120, 30, 30);
    ellipse(255, 100, 30, 30);
    ellipse(210, 110, 30, 30);
    ellipse(230, 110, 30, 30);

    stroke(0, 0, 0);
    strokeWeight(1);
    fill(255, 180, 160);
    ellipse(220, 95, 30, 20); //nose

    fill(255, 255, 255);
    ellipse(240, 78, 20, 18); //eyes
    ellipse(200, 78, 20, 18);
    fill(0);
    ellipse(236, 80, 5, 5);
    ellipse(196, 80, 5, 5);

    stroke(220, 220, 220);
    strokeWeight(10);
    line(190, 70, 210, 72);
    line(250, 70, 230, 72);

    noStroke();
    fill(255, 150, 220);
    rect(150, 380, 50, 20);
    rect(240, 380, 50, 20);
    ellipse(158, 388, 60, 25); //bunny slippers
    ellipse(282, 388, 60, 25);
    ellipse(166, 365, 18, 40);
    ellipse(180, 365, 18, 40);
    ellipse(274, 365, 18, 40);
    ellipse(260, 365, 18, 40);

    image(sunglasses[0], 180, 55, 80, 80);

    fill(255, 0, 0);
    quad(100, 140, 90, 110, 180, 130, 180, 170); //left arm
    quad(100, 140, 90, 110, 200, 75, 200, 90);
    quad(270, 130, 370, 150, 360, 180, 300, 170); //right arm
    quad(340, 170, 370, 150, 240, 80, 240, 90);

    stroke(0, 0, 0);
    strokeWeight(1);
    fill(30, 120, 20);
    ellipse(190, 90, 40, 30);
    ellipse(235, 90, 40, 30);

    farmers.push(get(0,0,width,height));

    // egg on face
    background(0, 0, 0, 0);
    stroke(0, 0, 0);
    noStroke();

    fill(255, 0, 0);
    noStroke();
    ellipse(220, 200, 180, 200); //body
    quad(150, 240, 200, 240, 200, 390, 170, 390); //legs
    quad(240, 240, 290, 240, 270, 390, 240, 390);

    stroke(0, 0, 0);
    strokeWeight(1);
    fill(175, 150, 50);
    ellipse(220, 65, 80, 120); //hat
    ellipse(220, 65, 130, 60); //hat

    stroke(0, 0, 0);
    strokeWeight(5);
    line(220, 140, 220, 280); //pajama buttons
    ellipse(230, 160, 5, 5);
    ellipse(230, 200, 5, 5);
    ellipse(230, 240, 5, 5);

    noStroke();
    fill(230, 200, 160);
    ellipse(220, 90, 80, 90); //face

    fill(220, 220, 220);
    ellipse(185, 100, 30, 30); //beard
    ellipse(195, 120, 30, 30);
    ellipse(215, 130, 30, 30);
    ellipse(225, 130, 30, 30);
    ellipse(245, 120, 30, 30);
    ellipse(255, 100, 30, 30);
    ellipse(210, 110, 30, 30);
    ellipse(230, 110, 30, 30);

    stroke(0, 0, 0);
    strokeWeight(1);
    fill(255, 180, 160);
    ellipse(220, 95, 30, 20); //nose

    fill(255, 255, 255);
    ellipse(240, 78, 20, 18); //eyes
    ellipse(200, 78, 20, 18);
    fill(0);
    ellipse(236, 80, 5, 5);
    ellipse(196, 80, 5, 5);

    stroke(220, 220, 220);
    strokeWeight(10);
    line(190, 70, 210, 72);
    line(250, 70, 230, 72);

    noStroke();
    fill(255, 150, 220);
    rect(150, 380, 50, 20);
    rect(240, 380, 50, 20);
    ellipse(158, 388, 60, 25); //bunny slippers
    ellipse(282, 388, 60, 25);
    ellipse(166, 365, 18, 40);
    ellipse(180, 365, 18, 40);
    ellipse(274, 365, 18, 40);
    ellipse(260, 365, 18, 40);

    fill(255, 0, 0);
    quad(100, 140, 90, 110, 180, 130, 180, 170); //left arm
    quad(100, 140, 90, 110, 40, 180, 60, 180);
    quad(270, 130, 370, 150, 360, 180, 300, 170); //right arm
    quad(340, 170, 370, 150, 380, 260, 360, 270);

    image(sunglasses[0], 180, 55, 80, 80);

    stroke(0, 0, 0);
    strokeWeight(1);
    fill(30, 120, 20);
    ellipse(50, 190, 30, 40);
    ellipse(40, 185, 15, 20);
    ellipse(370, 270, 30, 40);
    ellipse(375, 265, 15, 20);

    noStroke();
    fill(255, 255, 255);
    ellipse(210, 85, 50, 25);
    ellipse(210, 85, 25, 40);
    ellipse(200, 92, 20, 20);
    ellipse(220, 92, 20, 20);
    ellipse(200, 78, 20, 20);
    ellipse(220, 78, 20, 20);
    fill(255, 255, 0);
    ellipse(212, 85, 25, 20);

    farmers.push(get(0,0,width,height));

    background(0, 0, 0, 0);
};

var foxImage = function() {

    // ----------------------- 1
    background(0, 0, 0, 0);
    stroke(255, 0, 0);
    noStroke();
    fill(199, 99, 12);
    //fill(255, 255, 255, 0);
    quad(130, 190, 190, 190, 175, 395, 160, 395); //front leg
    quad(325, 190, 390, 280, 360, 310, 280, 240); // back upper leg
    quad(360, 310, 390, 280, 395, 395, 380, 395); // back lower leg
    ellipse(155, 387, 20, 18); //paw
    ellipse(375, 387, 20, 18); //paw

    fill(242, 118, 9);
    //fill(255, 255, 255, 0);
    quad(130, 135, 320, 165, 320, 225, 140, 255); //torso
    quad(252, 220, 310, 210, 315, 315, 265, 305); //upper back leg
    quad(265, 305, 315, 315, 255, 395, 240, 395); //lower back leg
    ellipse(235, 387, 20, 18); //paw
    ellipse(140, 190, 120, 120); // front circle
    ellipse(140, 190, 5, 5);
    ellipse(310, 215, 100, 100); // back circle
    ellipse(310, 210, 5, 5);
    //ellipse(300, 240, 80, 80); // back leg muscle
    //ellipse(300, 240, 5, 5);

    quad(80, 200, 150, 200, 160, 280, 110, 275); //upper front leg
    quad(110, 275, 160, 280, 80, 350, 60, 340); //lower front leg
    ellipse(70, 352, 25, 40); //paw

    quad(55, 155, 94, 100, 150, 132, 90, 220); //neck
    triangle(50, 40, 75, 100, 45, 100); //back ear
    ellipse(65, 125, 75, 75); //head
    ellipse(65, 125, 5, 5);
    quad(2, 152, 30, 125, 58, 160, 12, 168); //snout

    triangle(80, 40, 90, 100, 60, 100); //front ear
    quad(345, 180, 395, 300, 350, 395, 325, 320);

    foxes.push(get(0,0,width,height));

    // ----------------------- 2
    background(0, 0, 0, 0);
    stroke(255, 0, 0);
    noStroke();
    fill(199, 99, 12);
    //fill(255, 255, 255, 0);
    quad(110, 260, 160, 250, 195, 280, 160, 290); //front upper leg
    quad(160, 290, 195, 280, 195, 390, 180, 395); //front lower leg

    quad(325, 190, 370, 270, 340, 300, 280, 240); // back upper leg
    quad(340, 300, 370, 270, 340, 370, 320, 375); // back lower leg
    ellipse(175, 387, 20, 18); //paw
    ellipse(335, 372, 36, 18); //paw

    fill(242, 118, 9);
    //fill(255, 255, 255, 0);
    quad(130, 150, 320, 166, 320, 245, 140, 270); //torso
    quad(292, 220, 350, 210, 355, 290, 315, 300); //upper back leg
    quad(315, 300, 355, 290, 330, 395, 315, 395); //lower back leg
    ellipse(310, 387, 20, 18); //paw
    ellipse(140, 210, 120, 120); // front circle
    ellipse(140, 210, 5, 5);
    ellipse(310, 212, 95, 95); // back circle
    ellipse(310, 215, 5, 5);
    //ellipse(300, 240, 80, 80); // back leg muscle
    //ellipse(300, 240, 5, 5);

    quad(80, 200, 150, 220, 130, 305, 90, 300); //upper front leg
    quad(90, 300, 130, 305, 65, 395, 50, 395); //lower front leg
    ellipse(50, 387, 20, 18); //paw

    quad(55, 155, 88, 116, 150, 152, 90, 240); //neck
    triangle(30, 60, 75, 120, 35, 125); //back ear
    ellipse(65, 145, 75, 75); //head
    ellipse(65, 145, 5, 5);
    quad(6, 182, 30, 150, 68, 182, 20, 194); //snout

    triangle(55, 55, 80, 130, 50, 130); //front ear
    quad(345, 180, 385, 300, 350, 395, 315, 320);

    foxes.push(get(0,0,width,height));

    // ----------------------- 3
    background(0, 0, 0, 0);
    stroke(255, 0, 0);
    noStroke();
    fill(199, 99, 12);
    //fill(255, 255, 255, 0);
    quad(110, 260, 160, 250, 195, 270, 160, 280); //front upper leg
    quad(160, 280, 195, 270, 155, 350, 140, 345); //front lower leg

    quad(295, 190, 340, 270, 310, 300, 250, 240); // back upper leg
    quad(310, 270, 340, 270, 285, 365, 266, 355); // back lower leg
    ellipse(155, 350, 32, 20); //paw
    ellipse(275, 364, 20, 36); //paw

    fill(242, 118, 9);
    //fill(255, 255, 255, 0);
    quad(140, 150, 310, 165, 320, 245, 140, 270); //torso
    quad(292, 220, 350, 210, 365, 290, 325, 300); //upper back leg
    quad(325, 300, 365, 290, 365, 390, 350, 395); //lower back leg
    ellipse(345, 387, 20, 18); //paw
    ellipse(140, 210, 120, 120); // front circle
    ellipse(140, 210, 5, 5);
    ellipse(310, 215, 100, 100); // back circle
    ellipse(310, 215, 5, 5);
    //ellipse(300, 240, 80, 80); // back leg muscle
    //ellipse(300, 240, 5, 5);

    quad(100, 200, 150, 220, 120, 390, 105, 395); //front leg
    ellipse(100, 387, 20, 18); //paw

    quad(40, 155, 90, 118, 150, 152, 90, 240); //neck
    triangle(30, 60, 75, 120, 35, 125); //back ear
    ellipse(65, 145, 75, 75); //head
    ellipse(65, 145, 5, 5);
    quad(6, 182, 30, 150, 58, 180, 20, 192); //snout

    triangle(55, 55, 80, 130, 50, 130); //front ear
    quad(345, 180, 395, 300, 350, 395, 325, 320);

    foxes.push(get(0,0,width,height));

    // ----------------------- 4
    background(0, 0, 0, 0);
    stroke(255, 0, 0);
    noStroke();
    fill(199, 99, 12);
    //fill(255, 255, 255, 0);
    quad(252, 220, 310, 210, 315, 315, 265, 305); //upper back leg
    quad(265, 305, 315, 315, 255, 395, 240, 395); //lower back leg
    ellipse(235, 387, 20, 18); //paw

    quad(80, 200, 150, 200, 160, 280, 110, 275); //upper front leg
    quad(110, 275, 160, 280, 80, 350, 60, 340); //lower front leg
    ellipse(70, 352, 25, 40); //paw

    fill(242, 118, 9);
    //fill(255, 255, 255, 0);
    quad(130, 135, 320, 165, 320, 225, 140, 255); //torso
    quad(130, 190, 190, 190, 175, 395, 160, 395); //front leg
    quad(325, 190, 390, 280, 360, 310, 280, 240); // back upper leg
    quad(360, 310, 390, 280, 395, 395, 380, 395); // back lower leg
    ellipse(155, 387, 20, 18); //paw
    ellipse(375, 387, 20, 18); //paw

    ellipse(140, 190, 120, 120); // front circle
    ellipse(140, 190, 5, 5);
    ellipse(310, 215, 100, 100); // back circle
    ellipse(310, 210, 5, 5);
    //ellipse(300, 240, 80, 80); // back leg muscle
    //ellipse(300, 240, 5, 5);

    quad(55, 155, 94, 100, 150, 132, 90, 220); //neck
    triangle(50, 40, 75, 100, 45, 100); //back ear
    ellipse(65, 125, 75, 75); //head
    ellipse(65, 125, 5, 5);
    quad(2, 152, 30, 125, 58, 160, 12, 168); //snout

    triangle(80, 40, 90, 100, 60, 100); //front ear
    quad(345, 180, 385, 300, 350, 395, 315, 320);

    foxes.push(get(0,0,width,height));

    // ----------------------- 5
    background(0, 0, 0, 0);
    stroke(255, 0, 0);
    noStroke();
    fill(199, 99, 12);
    //fill(255, 255, 255, 0);

    quad(292, 220, 350, 210, 355, 290, 315, 300); //upper back leg
    quad(315, 300, 355, 290, 330, 395, 315, 395); //lower back leg
    ellipse(310, 387, 20, 18); //paw
    quad(80, 200, 150, 220, 130, 305, 90, 300); //upper front leg
    quad(90, 300, 130, 305, 65, 395, 50, 395); //lower front leg
    ellipse(50, 387, 20, 18); //paw

    fill(242, 118, 9);
    //fill(255, 255, 255, 0);
    quad(130, 150, 320, 166, 320, 245, 140, 270); //torso

    quad(110, 260, 160, 250, 195, 280, 160, 290); //front upper leg
    quad(160, 290, 195, 280, 195, 390, 180, 395); //front lower leg

    quad(325, 190, 370, 270, 340, 300, 280, 240); // back upper leg
    quad(340, 300, 370, 270, 340, 370, 320, 375); // back lower leg
    ellipse(175, 387, 20, 18); //paw
    ellipse(335, 372, 36, 18); //paw
    ellipse(140, 210, 120, 120); // front circle
    ellipse(140, 210, 5, 5);
    ellipse(310, 212, 95, 95); // back circle
    ellipse(310, 215, 5, 5);
    //ellipse(300, 240, 80, 80); // back leg muscle
    //ellipse(300, 240, 5, 5);

    quad(55, 155, 88, 116, 150, 152, 90, 240); //neck
    triangle(30, 60, 75, 120, 35, 125); //back ear
    ellipse(65, 145, 75, 75); //head
    ellipse(65, 145, 5, 5);
    quad(6, 182, 30, 150, 68, 182, 20, 194); //snout

    triangle(55, 55, 80, 130, 50, 130); //front ear
    quad(345, 180, 395, 300, 350, 395, 325, 320);

    foxes.push(get(0,0,width,height));

    // ----------------------- 6
    background(0, 0, 0, 0);
    stroke(255, 0, 0);
    noStroke();
    fill(199, 99, 12);
    quad(292, 220, 350, 210, 365, 290, 325, 300); //upper back leg
    quad(325, 300, 365, 290, 365, 390, 350, 395); //lower back leg
    ellipse(345, 387, 20, 18); //paw
    quad(100, 200, 150, 220, 120, 390, 105, 395); //front leg
    ellipse(100, 387, 20, 18); //paw

    fill(242, 118, 9);

    quad(110, 260, 160, 250, 195, 270, 160, 280); //front upper leg
    quad(160, 280, 195, 270, 155, 350, 140, 345); //front lower leg

    quad(295, 190, 340, 270, 310, 300, 250, 240); // back upper leg
    quad(310, 270, 340, 270, 285, 365, 266, 355); // back lower leg
    ellipse(155, 350, 32, 20); //paw
    ellipse(275, 364, 20, 36); //paw
    quad(140, 150, 310, 165, 320, 245, 140, 270); //torso
    ellipse(140, 210, 120, 120); // front circle
    ellipse(140, 210, 5, 5);
    ellipse(310, 215, 100, 100); // back circle
    ellipse(310, 215, 5, 5);

    quad(40, 155, 90, 118, 150, 152, 90, 240); //neck
    triangle(30, 60, 75, 120, 35, 125); //back ear
    ellipse(65, 145, 75, 75); //head
    ellipse(65, 145, 5, 5);
    quad(6, 182, 30, 150, 58, 180, 20, 192); //snout

    triangle(55, 55, 80, 130, 50, 130); //front ear
    quad(345, 180, 385, 300, 350, 395, 315, 320); //tail

    foxes.push(get(0,0,width,height));

    // ----------------------- 7
    background(0, 0, 0, 0);
    stroke(255, 0, 0);
    noStroke();
    fill(199, 99, 12);
    //fill(255, 255, 255, 0);
    quad(width-130, 190, width-190, 190, width-175, 395, width-160, 395); //front leg
    quad(width-325, 190, width-390, 280, width-360, 310, width-280, 240); // back upper leg
    quad(width-360, 310, width-390, 280, width-395, 395, width-380, 395); // back lower leg
    ellipse(width-155, 387, 20, 18); //paw
    ellipse(width-375, 387, 20, 18); //paw

    fill(242, 118, 9);
    quad(width-130, 135, width-320, 165, width-320, 225, width-140, 255); //torso
    quad(width-252, 220, width-310, 210, width-315, 315, width-265, 305); //upper back leg
    quad(width-265, 305, width-315, 315, width-255, 395, width-240, 395); //lower back leg
    ellipse(width-235, 387, 20, 18); //paw
    ellipse(width-140, 190, 120, 120); // front circle
    ellipse(width-310, 215, 100, 100); // back circle

    quad(width-80, 200, width-150, 200, width-160, 280, width-110, 275); //upper front leg
    quad(width-110, 275, width-160, 280, width-80, 350, width-60, 340); //lower front leg
    ellipse(width-70, 352, 25, 40); //paw

    quad(width-55, 155, width-94, 100, width-150, 132, width-90, 220); //neck
    triangle(width-50, 40, width-75, 100, width-45, 100); //back ear
    ellipse(width-65, 125, 75, 75); //head
    quad(width-2, 152, width-30, 125, width-58, 160, width-12, 168); //snout

    triangle(width-80, 40, width-90, 100, width-60, 100); //front ear
    quad(width-345, 180, width-395, 300, width-350, 395, width-325, 320); //tail

    foxes.push(get(0,0,width,height));

    // ----------------------- 8
    background(0, 0, 0, 0);
    noStroke();
    fill(199, 99, 12);
    quad(width-110, 260, width-160, 250, width-195, 280, width-160, 290); //front upper leg
    quad(width-160, 290, width-195, 280, width-195, 390, width-180, 395); //front lower leg

    quad(width-325, 190, width-370, 270, width-340, 300, width-280, 240); // back upper leg
    quad(width-340, 300, width-370, 270, width-340, 370, width-320, 375); // back lower leg
    ellipse(width-175, 387, 20, 18); //paw
    ellipse(width-335, 372, 36, 18); //paw

    fill(242, 118, 9);
    quad(width-130, 150, width-320, 166, width-320, 245, width-140, 270); //torso
    quad(width-292, 220, width-350, 210, width-355, 290, width-315, 300); //upper back leg
    quad(width-315, 300, width-355, 290, width-330, 395, width-315, 395); //lower back leg
    ellipse(width-310, 387, 20, 18); //paw
    ellipse(width-140, 210, 120, 120); // front circle
    ellipse(width-310, 212, 95, 95); // back circle

    quad(width-80, 200, width-150, 220, width-130, 305, width-90, 300); //upper front leg
    quad(width-90, 300, width-130, 305, width-65, 395, width-50, 395); //lower front leg
    ellipse(width-50, 387, 20, 18); //paw

    quad(width-55, 155, width-88, 116, width-150, 152, width-90, 240); //neck
    triangle(width-30, 60, width-75, 120, width-35, 125); //back ear
    ellipse(width-65, 145, 75, 75); //head
    quad(width-6, 182, width-30, 150, width-68, 182, width-20, 194); //snout

    triangle(width-55, 55, width-80, 130, width-50, 130); //front ear
    quad(width-345, 180, width-385, 300, width-350, 395, width-315, 320); //tail

    foxes.push(get(0,0,width,height));

    // ----------------------- 9
    background(0, 0, 0, 0);
    stroke(255, 0, 0);
    noStroke();
    fill(199, 99, 12);
    //fill(255, 255, 255, 0);
    quad(width-110, 260, width-160, 250, width-195, 270, width-160, 280); //front upper leg
    quad(width-160, 280, width-195, 270, width-155, 350, width-140, 345); //front lower leg

    quad(width-295, 190, width-340, 270, width-310, 300, width-250, 240); // back upper leg
    quad(width-310, 270, width-340, 270, width-285, 365, width-266, 355); // back lower leg
    ellipse(width-155, 350, 32, 20); //paw
    ellipse(width-275, 364, 20, 36); //paw

    fill(242, 118, 9);
    //fill(255, 255, 255, 0);
    quad(width-140, 150, width-310, 165, width-320, 245, width-140, 270); //torso
    quad(width-292, 220, width-350, 210, width-365, 290, width-325, 300); //upper back leg
    quad(width-325, 300, width-365, 290, width-365, 390, width-350, 395); //lower back leg
    ellipse(width-345, 387, 20, 18); //paw
    ellipse(width-140, 210, 120, 120); // front circle
    ellipse(width-310, 215, 100, 100); // back circle

    quad(width-100, 200, width-150, 220, width-120, 390, width-105, 395); //front leg
    ellipse(width-100, 387, 20, 18); //paw

    quad(width-40, 155, width-90, 118, width-150, 152, width-90, 240); //neck
    triangle(width-30, 60, width-75, 120, width-35, 125); //back ear
    ellipse(width-65, 145, 75, 75); //head
    quad(width-6, 182, width-30, 150, width-58, 180, width-20, 192); //snout

    triangle(width-55, 55, width-80, 130, width-50, 130); //front ear
    quad(width-345, 180, width-395, 300, width-350, 395, width-325, 320); //tail

    foxes.push(get(0,0,width,height));

    // ----------------------- 10
    background(0, 0, 0, 0);
    stroke(255, 0, 0);
    noStroke();
    fill(199, 99, 12);
    //fill(255, 255, 255, 0);
    quad(width-252, 220, width-310, 210, width-315, 315, width-265, 305); //upper back leg
    quad(width-265, 305, width-315, 315, width-255, 395, width-240, 395); //lower back leg
    ellipse(width-235, 387, 20, 18); //paw

    quad(width-80, 200, width-150, 200, width-160, 280, width-110, 275); //upper front leg
    quad(width-110, 275, width-160, 280, width-80, 350, width-60, 340); //lower front leg
    ellipse(width-70, 352, 25, 40); //paw

    fill(242, 118, 9);
    //fill(255, 255, 255, 0);
    quad(width-130, 135, width-320, 165, width-320, 225, width-140, 255); //torso
    quad(width-130, 190, width-190, 190, width-175, 395, width-160, 395); //front leg
    quad(width-325, 190, width-390, 280, width-360, 310, width-280, 240); // back upper leg
    quad(width-360, 310, width-390, 280, width-395, 395, width-380, 395); // back lower leg
    ellipse(width-155, 387, 20, 18); //paw
    ellipse(width-375, 387, 20, 18); //paw

    ellipse(width-140, 190, 120, 120); // front circle
    ellipse(width-310, 215, 100, 100); // back circle

    quad(width-55, 155, width-94, 100, width-150, 132, width-90, 220); //neck
    triangle(width-50, 40, width-75, 100, width-45, 100); //back ear
    ellipse(width-65, 125, 75, 75); //head
    quad(width-2, 152, width-30, 125, width-58, 160, width-12, 168); //snout

    triangle(width-80, 40, width-90, 100, width-60, 100); //front ear
    quad(width-345, 180, width-385, 300, width-350, 395, width-315, 320); //tail

    foxes.push(get(0,0,width,height));

    // ----------------------- 11
    background(0, 0, 0, 0);
    noStroke();
    fill(199, 99, 12);

    quad(width-292, 220, width-350, 210, width-355, 290, width-315, 300); //upper back leg
    quad(width-315, 300, width-355, 290, width-330, 395, width-315, 395); //lower back leg
    ellipse(width-310, 387, 20, 18); //paw
    quad(width-80, 200, width-150, 220, width-130, 305, width-90, 300); //upper front leg
    quad(width-90, 300, width-130, 305, width-65, 395, width-50, 395); //lower front leg
    ellipse(width-50, 387, 20, 18); //paw

    fill(242, 118, 9);
    //fill(255, 255, 255, 0);
    quad(width-130, 150, width-320, 166, width-320, 245, width-140, 270); //torso

    quad(width-110, 260, width-160, 250, width-195, 280, width-160, 290); //front upper leg
    quad(width-160, 290, width-195, 280, width-195, 390, width-180, 395); //front lower leg

    quad(width-325, 190, width-370, 270, width-340, 300, width-280, 240); // back upper leg
    quad(width-340, 300, width-370, 270, width-340, 370, width-320, 375); // back lower leg
    ellipse(width-175, 387, 20, 18); //paw
    ellipse(width-335, 372, 36, 18); //paw
    ellipse(width-140, 210, 120, 120); // front circle
    ellipse(width-310, 212, 95, 95); // back circle

    quad(width-55, 155, width-88, 116, width-150, 152, width-90, 240); //neck
    triangle(width-30, 60, width-75, 120, width-35, 125); //back ear
    ellipse(width-65, 145, 75, 75); //head
    quad(width-6, 182, width-30, 150, width-68, 182, width-20, 194); //snout

    triangle(width-55, 55, width-80, 130, width-50, 130); //front ear
    quad(width-345, 180, width-395, 300, width-350, 395, width-325, 320); //tail

    foxes.push(get(0,0,width,height));

    // ----------------------- 12
    background(0, 0, 0, 0);
    noStroke();
    fill(199, 99, 12);
    quad(width-292, 220, width-350, 210, width-365, 290, width-325, 300); //upper back leg
    quad(width-325, 300, width-365, 290, width-365, 390, width-350, 395); //lower back leg
    ellipse(width-345, 387, 20, 18); //paw
    quad(width-100, 200, width-150, 220, width-120, 390, width-105, 395); //front leg
    ellipse(width-100, 387, 20, 18); //paw

    fill(242, 118, 9);
    quad(width-110, 260, width-160, 250, width-195, 270, width-160, 280); //front upper leg
    quad(width-160, 280, width-195, 270, width-155, 350, width-140, 345); //front lower leg
    quad(width-295, 190, width-340, 270, width-310, 300, width-250, 240); // back upper leg
    quad(width-310, 270, width-340, 270, width-285, 365, width-266, 355); // back lower leg
    ellipse(width-155, 350, 32, 20); //paw
    ellipse(width-275, 364, 20, 36); //paw
    quad(width-140, 150, width-310, 165, width-320, 245, width-140, 270); //torso
    ellipse(width-140, 210, 120, 120); // front circle
    ellipse(width-310, 215, 100, 100); // back circle

    quad(width-40, 155, width-90, 118, width-150, 152, width-90, 240); //neck
    triangle(width-30, 60, width-75, 120, width-35, 125); //back ear
    ellipse(width-65, 145, 75, 75); //head
    ellipse(width-65, 145, 5, 5);
    quad(width-6, 182, width-30, 150, width-58, 180, width-20, 192); //snout

    triangle(width-55, 55, width-80, 130, width-50, 130); //front ear
    quad(width-345, 180, width-385, 300, width-350, 395, width-315, 320); //tail

    foxes.push(get(0,0,width,height));

    background(0, 0, 0, 0);
};

var hayImg = function() {

    background(225, 180, 50);
    noStroke();
    fill(230, 215, 125);
    rect(25, 0, 25, 400);
    rect(75, 0, 25, 400);
    rect(125, 0, 25, 400);
    rect(175, 0, 25, 400);
    rect(225, 0, 25, 400);
    rect(275, 0, 25, 400);
    rect(325, 0, 25, 400);
    rect(375, 0, 25, 400);

    hayImage = (get(0,0,width,height));
    background(0, 0, 0, 0);
};

//------------------------------ DRAW FUNCTIONS

// draws chicken image the size of one tile
spiderObj.prototype.draw = function() {
    pushMatrix();

    translate(this.position.x+12, this.position.y+12);
    rotate(this.angle);
    image(spidersImage, -12, -12, 25, 25);
    popMatrix();
};

// draws chicken image the size of one tile
chickenObj.prototype.draw = function() {
    if(this.dead){
        return;
    }
    if(!this.forward) {
        // contains states that change evry 5 frames to
        // simluate walking movement
        switch (this.i) {

            case 0:
                image(chickens[0], this.position.x, this.position.y, 25, 25);

                break;
            case 1:
                image(chickens[1], this.position.x, this.position.y, 25, 25);

                break;
            case 2:
                image(chickens[2], this.position.x, this.position.y, 25, 25);

                break;
            case 3:
                image(chickens[3], this.position.x, this.position.y, 25, 25);

                break;
            case 4:
                image(chickens[4], this.position.x, this.position.y, 25, 25);

                break;
            case 5:
                image(chickens[5], this.position.x, this.position.y, 25, 25);

        }
    } else {

        switch (this.i) {

            case 0:
                image(chickens[6], this.position.x, this.position.y, 25, 25);

                break;
            case 1:
                image(chickens[7], this.position.x, this.position.y, 25, 25);

                break;
            case 2:
                image(chickens[8], this.position.x, this.position.y, 25, 25);

                break;
            case 3:
                image(chickens[9], this.position.x, this.position.y, 25, 25);
                break;
            case 4:
                image(chickens[10], this.position.x, this.position.y, 25, 25);
                break;
            case 5:
                image(chickens[11], this.position.x, this.position.y, 25, 25);
        }
    }

    if (this.curFrame < (frameCount - 5)) {
        this.curFrame = frameCount;
        if((keyArray[LEFT] || keyArray[RIGHT])){
            this.i++;
            if (this.i > 5) {
                this.i = 0;
            }
        }
    }

    if(this.position.x < 200)
    {
        xShift=0;
    }

    else if(this.position.x < currLevelWidth-200)
    {
        xShift = -1*(this.position.x-200);
    }

    else if(this.position.x>=currLevelWidth-200){
        xShift = -1*currLevelWidth+400;
    }

    if(this.position.y >= 200)
    {
        yShift=0;
    }

    else if(this.position.y<=((400-currLevelHeight)+200)){

        yShift = (currLevelHeight-400);
    }

    else if(this.position.y < 200)
    {
        yShift = -1*(this.position.y-200);
        //println(currLevelHeight-400);
        // println(this.position.y + " " +((400-currLevelHeight)+200));
    }


};

doorObj.prototype.draw = function() {
    image(images[0], this.position.x+3, this.position.y, 19, 25);
};

wallObj.prototype.draw = function() {

    stroke(0);
    strokeWeight(1);
    fill(110, 80, 25);
    rect(this.position.x, this.position.y, 25, 25);
};

grassObj.prototype.draw = function() {

    image(hayImage, this.position.x, this.position.y, 25, 25);
};

fenceObj.prototype.draw = function() {
     image(images[1], this.position.x, this.position.y, 25,25);
};

foxObj.prototype.draw = function() {

    switch (this.i) {

            case 0:
                image(foxes[6], this.position.x, this.position.y, 60, 60);

                break;
            case 1:
                image(foxes[7], this.position.x, this.position.y, 60, 60);

                break;
            case 2:
                image(foxes[8], this.position.x, this.position.y, 60, 60);

                break;
            case 3:
                image(foxes[9], this.position.x, this.position.y, 60, 60);

                break;
            case 4:
                image(foxes[10], this.position.x, this.position.y, 60, 60);

                break;
            case 5:
                image(foxes[11], this.position.x, this.position.y, 60, 60);
        }

    if ((this.curFrame < (frameCount - 8))) {
        this.curFrame = frameCount;
        this.i++;
        if (this.i > 5) {
            this.i = 0;
        }
    }

    if(this.position.x > 460) {

        this.position.x = -60;
    } else {

        this.position.x += 1;
    }
};

farmerObj.prototype.draw = function() {

    switch (this.i) {

            case 0:
                image(farmers[1], this.position.x, this.position.y, 100, 100);

                break;
            case 1:
                image(farmers[2], this.position.x, this.position.y, 100, 100);

                break;
            case 2:
                image(farmers[1], this.position.x, this.position.y, 100, 100);

                break;
            case 3:
                image(farmers[2], this.position.x, this.position.y, 100, 100);

                break;
            case 4:
                image(farmers[1], this.position.x, this.position.y, 100, 100);

                break;
            case 5:
                image(farmers[0], this.position.x, this.position.y, 100, 100);

                break;
            case 6:
                image(farmers[0], this.position.x, this.position.y, 100, 100);

                break;
            case 7:
                image(farmers[0], this.position.x, this.position.y, 100, 100);

                break;
            case 8:
                image(farmers[0], this.position.x, this.position.y, 100, 100);

                break;
            default:
                image(farmers[3], this.position.x, this.position.y, 100, 100);

                break;
        }

    if (this.curFrame < (frameCount - 40)) {
        this.curFrame = frameCount;
        this.i++;
        if (this.i > 9) {
            this.i = 0;
        }
    }
};

foxObj.prototype.draw = function() {

    switch (this.i) {

            case 0:
                image(foxes[6], this.position.x, this.position.y, 60, 60);

                break;
            case 1:
                image(foxes[7], this.position.x, this.position.y, 60, 60);

                break;
            case 2:
                image(foxes[8], this.position.x, this.position.y, 60, 60);

                break;
            case 3:
                image(foxes[9], this.position.x, this.position.y, 60, 60);

                break;
            case 4:
                image(foxes[10], this.position.x, this.position.y, 60, 60);

                break;
            case 5:
                image(foxes[11], this.position.x, this.position.y, 60, 60);
        }

    if ((this.curFrame < (frameCount - 8))) {
        this.curFrame = frameCount;
        this.i++;
        if (this.i > 5) {
            this.i = 0;
        }
    }

    if(this.position.x > 460) {

        this.position.x = -60;
    } else {

        this.position.x += 1;
    }
};

// create chicken object
var dchickenObj = function(x, y) {

    this.position = new PVector(x, y);

    // keeps track of the walking state of the chicken
    this.i = 0;

    // controls the walking speed of the chicken
    this.curFrame = frameCount;
};

//create chicken objetc for start screen animation
var dchicken = new dchickenObj(405, 350);

// draws chicken image the size of one tile
dchickenObj.prototype.draw = function() {


    // contains states that change evry 5 frames to
    // simluate walking movement
    switch (this.i) {

        case 0:
            image(chickens[0], this.position.x, this.position.y, 40, 40);

            break;
        case 1:
            image(chickens[1], this.position.x, this.position.y, 40, 40);

            break;
        case 2:
            image(chickens[2], this.position.x, this.position.y, 40, 40);

            break;
        case 3:
            image(chickens[3], this.position.x, this.position.y, 40, 40);

            break;
        case 4:
            image(chickens[4], this.position.x, this.position.y, 40, 40);

            break;
        case 5:
            image(chickens[5], this.position.x, this.position.y, 40, 40);

    }

    if (this.curFrame < (frameCount - 5)) {

        this.curFrame = frameCount;

        this.i++;

        if (this.i > 5) {

            this.i = 0;
        }

    }

    if(this.position.x < -20) {

        this.position.x = 420;
    } else {

        this.position.x -= 0.5;
    }

};

//------------------------------ COLLISION CHECKER
var checkCollision = function(c) {
    //check collision with all four sides of a wall
    for(var i = 0; i < walls.length; i++){
        if(c.position.x+20>walls[i].position.x &&
            c.position.x+5<walls[i].position.x+25 &&
            c.position.y+23>walls[i].position.y &&
            c.position.y+4<walls[i].position.y+25){
            return 1;
        }
    }

    //check collision with the one side of a platform
    for(var i = 0; i < grass.length; i++){
        if(c.position.x+20>grass[i].position.x &&
            c.position.x+5<grass[i].position.x+25 &&
            c.position.y+23>grass[i].position.y &&
            c.position.y+2<grass[i].position.y-1 &&
            c.velocity.y>=0){// && c.position.y<grass[i].position.y-1){
                if((c.position.y+23>=grass[i].position.y &&
                    c.position.y+20<grass[i].position.y)||
                    c.velocity>=0.5
                    //&& c.position.x<grass[i].position.x+25 &&
                    ){
                    c.position.y = grass[i].position.y-23;
                    c.acceleration.y=0;
                    c.velocity.y=0;
                    //println(c.position.y);
                }

                else if(c.velocity.y===0.5){
                    c.position.y+=4;
                    return 0;
                }
            return 1;
        }
    }

    //check collision with all coins
    for(var i = 0; i < coins.length; i++){
        if(c.position.x+24>coins[i].position.x &&
            c.position.x<coins[i].position.x+24 &&
            c.position.y+24>coins[i].position.y &&
            c.position.y<coins[i].position.y+24 &&
            c.type==='k'&&coins[i].hit===0){
            coins[i].hit=1;
            c.score+=coins[i].score;
            return 0;
        }
    }

    //check collision with all enemies
    for(var i = 0; i < enemies.length; i++){
        if(c.position.x+24>enemies[i].position.x &&
            c.position.x<enemies[i].position.x+24 &&
            c.position.y+24>enemies[i].position.y &&
            c.position.y<enemies[i].position.y+24){
            c.dead=true;
            return 0;
        }
    }


        //check collision with all enemies
    for(var i = 0; i < fences.length; i++){
        if(c.position.x+24>fences[i].position.x &&
            c.position.x<fences[i].position.x+24 &&
            c.position.y+24>fences[i].position.y &&
            c.position.y<fences[i].position.y+24){
                if(c.type==='k'){
                    if(c.hasWirecutters){

                        fences.splice(i,1);
                        if(currentLevel === 3) {

                            gameWon = true;
                            chicken.hasWirecutters = false;
                            chicken.hasKey = false;
                            chicken.score = 0;
                            currentLevel=0;
                            chicken.lives=3;
                            start = true;
                            play = false;
                        }
                    }
                }
            return 1;
        }
    }

    for(var i = 0; i < objects.length; i++){
        if(c.position.x+24>objects[i].position.x &&
            c.position.x<objects[i].position.x+24 &&
            c.position.y+24>objects[i].position.y &&
            c.position.y<objects[i].position.y+24 &&
            objects[i].hit===0){
            if(c.type==='k'){
                objects[i].hit=1;
                switch(objects[i].type){
                    case 'y': c.hasKey=true;
                        break;
                    case 'x': c.hasWirecutters=true;
                        break;
                }
            }
            return 0;
        }
    }

    return 0;
};

//------------------------------ MOVE FUNCTIONS

spiderObj.prototype.move = function(){

      if(this.type==='r'){
          this.speed+=constrain(random(-0.15,0.15), -2,2);
          this.angle+=this.speed/20;
      }
      else if(this.type==='g'){
            this.position.x+=this.speed;
            if(checkCollision(this)){
                this.position.x-=this.speed;
                this.speed*=-1;
                if(this.speed <0){
                    this.angle=-PI/2;
                }
                else{
                    this.angle=PI/2;
                }
            }
      }
};

chickenObj.prototype.move = function() {
    if(this.position.y>400){
        this.dead=true;
        return;
    }

    //if char below bottom
   /*if(this.position.y+26 >= bottom){

        this.jump = false;
        this.velocity.y=0;

        this.position.y = bottom-25;
        this.velocity.y = 0;

        //ground drag
        this.velocity.mult(0.6);

    } else {*/
        this.jump = true;
        //air drag
        this.velocity.mult(0.7);
        this.acceleration.add(gravity);
    //}

    if(keyArray[LEFT]){

        this.forward = false;
        this.velocity.x -= 1;
    }
    if(keyArray[RIGHT]){

        this.forward = true;
        this.velocity.x += 1;
    }

    if(abs(this.velocity.x)<0.001){

        this.velocity.x=0;
    }
    if(abs(this.velocity.y)<0.001){
        var tempC = new chickenObj(25, 300);
        this.velocity.y=0;
        tempC.position.x = this.position.x;
        tempC.position.y = this.position.y+1;
        if(checkCollision(tempC)&&!checkCollision(this)){
            this.jump=false;
        }
    }

    if(keyArray[UP] && !this.jump && this.velocity.y===0) {
        this.jump = true;
        this.acceleration.y = -5;
    }

    this.velocity.add(this.acceleration);

    this.position.add(this.velocity);

    if(checkCollision(this)===1){
        this.position.sub(this.velocity);
        this.position.x+=this.velocity.x;
        if(checkCollision(this)===1){
            this.position.x-=this.velocity.x;
            this.position.y+=this.velocity.y;
            if(checkCollision(this)===1){
                this.position.y-=this.velocity.y;
                this.velocity.x=0;
                this.velocity.y=0;
                this.acceleration.x=0;
                this.acceleration.y=0;
                this.jump=false;
            }
            else{
                this.velocity.x=0;
                this.acceleration.x=0;
            }
        }
        else{
            this.velocity.y=0;
            this.acceleration.y=0;
            this.jump=false;
        }
    }
};

//------------------------------  MOUSE AND KEY FUNCTIONS

var keyPressed = function(){
    keyArray[keyCode] = 1;
};

var keyReleased = function(){
    keyArray[keyCode] = 0;
};

// allows user to navigate between different screens by clicking on the commands
var mouseClicked = function() {

    if(gameOver && mouseX < 278 && mouseX > 120 && mouseY < 226 && mouseY > 196) {

	    gameOver = false;
	    start = true;
        play = false;
        options = false;
        instructions = false;
        t = 0;
    } else if(gameWon && mouseX < 278 && mouseX > 120 && mouseY < 226 && mouseY > 196) {

	    gameWon = false;
	    start = true;
        play = false;
        options = false;
        instructions = false;
        t = 0;
    }else if(start && mouseX < 230 && mouseX > 170 && mouseY < 259 && mouseY > 225) {

        start = false;
        options = false;
        play = true;

    } else if (start && mouseX < 250 && mouseX > 145 && mouseY < 299 && mouseY > 265){

        start = false;
        play = false;
        options = true;
        chicken.position.x = 420;

    } else if (options) {

        if(sound && mouseX < 264 && mouseX > 132 && mouseY < 203 && mouseY > 175) {

            sound = false;

        } else if(!sound && mouseX < 264 && mouseX > 132 && mouseY < 203 && mouseY > 175) {

            sound = true;

        } else if(mouseX < 245 && mouseX > 155 && mouseY < 245 && mouseY > 215) {

            start = true;
            play = false;
            options = false;
            instructions = false;

        } else if(mouseX < 311 && mouseX > 81 && mouseY < 163 && mouseY > 135) {

            instructions = true;
            start = false;
            play = false;
            options = false;
        }
    } else if (play) {

        if(mouseX < 23 && mouseX > 2 && mouseY < 24 && mouseY > 2) {

            play = false;
            pause = true;
        }
    } else if (pause) {

        if(mouseX < 264 && mouseX > 132 && mouseY < 203 && mouseY > 175) {

			text("WHAT", 100, 100);
            chicken.hasWirecutters = false;
            chicken.hasKey = false;
            chicken.score = 0;
            currentLevel=0;
            chicken.lives=3;
            start = true;
            play = false;
			options = false;
            pause = false;

        } else if(mouseX < 245 && mouseX > 155 && mouseY < 245 && mouseY > 215) {

            start = false;
            play = true;
            options = false;
            pause = false;
        }
    } else if (instructions) {

        if(mouseX < 242 && mouseX > 150 && mouseY < 360 && mouseY > 330) {

            instructions = false;
            options = true;
        }
    }
};

// Initalizes the tilemap
var initTilemap = function() {
    var level=[" "," "];
    //level.splice(0);
    currLevelHeight=0.0;
    walls.splice(0);
    grass.splice(0);
    coins.splice(0);
    doors.splice(0);
    enemies.splice(0);
    fences.splice(0);
    objects.splice(0);
    var num = 0.0;
    if(currentLevel===1){
        chicken.position.set(25, 350);
        level = coopLevel;
    }
    else if(currentLevel===2){
        chicken.position.set(25, 350);
        level = searchLevel;
    }
    else if(currentLevel===3){
        chicken.position.set(25, 350);
        level = chaseLevel;
    }

    if(level.length>16){
         num = level.length;
         num = 16.0-num;
    }
    var hiddenObjects = [];
    for (var i = 0; i< level.length; i++) {
        currLevelWidth=0.0;
        for (var j = 0; j < level[i].length; j++) {
            switch (level[i][j]) {
                case 'w': walls.push(new wallObj(j*25, num*25));
                    break;
                case 'p': grass.push(new grassObj(j*25, num*25));
                    break;
                case 'c': coins.push(new coinObj(j*25, num*25));
                    break;
                case 'd': doors.push(new doorObj(j*25, num*25));
                    break;
                case 'r': enemies.push(new spiderObj(j*25, num*25,'r'));
                    break;
                case 'g': enemies.push(new spiderObj(j*25, num*25,'g'));
                    break;
                case 'f': fences.push(new fenceObj(j*25, num*25));
                    break;
                case 'y': objects.push(new keyObj(j*25, num*25));
                    break;
                case 'X': hiddenObjects.push(new PVector(j*25, num*25));
                    break;
            }

            currLevelWidth+=25.0;
        }
        num++;
        currLevelHeight+=25.0;
    }
    if(hiddenObjects.length>0){
        var index = round(random(0,hiddenObjects.length-1));
        objects.push(new wirecutterObj(hiddenObjects[index].x,hiddenObjects[index].y));
    }
};

// draw the background for the first level
var firstLevelBackground = function() {

    for(var i = 0; i < 2; i++) {

        for(var j =0; j < 2; j++) {

            image(wood[0], i*200, j*200, 200, 200);
        }
    }
};

// draw the background for game play
var drawBackground = function() {

    if(currentLevel === 1) {

        firstLevelBackground();

    } else if (currentLevel === 2) {

        background(235, 176, 209);
        noStroke();

        noStroke();
        fill(224, 197, 217);
        ellipse(0, 20, 100, 140);
        ellipse(100, 30, 140, 140);
        ellipse(300, 120, 120, 100);
        ellipse(380, 100, 140, 140);

    } else if (currentLevel === 3) {

        background(50, 100, 220);
        noStroke();

        noStroke();
        fill(190, 235, 250);
        ellipse(0, 20, 100, 140);
        ellipse(100, 30, 140, 140);
        ellipse(300, 120, 120, 100);
        ellipse(380, 100, 140, 140);
    } else {

        background(50, 100, 220);
        noStroke();
        fill(190, 235, 250);
        ellipse(0, 20, 100, 140);
        ellipse(100, 30, 140, 140);
        ellipse(300, 120, 120, 100);
        ellipse(380, 100, 140, 140);
    }
};

// Creates screen for game over
var gameOverScreen = function() {

    if (t < 361) {

        background(0, 0, 0);

        fill(255, 0, 0);
        textSize(t/8);
        text("Game Over", 90+(50*cos(t)), 120+(50*sin(t)));

        t+=12;
    } else if (t < 375) {

        textSize(30);
        fill(255, 255, 255);
        text("Play again?", 120, 220);
        t+=12;
    }
};

// Creates screen for game over
var gameWonScreen = function() {

    if (t < 361) {

        background(round(random(200, 255)), round(random(0, 100)), round(random(100, 255)));

        fill(255, 255, 255);
        textSize(t/9);
        text("You won!", 75+(50*cos(360-t)), 160+(50*sin(360-t)));
        t+=6;
    } else if (t < 375) {

        textSize(30);
        fill(255, 255, 255);
        text("Play again?", 120, 220);
        t+=12;
    }
};

//game opening screen
var openingAnimation = function() {

    background(round(random(200, 210)), round(random(200, 210)), 255);
    farmer.draw();
    fox.draw();
    dchicken.draw();
    switch (countingI) {

            case 1:

                fill(0, 0, 0, trans);
                textSize(20);
                text("Dennis was tired...", 120, 100);

            break;
            case 2:

                fill(0, 0, 0, trans);
                textSize(20);
                text("...tired of being on the farm.", 140, 200);

            break;
            case 3:

                fill(0, 0, 0, trans);
                textSize(20);
                text("He wanted to escape....", 120, 100);

            break;
            case 4:

                fill(0, 0, 0, trans);
                textSize(20);
                text("...he'd been planning one for a while...", 40, 200);

            break;
            case 5:

                fill(0, 0, 0, trans);
                textSize(20);
                text("He needed to get out of the coop first.", 20, 100);
                text("Past the spiders, out the roof.", 80, 200);

            break;
            case 6:

                fill(0, 0, 0, trans);
                textSize(20);
                text("Then through the chicken yard...", 20, 150);
                text("...grabbing the wire cutters on the way...", 20, 250);

            break;
            case 7:

                fill(0, 0, 0, trans);
                textSize(20);
                text("Finally through the barn yard...", 70, 50);
                text("...the farmer will be angry...", 50, 180);
                //fox.draw();
            break;
            case 10:

                beginPlease = true;

            break;
            default:

            break;
        }

    if (currentFrameCount < (frameCount - 300)) {
        currentFrameCount = frameCount;
        countingI++;
        trans = 255;
    } else {

        trans--;
    }
};

var done = true;
var iterator =0;
// begin drawing
void draw() {

	drawBackground();
    if(!beginPlease) {

        t = 0;
        if (!chickenMade) {
            chickenImg();
        }

        if(!spiderMade){
            spiderImg();
        }

        if(!doorMade){
            doorImg();
        }

        if(!fenceMade){
            fenceImg();
        }
        if(!woodMade) {

            woodBlockImg();
            woodMade = true;
        }
        if(!hayMade) {

            hayImg();
            hayMade = true;
        }
        if (!sunglassesMade) {

            drawSunglasses();
            sunglassesMade = true;
        }
        if(!farmerMade) {

            farmerImg();
            farmerMade = true;
        }
        if(!foxMade) {

            foxImage();
            foxMade = true;
        }
        if(!hayMade) {

            hayImg();
            hayMade = true;
        }

        openingAnimation();

    } else if(gameWon) {

        gameWonScreen();

    }else if(gameOver) {

        gameOverScreen();

    // draw option screen
    } else if(!start && options) {

        background(130, 230, 100);

        fill(255, 255, 255);
        textSize(30);

        text("View Instructions", 84, 160);
        text("Return", 155, 240);

        chicken.draw();

    } else if(!start && play) { // draw playing background

        if(chicken.dead===true){
            if(chicken.lives>0){
                chicken.lives--;
                chicken.score=0;
                if(currentLevel===2){
                    chicken.hasWirecutters=false;
                }
                if(currentLevel===3){
                    chicken.hasKey=false;
                }

                initTilemap();
            }
            else{
                chicken.hasWirecutters = false;
                chicken.hasKey = false;
                chicken.score = 0;
                currentLevel=0;
                chicken.lives=3;
                start = true;
                play = false;
                gameOver = true;
            }
            chicken.dead=false;
            return;
        }
        else if(currentLevel===0){
            currentLevel++;
            initTilemap();
        }

        else if(currentLevel===1){
            if(chicken.position.y<400-currLevelHeight){
                currentLevel++;
                initTilemap();
            }
        }
        else if(currentLevel===2){
            if(chicken.position.x>currLevelWidth){
                currentLevel++;
                initTilemap();
            }
        }
        drawBackground();

        pushMatrix();
        translate(xShift, yShift);

        chicken.draw();
        chicken.move();

        for (var i=0; i<walls.length; i++) {

            walls[i].draw();
        }

        for (i=0; i<coins.length; i++) {

            coins[i].draw();
        }

        for (i=0; i<enemies.length; i++) {

            enemies[i].draw();
            enemies[i].move();
        }

        for (i=0; i<grass.length; i++) {

            grass[i].draw();
        }

        for (i=0; i<doors.length; i++) {

            doors[i].draw();
        }

        for (i=0; i<fences.length; i++){
            fences[i].draw();
        }

        for (i=0; i<objects.length; i++){
            objects[i].draw();
        }

        popMatrix();

        noStroke();
        fill(250,100,10,150);
        rect(3, 3, 8, 20);
        rect(14, 3, 8, 20);

        fill(10,30,100,50);
        rect(23,0,67,40);

        fill(250,250,250);
        textSize(18);
        text("Score " + chicken.score, 26, 38);

        if(chicken.curFrame+5<=frameCount){
            iterator++;
        }

        for(var i =0; i < chicken.lives; i++){
            if(iterator>5){
                iterator=0;
            }
            image(chickens[iterator], i*20+25, 0,20,20);
            iterator++;
        }
        iterator-=3;
        if(iterator<0){
            iterator+=6;
        }

    } else if(!start && instructions) { // draw playing background

        background(mouseX/2, 180, 400-mouseY/2);

        fill(255, 255, 255);
        textSize(30);
        text("Instructions", 125, 45);

        textSize(15);
        text("Use the up arrow to jump and left and right arrows to run!", 18, 80);

        text("Avoid spiders and holes, you get 3 lives!", 80, 100);
        text("Collect coins to get the high score!", 100, 120);

        text("Careful, losing lives loses coins!", 90, 170);
        text("Go through the hay, not through the walls!", 60, 190);
        text("Obtain wire cutters in level 2 to cut grey fences!", 44, 210);

        text("If you get stuck, press pause to return to menu.", 42, 260);
        text("Returning to menu loses all progress!", 80, 280);
        text("Try hard! Items are always obtainable, you may need\n                                to get creative!", 25, 300);

        textSize(30);
        text("Return", 150, 355);

    } else if(pause) { // draw pause screen

        background(mouseY/2, 400-mouseX/2, 200);

        fill(255, 255, 255);

        textSize(30);
        text("You stuck?", 133, 200);

        text("Return", 155, 240);

    } else { // draw first screen

        currentLevel=0;
        drawBackground();

        fill(120, 180, 240);

        textSize(45);
        text("Flee the Coop!", 50, 140);

        fill(255, 255, 255);
        textSize(15);
        text("Christopher Buehler, Stephanie Marin, Alex Supplee", 30, 180);

        textSize(30);
        text("Play", 170, 250);

        textSize(30);
        text("Options", 145, 290);

    }
};