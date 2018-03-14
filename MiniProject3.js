void setup() {
	size(400,400);
}

angleMode="radians";


//created by alex supplee

var a = random(1500);
var backgroundColour = color(255, 255, 255);
var nodeColour = color(40, 168, 107);
var edgeColour = color(80, 20, 255);
var nodeSize = 10;

var node0 = [-100, -100, -50];//        1--------5
var node1 = [-100, -100,  0];//        /:       /|
var node2 = [-100,  -50, -50];//      / :      / |
var node3 = [-100,  -50,  0];//      0--------4  |                17--------------------------------21
var node4 = [ -50, -100, -50];//     |  3-----|--7               /:                                /|
var node5 = [ -50, -100,  0];//      | /      | /                / :    1--------5        9-------13 |
var node6 = [ -50,  -50, -50];//     |/       |/               /  :   /:       /|       /:       /| |
var node7 = [ -50,  -50,  0];//      2--------6                /   :  / :      / |      / :      / | |
                              //                              /    : 0--------4  |     8-------12  | |
var node08 = [  50, -100, -25];//         9-------13         /     : |  3-----|--7     | 11----/|-15 |
var node09 = [  50, -100,  25];//        /:       /|        /      : | /      | /      | /    / | /  |
var node10 = [  50,  -50, -25];//       / :      / |       /       : |/       |/       |/    /  |/   |
var node11 = [  50,  -50,  25];//      8-------12  |      /        : 2--------6       10----/--14    |
var node12 = [ 100, -100, -25];//      | 11-----|-15     16--------------------------------20        |
var node13 = [ 100, -100,  25];//      | /      | /      |         :                        |        |
var node14 = [ 100,  -50, -25];//      |/       |/       |         :                        |        |
var node15 = [ 100,  -50,  25];//     10-------14        |         :                        |        |
                               //                        |         :                        |        |
var node16 = [-200, -200,-200];//        17-------21     |        19------------------------|-------23
var node17 = [-200, -200, 200];//        /:       /|     |     /                            |     /
var node18 = [-200,  200,-200];//       / :      / |     |    /                             |    /
var node19 = [-200,  200, 200];//     16-------20  |     |   /                              |   /
var node20 = [ 200, -200,-200];//      | 19-----|-23     |  /                               |  /
var node21 = [ 200, -200, 200];//      | /      | /      | /                                | /
var node22 = [ 200,  200,-200];//      |/       |/       |/                                 |/
var node23 = [ 200,  200, 200];//     18-------22        18---------------------------------22

var nodes = [node0, node1, node2, node3, node4, node5, node6, node7,node08,node09,node10,node11,node12,node13,node14,node15,node16,node17,node18,node19,node20,node21,node22,node23];

var edge0  = [0, 1];
var edge1  = [1, 3];
var edge2  = [3, 2];
var edge3  = [2, 0];
var edge4  = [4, 5];
var edge5  = [5, 7];
var edge6  = [7, 6];
var edge7  = [6, 4];
var edge8  = [0, 4];
var edge9  = [1, 5];
var edge10 = [2, 6];
var edge11 = [3, 7];
var edges1 = [edge0, edge1, edge2, edge3, edge4, edge5, edge6, edge7, edge8, edge9, edge10, edge11];

var face0 = [1,0,2,3];
var face1 = [4,5,7,6];
var face2 = [0,4,6,2];
var face3 = [1,5,4,0];
var face4 = [5,1,3,7];
var face5 = [2,6,7,3];
var faces1 = [face0, face1, face2, face3, face4, face5];

var edge12  = [ 8, 9];
var edge13  = [ 9, 11];
var edge14  = [11, 10];
var edge15  = [10,  8];
var edge16  = [12, 13];
var edge17  = [13, 15];
var edge18  = [15, 14];
var edge19  = [14, 12];
var edge20  = [ 8, 12];
var edge21  = [ 9, 13];
var edge22  = [10, 14];
var edge23  = [11, 15];
var edges2  = [edge12, edge13, edge14, edge15, edge16, edge17, edge18, edge19, edge20, edge21, edge22, edge23];

var face6 = [9,8,10,11];
var face7 = [12,13,15,14];
var face8 = [8,12,14,10];
var face9 = [9,13,12,8];
var face10 = [13,9,11,15];
var face11 = [10,14,15,11];
var faces2 = [face6, face7, face8, face9, face10, face11];

