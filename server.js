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
  let movies = req.query.city;
  const key = '12f58ca1d8616215ed09c24df72ebb62';
  try{
    let localMovies = await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${key}&language=en-US&query=${movies}&page=1&include_adult=true`);
    let moviesOut = [];
    localMovies.data.results.forEach((i) => {
      moviesOut.push( new Movie (i.title, i.overview, i.vote_average, i.vote_count, `https://image.tmdb.org/t/p/w500/${i.poster_path}`, i.popularity, i.release_date))
    })
    res.send(moviesOut)
    console.log(moviesOut);
  }
  catch(err) {
    console.error(err.message)
  }
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
};
class Movie {
  constructor(title, overview, avgVote, sumVote, imgPath, popularity, release) {
    this.title = title,
    this.overview = overview,
    this.avgVote = avgVote,
    this.sumVote = sumVote,
    this.imgPath = imgPath,
    this.popularity = popularity,
    this.release = release
  }
};
