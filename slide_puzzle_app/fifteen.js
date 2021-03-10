/*	
	Quinton Arnaud
	CSC 337
	Homework 5
	JS code for fifteen.html/fifteen.css
*/
(function() {
"use strict";

var emptySquareArea; //keep track of empty square locations
var emptySquareValue;

window.onload = function() {
	var shuf = document.getElementById("shufflebutton");
	shuf.onclick = shuffle;

	initialize(); //sets up grid
}

function initialize() {

	let count = 1; //for squares innerHTML
	let puzzlearea = document.getElementById("puzzlearea");

	for (let i = 0; i < 4; i++)
	{
		for (let j = 0; j < 4; j++)
		{
			if (j == 3 && i == 3) //if empty square (last square)
			{
				emptySquareArea = GridArea(""+i+j);
				emptySquareValue = "" + i + j;
			}
			else
			{
				let square = document.createElement("div");
				square.style.gridArea = GridArea(""+i+j); //returns string "one"-"fifteen" relating to grid area css property
				square.className = "square";
				square.id = ""+i + j;
				square.onclick = moveSquare;
				square.innerHTML = count;
				square.style.backgroundImage = "url(koolkat.jpg)";
				let backgroundPos = ""+ (-100 * j) + "px " + (-100 * i) + "px"; //creating backround image for each square based on i/j (x/y)
				square.style.backgroundPosition = backgroundPos;
				count++;
				puzzlearea.appendChild(square); //add div to DOM tree under puzzleArea
			}
		}

	}
}

function GridArea(x) { //based on a squares coordinates will give a string relating to the gridAreas name

	if (x[0] == 0)
	{
		if (x[1] == 0)
		{
			return "one";
		}
		else if (x[1] == 1)
		{
			return "two";
		}
		else if (x[1] == 2)
		{
			return "three";
		}
		else if (x[1] == 3)
		{
			return "four";
		}
	}

	else if (x[0] == 1)
	{
		if (x[1] == 0)
		{
			return "five";
		}
		else if (x[1] == 1)
		{
			return "six";
		}
		else if (x[1] == 2)
		{
			return "seven";
		}
		else if (x[1] == 3)
		{
			return "eight";
		}
	}

	else if (x[0] == 2)
	{
		if (x[1] == 0)
		{
			return "nine";
		}
		else if (x[1] == 1)
		{
			return "ten";
		}
		else if (x[1] == 2)
		{
			return "eleven";
		}
		else if (x[1] == 3)
		{
			return "twelve";
		}
	}

	else if (x[0] == 3)
	{
		if (x[1] == 0)
		{
			return "thirteen";
		}
		else if (x[1] == 1)
		{
			return "fourteen";
		}
		else if (x[1] == 2)
		{
			return "fifteen";
		}
		else if (x[1] == 3)
		{
			return "sixteen";
		}
	}
	return null;
}

function moveSquare() { //moves clicked square to the empty square if empty square is adjacent

	if ( ( parseInt(this.id[0]) + 1 == parseInt(emptySquareValue[0]) && //if bot square is empty
		   parseInt(this.id[1]) == parseInt(emptySquareValue[1]) ) ||

		 ( parseInt(this.id[0]) == parseInt(emptySquareValue[0]) && //if right square is empty
		   parseInt(this.id[1]) + 1 == parseInt(emptySquareValue[1]) ) ||

		 ( parseInt(this.id[0]) - 1 == parseInt(emptySquareValue[0]) &&  //if top square is empty
		   parseInt(this.id[1]) == parseInt(emptySquareValue[1]) ) ||

		 ( parseInt(this.id[0]) == parseInt(emptySquareValue[0]) && //if left square is empty
		   parseInt(this.id[1]) - 1 == parseInt(emptySquareValue[1]) ) )
	{
		var temp1 = this.id; //swap locations of empty square and clicked square
		var temp2 = this.style.gridArea;

		this.id = emptySquareValue;
		this.style.gridArea = emptySquareArea;

		emptySquareValue = temp1;
		emptySquareArea = temp2;
	}
}

function shuffle() { //clicks a random adjacent square to the empty square
		
	for (let i = 0; i < 1000; i++) 
	{
		var neighbors = [];

		if (parseInt(emptySquareValue[0]) + 1 <= 3) //will push to neighbors if valid adjacent square
		{
			let x = parseInt(emptySquareValue[0]) + 1;
			neighbors.push(""+ x + emptySquareValue[1]);
		}
		
		if (parseInt(emptySquareValue[1]) + 1 <= 3)
		{
			let x = parseInt(emptySquareValue[1]) + 1;
			neighbors.push(""+ emptySquareValue[0] + x);
		}

		if (parseInt(emptySquareValue[0]) - 1 >= 0)
		{
			let x = parseInt(emptySquareValue[0]) - 1;
			neighbors.push(""+ x + emptySquareValue[1]);
		}

		if (parseInt(emptySquareValue[1]) - 1 >= 0)
		{
			let x = parseInt(emptySquareValue[1]) - 1;
			neighbors.push(""+ emptySquareValue[0] + x);
		}
		//gets random index from neighbors and gets that square element
		var square = document.getElementById(neighbors[parseInt(Math.random()*neighbors.length)]); 
		square.click(); //click square
	}
}

})();