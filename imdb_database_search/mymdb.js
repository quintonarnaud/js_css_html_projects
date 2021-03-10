"use strict";

window.onload = function() {
	document.getElementById("go").onclick = button;
	document.getElementById("go2").onclick = button;
}

function button() {
	let first = document.getElementById("firstname").value;
	let last = document.getElementById("lastname").value;

	let url = "http://localhost:3000/?first="+first+"&last="+last+"&kevin=no";

	fetch(url)
	.then(checkStatus)
	.then(function(responseText) {
		var obj = JSON.parse(responseText);

		document.getElementById("header").innerHTML = "";
		document.getElementById("change").innerHTML = "";
		var imgg = document.getElementById("kev");
		imgg.parentNode.removeChild(imgg);

		//obj = obj.sort(compare);
		for (let i = 0; i < Object.keys(obj).length; i++)
		{
			let table = document.createElement("h2");
			table.innerHTML = obj[i].name +" "+ obj[i].year;
			document.getElementById("test").appendChild(table);
		}
	})
	.catch(function(error)
	{
		console.log(error);
	});
}

function checkStatus(response) {
	return response.text();
}

function compare(a,b) {
	const yearA = parseInt(a.year);
	const yearB = parseInt(b.year);
	if (yearA > yearB) { 
		return 1; 
	}
	if (yearB > yearA) { 
		return -1; 
	}
	return 0;
}

function button2() {
	let namefirst = document.getElementById("firstname2").value;
	let namelast = document.getElementById("lastname2").value;
}