var edge24  = [16, 17];
var edge25  = [17, 19];
var edge26  = [19, 18];
var edge27  = [18, 16];
var edge28  = [20, 21];
var edge29  = [21, 23];
var edge30  = [23, 22];
var edge31  = [22, 20];
var edge32  = [16, 20];
var edge33  = [17, 21];
var edge34  = [18, 22];
var edge35  = [19, 23];
var edges3  = [edge24, edge25, edge26, edge27, edge28, edge29, edge30, edge31, edge32, edge33, edge34, edge35];

var face12 = [17,16,18,19];
var face13 = [20,21,23,22];
var face14 = [16,20,22,18];
var face15 = [17,21,20,16];
var face16 = [21,17,19,23];
var face17 = [18,22,23,19];
var faces3 = [face12, face13, face14, face15, face16, face17];

//checks if facing forward/outward based on 3 nodes and finding determinant for perpendicular vector
var isFacingForward = function(f){
    var node0 = nodes[f[0]];
    var node1 = nodes[f[1]];
    var node2 = nodes[f[2]];

    var vect1 = [node0[0]-node1[0], node0[1]-node1[1], node0[2]-node1[2]];
    var vect2 = [node2[0]-node1[0], node2[1]-node1[1], node2[2]-node1[2]];

    var det = [vect1[1]*vect2[2]-vect2[1]*vect1[2], -1.0*vect1[0]*vect2[2]-vect2[0]*vect1[2], vect1[0]*vect2[1]-vect2[0]*vect1[1]];

    if(det[2]<0){
        return true;
    }

    return false;
};


// Rotate shape around the z-axis
var rotateZ3D = function(theta) {
    var sinTheta = sin(theta);
    var cosTheta = cos(theta);

    for (var n=0; n<nodes.length; n++) {
        var node = nodes[n];
        var x = node[0];
        var y = node[1];
        node[0] = x * cosTheta - y * sinTheta;
        node[1] = y * cosTheta + x * sinTheta;
    }
};

var rotateY3D = function(theta) {
    var sinTheta = sin(theta);
    var cosTheta = cos(theta);

    for (var n=0; n<nodes.length; n++) {
        var node = nodes[n];
        var x = node[0];
        var z = node[2];
        node[0] = x * cosTheta - z * sinTheta;
        node[2] = z * cosTheta + x * sinTheta;
    }
};

var rotateX3D = function(theta) {
    var sinTheta = sin(theta);
    var cosTheta = cos(theta);

    for (var n=0; n<nodes.length; n++) {
        var node = nodes[n];
        var y = node[1];
        var z = node[2];
        node[1] = y * cosTheta - z * sinTheta;
        node[2] = z * cosTheta + y * sinTheta;
    }
};
//rotateZ3D(30);
//rotateY3D(30);
//rotateX3D(30);

//cube 1
//blue
var drawCube1 = function(){
    stroke(80, 20, 255);
    for (var e=0; e<edges1.length; e++) {
        var n0 = edges1[e][0];
        var n1 = edges1[e][1];
        var node0 = nodes[n0];
        var node1 = nodes[n1];
        line(node0[0], node0[1], node1[0], node1[1]);
    }
    // Draw faces 1
    //stroke(edgeColour);
    stroke(80, 20, 255);
    for (var f=0; f<faces1.length; f++) {
        if(isFacingForward(faces1[f])){
            var r =constrain(noise(a)*200,50,150);
            var g =constrain((noise(a+0.1))*250,25,150);
            var b =constrain((noise(a)*noise(a+0.1))*1500,100,255);

            fill(r,g,b,255);
            var node0 = nodes[faces1[f][0]];
            var node1 = nodes[faces1[f][1]];
            var node2 = nodes[faces1[f][2]];
            var node3 = nodes[faces1[f][3]];
            quad(node0[0],node0[1],node1[0],node1[1],node2[0],node2[1],node3[0],node3[1]);
        }
        a+=2;
    }
    a-=2*6.0;
};


//cube 2
//green
var drawCube2 = function(){


    stroke(20, 150, 80);
    for (var e=0; e<edges2.length; e++) {
        var n0 = edges2[e][0];
        var n1 = edges2[e][1];
        var node0 = nodes[n0];
        var node1 = nodes[n1];
        line(node0[0], node0[1], node1[0], node1[1]);
    }

    // Draw faces 2
    stroke(20, 150, 80);
    for (var f=0; f<faces2.length; f++) {
        if(isFacingForward(faces2[f])){
            var r =constrain(noise(a)*200,50,150);
            var g =constrain((noise(a)*noise(a+0.1))*1500,100,255);
            var b =constrain((noise(a+0.1))*250,25,150);
            fill(r,g,b,255);

            var node0 = nodes[faces2[f][0]];
            var node1 = nodes[faces2[f][1]];
            var node2 = nodes[faces2[f][2]];
            var node3 = nodes[faces2[f][3]];
            quad(node0[0],node0[1],node1[0],node1[1],node2[0],node2[1],node3[0],node3[1]);
        }
        a+=2;
    }
    a-=2*6.0;
};

