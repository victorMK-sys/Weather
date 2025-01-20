const dateString = document.getElementById('currentDate')
const date = new Date()
const day = date.toLocaleDateString('en-US', { day: "numeric" })
const month = date.toLocaleDateString('en-US', { month: "long" })
const year = date.toLocaleDateString('en-US', { year: "numeric" })

dateString.innerHTML = `${day} ${month}, ${year}`

window.addEventListener('load', () => {
  const apiKey = 'YOUR_API_KEY';
  const city = 'YOUR_CITY';
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      const weatherDescription = data.weather[0].description;
      const temperature = data.main.temp;
      const weatherElement = document.getElementById('weather');

      weatherElement.innerHTML = `Weather: ${weatherDescription}, Temperature: ${temperature}°C`;
    })
    .catch(error => console.error('Error fetching weather data:', error));
})