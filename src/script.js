let currentTime = new Date();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[currentTime.getDay()];
let hours = currentTime.getHours();
let newHours = hours < 10 ? `0${hours}` : hours;
let minutes = currentTime.getMinutes();
let newMin = minutes < 10 ? `0${minutes}` : minutes;

let currentDayTime = document.querySelector("#currentDayTime");
currentDayTime.innerHTML = `${day} ${newHours}:${newMin}`;

function displayInputCityTemp(response) {
  let displayCity = document.querySelector("#city");
  let dispTemp = document.querySelector("#tempChange");

  displayInputCity = response.data.name;
  displayInputCityTemperature = Math.round(response.data.main.temp);
  displayCity.innerHTML = displayInputCity;
  dispTemp.innerHTML = displayInputCityTemperature;

  function handleFah() {
    let dispFahTemp = Math.round((displayInputCityTemperature * 9) / 5 + 32);

    dispTemp.innerHTML = dispFahTemp;
  }
  let farenheitTemp = document.querySelector("#fah");
  farenheitTemp.addEventListener("click", handleFah);

  function displayInputCityCelciusTemp() {
    dispTemp.innerHTML = displayInputCityTemperature;
  }
  let celciusTemp = document.querySelector("#cel");
  celciusTemp.addEventListener("click", displayInputCityCelciusTemp);
}

function handleForm(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#inputField");

  if (cityInput.value) {
    let apiKey = "c50c94da2258146b054b9b68f70d5a59";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput.value}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(displayInputCityTemp);
  } else {
    alert("Please type a city.");
  }
}

let form = document.querySelector("form");
form.addEventListener("submit", handleForm);

function displayTemperature(response) {
  let dispTemp = document.querySelector("#tempChange");
  let displayCity = document.querySelector("#city");
  let cityInput = document.querySelector("#inputField");
  let temperature = Math.round(response.data.main.temp);
  dispTemp.innerHTML = temperature;
  displayCity.innerHTML = response.data.name;
  cityInput.value = "";
  function handleFah() {
    let dispFahTemp = Math.round((temperature * 9) / 5 + 32);

    dispTemp.innerHTML = dispFahTemp;
  }
  let farenheitTemp = document.querySelector("#fah");
  farenheitTemp.addEventListener("click", handleFah);

  function displayCurrentCityCelciusTemp() {
    dispTemp.innerHTML = temperature;
  }
  let celciusTemp = document.querySelector("#cel");
  celciusTemp.addEventListener("click", displayCurrentCityCelciusTemp);
}

function handlePosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "c50c94da2258146b054b9b68f70d5a59";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayTemperature);
}

function showCurrentTemperature() {
  navigator.geolocation.getCurrentPosition(handlePosition);
}

let currentBtn = document.querySelector("#current");
currentBtn.addEventListener("click", showCurrentTemperature);
