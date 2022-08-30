require('dotenv').config();
const express = require('express'); //import express framework
const cors = require('cors');
const server = express();
const data = require('./data/weather.json');

server.use(cors()); // make the server opened for any request



const PORT = process.env.PORT;

server.get('/',(req,res)=>{
    res.send("Hi from the home route");
})

app.get('/weather', (req, res) => {
    let q = req.query.q;
    let lat = req.query.lat;
    let lon = req.query.lon;})


server.listen(PORT, () => {
    console.log(`Hello, I am listening on ${PORT}`);
})

server.get('*', (req,res)=>{
    res.send("page not found");
})


class Forecast {
    constructor(date, description) {
   
    }
  }
