const APIKey = "b256689a198ad99061a8a459cbcc7fcf";

const currentDay = document.getElementById("today-forecast");
const searchFormEl = document.getElementById("search-form");
const city = document.getElementById("city-search");

//Gets the search value from local storage
const cityName = localStorage.getItem("inputValue");
//Populates the search input
city.value = cityName;


function currentWeatherApi(cityName){
    
    return fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${APIKey}`)
    .then(function(response) {
        return response.json();
    });
};

function oneCallApi(longitude, latitude){
    return fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude={part}&appid=${APIKey}`)
    .then(function(response){
        return response.json()
    });
};

//Converts temp to celcius
function toCelcius(kelvin){
    return kelvin - 273.15;
};

//Function to search the weather API
function searchWeather(cityName){

    return currentWeatherApi(cityName)
        .then(function(currentWeatherResponse){
            //gets city coordinates
            const coord = currentWeatherResponse.coord;
        
            //then we use the coordinates to call the onecallAPI
            return oneCallApi(coord.lon, coord.lat);
        }
)};

searchWeather(cityName)
    .then(function(weatherData){
        //once we have the result
        //we want to show the result inside our dashboard
        //2 parts
        //1. todays forecast
        var currentDayList = document.createElement("ul");
        currentDayList.className = "today-details";
        //temp
        var currentTemp = document.createElement("li");
        currentTemp.className = "today-temp";
        currentTemp.textContent = "Temp: " + toCelcius(weatherData.current.temp).toFixed(2) + ' C';

        //wind
        var currentWind = document.createElement("li");
        currentWind.className = "today-wind";
        currentWind.textContent = "Wind Speed: " + weatherData.current.wind_speed;

        //humidity
        var currentHumidity = document.createElement("li");
        currentHumidity.className = "today-humidity";
        currentHumidity.textContent = "Humidity: " + weatherData.current.humidity + "%";

        //uv index
        var currentUV = document.createElement("li");
        currentUV.className = "today-uv";
        currentUV.textContent = "UV Index: " + weatherData.current.uvi;


        currentDayList.appendChild(currentTemp);
        currentDayList.appendChild(currentWind);
        currentDayList.appendChild(currentHumidity);
        currentDayList.appendChild(currentUV);
        currentDay.appendChild(currentDayList);
        //2. 5 day forecast
        //temp
        //icon
        //wind
        //humidity

        //5 days forecast
        //uvi of todays weather
    })
    ;

// currentTemp = data.current.temp;
// currentWindSpeed = data.current.wind_speed;
// currentHumidity = data.current.humidity;
// currentUVIndex = data.current.uvi;

// searchWeather();

// console.log(currentTemp);
// console.log(currentWindSpeed);
// console.log(currentHumidity);
// console.log(currentUVIndex);

// TODO: Create function to print data to 
