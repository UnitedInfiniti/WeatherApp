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
function search(event) {
  event.preventDefault();
  let searchCity = document.querySelector("#search-text-input");
  let h1 = document.querySelector("h1");
  h1.innerHTML = `${searchCity.value}, Country`;
}

function searchCity(cityName) {
  let apiKey = "97bed167ec49bff56e6c1b63daef9c86";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units="metric"$appid=${apiKey}`;
  axios.get(apiUrl).then(showWeather);
}

function showWeather(response) {
  console.log(response);
  let temperature = Math.round(response.data.main.temp);
  let high = Math.round(response.data.main.temp_max);
  let low = Math.round(response.data.main.temp_min);
  let wind = Math.round(response.data.wind.speed);
  let humidity = Math.round(response.data.main.humidity);
  let visibility = Math.round(response.data.visibility);
  let sunrise = response.data.sys.sunrise;
  let windgust = Math.round(response.data.wind.gust);
  let pressure = response.data.main.pressure;
  let ceiling = response.data.clouds.all;
  let sunset = response.data.sys.sunset;
  let weather = response.data.weather.main;
  let cityName = response.data.name;
  document.querySelector("#current-temperature").innerHTML = `${temperature}°`;
  document.querySelector("#high-low").innerHTML = `L:${low}°  |  H:${high}°`;
  document.querySelector("#wind").innerHTML = `Wind: ${wind}xm/s`;
  document.querySelector("#humidity").innerHTML = `${humidity}%`;
  document.querySelector("#visibility").innerHTML = `${visibility}`;
  document.querySelector("#sunrise").innerHTML = `${sunrise}`;
  document.querySelector("#wind-gust ").innerHTML = `${windgust}`;
  document.querySelector("#pressure").innerHTML = `${pressure}`;
  document.querySelector("#ceiling").innerHTML = `${ceiling}`;
  document.querySelector("#sunset").innerHTML = `${sunset}`;
  document.querySelector("#condition").innerHTML = `${weather}`;
  document.querySelector(h1).innerHTML = `${cityName}`;
}

//let cityform = document.querySelector(".d-flex");
//cityform.addEventListener("submit", citychange);

// Celcious or Fahrenheit Toggle

// F to C: (°F − 32) × 5/9 = °C
// C to F: (C × 9/5) + 32 = °F
