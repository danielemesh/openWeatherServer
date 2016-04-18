var express = require('express');
var http    = require('http');
var router  = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
	res.render('index', {title: 'Express'});
});

router.get('/:city_id', function (req, res, next) {
	// Issue an API call to get city weather by ID
	getWeather(req.params.city_id, res);

});

function parseWeather(weatherResponse, res) {
	var weatherData = '';

	weatherResponse.on('data', function (chunk) {
		weatherData += chunk;
	});

	weatherResponse.on('end', function () {
		res.end(weatherData);
	});
}

function getWeather(cityID, res) {
	const API_KEY      = 'c5ac0098c8c7b7a5512b4679a5b11f9f';
	const BASE_API_URL = 'http://api.openweathermap.org/data/2.5/';
	const FORECAST_URL = BASE_API_URL + '/forecast/daily?APPID=' + API_KEY + '&units=metric&cnt=6&id=';

	var options = FORECAST_URL + cityID;

	http.request(options, function (weatherResponse) {
		parseWeather(weatherResponse, res);
	}).end();
}

module.exports = router;
