void setup() {
	size(400, 400)
}

angleMode = "radians";

var tileMap = [
    "wwwwwwwwwwwwwwwwwwww",
    "w          ww      w",
    "w wwwwwwww    w  www",
    "w wwww     wwww wwww",
    "w      wwwwwwww    w",
    "w wwww          wwww",
    "w      wwwwwwww    w",
    "wwwwww wwwww    wwww",
    "w  ww    wwwwww   ww",
    "w  wwwww   ww   wwww",
    "w      www  ww w   w",
    "w  wwwwwww       www",
    "w  www     wwww wwww",
    "w      wwwwwwww    w",
    "w wwww          wwww",
    "w      wwwwwwww    w",
    "wwwwww wwwww    wwww",
    "w  ww    w   ww   ww",
    "w     ww    ww  wwww",
    "wwwwwwwwwwwwwwwwwwww"
];
var walls=[];
var eggPoints = [];
var glassesPoints=[];
var charImage;

var wallObj = function(x,y){
    this.x = x;
    this.y = y;
};

wallObj.prototype.draw = function(){
    fill(255, 0, 0);
    rect(this.x,this.y,20,20);
};

var qObj = function(x, y) {
    this.x = x;
    this.y = y;
    this.fcost = 0;
};

qObj.prototype.set = function(a, b) {
    this.x = a;
    this.y = b;
};

var graph = new Array(20);
var cost = new Array(20);
var inq = new Array(20);
var comefrom = new Array(20);
for (var i=0; i<20; i++) {
    graph[i] = new Array(20);
    cost[i] = new Array(20);
    inq[i] = new Array(20);
    comefrom[i] = new Array(20);
}
var path = [];
var q = [];
for (i=0; i<400; i++) {
    path.push(new PVector(0, 0));
    q.push(new qObj(0, 0));
}
for (i=0; i<20; i++) {
    for(var j=0; j<20; j++) {
        comefrom[i][j] = new PVector(0, 0);
    }
}
var pathLen = 0;
var pathFound = 0;
var qLen = 0;
var qStart = 0;

var initialized = 0;
var walls = [];


var haltState = function() {
    this.angle = 0;
};

var turnState = function() {
    this.angle = 0;
    this.angleDir = 0;
    this.vec = new PVector(0,0);
};

var chaseState = function() {
    this.step = new PVector(0,0);
};

var charObj = function(x, y) {
    this.position = new PVector(x, y);
    this.state = [new haltState(), new turnState(), new chaseState()];
    this.currState = 0;
    this.angle = 0;
    this.whisker1 = new PVector(0, 0);
    this.whisker2 = new PVector(0, 0);
};

var targetObj = function(x, y) {
    this.x = x;
    this.y = y;
};

var character = new charObj(-200, -200);
var target = new targetObj(0, 0);
var targetPos = new targetObj(0, 0);
var finalDest = new targetObj(0, 0);

charObj.prototype.changeState = function(x) {
    this.currState = x;
};

haltState.prototype.execute = function(me) {

    if (dist(me.position.x, me.position.y, target.x, target.y) < 10) {
        me.changeState(1);
    }
};

turnState.prototype.execute = function(me) {
    this.vec.set(target.x - me.position.x, target.y - me.position.y);
    this.angle = this.vec.heading();
    var angleDiff = abs(this.angle - me.angle);
    if (angleDiff>90.0*PI/180.0) {
        if (this.angle > me.angle) {
            this.angleDir =90.0*PI/180.0;
        }
        else {
            this.angleDir = -90.0*PI/180.0;
        }
        if (angleDiff > PI) {
            this.angleDir = -this.angleDir;
        }

        me.angle += this.angleDir;
        if (me.angle > PI) {
            me.angle = (-179.0*PI)/180.0;
        }
        else if (me.angle < (0.0-PI)) {
            me.angle = (179.0*PI)/180.0;
        }
    }
    else {
        me.angle=this.angle;
        me.changeState(2);
    }

};

var findIntersection = function(p) {
    var distance = 0;

    for (var i=0; i<walls.length; i++) {
        var d = dist(p.x, p.y, walls[i].x+10, walls[i].y+10);
        if (d < 16) {
            distance += d;
        }
    }

    if (distance === 0) {
        distance = 100000;
    }

    return(distance);
};

