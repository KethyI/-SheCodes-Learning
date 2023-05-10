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
    
function showTemp(response){
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

    clouds.innerHTML = currentClouds;
    cityShown.innerHTML = chosenCity;
    tempShown.innerHTML = tempNow;
    humidity.innerHTML = currentHumidity;
    wind.innerHTML = currentWind;

}

function showStartTemp(response){
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

    clouds.innerHTML = currentClouds;
    cityShown.innerHTML = chosenCity;
    tempShown.innerHTML = tempNow;
    humidity.innerHTML = currentHumidity;
    wind.innerHTML = currentWind;

}

function getLatLon(response){
    let apiKey = "c819171fe0abdc14039af4ef5dda283b";
    let lat = response.data[0].lat;
    let lon = response.data[0].lon;
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`
    axios.get(apiUrl).then(showTempCurrent);
   }

   function getLatLonStart(response){
    let apiKey = "c819171fe0abdc14039af4ef5dda283b";
    let lat = response.data[0].lat;
    let lon = response.data[0].lon;
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`
    axios.get(apiUrl).then(showTemp);
   }

function startSearch(event) {
    event.preventDefault();

    let chosenCity = document.querySelector("#search-line").value;
 search(chosenCity);
}

function showTempCurrent(response) {
    let chosenCity = document.querySelector("#search-line").value;
    let cityShown = document.querySelector("#city-now");
    let tempShown = document.querySelector("#temp-number");
    let roundTemp = Math.round(response.data.main.temp);
    let tempNow = roundTemp;
    let clouds = document.querySelector("#cloudiness");
    let currentClouds = response.data.weather[0].main;
    let humidity = document.querySelector("#humidity");
    let currentHumidity = response.data.main.humidity;
    let wind = document.querySelector("#wind");
    let currentWind = Math.round(response.data.wind.speed);

    clouds.innerHTML = currentClouds;
    cityShown.innerHTML = chosenCity;
    tempShown.innerHTML = tempNow;
    humidity.innerHTML = currentHumidity;
    wind.innerHTML = currentWind;


}

function displayCurrentWeather(position) {
    let apiKey = "c819171fe0abdc14039af4ef5dda283b";
    let lat = position.coords.latitude;
    let lon = position.coords.longitude;
    let apiUrlCurrent = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`
    
    axios.get(apiUrlCurrent).then(showTemp);

}

function searchLocation(event) {

    event.preventDefault();
    navigator.geolocation.getCurrentPosition(displayCurrentWeather);

}

function search(city) {
   
    let cityShown = document.querySelector("#city-now");

    cityShown.innerHTML = city;

    let apiKey = "c819171fe0abdc14039af4ef5dda283b";
    let apiCity = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${apiKey}`
    axios.get(apiCity).then(getLatLon);

}

function searchStart(city) {
   
    let cityShown = document.querySelector("#city-now");

    cityShown.innerHTML = city;

    let apiKey = "c819171fe0abdc14039af4ef5dda283b";
    let apiCity = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${apiKey}`
    axios.get(apiCity).then(getLatLonStart);

}

searchButton.addEventListener("click", startSearch);
searchLine.addEventListener("search", startSearch);

let currentLocationButton = document.querySelector("#current-weather-button");
currentLocationButton.addEventListener("click", searchLocation);

searchStart("Kyiv");
// let celsius = document.querySelector("#celsius");
// function showCelsius() {
//     let celsiusNumber = document.querySelector("#temp-number");
//     let currentTemp = "19"
//     celsiusNumber.innerHTML = currentTemp;
// }
// celsius.addEventListener("click", showCelsius);

// let fahrenheit = document.querySelector("#fahrenheit");
// function showFahrenheit() {
//     let fahrenheitNumber = document.querySelector("#temp-number");
//     let currentTemp = "66"
//     fahrenheitNumber.innerHTML = currentTemp;

// }
// fahrenheit.addEventListener("click", showFahrenheit);
