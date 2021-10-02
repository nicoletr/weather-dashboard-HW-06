var APIKey = "b256689a198ad99061a8a459cbcc7fcf";

var currentDay = document.getElementById("current-day");
var fiveDay = document.getElementById("5day-results");
var searchFormEl = document.getElementById("search-form");
var city = document.getElementById("city-search");

//Gets the search value from local storage
var searchValue = localStorage.getItem("inputValue");

//Populates the search input
city.value = searchValue;


// var url = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${APIKey}`;

var url = `https://api.openweathermap.org/data/2.5/onecall?lat=31.95&lon=115.86&appid=${APIKey}`;

fetch(url)
    .then(function(response) {
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        console.log(response);
        return response.json();
    })
    .then(function (data) {
        console.log(data)
;    });
