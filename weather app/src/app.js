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

    clouds.innerHTML = currentClouds;
    cityShown.innerHTML = chosenCity;
    tempShown.innerHTML = tempNow;
    humidity.innerHTML = currentHumidity;
    wind.innerHTML = currentWind;

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

    clouds.innerHTML = currentClouds;
    cityShown.innerHTML = chosenCity;
    tempShown.innerHTML = tempNow;
    humidity.innerHTML = currentHumidity;
    wind.innerHTML = currentWind;

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

searchButton.addEventListener("click", startSearch);
searchLine.addEventListener("search", startSearch);

let currentLocationButton = document.querySelector("#current-weather-button");
currentLocationButton.addEventListener("click", searchLocation);

searchStart("Kyiv");

// function getLatLon(response){
//     let apiKey = "c819171fe0abdc14039af4ef5dda283b";
//     let lat = response.data[0].lat;
//     let lon = response.data[0].lon;
//     let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`
//     axios.get(apiUrl).then(showTempCurrent);
//    }

//    function getLatLonStart(response){
//     let apiKey = "c819171fe0abdc14039af4ef5dda283b";
//     let lat = response.data[0].lat;
//     let lon = response.data[0].lon;
//     let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`
//     axios.get(apiUrl).then(showStartTemp);
//    }



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
