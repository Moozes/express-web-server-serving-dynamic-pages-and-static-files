const request = require("request")

const baseUrl = "http://api.weatherstack.com/current?access_key=593868b03e2eb9254409a2bc71d6287a&query="

const forcast = (address, callback) => {
    if(!address) {
        return console.error('please provide an address!')
    }

    const url = baseUrl + address
    request(url, (error, response, body) => {
        const bodyObject = JSON.parse(body)
        if(error) {
            callback(error, undefined)
        } else if (bodyObject.error) {
            callback(bodyObject.error.info, undefined)
        } else {
            
            callback(undefined, `temperature of ${address} is ${bodyObject.current.temperature}`)
        }
    })
}

module.exports = forcast



