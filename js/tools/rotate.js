// Isaiah Smith
"use script"

function RotateTool(){
	// Publicize
	this.mousedown = mousedown;
	this.mouseup = mouseup;
	this.mouseleave = mouseleave;
	this.mousemove = mousemove;
	this.getDescription = getDescription;
	this.draw = draw;

	// Variables
	var mouseIsDown;
	var lastDistance;


	//Functions
	/*
		Sets initial properties
	*/
	function init(){
		mouseIsDown = false;
	}

	/*
		Handles the mouseDown event for drawing
			- Sets the last distance from the top the user was mouseDown at
	*/
	function mousedown(e){
		// console.log(e);
		mouseIsDown = true;

		lastDistance = e.offsetY;
	}

	/*
		Sets mouseIsDown to false
	*/
	function mouseup(e){
		// console.log(e);

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
		Sets the furniture selected to rotate based on how much the house has moved vertically
	*/
	function mousemove(e){
		// console.log(e);

		if (mouseIsDown){
			if (selectedFurniture != undefined){
				selectedFurniture.rotate(e.offsetY - lastDistance);
				lastDistance = e.offsetY;
			}
		}
	}

	/*
		Does nothing, needed to conform to Tool Delegate
	*/
	function draw(){
		
	}

	/*
		Getter for a string description of the tool
	*/
	function getDescription(){
		var str = "Rotate Tool";

		return str;
	}

	init();
}