chaseState.prototype.collideWall = function(me) {
    var collide = 0;
    this.step.set(target.x - me.position.x, target.y - me.position.y);
    this.step.normalize();
    this.step.mult(15);
    var ahead = PVector.add(me.position, this.step);
    for (var i=0; i<walls.length; i++) {
        if (dist(ahead.x, ahead.y, walls[i].x+10, walls[i].y+10) < 5) {
            collide = 1;

            me.whisker1.set(this.step.x, this.step.y);
            me.whisker2.set(this.step.x, this.step.y);
            me.whisker1.rotate(PI/4);
            me.whisker2.rotate(-PI/4);
            me.whisker1.add(me.position);
            me.whisker2.add(me.position);
            var dist1 = findIntersection(me.whisker1);
            var dist2 = findIntersection(me.whisker2);

            if (dist1 > dist2) {
                target.x = me.whisker1.x;
                target.y = me.whisker1.y;
            }
            else {
                target.x = me.whisker2.x;
                target.y = me.whisker2.y;
            }
        }
    }

    return(collide);
};

chaseState.prototype.execute = function(me) {
    if (this.collideWall(me) === 1) {
        me.changeState(1);
    }
    else if (dist(target.x, target.y, me.position.x, me.position.y) > 2) {
        this.step.set(target.x - me.position.x, target.y - me.position.y);
        this.step.normalize();
        me.position.add(this.step);
    }
    else {
        if ((finalDest.x === target.x) && (finalDest.y === target.y)) {
            me.changeState(0);
        }
        else {
            pathLen--;
            if (pathLen > 0) {
                target.x = path[pathLen].x;
                target.y = path[pathLen].y;
            }
            else {
                target.x = finalDest.x;
                target.y = finalDest.y;
            }
            me.changeState(1);
        }
    }
};

var midPoint = function(a, b) {
    var m = new PVector((a.x + b.x)/2, (a.y+b.y)/2);
    return m;
};

var clearPoints = function(p) {
    p.splice(0, p.length);
};

