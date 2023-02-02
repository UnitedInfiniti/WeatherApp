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

function formatTime(time) {
  let currentHour = currentTime.getHours();
  let currentMinute = currentTime.getMinutes();
  let formattedTime = `${currentHour}:${currentMinute}`;
  return formattedTime;
}
console.log(formatTime(currentTime));

let h3 = document.querySelector("h3");
h3.innerHTML = formatDate() + " | " + formatTime();

//City Search
function changeTemperature(response) {
  let currentTemperature = Math.round(response.data.main.temp);
  let temperatureElement = document.querySelector("#current-temperature");
  temperatureElement.innerHTML = `${currentTemperature}`;
  let currentConditions = response.data.weather[0].description;
  let conditionsElement = document.querySelector("#condition");
  conditionsElement.innerHTML = `${currentConditions}`;
  let city = document.querySelector("#city-name");
  city.innerHTML = response.data.name;
}

function changeCity(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#search-text-input");
  let apiKey = "97bed167ec49bff56e6c1b63daef9c86";
  let apiUrlCity = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput.value}&appid=${apiKey}&units=metric`;
  axios.get(apiUrlCity).then(changeTemperature);
}
function changeToCurrentLocation(position) {
  let currentCityElement = document.querySelector("#city-name");
  let currentCity = position.data.name;
  currentCityElement.innerHTML = `${currentCity}`;
  let currentTempElement = document.querySelector("#current-temperature");
  let currentTemp = Math.round(position.data.main.temp);
  currentTempElement.innerHTML = `${currentTemp}`;
  let currentConditionsElement = document.querySelector("#condition");
  let currConditions = position.data.weather[0].description;
  currentConditionsElement.innerHTML = `${currConditions}`;
  console.log(position);
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
searchBar.addEventListener("submit", changeCity);

let currentButton = document.querySelector(".fa-2x");
currentButton.addEventListener("click", getCurrentLatitudeLongitude);
