// Isaiah Smith

"use strict"


// INERNAL
/*
	Sets the cursor when hovering over the canvas based on the tool passed in
*/
function setCanvasCursor(tool){
	var style;

	switch(tool){
		case "draw":
			style = "crosshair";
			break;
		case "select":
			style = "pointer";
			break;
		case "move":
			style = "move";
			break;
		case "resize":
			style = "se-resize";
			break;
		case "rotate":
			style = "progress";
			break;
		default:
			style = "default";
	}

	canvasCursor = style;
}

/*
	Returns the distance between 2 points passed in
*/
function distanceBetweenPoints(pointA, pointB){
	var difX = pointA.x - pointB.x;
	var difY = pointA.y - pointB.y;

	var dxsquared = difX * difX;
	var dysquared = difY * difY;

	var distance = Math.sqrt( dxsquared + dysquared );

	return distance;
}

/*
	Returns a point that is in the middle of 2 points passed in
*/
function midPointBetweenPoints(pointA, pointB){
	var comX = pointA.x + pointB.x;
	var comY = pointA.y + pointB.y;

	var mx = comX/2;
	var my = comY/2;

	var point = {
		x: mx,
		y: my
	};

	return point;
}

/*
	Converts degrees to radians
*/
function getRadians(degrees){
	return degrees * Math.PI/180;
}

/*
	Returns the sign of a number passed in (+/-)
*/
function getSign(number){
	return (number >= 0) ? 1 : -1;
}


// EXTERNAL

/*
	Exports the canvas out as an image in shich the user can choose to save
*/
// Credit: Draw App Asignment
function exportLayout(){
	var data = mainCanvas.toDataURL();
	var windowName = "canvasImage";
	var windowOptions = "left=0,top=0,width=" + CANVAS_WIDTH + ",height=" + CANVAS_HEIGHT +",toolbar=0,resizable=0";
	var myWindow = window.open(data,windowName,windowOptions);
	myWindow.resizeTo(CANVAS_WIDTH, CANVAS_HEIGHT); // needed so Chrome would display image
}

/*
	returns if the element specified has the class specified
*/
// Credit: http://stackoverflow.com/questions/5169017/how-to-remove-class-attribute-from-div
function hasClass(ele,cls) {
    return ele.className.match(new RegExp('(\\s|^)'+cls+'(\\s|$)'));
}

/*
	Adds the class specified to the element specified
*/
// Credit: http://stackoverflow.com/questions/5169017/how-to-remove-class-attribute-from-div
function addClass(ele,cls) {
    if (!hasClass(ele,cls)) ele.className += " "+cls;
}

/*
	Removed the class specified from the element specified
*/
// Credit: http://stackoverflow.com/questions/5169017/how-to-remove-class-attribute-from-div
function removeClass(ele,cls) {
    if (hasClass(ele,cls)) {
        var reg = new RegExp('(\\s|^)'+cls+'(\\s|$)');
        ele.className=ele.className.replace(reg,' ');
    }
}