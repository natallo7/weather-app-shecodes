function showCurrentDay() {
  let now = new Date();
  let weekDays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let day = weekDays[now.getDay()];

  let hour = now.getHours();
  if (hour < 10) {
    hour = `0${hour}`;
  }

  let minutes = now.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let currentDay = `${day} - ${hour}:${minutes}`;
  return currentDay;
}

let h3 = document.querySelector("h3#current-date");
h3.innerHTML = showCurrentDay();

function showCity(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-city");
  let h1 = document.querySelector("#city");
  h1.innerHTML = `${searchInput.value}`;
  let units = "metric";
  let apiKey = "1dff453389cac27359664305dda50aa0";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchInput.value}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showWeatherCondition);
}

function showWeatherCondition(response) {
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#temperature").innerHTML = Math.round(
    response.data.main.temp
  );
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", showCity);

//Bonus challenge
function showResultsButton(response) {
  let h1 = document.querySelector("#city");
  h1.innerHTML = `${response.data.name}`;
  let temperature = Math.round(response.data.main.temp);
  let showTemp = document.querySelector("#temperature");
  showTemp.innerHTML = `${temperature}`;
}

function displayCurrentLocation(position) {
  let units = "metric";
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "1dff453389cac27359664305dda50aa0";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showResultsButton);
}

function getCurrentPosition() {
  navigator.geolocation.getCurrentPosition(displayCurrentLocation);
}

let currentLocationButton = document.querySelector("#current-location");
currentLocationButton.addEventListener("click", getCurrentPosition);
