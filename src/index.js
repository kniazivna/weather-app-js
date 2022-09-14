function showDate(timestamp) {
  let date = new Date(timestamp);
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thuersday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  let hours = date.getHours();

  if (hours < 10) {
    hours = `0${hours}`;
  }

  let minutes = date.getMinutes();

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `${day} ${hours}:${minutes}`;
}

function showForecast(response) {
  console.log(response.data.daily);
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="row">`;
  let days = ["Thu", "Fri", "Sat", "Sun", "Mon", "Tue"];

  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `
              <div class="col-2">
                <div class="forecast-date">${day}</div>
                <img
                  src="http://openweathermap.org/img/wn/04d@2x.png"
                  alt="Cloudy"
                  width="45"
                />
                <div class="forecast-temperature">
                  <span class="forecast-max-temperature">18°</span>
                  <span class="forecast-min-temperature">12°</span>
                </div>
              </div>`;
  });

  forecastHTML = forecastHTML + `</div>`;

  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates){
  console.log(coordinates);
  let apiKey = "1ee4264117b73d2263eecd562f31ef5c";
  let apiUrl = `
  https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  console.log(apiUrl);
  axios.get(apiUrl).then(showForecast);
}

function showTemperature(response) {
  let temperature = document.querySelector("#temperature");
  temperature.innerHTML = Math.round(response.data.main.temp);

  let city = document.querySelector("#city");
  city.innerHTML = response.data.name;

  let description = document.querySelector("#description");
  description.innerHTML = response.data.weather[0].description;

  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = response.data.main.humidity;

  let wind = document.querySelector("#wind");
  wind.innerHTML = Math.round(response.data.wind.speed);

  let date = document.querySelector("#date");
  date.innerHTML = showDate(response.data.dt * 1000);

  let icon = document.querySelector("#icon");
  icon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  icon.setAttribute("alt", response.data.weather[0].description);

  celcTemp = Math.round(response.data.main.temp);

  getForecast(response.data.coord);
}

function searchCity(city) {
  let apiKey = "1a113ff0323f06b582adfa8290155b6a";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(showTemperature);
}

function handleSubmit(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#city-input");

  searchCity(cityInput.value);
}

function showFafenheit(event) {
  event.preventDefault();

  let temp = document.querySelector("#temperature");

  celsius.classList.remove("active");
  farenheit.classList.add("active");

  let farenheitTemp = (celcTemp * 9) / 5 + 32;

  temp.innerHTML = Math.round(farenheitTemp);
}

function showCelsius(event) {
  event.preventDefault();

  farenheit.classList.remove("active");
  celsius.classList.add("active");

  let temp = document.querySelector("#temperature");
  temp.innerHTML = celcTemp;
}

let celcTemp = null;

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

let farenheit = document.querySelector("#farenheit");
farenheit.addEventListener("click", showFafenheit);

let celsius = document.querySelector("#celsius");
celsius.addEventListener("click", showCelsius);

searchCity("Lviv");
