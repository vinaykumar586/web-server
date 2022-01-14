const request = require('request')
const forecast = require('./forecast.js')
const geoCode = (address, callback) => {
    const geocodeURL = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=pk.eyJ1IjoidmluYXlrdW1hcjU4NiIsImEiOiJja3k3NGRoNXowNWdpMm9sanRqbmV2ZGFyIn0.pTwVtO1UhtwasnoerdW-bQ`;
    request({url: geocodeURL, json: true}, (error, response) => {
        if(error){
            callback("Unable to conect the locations services " + error, undefined);
        }else if(response.body.features.length === 0){
            callback("Unable to find location. try another search", undefined);
        } else {
            const longitude = response.body.features[0].center[0]
            const latitude = response.body.features[0].center[1]
            const location =  response.body.features[0].place_name
            callback(undefined, {longitude, latitude, location})
            forecast(longitude, latitude, (error, data) => {
                console.log("error", error)
                console.log("data", data)
            })
                // res.send({
                //     longitude,
                //     lattitude,
                //     location,
                // })
        }
    })
}


module.exports =  geoCode;
