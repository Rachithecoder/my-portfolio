//ede7477bd28be7b06d77d6ef88cdc694
//https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=addYourOwnAPIKey

const cityInput = document.querySelector(".city-search")
const cityForm = document.querySelector(".city-form")

const cityEl = document.querySelector(".city-wrapper")
const weatherEl = document.querySelector(".weather-wrapper")
const dateEl = document.querySelector(".date-wrapper")
const iconEl = document.querySelector(".icon-wrapper")
const tempEl = document.querySelector(".temp-wrapper")

const humidityEl = document.querySelector(".humidity")
const feelslikeEl = document.querySelector(".feelslike")
const windEl = document.querySelector(".wind")
const pressureEl = document.querySelector(".pressure")

let cityName = "Kathmandu"

const getCityName=(e)=>{
    e.preventDefault()
    cityName = cityInput.value.trim()
    getWeatherData()
    cityInput.value = ""
}

const getDatenTime = (getTime) => {
    const date = new Date(getTime * 1000);
    return new Intl.DateTimeFormat('en-GB', {
        dateStyle: 'full',
        timeStyle: 'short'
    }).format(date)
}

const getCountryName = (getcode) => {
    return new Intl.DisplayNames([getcode], { type: 'region' }).of(getcode);
}

const getWeatherData = async () => {
    try {
        const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&APPID=ede7477bd28be7b06d77d6ef88cdc694`)
        const data = await res.json()
        console.log(data);

        const { dt, main, name, sys, weather, wind } = data

        cityEl.innerHTML = `${name} , ${getCountryName(sys.country)}`;
        weatherEl.innerHTML = weather[0].main;
        dateEl.innerHTML = getDatenTime(dt);
        iconEl.innerHTML = `<img src="http://openweathermap.org/img/w/${weather[0].icon}.png">`;
        tempEl.innerHTML = `${main.temp}&deg;`;

        humidityEl.innerHTML = `${main.humidity}&deg;`
        pressureEl.innerHTML = `${main.pressure}&deg;`
        feelslikeEl.innerHTML = `${main.feels_like}&deg;`
        windEl.innerHTML = `${wind.deg}&deg;`

    } catch (error) {
        console.log(error);

    }
}

window.onload = getWeatherData

cityForm.addEventListener("submit",getCityName)