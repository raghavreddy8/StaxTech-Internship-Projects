async function getWeather() {
  const city = document.getElementById('cityInput').value;
  const url = `https://yahoo-weather5.p.rapidapi.com/weather?location=${city}&format=json&u=c`; // `u=c` for Celsius

  const options = {
    method: 'GET',
    headers: {
      'x-rapidapi-key': '33b6b2a1c9msh36b4977251db17ap139a00jsn05b0c494634f',
      'x-rapidapi-host': 'yahoo-weather5.p.rapidapi.com'
    }
  };

  try {
    const response = await fetch(url, options);
    const data = await response.json();

    if (data && data.current_observation) {
      const obs = data.current_observation;
      const forecast = data.forecasts;

      document.getElementById('cityName').innerText = data.location.city;
      document.getElementById('temp').innerText = `Temperature: ${obs.condition.temperature} °C`;
      document.getElementById('condition').innerText = `Condition: ${obs.condition.text}`;
      document.getElementById('humidity').innerText = `Humidity: ${obs.atmosphere.humidity}%`;
      document.getElementById('wind').innerText = `Wind Speed: ${obs.wind.speed} km/h`;
      document.getElementById('feelsLike').innerText = `Feels Like: ${obs.wind.chill} °C`;
      document.getElementById('minMaxTemp').innerText = `Min: ${forecast[0].low}°C / Max: ${forecast[0].high}°C`;

      document.getElementById('weatherIcon').src = `https://s.yimg.com/zz/combo?a/i/us/nws/weather/gr/${obs.condition.code}d.png`;

      
      const hourlyHtml = forecast.slice(0, 6).map(f =>
        `<div class="forecast-card">
      <p>${f.day}</p>
      <img src="https://s.yimg.com/zz/combo?a/i/us/nws/weather/gr/${f.code}d.png" />
      <p>${f.low}°C - ${f.high}°C</p>
    </div>`
      ).join('');
      document.getElementById('hourlyForecast').innerHTML = hourlyHtml;

      
      const weeklyHtml = forecast.slice(0, 7).map(f =>
        `<div class="forecast-card">
      <p>${f.day}</p>
      <img src="https://s.yimg.com/zz/combo?a/i/us/nws/weather/gr/${f.code}d.png" />
      <p>${f.low}°C - ${f.high}°C</p>
    </div>`
      ).join('');
      document.getElementById('weeklyForecast').innerHTML = weeklyHtml;

      document.getElementById('weatherResult').classList.remove('hidden');
      document.getElementById('error').innerText = '';
    }
    else {
      document.getElementById('error').innerText = 'City not found!';
    }
  } catch (error) {
    document.getElementById('error').innerText = 'Error fetching data!';
    console.error(error);
  }
}


