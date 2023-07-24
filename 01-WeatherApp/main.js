import { API_KEY } from './api_key.js';

window.addEventListener('load', () => {
  fetch(`http://api.openweathermap.org/data/2.5/weather?units=metric&q=Hagi&appid=${API_KEY}`)
    .then(response => response.json())
    .then(data => weatherData(data))
    .catch(error => console.error('Error:', error));
});

const input = document.getElementById('input-city');

input.addEventListener('keydown', (event) => {
  if (event.key === "Enter") {
    const cityInput = document.getElementById('input-city')
    const cityName = cityInput.value;

    fetch(`http://api.openweathermap.org/data/2.5/weather?units=metric&q=${cityName}&appid=${API_KEY}`)
      .then(response => response.json())
      .then(data => weatherData(data))
      .catch(error => console.error('Error:', error));

    cityInput.value = "";
  }
});

function weatherData(data) {
  const weather = document.getElementById('weather-icon');
  const existWeatherIcon = weather.querySelector('img');
  const weatherIcon = existWeatherIcon || document.createElement('img');

  weatherIcon.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`

  if (!existWeatherIcon) {
    weather.appendChild(weatherIcon);
    weatherIcon.width = 150;
    weatherIcon.style.opacity = "0.6";
  }

  document.getElementById('city').textContent = data.name;
  document.getElementById('description').textContent = data.weather[0].description;
  document.getElementById('temp').textContent = data.main.temp + ' °C';
}
