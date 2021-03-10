const express = require("express");
const app = express();
var mysql = require('mysql');

app.use(express.static('public'));

var con = mysql.createConnection({
	host: "mysql.allisonobourn.com",
	database: "csc337imdb_small",
	user: "csc337homer",
	password: "d0ughnut",
	debug: "true"
});
console.log("connected");

app.get('/', function (req, res) { 
	res.header("Access-Control-Allow-Origin", "*");
	
	var first = req.query.first;
	var last = req.query.last;
	var kevin = req.query.kevin;
	let id = 0;
	console.log("Connected!");
	con.query("SELECT * FROM roles JOIN actors ON actor_id = id JOIN movies ON movie_id = movies.id WHERE actors.last_name ='"+last+"' AND LEFT(actors.first_name, 1) = '"+first.charAt(0)+"'", 
    function (err, result, fields) {
		if (err) throw err;
		var data = {};
		for (let i = 0; i < result.length; i++)
		{
			if (result[i].first_name.charAt(0) == first.charAt(0))
			{
				console.log("Result: " + result[i].name +","+ result[i].year);
				data[i] = {"name": result[i].name, "year": result[i].year};
			}
		}
		res.send(JSON.stringify(data));
	});	
})

app.listen(3000);