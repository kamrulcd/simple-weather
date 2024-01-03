const weatherform = document.querySelector(".weatherForm")
const cityInput = document.querySelector(".cityInput")
const card = document.querySelector(".card")
const apiKey = "52076eff10b88e443985cee8fbb60033"

weatherform.addEventListener('submit',async function (event){
    event.preventDefault()

    const city = cityInput.value
    if(city){
        try{
            const weatherData = await getWeatherData(city)
            weatherInfo(weatherData)
        }catch(error){
            displayError(error)
            displayError('enter valid city')
        }
    }
    else{
        displayError("please enter a city")
    }
})

async function getWeatherData(city){
    const apiUrl = `
    https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}
    `
    const response = await fetch(apiUrl)
    if(!response.ok){
        throw new error("could not fetch data")
    }
    return await response.json()

}

function weatherInfo(data){
    const {name: city, 
        main: {temp,humidity},
        weather:[{description}]} = data

        card.innerText = ""
        card.style.display = "flex"

        const cityDisp = document.createElement('h1')
        const humidityDisp = document.createElement('p')
        const tempDisp = document.createElement('p')
        const descDisp = document.createElement('p')

        cityDisp.textContent = city
        cityDisp.classList.add('cityDisp')
        card.appendChild(cityDisp)

        tempDisp.textContent = `${temp} K`
        tempDisp.classList.add('tempDisp')
        card.appendChild(tempDisp)

        humidityDisp.textContent = `${humidity}%`
        humidityDisp.classList.add('humDisp')
        card.appendChild(humidityDisp)

        descDisp.textContent = `${description}`
        descDisp.classList.add('descDisp')
        card.appendChild(descDisp)
}

function displayError(message){
    const errorDisplay = document.createElement('p')
    errorDisplay.innerText = message
    errorDisplay.classList.add("errorDisp")

    card.textContent = ""
    card.style.display = "flex"
    card.appendChild(errorDisplay)
}