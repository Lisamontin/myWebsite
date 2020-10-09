const express = require('express');
const https = require("https");

const app = express();

app.get("/", function(req, res){

  https.get()
  res.send("server is up and running")
})


var unirest = require("unirest");

var req = unirest("GET", "https://quotes15.p.rapidapi.com/quotes/random/");

req.query({
	"language_code": "en"
});

req.headers({
	"x-rapidapi-host": "quotes15.p.rapidapi.com",
	"x-rapidapi-key": "8ccddf7a83msh05dc483f5733658p129cf3jsn109e3a087bcd",
	"useQueryString": true
});


req.end(function (res) {
	if (res.error) throw new Error(res.error);

	console.log(res.body);
});


// document.getElementById('display').innerHTML = '<h1>A programmer</h1>';


app.listen(3000, function(){
  console.log('Server is running on 3000')
})