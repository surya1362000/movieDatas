const express = require("express");
const app = express();
const sqlite = require("sqlite");
const sqlite3 = require("sqlite3");
const path = require("path");
const { open } = require("sqlite");
let movieDatabase = path.join(__dirname, "moviesData.db");
let db = null;
app.use(express.json());

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
  const getMoviesQuery = `SELECT movie_name
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
       
       
         
         ${directorId},
         
        '${movieName}',
        
       '${leadActor}'
      );`;

  const dbResponse = await db.run(addMovieQuery);

  response.send("movie added");
});

// API 3

app.get("/movies/:movieId/", async (request, response) => {
  const { movieId } = request.params;

  const getMovieQuery = `SELECT * 
    FROM 
    movie
    WHERE
    movie_id = ${movieId};`;
  const API3 = await db.get(getMovieQuery);
  response.send(API3);
});

// API 5 (delete)

app.delete("/movies/:movieId/", async (request, response) => {
  const { movieId } = request.params;
  const movieDeleteQuery = `DELETE FROM
    movie
    WHERE
    movie_id = ${movieId}`;
  const API4 = await db.run(movieDeleteQuery);
  response.send("Movie Removed");
});

// API 6

app.get("/directors/", async (request, response) => {
  const directorsQuery = `SELECT *
    FROM
    director
    ORDER BY
    director_id;`;

  const API6 = await db.all(directorsQuery);
  response.send(API6);
});

// API 7

app.get("/directors/:directorId/movies/", async (request, response) => {
  const { directorId } = request.params;

  const directorMovieQuery = `SELECT 
    movie_name 
    FROM
    movie
    WHERE
    director_id = ${directorId};`;
  const API7 = await db.all(directorMovieQuery);
  response.send(API7);
});

module.exports = app;
