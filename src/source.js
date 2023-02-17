//Current Date and Time
let currentTime = new Date();
console.log(currentTime);
console.log(currentTime.getHours());
console.log(currentTime.getMinutes());
console.log(currentTime.getDay());
console.log(currentTime.getFullYear());
console.log(currentTime.getMonth());

function formatDate(date) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  let currentYear = currentTime.getFullYear();
  let currentDay = days[currentTime.getDay()];
  let currentMonth = months[currentTime.getMonth()];
  let currentDate = currentTime.getDate();
  let formattedDate = `${currentDay}, ${currentMonth} ${currentDate}, ${currentYear}`;
  return formattedDate;
}
console.log(formatDate(currentTime));

function formatcurrentTime(time) {
  let currentHour = currentTime.getHours();
  let currentMinute = currentTime.getMinutes();
  let formattedcurrentTime = `${currentHour}:${currentMinute}`;
  return formattedcurrentTime;
}
console.log(formatcurrentTime(currentTime));

let h3 = document.querySelector("h3");
h3.innerHTML = formatDate() + " | " + formatcurrentTime();

//City Search
function search(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#search-text-input");
  let apiKey = "97bed167ec49bff56e6c1b63daef9c86";
  let apiUrlCity = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput.value}&appid=${apiKey}&units=metric`;
  axios.get(apiUrlCity).then(changeToCurrentLocation);
}

function changeToCurrentLocation(response) {
  let currentCityElement = document.querySelector("#city-name");
  let currentCity = response.data.name;
  let currentCountry = response.data.sys.country;
  currentCityElement.innerHTML = `${currentCity}, ${currentCountry}`;
  let currentTempElement = document.querySelector("#current-temperature");
  let currentTemp = Math.round(response.data.main.temp);
  celsiusTemperature = currentTemp;
  currentTempElement.innerHTML = `${currentTemp}°C`;
  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  let currentConditionsElement = document.querySelector("#condition");
  let currConditions = response.data.weather[0].description;
  currentConditionsElement.innerHTML = `${currConditions}`;
  let currentfeelElement = document.querySelector("#feelsLike");
  let currentFeels = Math.round(response.data.main.feels_like);
  celsiusFeels = currentFeels;
  currentfeelElement.innerHTML = `Feels Like: ${currentFeels}°C`;
  let lowTemp = Math.round(response.data.main.temp_min);
  let highTemp = Math.round(response.data.main.temp_max);
  celsiusLow = lowTemp;
  celsiusHigh = highTemp;
  let highlowElement = document.querySelector("#high-low");
  highlowElement.innerHTML = `L: ${lowTemp}°C  |  H: ${highTemp}°C`;
  let currenthumidElement = document.querySelector("#humidity");
  let currentHumid = response.data.main.humidity;
  currenthumidElement.innerHTML = `Humidity: ${currentHumid} %`;
  let currentwindElement = document.querySelector("#wind");
  let currentWind = Math.round(response.data.wind.speed);
  celsiusWind = currentWind;
  currentwindElement.innerHTML = `Wind Speed: ${currentWind} km/h`;
  let sunriseElement = document.querySelector("#sunrise");
  sunriseElement.innerHTML =
    "Sunrise: " + formatTime(response.data.sys.sunrise * 1000);
  let sunsetElement = document.querySelector("#sunset");
  sunsetElement.innerHTML =
    "Sunset: " + formatTime(response.data.sys.sunset * 1000);
  console.log(response);
  getForecast(response.data.coord);
}

function receiveCurrentPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "97bed167ec49bff56e6c1b63daef9c86";
  let apiUrlCurrent = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrlCurrent).then(changeToCurrentLocation);
}

function getCurrentLatitudeLongitude(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(receiveCurrentPosition);
}

let searchBar = document.querySelector(".d-flex");
searchBar.addEventListener("submit", search);

let currentButton = document.querySelector(".fa-2x");
currentButton.addEventListener("click", getCurrentLatitudeLongitude);

//Sunrise and Sunset Time Conversion
function formatTime(timestamp) {
  let time = new Date(timestamp);
  let currentHour = time.getHours();
  if (currentHour < 10) {
    currentHour = `0${currentHour}`;
  }
  let currentMinute = time.getMinutes();
  if (currentMinute < 10) {
    currentMinute = `0${currentMinute}`;
  }
  let formattedTime = `${currentHour}:${currentMinute}`;
  return formattedTime;
}

//Temperature Unit Change
function displayFahrenheitTemperature(event) {
  event.preventDefault();
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");

  let fahtemperatureElement = document.querySelector("#current-temperature");
  let fahrenheiTemperature = Math.round((celsiusTemperature * 9) / 5 + 32);
  fahtemperatureElement.innerHTML = `${fahrenheiTemperature}°F`;

  let fahcurrentfeelsElement = document.querySelector("#feelsLike");
  let fahcurrentFeels = Math.round((celsiusFeels * 9) / 5 + 32);
  fahcurrentfeelsElement.innerHTML = `Feels Like: ${fahcurrentFeels}°F`;

  let fahhighlowElement = document.querySelector("#high-low");
  let fahlowTemp = Math.round((celsiusLow * 9) / 5 + 32);
  let fahhighTemp = Math.round((celsiusHigh * 9) / 5 + 32);
  fahhighlowElement.innerHTML = `L: ${fahlowTemp}°F  |  H: ${fahhighTemp}°F`;

  let fahcurrentwindElement = document.querySelector("#wind");
  let fahcurrentWind = Math.round(celsiusWind * 0.621371);
  fahcurrentwindElement.innerHTML = `Wind Speed: ${fahcurrentWind} mp/h`;
}

function displayCelsiusTemperature(event) {
  event.preventDefault();
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  let temperatureElement = document.querySelector("#current-temperature");
  temperatureElement.innerHTML = `${celsiusTemperature}°C`;

  let currentfeelElement = document.querySelector("#feelsLike");
  currentfeelElement.innerHTML = `Feels Like: ${celsiusFeels}°C`;

  let highlowElement = document.querySelector("#high-low");
  highlowElement.innerHTML = `L: ${celsiusLow}°C  |  H: ${celsiusHigh}°C`;

  let currentwindElement = document.querySelector("#wind");
  currentwindElement.innerHTML = `Wind Speed: ${celsiusWind} km/h`;
}

let celsiusTemperature = null;
let celsiusFeels = null;
let celsiusLow = null;
let celsiusHigh = null;
let celsiusWind = null;

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsiusTemperature);

//5 Day Forcast
function getForecast(coordinates) {
  console.log(coordinates);
  let apiKey = "2b6fdad0cbd018949c50c70f72250726";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;

  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 5) {
      forecastHTML =
        forecastHTML +
        `
      <div class="col">
        <div class="weather-forecast-date">${formatDay(forecastDay.dt)}</div>
        <img
          src="http://openweathermap.org/img/wn/${
            forecastDay.weather[0].icon
          }@2x.png"
          alt=""
          width="50"
        />
        <div class="weather-forecast-temperatures">
          <span class="weather-forecast-temperature-max"> ${Math.round(
            forecastDay.temp.max
          )}° </span>
          <span class="weather-forecast-temperature-min"> ${Math.round(
            forecastDay.temp.min
          )}° </span>
        </div>
      </div>
  `;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}
