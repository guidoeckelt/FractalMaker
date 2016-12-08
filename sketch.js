
var roots;
var lastGeneratedBranches;
var mid;

var btnNewBranch, btnClear;
var sldBranches, sldStartLength, sldRootAmount;

function setup() {
	var factor = 0.7;
	createCanvas(displayWidth*factor, displayHeight*factor,P2D);
	mid = createVector(width / 2, height/2);
	
	
	btnNewBranch = createButton("Neue Abzweigungen");
	btnNewBranch.mousePressed(addNewBranches);
	
	btnClear = createButton("Neu beginnen");
	btnClear.mousePressed(clearFractalTree);
	
	sldStartLength = createSlider(10,200, 100, 1);
	sldBranches = createSlider(2,4,2,1);
	sldRootAmount = createSlider(1,3,1,1);
	
	var container = createDiv('');
	container.child(btnNewBranch);
	container.child(sldBranches);
	
	container = createDiv('');
	container.child(btnClear);
	container.child(sldStartLength);
	container.child(sldRootAmount);
	
	
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
	roots = new Array();
	for(var i = 1;i <= rootAmount;i++){
		var begin = mid.copy();
		var end = mid.copy().sub(0, sldStartLength.value()/2);
		end.rotate(TWO_PI/i);
		roots.push(new Branch(begin, end));
	}
	lastGeneratedBranches = roots;
}


