'use strict'

let $=document

const searchInput=$.querySelector('input')

searchInput.addEventListener("keypress",()=>{
    new getWeather(event.key)
})


class getWeather{
    constructor(entredKey) {

        if(entredKey==='Enter'){
            //every time use press a key in his keyboard we check it and if key be Enter it means user write the city name and we send name of the city to the change location func
            this.changeLocation(searchInput.value)
        }
    }
    async sendRequest(city){
        // we gave the city got from url and send a request to api with that city name and get the weather datas
        let request=await fetch(`http://api.weatherapi.com/v1/current.json?key=c7a05a35d3d94b9ea62104620220111&q=${city}&aqi=yes`)

        let checkStatus=new Promise(((resolve, reject) => {
            //we are checking the status if request be rejected we send it to error handler
            if(request.status===200){
                resolve()
            }else {
                reject(request.statusText)
            }
        }))

        checkStatus.then(
            async function (value){
                let response=await request.json()

                let data=await Object.entries(response)
                //here  we send datas and city to the put Data func
                new getWeather().putData(data,city)
            },
            async function(error){

                let informationContainer=$.querySelector('.InformationContainer')

                informationContainer.classList.add('flex','justify-center','items-center','text-rose-600','text-4xl')

                informationContainer.innerHTML=error

            }
        )

    }

    changeLocation(){
        // here we send the city that user write in the input to url and we change the page to the main page and script code strat from begin
        location.href=`http://127.0.0.1:5500/main%20weather.html?city=${searchInput.value}`
    }


    putData(weatherData,city){
        // here we put the data in elemets
        const cityPlace=$.querySelector('.CityPlace')

        cityPlace.innerHTML+=weatherData[0][1].name

        const cityPath=$.querySelector('.Path')

        let slashIndex=weatherData[0][1].tz_id.indexOf('/')

        let citycontinent=weatherData[0][1].tz_id.slice(0,slashIndex)

        cityPath.innerHTML=`${citycontinent} \\ ${weatherData[0][1].country} \\ ${city}`

        const localTime=$.querySelector('.Time')

        localTime.innerHTML+=weatherData[0][1].localtime

        const longitude=$.querySelector('.Lon')

        const latitude=$.querySelector('.Lat')

        longitude.innerHTML=weatherData[0][1].lon+'<sup>°</sup>'

        latitude.innerHTML=weatherData[0][1].lat+'<sup>°</sup>'

        const humidity=$.querySelector('.Humidity')

        humidity.innerHTML=weatherData[1][1].humidity+'<sup>°</sup>'

        const day=$.querySelector('.Day')

        let days=['monday','tuesday','wednesday','thursday','friday','saturday','sunday']

        if (weatherData[0][1].country==='Iran'){

            day.innerHTML=days[new Date().getDate()-1]
        }else {

            day.innerHTML=days[new Date().getDate()]
        }

        const realFeelCel=$.querySelector('.RealFeelCelsius')

        const realFeelFar=$.querySelector('.RealFeelFahrenheit')

        realFeelCel.innerHTML=weatherData[1][1].feelslike_c+'<sup>°</sup>'

        realFeelFar.innerHTML=weatherData[1][1].feelslike_f+'<sup>°</sup>'

        const windSpeedKPH=$.querySelector('.WindSpeedKPH')

        const windSpeedMPH=$.querySelector('.WindSpeedMPH')

        windSpeedKPH.innerHTML=weatherData[1][1].wind_kph

        windSpeedMPH.innerHTML=weatherData[1][1].wind_mph

        const fellText=$.querySelector('.FellText')

        fellText.innerHTML=weatherData[1][1].condition.text

        const weatherCelTemperature=$.querySelector('.WeatherCelTemperature')

        const weatherTemperature=$.querySelector('.WeatherFarTemperature')

        weatherCelTemperature.innerHTML=weatherData[1][1].temp_c+'<sup>°c</sup>'

        weatherTemperature.innerHTML=weatherData[1][1].temp_f+'<sup>°f</sup>'

        const weatherIcon=$.querySelector('.WeatherIcon')

        weatherIcon.src=weatherData[1][1].condition.icon

        console.log(weatherData)
    }
}

if($.body.id==='main'){

    let search= new URLSearchParams(location.search)

    let city=search.get('city')

    new getWeather().sendRequest(city)
//    here we check if we be in main page he gives the city from url and send it to the get weather func
}
