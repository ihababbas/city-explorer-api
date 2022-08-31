console.log("node says hey");
const express = require("express");
const app = express();
require("dotenv").config();
const cors = require("cors");
const axios = require("axios");
app.use(cors());

const PORT = process.env.PORT;

// ------------------------------------------------------

//const weatherData = require('./data/weather.json');
const { response } = require("express");

app.get("/", (req, res) => {
  res.send("Server says haaaaayyyyy");
});
//http://api.weatherbit.io/v2.0/forecast/daily?key=${process.env.WEATHER_KEY}&lon=${lon}&lat=${lat}`;

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
let getMovies = async (req, res) => {
  const cityName = req.query.cityName;
  const Mkey = '12f58ca1d8616215ed09c24df72ebb62'
    const URL = `https://api.themoviedb.org/3/search/movie?api_key=${Mkey}&language=en-US&query=${cityName}&page=1&include_adult=true`;

    axios.get(URL).then( result => {
        let sendData = result.data.results.map( item => {
            return new MovieData(item);
        })
        return res.status(200).send(sendData);
    }).catch(error => {
        return res.status(404).send(error)
    })
};
app.get("/weather", getWeather);
app.get("/movie", getMovies);

app.get("/*", (req, res) => {
  response.status(404).send("Sorry, route not found");
});

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});

class Forecast {
  constructor(i) {
    this.date = i.datetime;
    this.low_temp = i.low_temp;
    this.max_temp = i.max_temp;
    this.description = i.weather.description;
  }
}
class MovieData {
  constructor(item) {
    this.title = item.title;
    this.overview = item.overview;
    this.vote_average = item.vote_average;
    this.vote_count = item.vote_count;
    this.poster_path = "https://image.tmdb.org/t/p/w500/" + item.poster_path;
    this.popularity = item.popularity;
    this.release_date = item.release_date;
  }
}
