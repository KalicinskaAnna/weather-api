const input = document.querySelector('input')
const button = document.querySelector('button')
const cityName = document.querySelector('.city-name')
const warning = document.querySelector('.warning')
const photo = document.querySelector('.photo')
const weather = document.querySelector('.weather')
const temperature = document.querySelector('.temperature')
const humidity = document.querySelector('.humidity')

const API_LINK = 'https://api.openweathermap.org/data/2.5/weather?lat='
const API_KEY = '1a011afe4a80d4385867a98f06b18ea2'
const API_UNITS = '&units=metric'
const API_url = 'http://api.openweathermap.org/geo/1.0/direct?q='

let lat
let lon

const getGPS = () => {
	const city = input.value || 'London'

	const URL = API_url + city + '&appid=' + API_KEY
	axios
		.get(URL)
		.then(res => {
			lat = res.data[0].lat
			lon = res.data[0].lon
			console.log(lon)
			console.log(lat)
			console.log(API_url + city + '&appid=' + API_KEY)
			getWeather()
		})
		.catch(() => (warning.textContent = 'Wpisz poprawną nazwę miasta!'))
}

const getWeather = () => {
	const newURL = API_LINK + lat + '&lon=' + lon + '&appid=' + API_KEY + API_UNITS
	axios.get(newURL).then(res => {
		const temp = res.data.main.temp
		const hum = res.data.main.humidity
		const name = res.data.name
		cityName.textContent = name
		temperature.textContent = Math.floor(temp) + '°C'
		humidity.textContent = hum + '%'
		weather.textContent = res.data.weather[0].main
		console.log(res.data.weather[0].id)
		if (res.data.weather[0].id > 200 && res.data.weather[0].id <= 232) {
			photo.setAttribute('src', './img/thunderstorm.png')
		} else if (res.data.weather[0].id >= 300 && res.data.weather[0].id <= 321) {
			photo.setAttribute('src', './img/Drizzle.png')
		} else if (res.data.weather[0].id >= 500 && res.data.weather[0].id <= 531) {
			photo.setAttribute('src', './img/rain.png')
		} else if (res.data.weather[0].id >= 600 && res.data.weather[0].id <= 622) {
			photo.setAttribute('src', './img/snow.png')
		} else if (res.data.weather[0].id >= 700 && res.data.weather[0].id <= 781) {
			photo.setAttribute('src', './img/unknow.png')
		} else if (res.data.weather[0].id == 800) {
			photo.setAttribute('src', './img/sun.png')
		} else if (res.data.weather[0].id >= 801 && res.data.weather[0].id <= 804) {
			photo.setAttribute('src', './img/cloud.png')
		} else {
			photo.setAttribute('src', './img/unknow.png')
		}
	})
}
const checkEnter = e => {
	if (e.key === 'Enter') {
		getGPS()
	}
}
input.addEventListener('keyup', checkEnter)
button.addEventListener('click', getGPS)
