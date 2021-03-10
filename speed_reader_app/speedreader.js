/*	
	Quinton Arnaud
	CSC 337
	Homework 4
	JS code for speedreader.html
*/
(function() {
"use strict";

var text = [];
var timerID;
var index = 0;

window.onload = function() {
	//disable stop button at start up
	document.getElementById("stop").disabled = true;

	//set up event handlers
	var stopButton = document.getElementById("stop");
	stopButton.onclick = stopClick;

	var startButton = document.getElementById("start");
	startButton.onclick = startClick;

	var sizeRadioMed = document.getElementById("medSize");
	sizeRadioMed.onclick = updateAppearance;

	var sizeRadioBig = document.getElementById("bigSize");
	sizeRadioBig.onclick = updateAppearance;

	var sizeRadioBigger = document.getElementById("biggerSize");
	sizeRadioBigger.onclick = updateAppearance;

	var wpmDropdown = document.getElementById("wpm");
	wpmDropdown.onclick = updateAppearance;
};

function stopClick() { //what happens on stop click
	document.getElementById("stop").disabled = true;
	document.getElementById("start").disabled = false;
	var disptxt = document.getElementById("displayText");
	disptxt.innerHTML = " ";
	clearInterval(timerID); //stop the timer
	index = 0; //reset place in displaying the text
}

function startClick() {//what happens on start click

	document.getElementById("stop").disabled = false;
	document.getElementById("start").disabled = true;

	var testArea = document.getElementById("txtarea");
	var temp = testArea.value.split(/[ \t\n]+/);

	text = [];
	for (var i = 0; i < temp.length; i++) //go through all the words
	{
		if (/[!"#$%'()*,-./:;?]/.test(temp[i].slice(-1))) //if last letter is punctiation
		{
			text.push(temp[i].slice(0, -1)); //remove last letter and add word twice
			text.push(temp[i].slice(0, -1));
		}
		else
		{
			text.push(temp[i]);//add word once
		}
	}

	timerID = setInterval(printWord, parseInt(document.getElementById("wpm").value)); //set up timer
}

function updateAppearance() {
	if (document.getElementById("start").disabled)
	{
		clearInterval(timerID);
		timerID = setInterval(printWord, parseInt(document.getElementById("wpm").value)); //if display is running, update speed
	}

	if (document.getElementById("medSize").checked) //update fontsize
	{
		document.getElementById("displayText").style.fontSize = "36pt";
	}
	else if (document.getElementById("bigSize").checked)
	{
		document.getElementById("displayText").style.fontSize = "48pt";
	}
	else if(document.getElementById("biggerSize").checked)
	{
		document.getElementById("displayText").style.fontSize = "60pt";
	}
}

function printWord() {
	var disptxt = document.getElementById("displayText"); //print one word ig not at end of string list
	if (index < text.length)
	{
		disptxt.innerHTML = text[index];
		index++;
	}
	else
	{
		disptxt.innerHTML = " "; 
		stopClick();
	}
}

})();