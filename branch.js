function Branch(begin, end, parent) {
	this.begin = begin;
	this.end = end;
	this.lengthFactor = 0.8;

	this.subBranches = new Array();
	this.parent = parent;

	this.show = function() {
		stroke(255);
		line(this.begin.x, this.begin.y, this.end.x, this.end.y);
		for(var subbranch of this.subBranches){
			subbranch.show();
		}
	};

	this.generate = function(subBranchAmount){
		for(var i = 1; i <=subBranchAmount;i++){
			var rotateAngle = this.getRotateAngle(i, subBranchAmount);
			var dir = p5.Vector.sub(this.end, this.begin);
			dir.rotate(rotateAngle);
			dir.mult(this.lengthFactor);
			var newEnd = p5.Vector.add(this.end, dir);
			this.subBranches.push(new Branch(this.end, newEnd, this));
		}
		return this.subBranches;
	};
	
	this.getRotateAngle = function(current, max){
		var angleFraction;
		switch(max){
			case 2: 
				if(current == 1){
					angleFraction = 4;
				}else{
					angleFraction = -4;
				} break;
			case 3: 
				if(current == 1){
					angleFraction = 4;
				}else if(current == 2){
					angleFraction = -4;
				}else{
					angleFraction = 0.5;
				} break;
			case 4:  
				if(current == 1){
					angleFraction = -3;
				}else if(current == 2){
					angleFraction = -6;
				}else if(current == 3){
					angleFraction = 6;
				}else{
					angleFraction = 3;
				} break;
			default: 
		}
		return (PI / angleFraction);
	};
}