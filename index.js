let apiKey = "ao8ce12baa0at03effcb000a09841c63";
let city = "Paris";
let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;

axios.get(apiUrl).then(displayWeather);

function displayWeather(response) {
  let showTemperature = document.querySelector(".temperature-value");
  let temperature = Math.round(response.data.temperature.current);

  let currentIcon = document.querySelector("#icon");
  let conditionUrl = response.data.condition.icon_url;
  currentIcon.style.width = "100px";
  currentIcon.style.height = "auto";

  let currentDescription = document.querySelector("#description");
  let apiDescription = response.data.condition.description;

  let showCity = document.querySelector("#city-name");
  let apiCity = response.data.city;

  let showHumidity = document.querySelector(".humidity-value");
  let showWind = document.querySelector(".wind-speed-value");

  let timeElement = document.querySelector("#current-time");
  let cityTime = new Date(response.data.time * 1000);

  timeElement.innerHTML = formatTime(cityTime);
  currentDescription.innerHTML = toTitleCase(`${apiDescription}`);
  currentIcon.innerHTML = `<img src="${conditionUrl}" alt="Weather icon" />`;
  showTemperature.innerHTML = `${temperature}`;
  showCity.innerHTML = `${apiCity}`;
  showHumidity.innerHTML = response.data.temperature.humidity;
  showWind.innerHTML = response.data.wind.speed;
}
function search(event) {
  event.preventDefault();
  let searchInputElement = document.querySelector("#city-input");
  let cityElement = searchInputElement.value;
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${cityElement}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeather);
}

function toTitleCase(str) {
  if (!str) return "";
  return str
    .toLowerCase()
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

function formatDate(date) {
  let day = date.getDay();
  let month = date.getMonth();
  let dateOfMonth = date.getDate();

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

  let formattedDay = days[day];
  let formattedMonth = months[month];
  return `${formattedDay},   ${formattedMonth} ${dateOfMonth}`;
}

function formatTime(date) {
  let minutes = date.getMinutes();
  let hours = date.getHours();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  if (hours < 10) {
    hours = `0${hours}`;
  }
  return `${hours}:${minutes}`;
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", search);

let currentDate = new Date();
let currentDateELement = document.querySelector("#current-date");
let currentTimeElement = document.querySelector("#current-time");
currentDateELement.innerHTML = formatDate(currentDate);
currentTimeElement.innerHTML = formatTime(currentDate);

function forecastDays(timestamp) {
  let date = new Date(timestamp * 1000);
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[date.getDay()];
}

function getForecast(city) {
  let apiKey = "ao8ce12baa0at03effcb000a09841c63";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
  axios(apiUrl).then(displayForecast);
}

function displayForecast(response) {
  let forecastHtml = "";
  response.data.daily.forEach(function (day, index) {
    if (index > 4) return;
    forecastHtml =
      forecastHtml +
      `
      <div class="weather-forecast-day">
        <div class="weather-forecast-date">${forecastDays(day.time)}</div>
        <div class="weather-forecast-icon">
          <img src="${day.condition.icon_url}" alt="${day.condition.description}" />
        </div>
        <div class="weather-forecast-temperatures">
          <div class="weather-forecast-temperature">
            <strong>${Math.round(day.temperature.maximum)}°C</strong>
          </div>
          <div class="weather-forecast-temperature">${Math.round(day.temperature.minimum)}°C</div>
        </div>
      </div>`;
  });
  let forecastElement = document.querySelector("#weather-forecast");
  forecastElement.innerHTML = forecastHtml;
}
let searchNowButton = document.querySelector("button");
searchNowButton.addEventListener("click", displayWeather);
getForecast(city);
