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
  //event.preventDefault();
  let cityInput = document.querySelector("#search-text-input");
  let apiKey = "97bed167ec49bff56e6c1b63daef9c86";
  let apiUrlCity = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput.value}&appid=${apiKey}&units=metric`;
  axios.get(apiUrlCity).then(changeToCurrentLocation);
}

function changeToCurrentLocation(response) {
  let currentCityElement = document.querySelector("#city-name");
  let currentCity = response.data.name;
  currentCityElement.innerHTML = `${currentCity}`;
  let currentTempElement = document.querySelector("#current-temperature");
  let currentTemp = Math.round(response.data.main.temp);
  celsiusTemperature = currentTemp;
  currentTempElement.innerHTML = `${currentTemp}°`;
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
  currentfeelElement.innerHTML = `Feels Like: ${currentFeels} °`;
  let lowTemp = Math.round(response.data.main.temp_min);
  let highTemp = Math.round(response.data.main.temp_max);
  let highlowElement = document.querySelector("#high-low");
  highlowElement.innerHTML = `L: ${lowTemp}°  |  H: ${highTemp}°`;
  let currentwindElement = document.querySelector("#wind");
  let currentWind = Math.round(response.data.wind.speed);
  currentwindElement.innerHTML = `Wind Speed: ${currentWind} km/h`;
  let currenthumidElement = document.querySelector("#humidity");
  let currentHumid = response.data.main.humidity;
  currenthumidElement.innerHTML = `Humidity: ${currentHumid} %`;
  let sunriseElement = document.querySelector("#sunrise");
  sunriseElement.innerHTML =
    "Sunrise: " + formatTime(response.data.sys.sunrise * 1000);
  let sunsetElement = document.querySelector("#sunset");
  sunsetElement.innerHTML =
    "Sunset: " + formatTime(response.data.sys.sunset * 1000);
  console.log(response);
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
  let temperatureElement = document.querySelector("#current-temperature");

  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let fahrenheiTemperature = Math.round((celsiusTemperature * 9) / 5 + 32);
  temperatureElement.innerHTML = `${fahrenheiTemperature} °`;
}

function displayCelsiusTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#current-temperature");
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  temperatureElement.innerHTML = `${celsiusTemperature} °`;
}

let celsiusTemperature = null;

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsiusTemperature);
