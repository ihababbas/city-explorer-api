const axios = require('axios');

const getWeather = async (req, res) => {
    let lat = req.query.lat;
    let lon = req.query.lon;
    const Wkey = "6f6e44082ab240398c893b334ebb6da4";
    try {
      let LocalForecast = await axios.get(
        `http://api.weatherbit.io/v2.0/forecast/daily?key=${Wkey}&lon=${lon}&lat=${lat}`
      );
      console.log(lat, lon);
      let forecastOut = [];
      LocalForecast.data.data.forEach((i) => {
        forecastOut.push(new Forecast(i));
      });
  
      return res.send(forecastOut);
    } catch (err) {
      console.log(err);
    }
  };

  class Forecast {
    constructor(i) {
      this.date = i.datetime;
      this.low_temp = i.low_temp;
      this.max_temp = i.max_temp;
      this.description = i.weather.description;
    }
  };

  module.exports = getWeather;