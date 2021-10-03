const request = require("request");

const forecast = (address, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=d254ebad36462b628512906f579dca21&query=${address}&units=m&`; 

    request({url, json: true}, (error, { body } = {}) => {
        if (error) {
            callback("Unable to connect to weather service", undefined)
        } else if(body.error){
            callback('Unable to find location', undefined)
        } else {
            const {temperature, feelslike, weather_icons} = body.current;
            callback(undefined, `${body.current.weather_descriptions[0]}. It is currently ${temperature}C degress out. It is feels like ${feelslike}C degress out. Wind speed ${body.current.wind_speed}`, weather_icons[0]);
                
        }
    })
}

module.exports = forecast;