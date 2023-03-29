const express = require("express");
const app = express();
const sqlite = require("sqlite");
const sqlite3 = require("sqlite3");
const path = require("path");
const { open } = require("sqlite");
let movieDatabase = path.join(__dirname, "moviesData.db");
let db = null;

const initialization = async () => {
  try {
    db = await open({ filename: movieDatabase, driver: sqlite3.Database });
    app.listen(3001, () => {
      console.log("server started successfully");
    });
  } catch (e) {
    console.log(e.message);
    process.exit(1);
  }
};

initialization();

// API 1

app.get("/movies/", async (request, response) => {
  const getMoviesQuery = `SELECT *
    FROM
    movie
    ORDER BY
    movie_id`;

  let moviesList = await db.all(getMoviesQuery);
  response.send(moviesList);
});

// API 2

app.post("/movies/", async (request, response) => {
  const movieDetails = request.body;
  const { directorId, movieName, leadActor } = movieDetails;
  const addMovieQuery = `
    INSERT INTO
      movie (director_id,movie_name,lead_actor)
    VALUES
      (
       
        
         
         ${6},
         
        '${JurassicPark}',
        
       '${JeffGoldblum}'
      );`;

  const dbResponse = await db.run(addMovieQuery);

  response.send("movie added");
});
