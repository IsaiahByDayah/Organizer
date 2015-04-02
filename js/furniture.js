// Isaiah Smith

"use strict"

function Furniture(furnitureType, xpos, ypos, w, h){

	// Publicize
	this.getColor = getColor;
	this.draw = draw;
	this.getDescription = getDescription;
	this.isAtPoint = isAtPoint;
	this.select = select;
	this.deselect = deselect;
	this.move = move;
	this.scale = scale;
	this.rotate = rotate;
	this.getMidPoint = getMidPoint;
	this.isSelected = isSelected;
	this.exportToObj = exportToObj;
	this.restoreFromObj = restoreFromObj;


	// Variables
	var type = furnitureType;
	var x = Math.min(xpos, xpos+w);
	var y = Math.min(ypos, ypos+h);
	var width = Math.abs(w);
	var height = Math.abs(h);
	var midX = x + (width/2);
	var midY = y + (height/2);
	var rotation = 0;

	var selected;


	//Functions

	/*
		Sets inital values for properties
	*/
	function init(){
		// console.log("Furniture made");
		selected = false;
	}

	/*
		Getter for the furniture's color
	*/
	function getColor(){
		return type.COLOR;
	}

	/*
		This functions tells the tool to draw itself unto the main canvas
			- This handles the different types of drawing styles based on furniture type
	*/
	function draw(){
		mainCtx.fillStyle = getColor();
		mainCtx.strokeStyle = FURNITURE_HIGHLIGHT_COLOR;
		mainCtx.lineWidth = FURNITURE_HIGHLIGHT_WIDTH;

		switch(type.CODE){
			case FURNITURE_TYPE.BED.CODE:
			case FURNITURE_TYPE.CHAIR.CODE:
			case FURNITURE_TYPE.TABLE.CODE:
				mainCtx.save();
				mainCtx.translate(midX, midY);
				mainCtx.rotate(getRadians(rotation));
				mainCtx.fillRect(x-midX, y-midY, width, height);
				if (selected) mainCtx.strokeRect(x-midX, y-midY, width, height);
				mainCtx.restore();
				break;
			case FURNITURE_TYPE.LIGHT.CODE:
				var diameter = Math.max(Math.abs(height), Math.abs(width));

				mainCtx.beginPath();
				mainCtx.arc(midX, midY, diameter/2, 0, 2 * Math.PI, false);
				mainCtx.closePath();
				mainCtx.fill();
				if (selected) mainCtx.stroke();
			default:
				break;
		}
	}

	/*
		Getter for a string description of the furniture.
	*/
	function getDescription(){
		var str = "A " + type.COLOR + " " + type.NAME + " at point (" + x + "," + y + ") that is " + width + "units wide and " + height + "units tall.";

		return str;
	}

	/*
		Given a point, returns a boolean for if the furniture covers that point on the canvas

		NOTE: Known issue is that the furniture does not properly take roation into account
	*/
	function isAtPoint(point){
		var bool = false;

		switch(type.CODE){
			case FURNITURE_TYPE.BED.CODE:
			case FURNITURE_TYPE.CHAIR.CODE:
			case FURNITURE_TYPE.TABLE.CODE:
				if (Math.min(x, x+width) < point.x){
					if (Math.max(x, x+width) > point.x){
						if (Math.min(y, y+height) < point.y){
							if (Math.max(y, y+height) > point.y){
								bool = true;
							}
						}
					}
				}
				break;
			case FURNITURE_TYPE.LIGHT.CODE:
				var midPoint = {
					x: midX,
					y: midY
				};
				var dist = distanceBetweenPoints(midPoint, point);
				if (dist < (width/2)) bool = true;
			default:
				break;
		}

		return bool;
	}

	/*
		Sets selected to true
	*/
	function select(){
		selected = true;
	}

	/*
		Sets selected to false
	*/
	function deselect(){
		selected = false;
	}

	/*
		Getter for is this piece of furniture is selected
	*/
	function isSelected(){
		return selected;
	}

	/*
		Moves the x,y coordinate of the furniture a set amount (specified in the distance arg)
	*/
	function move(distance){

		// Local Move (DOES take rotation into account)
		x += distance.x;
		y += distance.y;

		// Global Move (DOES NOT take rotation into account)
		updateMidPoints();
	}

	/*
		Scales the height & width of the furniture a set amount (specified by the increment arg)
	*/
	function scale(increment){
		x -= (increment.x/2);
		y -= (increment.y/2);
		width += increment.x;
		height += increment.y;
		updateMidPoints();
	}

	/*
		Increases/decreases the rotation of the furniture (specified by increment var)
	*/
	function rotate(increment){
		rotation += increment;
		// console.log("Current degrees: " + rotation);
	}

	/*
		Returns the midpoint (x,y) of the furniture
	*/
	function getMidPoint(){
		var point = {
			x: midX,
			y: midY
		};

		return point;
	}

	/*
		Recalculates what the midpoint of the furniture would be
	*/
	function updateMidPoints(){
		midX = x + (width/2);
		midY = y + (height/2);
	}

	/*
		Creates a object of this furniture for storing
	*/
	function exportToObj(){
		var me = {
			_type: type,
			_x: x,
			_y: y,
			_width: width,
			_height: height,
			_midX: midX,
			_midY: midY,
			_rotation: rotation,
			_selected: selected
		};

		return me;
	}

	/*
		Restores this furniture from an object in storage
	*/
	function restoreFromObj(obj){
		type = obj._type;
		x = obj._x;
		y = obj._y;
		width = obj._width;
		height = obj._height;
		midX = obj._midX;
		midY = obj._midY;
		rotation = obj._rotation;
		selected = obj._selected;
	}

	init();
}