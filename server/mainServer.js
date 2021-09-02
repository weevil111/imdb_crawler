const moviesData = require("./movies.json");
const express = require('express');
const {getUniqueArrayFieldValues} = require("./utility");

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

app.post("/", (req, res) => {
  console.log(req.query);
  res.status(200).send("Hello");
})

app.listen(port, () => {
  console.log("App started on port ",port);
})