var APIKey = "b256689a198ad99061a8a459cbcc7fcf";

var currentDay = document.getElementById("current-day");
var fiveDay = document.getElementById("5day-results");
var searchFormEl = document.getElementById("search-form");
var city = document.getElementById("city-search");
var currentTemp;
var currentWindSpeed;
var currentHumidity;
var currentUVIndex;


//Gets the search value from local storage
var cityName = localStorage.getItem("inputValue");

//Populates the search input
city.value = cityName;

//Function to search the weather API
function searchWeather(){

    var cityCodeUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=${APIKey}`;

    fetch(cityCodeUrl)
        .then(function(response) {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(function (data) {
            for (var i = 0; i < data.length; i++) {
                var lat = data[i].lat;
                var lon = data[i].lon;
            }
            return fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${APIKey}`);
        })
        .then(function (response) {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(function (data) {
            console.log(data);

            console.log(data.current.temp);
            console.log(data.current.wind_speed);
            console.log(data.current.humidity);
            console.log(data.current.uvi);

            // currentTemp = data.current.temp;
            // currentWindSpeed = data.current.wind_speed;
            // currentHumidity = data.current.humidity;
            // currentUVIndex = data.current.uvi;
        })
    };
;

// currentTemp = data.current.temp;
// currentWindSpeed = data.current.wind_speed;
// currentHumidity = data.current.humidity;
// currentUVIndex = data.current.uvi;

searchWeather();

console.log(currentTemp);
console.log(currentWindSpeed);
console.log(currentHumidity);
console.log(currentUVIndex);

// TODO: Create function to print data to 
