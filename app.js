const weatherConsole = document.querySelector('.weather-console')
const searchInput = document.getElementById('searchInput')


function init() {
  const API_KEY = '50dfacd827bba21242f91d2f77e2ef98'
  let apiURL

  if (searchInput.value !== '') {
    let city = searchInput.value
    searchInput.value = ''
    apiURL = `https://api.openweathermap.org/data/2.5/weather?units=metric&appid=${API_KEY}&q=${city}`
    getWeather(apiURL)
  } else {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        let lat = position.coords.latitude
        let lon = position.coords.longitude
        apiURL = `https://api.openweathermap.org/data/2.5/weather?units=metric&appid=${API_KEY}&lat=${lat}&lon=${lon}`
        getWeather(apiURL)
      })
    }
  }
}

async function getWeather(apiURL) {
  try {
    const response = await fetch(apiURL)
    if (response.ok) {
      const data = await response.json()
      const timeStamp = data.dt * 1000

      formatDate(timeStamp)
      formatWeather(data)
      return
    }
    if (response.status == '401') throw new Error('401')
    if (response.status == '404') throw new Error('404')

  } catch (error) {
    if (error.message == '401') offline('There might be a problem on our end. Please try again later')
    if (error.message == '404') alert('The city/country entered does not exist')
    return
  }

  offline('You are offline. Please check your connection and try again')
}

function formatDate(timeStamp) {
  const date = new Date(timeStamp)
  const options = { year: 'numeric', month: 'long', day: 'numeric' }

  document.getElementById('currentDate').textContent = date.toLocaleString(undefined, options)
}

function formatWeather(data) {
  const temperature = data.main.temp

  document.getElementById('currentWeather').textContent = `${temperature}°C`
  document.getElementById('cityName').textContent = `${data.name}, ${data.sys.country}`
}

function formatIcon() {
}

function offline(message) {
  let rmv = [...weatherConsole.children]
  rmv.forEach((el) => el.remove())
  const offlineImage = document.createElement('img')
  offlineImage.src = './images/main/offline-image.png'
  offlineImage.classList.add('offline-image')
  const offlineText = document.createElement('p')
  offlineText.textContent = message
  weatherConsole.appendChild(offlineImage)
  weatherConsole.appendChild(offlineText)
}

window.addEventListener('load', () => {
  init()
})

document.querySelector('#searchButton').addEventListener('click', () => {
  init()
})
