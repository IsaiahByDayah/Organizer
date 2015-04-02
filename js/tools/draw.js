// Isaiah Smith
"use script"

function DrawTool(){
	// Publicize
	this.mousedown = mousedown;
	this.mouseup = mouseup;
	this.mouseleave = mouseleave;
	this.mousemove = mousemove;
	this.getDescription = getDescription;
	this.draw = draw;

	// Variables
	var mouseIsDown;
	var newFurniture;

	var startPoint = {
		x: 0,
		y: 0
	};


	//Functions
	/*
		Sets initial properties
	*/
	function init(){
		mouseIsDown = false;
	}

	/*
		Handles the mouseDown event for drawing
			- Sets the initial point for the shape to draw
	*/
	function mousedown(e){
		// console.log(e);
		mouseIsDown = true;
		startPoint.x = e.offsetX;
		startPoint.y = e.offsetY;
		newFurniture = new Furniture(
			currentFurniture,
			startPoint.x,
			startPoint.y,
			0,
			0);
	}

	/*
		Handles the mouseUp event as the draw tool
			- Adds the new furniture drawn to the layouts furnitures
	*/
	function mouseup(e){
		// console.log(e);

		mouseIsDown = false;

		if (newFurniture == undefined) return;

		currentLayout.addFurniture(newFurniture);

		var point = {
			x: e.offsetX,
			y: e.offsetY
		};

		var midPoint = midPointBetweenPoints(startPoint, point);

		currentLayout.selectFurnitureAtPoint(midPoint);

		newFurniture = undefined;
	}

	/*
		Handles the mouseLeave event as the draw tool
			- Cancels the drawing of a piece of furniture
	*/
	function mouseleave(e){
		mouseIsDown = false;
		newFurniture = undefined;
	}

	/*
		Handles the mouseMove event as the draw tool
			- changes where the potential new furniture will be drawn
	*/
	function mousemove(e){
		// console.log(e);
		if (mouseIsDown){
			newFurniture = new Furniture(
				currentFurniture,
				startPoint.x,
				startPoint.y,
				e.offsetX - startPoint.x,
				e.offsetY - startPoint.y);

		}
	}

	/*
		Draws a preview of the new furniture
	*/
	function draw(){
		if (newFurniture != undefined) newFurniture.draw();
	}

	/*
		Getter for a string description of the tool
	*/
	function getDescription(){
		var str = "Draw Tool";

		return str;
	}

	init();
}