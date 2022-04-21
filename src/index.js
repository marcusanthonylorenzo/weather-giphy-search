// Import statements updated to reflect new paths and also import GiphyService.
import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import WeatherService from './js/weather-service.js';
import GiphyService from './js/giphy-service';


// clearFields() updated to reflect changed HTML.
function clearFields() {
  $('#location').val("");
  $('.show-errors').text("");
}

// The three remaining UI functions make our code more modular. We'll discuss them soon.

function displayWeatherDescription(description) {
  $('.weather-description').text(`The weather is ${description}!`);
}

function displayGif(response) {
  const url = response.data[0].images.downsized.url;
  $('.show-gif').html(`<img src='${url}'>`);
}

function displayErrors(error) {
  $('.show-errors').text(`${error}`);
}

$(document).ready(function() {
  $('#weatherLocation').click(function() {
    let city = $('#location').val();
    clearFields();
    WeatherService.getWeather(city)
      .then(function(weatherResponse) {
        console.table(weatherResponse);
        if (weatherResponse instanceof Error) {
          throw Error(`OpenWeather API error: ${weatherResponse.message}`);
        }
        const weatherDescription = weatherResponse.weather[0].description;
        displayWeatherDescription(weatherDescription);
        return GiphyService.getGif(weatherDescription);
      })
      .then(function(giphyResponse) {
        if (giphyResponse instanceof Error) {
          throw Error(`Giphy API error: ${giphyResponse.message}`);
        }
        displayGif(giphyResponse);
      })
      .catch(function(error) {
        displayErrors(error.message);
      });
  });
});

/*
Object
base: "stations"
clouds: {all: 75}
cod: 200
coord: {lon: -157.8583, lat: 21.3069}
dt: 1650562149
id: 5856195
main: {temp: 295.05, feels_like: 295.46, temp_min: 294.2, temp_max: 295.63, pressure: 1018, …}
name: "Honolulu"
sys: {type: 1, id: 7878, country: 'US', sunrise: 1650557233, sunset: 1650603153}
timezone: -36000
visibility: 10000
weather: Array(1)
0: {id: 803, main: 'Clouds', description: 'broken clouds', icon: '04d'}
length: 1
[[Prototype]]: Array(0)

Object
base: "stations"
clouds: {all: 40}
cod: 200
coord: {lon: -122.3321, lat: 47.6062}
dt: 1650562286
id: 5809844
main: {temp: 283.48, feels_like: 282.61, temp_min: 281.86, temp_max: 284.86, pressure: 1007, …}
name: "Seattle"
sys: {type: 2, id: 2004026, country: 'US', sunrise: 1650546537, sunset: 1650596799}
timezone: -25200
visibility: 10000
weather: Array(1)
  > 0: {id: 802, main: 'Clouds', description: 'scattered clouds', icon: '03d'}
*/