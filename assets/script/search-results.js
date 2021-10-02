var APIKey = "b256689a198ad99061a8a459cbcc7fcf";

var currentDay = document.getElementById("current-day");
var fiveDay = document.getElementById("5day-results");
var searchFormEl = document.getElementById("search-form");
var city = document.getElementById("city-search");

//Gets the search value from local storage
var cityName = localStorage.getItem("inputValue");

//Populates the search input
city.value = cityName;
console.log (cityName);

var cityCodeUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=${APIKey}`
// var url = `https://api.openweathermap.org/data/2.5/onecall?lat=${data.lat}&lon=${data.lon}&appid=${APIKey}`;


fetch(cityCodeUrl)
    .then(function(response) {
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        console.log(response);
        return response.json();
    })
    .then(function (data) {
        for (var i = 0; i < data.length; i++) {
            console.log(data[i].lat);
            console.log(data[i].lon);

            var lat = data[i].lat;
            var lon = data[i].lon;
        }

        console.log(lat);
        console.log(lon);

        return fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${APIKey}`);
    })
    .then(function (response) {
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        console.log(response);
        return response.json();
    })
    .then(function (data) {
        console.log(data);
    })
;


// fetch(url)
//     .then(function(response) {
//         if (!response.ok) {
//             throw new Error(`HTTP error! status: ${response.status}`);
//         }
//         console.log(response);
//         return response.json();
//     })
//     .then(function (data) {
//         console.log(data)
// ;    });