//draws all cubes starting with the containing cube
var drawCubes = function(){

    //draw all edges behind the xy-plane
    stroke(255, 20, 80);
    for (var e=0; e<edges3.length; e++) {
        var n0 = edges3[e][0];
        var n1 = edges3[e][1];
        var node0 = nodes[n0];
        var node1 = nodes[n1];
        if(node0[2]>0||node1[2]>0){
            line(node0[0], node0[1], node1[0], node1[1]);

        }
    }

    //draw all container faces that are not facing out
    //i.e. facing in
    // Draw faces 3
    stroke(255, 20, 80);
    for (var f=0; f<faces2.length; f++) {
        // ! facing forward
        // facing outwards
        if(!isFacingForward(faces3[f])){
            var r =constrain((noise(a)*noise(a+0.1))*1500,100,255);
            var g =constrain(noise(a)*200,50,150);
            var b =constrain((noise(a+0.1))*250,25,150);

            fill(r,g,b,255);
            var node0 = nodes[faces3[f][0]];
            var node1 = nodes[faces3[f][1]];
            var node2 = nodes[faces3[f][2]];
            var node3 = nodes[faces3[f][3]];
            quad(node0[0],node0[1],node1[0],node1[1],node2[0],node2[1],node3[0],node3[1]);
        }
        a+=2;
    }
    a-=2*6.0;

        //cube 1 in front so draw it last
    if(node5[2]<=node09[2]){
        drawCube2();
        drawCube1();
    }

    //cube 2 in front so draw it last
    else if(node5[2]>node09[2]){
        drawCube1();
        drawCube2();
    }

    //draw front edges after at end
    stroke(255, 20, 80);
    for (var e=0; e<edges3.length; e++) {
        var n0 = edges3[e][0];
        var n1 = edges3[e][1];
        var node0 = nodes[n0];
        var node1 = nodes[n1];
        if(node0[2]<=0||node1[2]<=0){
            line(node0[0], node0[1], node1[0], node1[1]);

        }
    }
};

void draw() {
    background(backgroundColour);

    pushMatrix();
    translate(200, 200);
    /*
    // Draw nodes
    //fill(nodeColour);
    noStroke();
    for (var n=0; n<nodes.length; n++) {
        var node = nodes[n];
        fill(40, 168, 107,constrain(1-(node[2]+150)/400,0,1)*350);
        ellipse(node[0], node[1], nodeSize*constrain(1-(node[2]+150)/400,0,1), nodeSize*constrain(1-(node[2]+150)/400,0,1));
    }
    */
    drawCubes();

    popMatrix();

}


mouseDragged = function() {
    rotateY3D(2*atan((mouseX - pmouseX)/(2*(dist((pmouseX+mouseX)/2,0,width/2,0)+200))));
    rotateX3D(2*atan((mouseY - pmouseY)/(2*(dist(0,(pmouseY+mouseY)/2,0,height/2)+200))));
    //rotateY3D(mouseX - pmouseX);
    //rotateX3D(mouseY - pmouseY);

    //println(2*atan(dist(pmouseX,pmouseY, mouseX, mouseY)/(2*(dist((pmouseX+mouseX)/2,(pmouseY+mouseY)/2,width/2,height/2)))));
    //println(atan2(mouseY-height/2, mouseX-width/2)-atan2(pmouseY-height/2, pmouseX-width/2));
    //rotateZ3D(2*atan(dist(pmouseX,pmouseY, mouseX, mouseY)/(2*(dist((pmouseX+mouseX)/2,(pmouseY+mouseY)/2,width/2,height/2)))));

    //no z rotation with in 50 pixels of the middle
    //handling the motion in two dimensions causes crazy sparatic angles when radius to the z-axis is small and angular displacement
    //occurs perpendicular to the tangent line
    if(dist((pmouseX+mouseX)/2,(pmouseY+mouseY)/2,width/2,height/2)>25){
        rotateZ3D((atan2(mouseY-height/2, mouseX-width/2)-atan2(pmouseY-height/2, pmouseX-width/2)));
    }
};

