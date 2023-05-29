let currentTime = document.querySelector("#time-now");
let date = new Date();
let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
let day = days[date.getDay()];
let hours = date.getHours();
let minutes = date.getMinutes();
if (hours < 10) {
    hours = `0${hours}`
}
if (minutes < 10) {
    minutes = `0${minutes}`
} 
let time = hours + ":" + minutes;
let DayTimeNow = `${day} ${time}`

currentTime.innerHTML = DayTimeNow;

let searchButton = document.querySelector("#search-button");
let searchLine = document.querySelector("#search-line");
let chosenCity = document.querySelector("#search-line").value;
    

function showForecast(city) {
    let apiKey = `af9f195dtc3b2336169c4ob0f8c90052`;
    let apiUrlForecast = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}`
    axios.get(apiUrlForecast).then(makeForecast);
}

function showTemp(response){
   
    let chosenCity = response.data.city;
    let cityShown = document.querySelector("#city-now");
    let tempShown = document.querySelector("#temp-number");
    let roundTemp = Math.round(response.data.temperature.current);
    let tempNow = roundTemp;
    let clouds = document.querySelector("#cloudiness");
    let currentClouds = response.data.condition.description;
    let humidity = document.querySelector("#humidity")
    let currentHumidity = response.data.temperature.humidity;
    let wind = document.querySelector("#wind")
    let currentWind = Math.round(response.data.wind.speed);
    let icon = document.querySelector("#icon");
    defaultTemperature = Math.round(response.data.temperature.current);

    clouds.innerHTML = currentClouds;
    cityShown.innerHTML = chosenCity;
    tempShown.innerHTML = tempNow;
    humidity.innerHTML = currentHumidity;
    wind.innerHTML = currentWind;
    icon.setAttribute("src", `${response.data.condition.icon_url}`) 
    icon.setAttribute("atl", `${response.data.condition.description}`)

    showForecast(chosenCity);
}

function CurrentLocationTemp(response){
    
    let chosenCity = response.data.name;
    let cityShown = document.querySelector("#city-now");
    let tempShown = document.querySelector("#temp-number");
    let roundTemp = Math.round(response.data.main.temp);
    let tempNow = roundTemp;
    let clouds = document.querySelector("#cloudiness");
    let currentClouds = response.data.weather[0].main;
    let humidity = document.querySelector("#humidity")
    let currentHumidity = response.data.main.humidity;
    let wind = document.querySelector("#wind")
    let currentWind = Math.round(response.data.wind.speed);
    let icon = document.querySelector("#icon");


    clouds.innerHTML = currentClouds;
    cityShown.innerHTML = chosenCity;
    tempShown.innerHTML = tempNow;
    humidity.innerHTML = currentHumidity;
    wind.innerHTML = currentWind;
    icon.setAttribute("src", `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`) 
    icon.setAttribute("atl", `https://openweathermap.org/img/wn/${response.data.weather[0].description}@2x.png`)
    
    showForecast(chosenCity);

}

function startSearch(event) {
    event.preventDefault();

    let chosenCity = document.querySelector("#search-line").value;
    let cityShown = document.querySelector("#city-now");

    cityShown.innerHTML = chosenCity;

    let apiKey = "af9f195dtc3b2336169c4ob0f8c90052";
    let apiCity = `https://api.shecodes.io/weather/v1/current?query=${chosenCity}&key=${apiKey}&units=metric`
    axios.get(apiCity).then(showTemp);

}

function displayCurrentWeather(position) {
    let apiKey = "c819171fe0abdc14039af4ef5dda283b";
    let lat = position.coords.latitude;
    let lon = position.coords.longitude;
    let apiUrlCurrent = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`
    axios.get(apiUrlCurrent).then(CurrentLocationTemp);

}

function searchLocation(event) {

    event.preventDefault();
    navigator.geolocation.getCurrentPosition(displayCurrentWeather);

}

function searchStart(city) {
   
    let cityShown = document.querySelector("#city-now");

    cityShown.innerHTML = city;

    let apiKey = "af9f195dtc3b2336169c4ob0f8c90052";
    let apiCity = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`
    axios.get(apiCity).then(showTemp);

}

function showCelsius(event) {
    event.preventDefault();
    fahrenheitButton.classList.remove("active");
    celsiusButton.classList.add("active");
    let tempNumber = document.querySelector("#temp-number");
    tempNumber.innerHTML = defaultTemperature;
}

function showFahrenheit(event) {
    event.preventDefault();
    celsiusButton.classList.remove("active");
    fahrenheitButton.classList.add("active");
    let tempNumber = document.querySelector("#temp-number");
    tempNumber.innerHTML = Math.round((defaultTemperature * 9/5) + 32);
}


searchButton.addEventListener("click", startSearch);
searchLine.addEventListener("search", startSearch);

let currentLocationButton = document.querySelector("#current-weather-button");
currentLocationButton.addEventListener("click", searchLocation);

let defaultTemperature;

let celsiusButton = document.querySelector("#celsius");
celsiusButton.addEventListener("click", showCelsius);

let fahrenheitButton = document.querySelector("#fahrenheit");
fahrenheitButton.addEventListener("click", showFahrenheit);

function formatDay(dayCode){
       
    let date = new Date (dayCode * 1000);
    let day = date.getDay();
    return day;
}

function makeForecast(response) {
     
    let forecast = document.querySelector("#forecast");
    let forecastDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    let dailyForecast = response.data.daily;
    let forecastHTML = "";
   
    dailyForecast.forEach(function (day, index) {
        if (index < 5) {
        forecastHTML += `
        <div class="card col">
            <h5 class="card-title">${forecastDays[formatDay(day.time)]}</h5>
            <div class="row">
                <div class="col"> 
                    <img src="${day.condition.icon_url}" class="card-img-top" alt="${day.condition.icon}" />
                </div>
                <p class="card-text col">
                    ${Math.round(day.temperature.maximum)}°C 
                    <br />
                    ${Math.round(day.temperature.minimum)}°C
                </p>
            </div>
        </div>
        `
        forecast.innerHTML = forecastHTML;
    }})
}

searchStart("Kyiv");

