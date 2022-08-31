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



//app.get("/weather", getWeather);

//app.get("/movie", getMovies);
const getWeather = require('./getweather')
const getMovies = require('./getmovie')

app.get('/weather', getWeather)
app.get('/movie', getMovies)

app.get("/*", (req, res) => {
  response.status(404).send("Sorry, route not found");
});

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});


