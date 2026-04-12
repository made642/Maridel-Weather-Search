let apiKey = "ao8ce12baa0at03effcb000a09841c63";
let city = "Paris";
let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;

axios.get(apiUrl).then(displayWeather);

function displayWeather(response) {
  let showTemperature = document.querySelector(".current-temperature-value");
  let temperature = Math.round(response.data.temperature.current);

  let currentIcon = document.querySelector(".current-temperature-icon");
  let conditionUrl = response.data.condition.icon_url;

  let showCity = document.querySelector(".current-city");
  let apiCity = response.data.city;

  let showHumidity = document.querySelector("#humidity");
  let showWind = document.querySelector("#wind");

  currentIcon.innerHTML = `<img src="${conditionUrl}" alt="Weather icon" />`;
  showTemperature.innerHTML = `${temperature}`;
  showCity.innerHTML = `${apiCity}`;
  showHumidity.innerHTML = response.data.temperature.humidity;
  showWind.innerHTML = response.data.wind.speed;
}
function search(event) {
  event.preventDefault();
  let searchInputElement = document.querySelector("#search-input");
  let cityElement = searchInputElement.value;
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${cityElement}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeather);
}

function formatDate(date) {
  let minutes = date.getMinutes();
  let hours = date.getHours();
  let day = date.getDay();

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  if (hours < 10) {
    hours = `0${hours}`;
  }

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let formattedDay = days[day];
  return `${formattedDay} ${hours}:${minutes}`;
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", search);

let currentDateELement = document.querySelector("#current-date");
let currentDate = new Date();

currentDateELement.innerHTML = formatDate(currentDate);
