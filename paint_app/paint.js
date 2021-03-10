/*	
	Quinton Arnaud
	CSC 337
	Homework 9
	JS code for paint app
*/
(function(){
"use strict";

var mouseDown = 0; //flag for mouse being held down or not
var drawingTool = 0; //setting for drawing

window.onload = function() {
	document.getElementById("minussize").onclick = minusSize; //button listeners
	document.getElementById("plussize").onclick = plusSize;

	document.getElementById("pen").onclick = pen;
	document.getElementById("circles").onclick = circles;
	document.getElementById("squares").onclick = squares;
	document.getElementById("lines").onclick = lines;
	document.getElementById("clear").onclick = clear;

	//main canvas
	var canvas = document.getElementById("main");
	canvas.onmousemove = line; 
	canvas.onmousedown = down;
	canvas.onmouseup = mouseUp;
	canvas.onmouseenter = mouseEnter;
	document.onmouseup = mouseUp;

	var ctx = canvas.getContext("2d");
	updateMini(ctx.lineWidth); //update mini canvas for showing what drawing tool will look like

	//color picker
	var canvas = document.getElementById("gradient");
	var ctx = canvas.getContext("2d");
	var gradient = ctx.createLinearGradient(0, 0, 100 ,0); //set up color gradient
	gradient.addColorStop(0, "rgb(255,0,0)");
	gradient.addColorStop(.15, "rgb(255,0,255)");
	gradient.addColorStop(.33, "rgb(0,0,255)");
	gradient.addColorStop(.49, "rgb(0,255,255)");
	gradient.addColorStop(.67, "rgb(0,255,0)");
	gradient.addColorStop(.84, "rgb(255,255,0)");
	gradient.addColorStop(1, "rgb(255,0,0)");
	ctx.fillStyle = gradient;
	ctx.fillRect(0, 0, 100, 100);

	var gradient2 = ctx.createLinearGradient(0, 0, 0, 100); //set up dark to light gradient
	gradient2.addColorStop(0, "rgba(255, 255, 255, 1)");
	gradient2.addColorStop(0.5, "rgba(255, 255, 255, 0)");
	gradient2.addColorStop(0.5, "rgba(0, 0, 0, 0)");
	gradient2.addColorStop(1, "rgba(0, 0, 0, 1)");
	ctx.fillStyle = gradient2;
	ctx.fillRect(0, 0, 100, 100)

	canvas.onmousedown = pickColor; //selects color
}	

function pickColor(event) { //selects color that was clicked on gradient
	var canvas = document.getElementById("gradient");
	var ctx = canvas.getContext("2d");
	let rect = canvas.getBoundingClientRect();
	let data = ctx.getImageData(event.clientX - rect.left, event.clientY - rect.top, 1, 1); //pixel color that mouse clicked on

	var canvas = document.getElementById("main");
	var ctx = canvas.getContext("2d");
	ctx.fillStyle = "rgb("+ data.data[0] +","+ data.data[1] +","+ data.data[2] +")"; //sets fill and stroke of paint tool
	ctx.strokeStyle = "rgb("+ data.data[0] +","+ data.data[1] +","+ data.data[2] +")";

	var canvas = document.getElementById("mini");
	var ctx = canvas.getContext("2d");
	ctx.fillStyle = "rgb("+ data.data[0] +","+ data.data[1] +","+ data.data[2] +")"; //sets fill and stroke for mini preview
	ctx.strokeStyle = "rgb("+ data.data[0] +","+ data.data[1] +","+ data.data[2] +")";

	var ctx = document.getElementById("main").getContext("2d");
	updateMini(ctx.lineWidth); //update mini
}

function mouseUp() { //toggle mouse down
	mouseDown = 0;
}

function mouseEnter() { //function that handles when mouse re-enters canvas while being held down
	if (mouseDown == 1)
	{
		down();
	}
}

function down(event) { //begins path where mouse initially pressed
	mouseDown = 1;
	var canvas = document.getElementById("main");
	var ctx = canvas.getContext("2d");
	ctx.beginPath();
}

function line(event) { //continues path when mouse moves and is held down
	if (mouseDown == 1){
		var canvas = document.getElementById("main");
		var ctx = canvas.getContext("2d");
		let rect = canvas.getBoundingClientRect();
		if (drawingTool == 0) //drawing with mouse
		{
			ctx.lineTo(event.clientX - rect.left, event.clientY - rect.top);
			ctx.stroke();
		}
		else if (drawingTool == 1) //drawing with circles
		{
			let temp = ctx.lineWidth; //this allows the linewidth to set the radius of the circle but not the actual
			ctx.lineWidth = 1;			//line width of the drawing
			ctx.beginPath();
			ctx.arc(event.clientX - rect.left, event.clientY - rect.top, temp, 0, Math.PI * 2);
			ctx.stroke();
			ctx.lineWidth = temp;
		}
		else if (drawingTool == 2) //drawing with rectangles
		{
			let temp = ctx.lineWidth;
			ctx.lineWidth = 1;
			ctx.beginPath();
			ctx.rect(event.clientX - rect.left, event.clientY - rect.top, temp, temp);
			ctx.stroke();
			ctx.lineWidth = temp;
		}
		else if (drawingTool == 3) //placing lines from (0,0) to mouse
		{
			ctx.moveTo(0,0);
			ctx.lineTo(event.clientX - rect.left, event.clientY - rect.top);
			ctx.stroke();
		}
	}
}

function minusSize() { //decrement line width
	var canvas = document.getElementById("main");
	var ctx = canvas.getContext("2d");
	ctx.lineWidth--;
	updateMini(ctx.lineWidth);
}

function plusSize() { //increment line width
	var canvas = document.getElementById("main");
	var ctx = canvas.getContext("2d");
	ctx.lineWidth++;
	updateMini(ctx.lineWidth);
}

function updateMini(size) { //update mini preview canvas
	var canvas = document.getElementById("mini");
	var ctx = canvas.getContext("2d");
	ctx.clearRect(0, 0, canvas.width, canvas.height);

	if (drawingTool == 0)
	{
		ctx.fillRect(25-parseInt(size/2),25-parseInt(size/2),size,size);
	}
	else if (drawingTool == 1)
	{
		let temp = ctx.lineWidth;
		ctx.lineWidth = 1;
		ctx.beginPath();
		ctx.arc(25, 25, size, 0, Math.PI * 2);
		ctx.stroke();
		ctx.lineWidth = temp;
	}
	else if (drawingTool == 2)
	{
		let temp = ctx.lineWidth;
		ctx.lineWidth = 1;
		ctx.strokeRect(25-parseInt(size/2),25-parseInt(size/2),size,size);
		ctx.lineWidth = temp;
	}
	else if (drawingTool == 3)
	{
		ctx.beginPath();
		ctx.moveTo(0,0);
		ctx.lineTo(25, 25);
		ctx.stroke();
	}
}

function pen() { //changing the drawing tool and mini display when a new tool is selected
	drawingTool = 0;
	updateMini(document.getElementById("main").getContext("2d").lineWidth);
}

function circles() {
	drawingTool = 1;
	updateMini(document.getElementById("main").getContext("2d").lineWidth);
}

function squares() {
	drawingTool = 2;
	updateMini(document.getElementById("main").getContext("2d").lineWidth);
}

function lines() {
	drawingTool = 3;
	updateMini(document.getElementById("main").getContext("2d").lineWidth);
}

function clear() { //clears canvas
	var canvas = document.getElementById("main");
	var ctx = canvas.getContext("2d");
	ctx.clearRect(0, 0, canvas.width, canvas.height);
}

})();