var drawShape = function(p) {
    //fill(255, 0, 0);
    beginShape();
        for (var i=0; i<p.length; i++) {
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
    p2.push(eggPoints[0]);
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

var subdivide = function(p,n){
    var points2 = [];
    if(n>0){
        subdivide(p,n-1);
        splitPoints(p, points2);
        averagePoints(points2, p);
    }
};


charObj.prototype.draw = function() {
    pushMatrix();
    translate(this.position.x, this.position.y);
    rotate(this.angle);
    image(charImage,-10,-10,20,20);
    popMatrix();
};

var initGraph = function(x, y) {
    for (var i = 0; i< 20; i++) {
        for (var j = 0; j<20; j++) {
            if (graph[i][j] > 0) {
                graph[i][j] = 0;
            }
            inq[i][j] = 0;
            cost[i][j] = 0;
        }
    }

    graph[x][y] = 1;
};

//////////////////////////////////////////////////////////////////////
var findAStarPath = function(x, y) {
    var i, j, a, b;
    qLen = 0;
    graph[x][y] = 1;
    inq[x][y] = 1;
    q[qLen].set(x, y);
    q[qLen].fcost = 0;
    qLen++;
    pathLen = 0;
    qStart = 0;

    var findMinInQ = function() {
        var min = q[qStart].fcost;
        var minIndex = qStart;
        for (var i = qStart+1; i<qLen; i++) {
            if (q[i].fcost < min) {
                min = q[i].qStart;
                minIndex = i;
            }
        }
        if (minIndex !== qStart) {  // swap
            var t1 = q[minIndex].x;
            var t2 = q[minIndex].y;
            var t3 = q[minIndex].fcost;
            q[minIndex].x = q[qStart].x;
            q[minIndex].y = q[qStart].y;
            q[minIndex].fcost = q[qStart].fcost;
            q[qStart].x = t1;
            q[qStart].y = t2;
            q[qStart].fcost = t3;
        }
    };

    while ((qStart < qLen) && (pathFound === 0)) {
findMinInQ();
        i = q[qStart].x;
        j = q[qStart].y;
        graph[i][j] = 1;
        qStart++;

        if ((i === targetPos.x) && (j === targetPos.y)) {
            pathFound = 1;
            path[pathLen].set(j*20+10, i*20+10);
            pathLen++;
        }

        a = i+1;
        b = j;
        if ((a < 20) && (pathFound === 0)) {
            if ((graph[a][b] === 0) && (inq[a][b] === 0)) {
                inq[a][b] = 1;
                comefrom[a][b].set(i, j);
                q[qLen].set(a, b);
                cost[a][b] = cost[i][j] + 10;
                q[qLen].fcost = cost[a][b] + dist(b*20+10, a*20+10,
finalDest.x, finalDest.y);
                qLen++;
            }
        }
        a = i-1;
        b = j;
        if ((a >= 0) && (pathFound === 0)) {
            if ((graph[a][b] === 0) && (inq[a][b] === 0)) {
                inq[a][b] = 1;
                comefrom[a][b].set(i, j);
                q[qLen].set(a, b);
                cost[a][b] = cost[i][j] + 10;
                q[qLen].fcost = cost[a][b] + dist(b*20+10, a*20+10,
finalDest.x, finalDest.y);
                qLen++;
            }
        }
        a = i;
        b = j+1;
        if ((b < 20) && (pathFound === 0)) {
            if ((graph[a][b] === 0) && (inq[a][b] === 0)) {
                inq[a][b] = 1;
                comefrom[a][b].set(i, j);
                q[qLen].set(a, b);
                cost[a][b] = cost[i][j] + 10;
                q[qLen].fcost = cost[a][b] + dist(b*20+10, a*20+10,
finalDest.x, finalDest.y);
                qLen++;
            }
        }
        a = i;
        b = j-1;
        if ((b >= 0) && (pathFound === 0)) {
            if ((graph[a][b] === 0) && (inq[a][b] === 0)) {
                inq[a][b] = 1;
                comefrom[a][b].set(i, j);
                q[qLen].set(a, b);
                cost[a][b] = cost[i][j] + 10;
                q[qLen].fcost = cost[a][b] + dist(b*20+10, a*20+10,
finalDest.x, finalDest.y);
                qLen++;
            }
        }
    }   // while

    while ((i !== x) || (j !== y)) {
        a = comefrom[i][j].x;
        b = comefrom[i][j].y;
        path[pathLen].set(b*20 + 10, a*20+10);
        pathLen++;
        i = a;
        j = b;
    }
};

var mouseClicked = function() {
    if(character.position.x===-200&&character.position.y===-200){
        if(findIntersection(new PVector(mouseX, mouseY))===100000){
            character.position.x=mouseX;
            character.position.y=mouseY;
        }
        return;
    }

    if(findIntersection(new PVector(mouseX, mouseY))!==100000){
        return;
    }
    target.x = mouseX;
    target.y = mouseY;
    finalDest.x = target.x;
    finalDest.y = target.y;
    targetPos.x = floor(finalDest.y / 20);
    targetPos.y = floor(finalDest.x / 20);
    var i = floor(character.position.y / 20);
    var j = floor(character.position.x / 20);
    initGraph(i, j);
    pathFound = 0;
    pathLen = 0;
    findAStarPath(i, j);
    pathLen--;
    target.x = path[pathLen].x;
    target.y = path[pathLen].y;
    if (character.currState !== 1) {
        character.changeState(1);
    }
};

var initializeTilemap = function () {
    for (var i=0; i<tileMap.length; i++) {
        for (var j=0; j<tileMap[i].length; j++) {
            if (tileMap[i][j] === 'w') {
                walls.push(new wallObj(j*20, i*20));
                graph[i][j] = -1;
            }
            else {
                graph[i][j] = 0;
            }
        }
    }
    glassesPoints.push(new PVector(60,150));
    glassesPoints.push(new PVector(140,150));
    glassesPoints.push(new PVector(190,150));
    glassesPoints.push(new PVector(210,150));
    glassesPoints.push(new PVector(260,150));
    glassesPoints.push(new PVector(320,150));
    glassesPoints.push(new PVector(325,120));
    glassesPoints.push(new PVector(330,130));
    glassesPoints.push(new PVector(330,160));
    glassesPoints.push(new PVector(310,200));
    glassesPoints.push(new PVector(230,200));
    glassesPoints.push(new PVector(205,160));
    glassesPoints.push(new PVector(190,160));
    glassesPoints.push(new PVector(170,200));
    glassesPoints.push(new PVector(80,200));
    glassesPoints.push(new PVector(60,150));

    eggPoints.push(new PVector(100, 100));
    eggPoints.push(new PVector(200, -10));
    eggPoints.push(new PVector(300, 100));
    eggPoints.push(new PVector(350, 250));
    eggPoints.push(new PVector(300, 399));
    eggPoints.push(new PVector(100, 399));
    eggPoints.push(new PVector(50, 250));
    eggPoints.push(new PVector(100, 100));

    background(0,0,0,0);
    stroke(0,0,0);
    strokeWeight(15);
    fill(200, 200, 150);
    subdivide(eggPoints,3);
    drawShape(eggPoints);
    fill(0,0,0);
    strokeWeight(1);
    subdivide(glassesPoints,3);
    drawShape(glassesPoints);

    charImage=get(0,0,400,400);

};

void draw() {
    background(255, 255, 255);
    if (initialized === 0) {
        initialized = 1;
        initializeTilemap();
    }

    for (var i =0; i<walls.length; i++) {
        walls[i].draw();
    }

    character.draw();
    character.state[character.currState].execute(character);
    fill(255, 0, 0);
//    text("Steps left: " + pathLen, 320, 10);
};