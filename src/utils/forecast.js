const request = require('request')
const forecast = (lang, latt, callback) => {
    const weatherURL = `http://api.weatherstack.com/current?access_key=522f7932e86f0617ae18a31a123a9c48&query=${lang},${latt}&units=f`;
    request({url:weatherURL, json: true}, (err, response) => {
        // const data = response.body
        // console.log(data.current)
        const {current, error} =response.body;
        if(err){
            callback("Unable to find the whether service", undefined)
        } else if(error){
            callback("Unable to find location", undefined)
        } else {
            callback(undefined,`${current.weather_descriptions[0]} currentemperture ${current.temperature} it feels like ${current.feelslike}`)
            console.log(`${current.weather_descriptions[0]} currentemperture ${current.temperature} it feels like ${current.feelslike}`)

        }
    })
}

module.exports = forecast;