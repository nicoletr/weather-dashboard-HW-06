const APIKey = "b256689a198ad99061a8a459cbcc7fcf";

const currentDay = document.getElementById("today-forecast");
const searchFormEl = document.getElementById("search-form");
const city = document.getElementById("city-search");

//Gets the search value from local storage
const cityName = localStorage.getItem("inputValue");
//Populates the search input
city.value = cityName;


function cityWeatherApi(cityName){
    
    return fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${APIKey}`)
    .then(function(response) {
        return response.json();
    });
};

function oneCallApi(longitude, latitude){
    return fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude={part}&appid=${APIKey}`)
    .then(function(response){
        return response.json()
    })
};

//Converts temp to celcius
function toCelcius(kelvin){
    return kelvin - 273.15;
};

//Function to search the weather API
function searchWeather(cityName){

    return cityWeatherApi(cityName)
        .then(function(currentWeatherResponse){
            //gets city coordinates
            const coord = currentWeatherResponse.city.coord;
        
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
        const cityNameEl = document.createElement("h3");
        cityNameEl.textContent = "Today's forecast for " + cityName;

        const currentDayList = document.createElement("ul");
        currentDayList.className = "today-details";
        //temp
        const currentTemp = document.createElement("li");
        currentTemp.className = "today-temp";
        currentTemp.textContent = "Temp: " + toCelcius(weatherData.current.temp).toFixed(2) + ' C';

        //wind
        const currentWind = document.createElement("li");
        currentWind.className = "today-wind";
        currentWind.textContent = "Wind Speed: " + weatherData.current.wind_speed;

        //humidity
        const currentHumidity = document.createElement("li");
        currentHumidity.className = "today-humidity";
        currentHumidity.textContent = "Humidity: " + weatherData.current.humidity + "%";

        //uv index
        const currentUV = document.createElement("li");
        currentUV.className = "today-uv";
        currentUV.textContent = "UV Index: " + weatherData.current.uvi;


        currentDayList.appendChild(currentTemp);
        currentDayList.appendChild(currentWind);
        currentDayList.appendChild(currentHumidity);
        currentDayList.appendChild(currentUV);

        currentDay.appendChild(cityNameEl);
        currentDay.appendChild(currentDayList);

        //2. 5 day forecast
        //run a loop on the daily array starting from [1]
        //date
        // daily[i].dt
        //temp
        // toCelcius(daily[1].temp.day)toFixed(2)
        //icon
        // daily[i].weather.0.icon
        //wind
        // daily[i].wind_speed
        //humidity
        // daily[i].humidity

        //5 days forecast
        //uvi of todays weather
    })
    ;

