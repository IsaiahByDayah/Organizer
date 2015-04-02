"use strict"

/*
	A JS file that holds all the global scope variables used within the app.

	Contants follow the ALL CAPS naming convention
*/

// CONSTANTS

var CANVAS_WIDTH = 520;
var CANVAS_HEIGHT = 480;

var FURNITURE_HIGHLIGHT_COLOR = "#2454E2";
var FURNITURE_HIGHLIGHT_WIDTH = 5;

var FURNITURE_TYPE = {
	CHAIR	: {
		CODE: 0,
		COLOR: "#588400",
		NAME : "Chair"
	},
	TABLE 	: {
		CODE: 1,
		COLOR: "#C62907",
		NAME : "Table"
	},
	BED 	: {
		CODE: 2,
		COLOR: "#6D0438",
		NAME : "Bed"
	},
	LIGHT 	: {
		CODE: 3,
		COLOR: "#ED9D00",
		NAME : "Light"
	}
};


// GLOBALS
var mainCanvas;
var mainCtx;
var canvasCursor;

var layouts;
var tools;
var furnitures;

var currentLayout;
var currentTool;
var currentFurniture;

var selectedFurniture;

var savedLayouts;