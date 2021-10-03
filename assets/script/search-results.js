const APIKey = "b256689a198ad99061a8a459cbcc7fcf";

const currentDay = document.getElementById("today-weather");
const forecastEl = document.getElementById("forecast-cards");
const searchFormEl = document.getElementById("search-form");
const city = document.getElementById("city-search");
const searchBtn = document.getElementById("search-btn");

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
        console.log(weatherData);
        //Todays forecast
        //TODO:Convert input text to inital caps
        const cityNameEl = document.createElement("h3");
        cityNameEl.textContent = cityName + moment().format(" dddd, MMM Do YYYY");

        const currentIcon = document.createElement("img");
        currentIcon.className = "current-icon"; 
        const currentIconImage = weatherData.current.weather[0].icon;
        currentIcon.setAttribute("src", `https://openweathermap.org/img/wn/${currentIconImage}@2x.png`);

        const currentDayList = document.createElement("ul");
        currentDayList.className = "today-details";
        //temp
        const currentTemp = document.createElement("li");
        currentTemp.className = "today-temp";
        currentTemp.textContent = "Temp: " + toCelcius(weatherData.current.temp).toFixed(2) + ' °C';

        //wind
        const currentWind = document.createElement("li");
        currentWind.className = "today-wind";
        currentWind.textContent = "Wind Speed: " + weatherData.current.wind_speed + " km/s";

        //humidity
        const currentHumidity = document.createElement("li");
        currentHumidity.className = "today-humidity";
        currentHumidity.textContent = "Humidity: " + weatherData.current.humidity + "%";

        //uv index
        const currentUV = document.createElement("li");
        currentUV.className = "today-uv";
        const uviValue = document.createElement("span");
        uviValue.textContent = weatherData.current.uvi;
        currentUV.textContent = "UV Index: ";

        //uvi colour coding
        const uviRating = weatherData.current.uvi;
        if (uviRating < 2){
            uviValue.classList.add("low-uvi")
        } else if (uviRating >= 3 && uviRating <= 5){
            uviValue.classList.add("mod-uvi")
        } else if (uviRating >= 6 && uviRating <= 7){
            uviValue.classList.add("high-uvi")
        } else if (uviRating >= 8 && uviRating <= 10){
            uviValue.classList.add("very-high-uvi")
        } else {
            uviValue.classList.add("extr-high-uvi")
        }

        currentDayList.appendChild(currentTemp);
        currentDayList.appendChild(currentWind);
        currentDayList.appendChild(currentHumidity);
        currentDayList.appendChild(currentUV);
        currentUV.appendChild(uviValue);

        currentDay.appendChild(cityNameEl);
        currentDay.appendChild(currentIcon)
        currentDay.appendChild(currentDayList);
    })


    //5 day forecast
    //run a loop on the daily array starting from [1] as index 0 is current day
    searchWeather(cityName)
    .then(function(weatherData) {
        console.log(weatherData);
        for(let i = 1; i < 6; i++){
        //Create a card element
        const forecastContainer = document.createElement("div");
        forecastContainer.className = "col-12 col-md col-lg card forecast";
        forecastContainer.setAttribute("id", i);
        //Create a heading element with forecast day
        const forecastDay = document.createElement("h4");
        const forecastTimestamp = weatherData.daily[i].dt;
        forecastDay.textContent = moment(forecastTimestamp, "X").format("dddd");

        const forecastDate = document.createElement("p");
        forecastDate.textContent = moment(forecastTimestamp, "X").format("MMM Do, YYYY")

        //Create a list
        const forecastList = document.createElement("ul");
        forecastList.className = "forecast-list";

        //Temp li
        const forecastTemp = document.createElement("li");
        forecastTemp.className = "forecast-temp";
        forecastTemp.textContent = "Temp: " + toCelcius(weatherData.daily[i].temp.day).toFixed(2) + " °C";
    
        //Icon li
        const forecastIcon = document.createElement("img");
        forecastIcon.className = "forecast-icon"; 
        const forecastIconImage = weatherData.daily[i].weather[0].icon;
        forecastIcon.setAttribute("src", `https://openweathermap.org/img/wn/${forecastIconImage}@2x.png`);

        //Wind li
        const forecastWind = document.createElement("li");
        forecastWind.className = "forecast-wind";
        forecastWind.textContent = "Wind: " + weatherData.daily[i].wind_speed + " km/s";

        //Humidity li
        const forecastHumidity = document.createElement("li");
        forecastHumidity.className = "forecast-humidity";
        forecastHumidity.textContent = "Humidity: " + weatherData.daily[i].humidity + "%";

        forecastList.appendChild(forecastIcon);
        forecastList.appendChild(forecastTemp);
        forecastList.appendChild(forecastWind);
        forecastList.appendChild(forecastHumidity);

        forecastContainer.appendChild(forecastDay);
        forecastContainer.appendChild(forecastDate);
        forecastContainer.appendChild(forecastList);
        forecastEl.appendChild(forecastContainer);

        }
    })
    ;

//TODO: NEED TO FIX THIS: Event listener function to submit form if user replaces input on search-results page
function handleSearchFormSubmit(event) {
    event.preventDefault();
  
    var searchInputVal = document.getElementById("city-search").value;
  
    if (!searchInputVal) {
      console.error('Please input a city');
      return;
    }
    localStorage.setItem("inputValue", searchInputVal);
    searchWeather(cityName);
}
  
searchFormEl.addEventListener('submit', handleSearchFormSubmit);
searchBtn.addEventListener('click', handleSearchFormSubmit);

//TODO: Add function which renders past city searches to page as buttons
//TODO: Add event listener to the buttons to run search again when they are clicked