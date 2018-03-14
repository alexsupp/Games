void setup() {
	size(400,400);
}

var airplaneObj = function(x,y,s,d){
    this.x = x;
    this.y = y;
    this.speed = s;
    this.direction = d;//direction goes around
};

var cloudObj = function(x,y,s){
    this.x = x;
    this.y = y;
    this.speed = s;
};

var letterAObj = function(x,y,s){
    this.x = x;
    this.y = y;
    this.speed = s;
};

letterAObj.prototype.display = function(){
    noStroke();
    fill(255, 0, 0);
    quad(this.x-150,this.y+150,this.x-25,this.y-150,this.x+25,this.y-150,this.x-100,this.y+150);//left
    quad(this.x+150,this.y+150,this.x+25,this.y-150,this.x-25,this.y-150,this.x+100,this.y+150);//right
    quad(this.x-75,this.y,this.x-75,this.y+50,this.x+75,this.y+50,this.x+75,this.y);//middle
};

letterAObj.prototype.move = function(){
};


cloudObj.prototype.display = function(){
    fill(255, 255, 255);
    ellipse(this.x-30,this.y+5,30,30);//first circle
    ellipse(this.x-20,this.y,35,35);//second circle
    ellipse(this.x,this.y,40,40);//third circle
    ellipse(this.x+20,this.y+5,30,30);//fourth circle
};

cloudObj.prototype.move = function(){
    this.x -= this.speed;
    if(this.x < -35){
        this.x = width+45;
    }
};

airplaneObj.prototype.display = function(){
    stroke(0, 0, 0);
    fill(255, 0, 0); // red
    ellipse(this.x-15,this.y-10,3,12); //left engine
    ellipse(this.x+15,this.y-10,3,12); //right engine
    fill(20, 255, 0); //green
    noStroke(); //no border
    ellipse(this.x, this.y, 10, 50); //body
    ellipse(this.x,this.y-10,50,7); //wing
    ellipse(this.x,this.y+17,20,5); //tail
};

airplaneObj.prototype.move = function(){
    this.y -= this.speed;
    if(this.y < -25){
        this.y = height + 25;
    }
};


var clouds = [];
for(var i = 0; i < random(4,6); i++){
    clouds.push(new cloudObj(random(50,width-50),random(50,height/3), random(1,3)));
}

var planes = [];
for(var i = 0; i < random(1,2); i++){
    planes.push(new airplaneObj(random(50,width-50),random(50, height-50),random(2,4)));
}

var letA = new letterAObj(200,200,2);

keyPressed = function() {
    if(keyCode===37){
        letA.x-=letA.speed;
    }

    else if(keyCode===38){
        letA.y-=letA.speed;
    }

    else if(keyCode===39){
        letA.x+=letA.speed;
    }

    else if(keyCode===40){
        letA.y+=letA.speed;
    }
};


void draw() {
    background(50, 150, 255);
    letA.display();
    for(var i = 0; i<clouds.length; i++){
        clouds[i].move();
        clouds[i].display();

    }


    for(var i = 0; i<planes.length; i++){
        planes[i].move();
        planes[i].display();
    }



};