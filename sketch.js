var roots;
var lastGeneratedBranches;
var mid;

var btnNewBranch, sldBranches;
var btnClear, sldStartLength, sldRootAmount;
var controlClass = "control-default";
var containerClass = "control-container";

function setup() {
	var factor = 0.7;
	createCanvas(displayWidth*factor, displayHeight*factor,P2D);
	mid = createVector(width / 2, height/2);
	
	constructUI();
	createRoots();
}
function draw() {
	background(51);

	for(var root of roots){
		root.show();
	}
}

function addNewBranches(){
	var temp = new Array();
	for(var branch of lastGeneratedBranches){
		var newLastBranches = branch.generate(sldBranches.value());
		for(var newLast of newLastBranches){
			temp.push(newLast);
		}
	}
	lastGeneratedBranches = temp;
}
function clearFractalTree(){
	createRoots();
}
function createRoots(){
	var rootAmount = sldRootAmount.value();
	var rootLength = sldStartLength.value();
	var rotateAngle = TWO_PI/rootAmount;
	roots = new Array();
	for(var i = 1;i <= rootAmount;i++){
		var begin = mid.copy();
		var end = mid.copy().sub(0, rootLength/2);
		var dir = end.sub(begin);
		dir.normalize();
		dir.rotate(rotateAngle*i);
		dir.mult(sldStartLength.value());
		end = p5.Vector.add(begin, dir);
		roots.push(new Branch(begin, end, null));
	}
	lastGeneratedBranches = roots;
}

function constructUI(){
	btnNewBranch = createButton("Neue Abzweigungen");
	btnNewBranch.mousePressed(addNewBranches);
	btnNewBranch.class(controlClass);
	
	sldBranches = createSlider(2,4,2,1);
	sldBranches.class(controlClass);
	
	var container = createDiv('');
	container.class(containerClass);
	container.child(btnNewBranch);
	container.child(sldBranches);
	
	btnClear = createButton("Neu beginnen");
	btnClear.mousePressed(clearFractalTree);
	btnClear.class(controlClass);
	
	sldStartLength = createSlider(10,200, 100, 1);
	sldStartLength.class(controlClass);
	
	sldRootAmount = createSlider(1,3,1,1);
	sldRootAmount.class(controlClass);
	
	container = createDiv('');
	container.class(containerClass);
	container.child(btnClear);
	container.child(sldStartLength);
	container.child(sldRootAmount);
}


