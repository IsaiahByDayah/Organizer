// Isaiah Smith

"use strict"

function Layout(i){

	// Publicize
	this.getFurniture = getFurniture;
	this.addFurniture = addFurniture;
	this.removeFurniture = removeFurniture;
	this.draw = draw;
	this.getDescription = getDescription;
	this.clearFurniture = clearFurniture;
	this.selectFurnitureAtPoint = selectFurnitureAtPoint;
	this.exportToObj = exportToObj;
	this.restoreFromObj = restoreFromObj;
	this.setSelected = setSelected;


	// Variables
	var layoutIndex = i;

	var furniture;


	//Functions
	/*
		initializes the layout's properties
	*/
	function init(){
		furniture = [];
	}

	/*
		Getter for the list of furniture in the layout
	*/
	function getFurniture(){
		return furniture;
	}

	/*
		Adds a piece of furniture to the list.
		Returns true that a piece of furniture was added.
	*/
	function addFurniture(newFurniture){
		furniture.push(newFurniture);
		return true;
	}

	/*
		Removes a piece of furniture from the list.

		Returns true if the piece of furniture was removed, false otherwise.
	*/
	function removeFurniture(oldFurniture){
		if (oldFurniture == undefined) return false;

		var index = furniture.indexOf(oldFurniture);
		if (index >= 0){
			furniture.splice(index, 1);
			selectedFurniture = undefined;
			return true;
		}

		return false;
	}

	/*
		Tells each piece of furniture in the layout to draw themselves.
	*/
	function draw(){
		mainCtx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

		for (var i = 0, len = furniture.length; i < len; i++){
			// if (furniture[i].isVisible()) furniture[i].draw();
			furniture[i].draw();
		}
	}

	/*
		Getter for a string description of the layout
	*/
	function getDescription(){
		var str = "Layout " + layoutIndex + " containing " + furniture.length + " pieces of furniture.";

		return str;
	}

	/*
		Removes all pieces of furniture from the layout.
	*/
	function clearFurniture(){
		furniture = [];
		selectedFurniture = undefined;
	}

	/*
		Sets the most recent piece of furniture at the point specified to be the "selected" furniture
	*/
	function selectFurnitureAtPoint(point){
		selectedFurniture = undefined;

		var furnitureFound = false;

		for (var i = 0, len = furniture.length; i < len; i++){
			furniture[i].deselect();
			if (furniture[i].isAtPoint(point)){
				selectedFurniture = furniture[i];
				furnitureFound = true;
			}
		}

		if (furnitureFound) selectedFurniture.select();

		return furnitureFound;
	}

	/*
		Creates a object of this layout for storing
	*/
	function exportToObj(){
		var myFurniture = [];
		for (var i = 0, len = furniture.length; i < len; i++){
			myFurniture.push(furniture[i].exportToObj());
		}

		var me = {
			_furniture: myFurniture
		};

		return me;
	}

	/*
		Restores this layout from an object in storage
	*/
	function restoreFromObj(obj){
		furniture = [];

		for (var i = 0, len = obj._furniture.length; i < len; i++){
			var f = new Furniture();
			f.restoreFromObj(obj._furniture[i]);

			furniture.push(f);

			setSelected();
		}
	}

	function setSelected(){
		for (var i = 0, len = furniture.length; i < len; i++){
			if (furniture[i].isSelected()) {
				selectedFurniture = furniture[i];
			}
		}
	}

	init();
}