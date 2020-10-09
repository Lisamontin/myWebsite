const express = require('express');
const https = require("https");

const app = express();
//Add package manager (Browserify or webpack)


app.get("/", function(req, res) {

  const url = 'https://api.openweathermap.org/data/2.5/weather?q=stockholm&units=metric&appid=a0d544ec0ba958cdeb4120b981dbc948';

  https.get(url, function(response) {
    console.log(response.statusCode, 'statuscode logged here!')

    response.on('data', function(data) {
      const weatherStockholm = JSON.parse(data);
      const temp = weatherStockholm.main.temp;
      const weatherDescriprion = weatherStockholm.weather[0].description;
      console.log(temp)
      res.write(`The temperature in Stockholm is ${temp} degrees Celcius.`)
      res.send();
    });
  });

});








//// QUOTES FROM RAPID API USING UNIREST ////
// var unirest = require("unirest");

// var req = unirest("GET", "https://quotes15.p.rapidapi.com/quotes/random/");

// req.query({
// 	"language_code": "en"
// });
// console.log(req);

// req.headers({
// 	"x-rapidapi-host": "quotes15.p.rapidapi.com",
// 	"x-rapidapi-key": "8ccddf7a83msh05dc483f5733658p129cf3jsn109e3a087bcd",
// 	"useQueryString": true
// });

// req.end(function (res) {
// 	if (res.error) throw new Error(res.error);

//   // console.log(res.body);
//   let quoteContent = res.body.content;
//   console.log(quoteContent);
// });

///////////////////////////////////////////




// document.getElementById('display').innerHTML = '<h1>A programmer</h1>';


app.listen(3000, function(){
  console.log('Server is running on 3000')
})