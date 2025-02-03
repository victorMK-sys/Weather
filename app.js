import { WEATHER_API_KEY } from "./index.js"

const weatherConsole = document.querySelector('.weather-console')
const searchInput = document.getElementById('searchInput')

function init() {
  let apiURL

  if (searchInput.value !== '') {
    let city = searchInput.value
    searchInput.value = ''
    apiURL = `https://api.openweathermap.org/data/2.5/weather?units=metric&appid=${WEATHER_API_KEY}&q=${city}`
    getWeather(apiURL)
  } else {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        let lat = position.coords.latitude
        let lon = position.coords.longitude
        apiURL = `https://api.openweathermap.org/data/2.5/weather?units=metric&appid=${WEATHER_API_KEY}&lat=${lat}&lon=${lon}`
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
      const imgsrc = formatIcon(data.weather)
      console.log(data)

      formatWeather(data, imgsrc)
      return
    }
    if (response.status == '401') throw new Error('401')
    if (response.status == '404') throw new Error('404')

  } catch (error) {
    if (error.message == '401') offline('There might be a problem on our end. Please try again later')
    if (error.message == '404') alert('The city entered does not exist')
    return
  }

  offline('You are offline. Please check your connection and try again')
}

function formatWeather(data, imgsrc) {
  const temperature = data.main.temp

  document.getElementById('weatherIcon').src = imgsrc
  document.getElementById('currentWeather').textContent = `${temperature}°C`
  document.getElementById('cityName').textContent = (`${data.name}, ${data.sys.country}`)

}

function formatIcon(weather) {
  let weatherMain = weather[0].main
  let weatherDescr = weather[0].description
  let imgsrc = './images/'

  switch (weatherMain) {
    case 'Sunny': imgsrc += 'sunny.png'
      break
    case "Clear": imgsrc+='sunny.png'
      break
    case "Clouds":
      if (weatherDescr == 'over-cast') imgsrc += 'over-cast.png'
      else imgsrc += 'clear-sky.png'
      break
    case "Rain":
      if (weatherDescr == 'storm') imgsrc += 'storm.png'
      else imgsrc += 'moderate-rain.png'
      break
    case "Snow": imgsrc += 'snow.png'
      break
    case "Fog": imgsrc += 'fog.png'
      break
    case "Mist": imgsrc += 'mist.png'
      break
    default: imgsrc += 'windy.png'
  }

  return imgsrc
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

document.querySelector('body').addEventListener('keydown', (event) => {
  if ((searchInput.value.length > 0) && (event.key == 'Enter')) init()
})