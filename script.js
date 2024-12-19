const apiKey = '223072ee0351a588feb16120de8beccd'; 
const weatherContainer = document.getElementById('weather-container');
const cityInput = document.getElementById('city-input');
const getWeatherButton = document.getElementById('get-weather');

// Function to fetch and display weather
async function fetchWeather(city) {
  try {
    weatherContainer.innerHTML = '<p>Loading...</p>'; 

    // Fetch weather data from OpenWeatherMap API
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
    );

    if (!response.ok) throw new Error(`City not found: ${response.statusText}`);

    const data = await response.json();

    const temperature = data.main.temp;
    const weatherDescription = data.weather[0].description;

    // Update the weather container with fetched data
    weatherContainer.innerHTML = `
      <p><strong>City:</strong> ${data.name}</p>
      <p><strong>Temperature:</strong> ${temperature}°C</p>
      <p><strong>Condition:</strong> ${weatherDescription}</p>
      <p><strong>Humidity:</strong> ${data.main.humidity}%</p>
    `;

    // Update the background image based on temperature
    updateBackgroundImage(temperature);
  } catch (error) {
    // Handle errors and display an error message
    weatherContainer.innerHTML = `<p style="color: red;">${error.message}</p>`;
  }
}

// Function to update the background image of the page
function updateBackgroundImage(temperature) {
  if (temperature <= 1) {
    document.body.style.backgroundImage = 'url("http://4.bp.blogspot.com/-pN4OHFOau9I/UK9SuN37liI/AAAAAAAAKlI/JFTIHdNvK3c/s1600/snow+falling++(4).jpg")';
  } else if (temperature > 1 && temperature <= 30) {
    document.body.style.backgroundImage = 'url("https://images.pexels.com/photos/158163/clouds-cloudporn-weather-lookup-158163.jpeg?cs=srgb&dl=clouds-cloudy-gloomy-158163.jpg&fm=jpg")';
  } else {
    document.body.style.backgroundImage = 'url("https://getwallpapers.com/wallpaper/full/8/4/d/924696-large-sunny-day-background-1920x1080-for-4k-monitor.jpg")';
  }
  document.body.style.backgroundSize = 'cover'; 
  document.body.style.backgroundRepeat = 'no-repeat'; 
  document.body.style.backgroundPosition = 'center'; 
}

// Event listener for the button
getWeatherButton.addEventListener('click', () => {
  const city = cityInput.value.trim();
  if (city) {
    fetchWeather(city);
  } else {
    weatherContainer.innerHTML = '<p style="color: red;">Please enter a city name.</p>';
  }
});
