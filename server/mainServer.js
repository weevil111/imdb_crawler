const moviesData = require("./movies.json");
const express = require('express');
const {getUniqueArrayFieldValues, filterMovies} = require("./utility");

const port = 3001;
const app = express();
app.use(express.json());

app.get("/selectorFields", (req, res)=> {
  const directors = getUniqueArrayFieldValues(moviesData, "directors");
  const stars = getUniqueArrayFieldValues(moviesData, "stars");
  const genres = getUniqueArrayFieldValues(moviesData, "genre");
  const certificates = getUniqueArrayFieldValues(moviesData, "certificate")
  res.json({
    directors,
    stars,
    genres,
    certificates
  })
})

app.post("/search", (req, res) => {
  console.log(req.body.filters);
  let result = filterMovies(moviesData, req.body.filters);
  res.status(200).json(result);
})

app.listen(port, () => {
  console.log("App started on port ",port);
})