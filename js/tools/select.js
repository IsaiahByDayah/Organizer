// Isaiah Smith
"use script"

function SelectTool(){
	// Publicize
	this.mousedown = mousedown;
	this.mouseup = mouseup;
	this.mouseleave = mouseleave;
	this.mousemove = mousemove;
	this.getDescription = getDescription;
	this.draw = draw;

	// Variables
	var mouseIsDown;


	//Functions
	/*
		Sets initial properties
	*/
	function init(){
		mouseIsDown = false;
	}

	/*
		Sets mouseIsDown to true
	*/
	function mousedown(e){
		// console.log(e);
		mouseIsDown = true;
	}

	/*
		Selects the furniture at the point that the mouse is lifted
		Sets mouseIsDown to false
	*/
	function mouseup(e){
		// console.log(e);

		if (mouseIsDown){
			var point = {
				x: e.offsetX,
				y: e.offsetY
			};

			currentLayout.selectFurnitureAtPoint(point);
		}

		mouseIsDown = false;
	}

	/*
		Sets mouseIsDown to false
	*/
	function mouseleave(e){
		// console.log(e);
		mouseIsDown = false;
	}

	/*
		Does nothing, needed to conform to Tool Delegate
	*/
	function mousemove(e){
		// console.log(e);
	}

	/*
		Does nothing, needed to conform to Tool Delegate
	*/
	function draw(){
		// Needed to comply with Tool Delegate design pattern
	}

	/*
		Getter for a string description of the tool
	*/
	function getDescription(){
		var str = "Select Tool";

		return str;
	}

	init();
}