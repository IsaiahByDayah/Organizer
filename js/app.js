// Isaiah Smith

"use strict"

window.onload = init;

/*
	The init function runs the setup needs of the app:
		- Defines global variables
		- Sets initial size of canvas
		- Sets up event listeners for buttons
		- Initiates the update process for the canvas
*/
function init(){
	// console.log("App 'init' called.");

	savedLayouts = JSON.parse(localStorage.getItem('saved_layouts')) || {};
	// console.log(JSON.stringify(savedLayouts));

	// Instantiate Globals
	mainCanvas = document.getElementById("mainCanvas");
	mainCanvas.width = CANVAS_WIDTH;
	mainCanvas.height = CANVAS_HEIGHT;

	mainCtx = mainCanvas.getContext('2d');

	layouts = {
		"layout_1" : new Layout(1),
		"layout_2" : new Layout(2),
		"layout_3" : new Layout(3)
	};

	currentLayout = layouts.layout_1;

	tools = {
		"draw" : new DrawTool(),
		"select" : new SelectTool(),
		"move" : new MoveTool(),
		"resize" : new ResizeTool(),
		"rotate" : new RotateTool()
	};

	currentTool = tools.draw;
	canvasCursor = "crosshair";

	currentFurniture = FURNITURE_TYPE.CHAIR;


	// Set Listeners
	mainCanvas.addEventListener("mousedown", function(e){
		currentTool.mousedown(e);
		// console.log("down");
	});

	mainCanvas.addEventListener("mouseup", function(e){
		currentTool.mouseup(e);
		// console.log("up");
	});

	mainCanvas.addEventListener("mouseleave", function(e){
		currentTool.mouseleave(e);
		// console.log("leave");
	});

	mainCanvas.addEventListener("mousemove", function(e){
		currentTool.mousemove(e);
		// console.log("move");
	});

	document.getElementById("layoutsPanel").addEventListener("click", function(e){
		var target = e.target;

		if (target.attributes.layout == undefined) return;

		currentLayout = layouts[target.attributes.layout.value];
		currentLayout.setSelected();
		var layoutButtons = document.getElementsByClassName("layoutButton");
		for (var i = 0, len = layoutButtons.length; i < len; i++){
			removeClass(layoutButtons[i], "selected");
		}
		addClass(target, "selected");

		// console.log("Current Layout: " + currentLayout.getDescription());
	});

	document.getElementById("refreshButton").addEventListener("click", function(e){
		currentLayout.clearFurniture();
		// console.log("Canvas cleared.");
	});

	document.getElementById("exportButton").addEventListener("click", function(e){
		exportLayout();
		// console.log("Layout saved.");
	});

	document.getElementById("saveButton").addEventListener("click", function(e){
		// console.log(JSON.stringify(savedLayouts));
		// console.log(currentLayout.exportToObj());
		savedLayouts.latest = currentLayout.exportToObj();
		// console.log(JSON.stringify(savedLayouts));
		localStorage.setItem('saved_layouts', JSON.stringify(savedLayouts));
	});

	document.getElementById("restoreButton").addEventListener("click", function(e){
		if (localStorage.getItem('saved_layouts') != undefined){
			savedLayouts = JSON.parse(localStorage.getItem('saved_layouts'));
		}

		if (savedLayouts.latest != undefined){
			currentLayout.restoreFromObj(savedLayouts.latest);
		}
	});

	document.getElementById("deleteButton").addEventListener("click", function(e){
		if (currentLayout.removeFurniture(selectedFurniture)){
			// console.log("Furniture deleted.");
		}
		else {
			// console.warn("Furniture could not be deleted.");
		}
	});

	document.getElementById("toolsPanel").addEventListener("click", function(e){
		var target;

		// Handle div OR icon clicked
		if (hasClass(e.target, "fa")){
			target = e.target.parentElement;
		}
		else {
			target = e.target;
		}

		if (target.attributes.tool == undefined) return;

		currentTool = tools[target.attributes.tool.value];
		var toolButtons = document.getElementsByClassName("toolButton");
		for (var i = 0, len = toolButtons.length; i < len; i++){
			removeClass(toolButtons[i], "selected");
		}
		addClass(target, "selected");
		setCanvasCursor(target.attributes.tool.value);

		// console.log("Current Tool: " + currentTool.getDescription());
	});

	document.getElementById("furniturePanel").addEventListener("click", function(e){
		var target = e.target;

		if (target.attributes.furniture == undefined) return;

		currentFurniture = FURNITURE_TYPE[target.attributes.furniture.value];
		var toolButtons = document.getElementsByClassName("furnitureButton");
		for (var i = 0, len = toolButtons.length; i < len; i++){
			removeClass(toolButtons[i], "selected");
		}
		addClass(target, "selected");

		// console.log("Current Furniture: " + currentFurniture.NAME);
	});

	document.getElementById("setButton").addEventListener("click", function(e){

		var cwidth = document.getElementById("canvasWidth").value;
		var cheight = document.getElementById("canvasHeight").value;

		mainCanvas.width = cwidth;
		mainCanvas.height = cheight;

		// console.log("Canvas resized!");
	});

	// Set Canvas Update
	update();
}

/*
	This function does the following:
		- Asks the current layout to draw itself to the canvas
		- Asks the tools to draw what they might need to draw
		- Sets the cursor when hovering over the canvas
*/
function update(){
	requestAnimationFrame(update);

	currentLayout.draw();

	for (var tool in tools){
		tools[tool].draw();
	}

	mainCanvas.style.cursor = canvasCursor;
}