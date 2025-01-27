const currentDate = document.getElementById('currentDate')
const mainBody = document.querySelector('.weather-console')
const currentWeather = document.getElementById('currentWeather')
const cityName = document.getElementById('cityName')
const weatherIcon = document.getElementById('weatherIcon')

async function getWeather(dateCallback, weatherCallback) {
  const apiKey = '50dfacd827bba21242f91d2f77e2ef98'
  const apiURL = `https://api.openweathermap.org/data/2.5/weather?units=metric&appid=${apiKey}&q=Kenya`

  try {
    const response = await fetch(apiURL)
    if (!response.ok) {
      offline()
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    const data = await response.json()
    const timeStamp = data.dt * 1000

    dateCallback(timeStamp)
    weatherCallback(data)
  } catch (error) {
    console.error('Failed to fetch weather data:', error)
  }
}

function formatDate(timeStamp) {
  const date = new Date(timeStamp)
  const options = { year: 'numeric', month: 'long', day: 'numeric' }

  currentDate.textContent = date.toLocaleString(undefined, options)
}

function formatWeather(data) {
  const city = data.name
  const temperature = data.main.temp

  currentWeather.textContent = `${temperature}°C`
  cityName.textContent = city
}

function formatIcon(iconCode) {

}

function offline() {
  let rmv = [...mainBody.children]
  rmv.forEach((el) => el.remove())
  const offlineImage = document.createElement('img')
  offlineImage.src = './images/main/offline-image.png'
  offlineImage.classList.add('offline-image')
  const offlineText = document.createElement('p')
  offlineText.textContent = 'You are offline. Check your internet connection'
  offlineText.classList.add('offline-text')

  mainBody.appendChild(offlineImage)
  mainBody.appendChild(offlineText)
}

window.addEventListener('load', () => {
  getWeather(formatDate, formatWeather)
})