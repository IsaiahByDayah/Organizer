// Isaiah Smith
"use script"

function ResizeTool(){
	// Publicize
	this.mousedown = mousedown;
	this.mouseup = mouseup;
	this.mouseleave = mouseleave;
	this.mousemove = mousemove;
	this.getDescription = getDescription;
	this.draw = draw;

	// Variables
	var mouseIsDown;
	var lastPoint;


	//Functions
	/*
		Sets initial properties
	*/
	function init(){
		mouseIsDown = false;
		lastPoint = {
			x: 0,
			y: 0
		};
	}

	/*
		Handles the mouseDown event for drawing
			- Sets the last point the user was mouseDown at
	*/
	function mousedown(e){
		// console.log(e);
		mouseIsDown = true;
		lastPoint = {
			x: e.offsetX,
			y: e.offsetY
		};
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
		Resizes the selected furniture based on how much the mouse has moved
	*/
	function mousemove(e){
		// console.log(e);
		if (mouseIsDown){
			if (selectedFurniture != undefined){
				var distance = {
					x: e.offsetX - lastPoint.x,
					y: e.offsetY - lastPoint.y
				};

				selectedFurniture.scale(distance);

				lastPoint = {
					x: e.offsetX,
					y: e.offsetY
				};
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
		var str = "Resize Tool";

		return str;
	}

	init();
}