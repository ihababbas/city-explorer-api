const axios = require("axios");
let myMemory = {};
let getMovies = async (req, res) => {
  let movies = req.query.city;
  const key = "12f58ca1d8616215ed09c24df72ebb62";
  if(myMemory[movies]){
    console.log("I have the data!")
   res.status(200).send(myMemory[movies]);
  }
  
  try {
    let localMovies = await axios.get(
      `https://api.themoviedb.org/3/search/movie?api_key=${key}&language=en-US&query=${movies}&page=1&include_adult=true`
    );
       
    let moviesOut = [];
    localMovies.data.results.forEach((i) => {
      moviesOut.push(
        new Movie(
          i.title,
          i.overview,
          i.vote_average,
          i.vote_count,
          `https://image.tmdb.org/t/p/w500/${i.poster_path}`,
          i.popularity,
          i.release_date
        )       
      );
    });
    myMemory[movies] = moviesOut; 
    res.send(moviesOut);
    console.log(moviesOut);
  }
   catch (err) {
    console.error(err.message);
  }
};

class Movie {
  constructor(title, overview, avgVote, sumVote, imgPath, popularity, release) {
    (this.title = title),
      (this.overview = overview),
      (this.avgVote = avgVote),
      (this.sumVote = sumVote),
      (this.imgPath = imgPath),
      (this.popularity = popularity),
      (this.release = release);
  }
}
module.exports = getMovies;
