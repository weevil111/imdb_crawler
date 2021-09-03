import React, { useState } from 'react'
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { Button, TextField } from '@material-ui/core';
import "./Header.css"
import { fetchMovies } from '../utils';

function Header({ selectorFields, setMovieFields }) {
  const [searchText, setSearchText] = useState("");
  const [imdbRating, setImdbRating] = useState("");
  const [metaScore, setMetaScore] = useState("");
  const [year, setYear] = useState("")
  const [runtime, setRuntime] = useState("")
  const [director, setDirector] = useState("");
  const [star, setStar] = useState("")
  const [genre, setGenre] = useState("")
  const [certifcate, setCertifcate] = useState("");

  const handleSearch = async function(){
    const movies = await fetchMovies(1,10,{
      title: searchText,
      year,
      certifcate,
      imdbRating,
      metascore: metaScore,
      runtime,
      genre,
      director:director,
      stars: star
    });
    console.log(movies)
    setMovieFields(movies);
  }

  return (selectorFields ? (
    <div className="filters">
      <div className="textfields">
        <TextField
          label="Search"
          type="text"
          variant="outlined"
          value={searchText}
          size="small"
          onChange={(e) => setSearchText(e.target.value)}
        ></TextField>
        <TextField
          label="IMDB rating (greater than) "
          type="number"
          variant="outlined"
          value={imdbRating}
          size="small"
          onChange={(e) => setImdbRating(Number(e.target.value))}
        ></TextField>
        <TextField
          label="Metascore (greater than) "
          type="number"
          variant="outlined"
          value={metaScore}
          size="small"
          onChange={(e) => setMetaScore(Number(e.target.value))}
        ></TextField>
        <TextField
          label="Year (greater than) "
          type="number"
          variant="outlined"
          value={year}
          size="small"
          onChange={(e) => setYear(Number(e.target.value))}
        ></TextField>
        <TextField
          label="Runtime (greater than) "
          type="number"
          variant="outlined"
          value={runtime}
          size="small"
          onChange={(e) => setRuntime(Number(e.target.value))}
        ></TextField>
      </div>
      <div className="selectors">
        <FormControl>
          <InputLabel id="director-lable">Director</InputLabel>
          <Select
            labelId="director-lable"
            id="director-select"
            value={director}
            onChange={(e) => setDirector(e.target.value)}
          >
            {selectorFields.directors.map((val, index) => (
              <MenuItem value={val} key={index}>{val}</MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl>
          <InputLabel id="stars-label">Star</InputLabel>
          <Select
            labelId="stars-label"
            id="star-select"
            value={star}
            onChange={(e) => setStar(e.target.value)}
          >
            {selectorFields.stars.map((val, index) => (
              <MenuItem value={val} key={index}>{val}</MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl>
          <InputLabel id="genre-label">Genres</InputLabel>
          <Select
            labelId="genre-label"
            id="genre-select"
            value={genre}
            onChange={(e) => setGenre(e.target.value)}
          >
            {selectorFields.genres.map((val, index) => (
              <MenuItem value={val} key={index}>{val}</MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl>
          <InputLabel id="certificate-label">Certification</InputLabel>
          <Select
            labelId="certificate-label"
            id="certificate-select"
            value={certifcate}
            onChange={(e) => setCertifcate(e.target.value)}
          >
            {selectorFields.certificates.map((val, index) => (
              <MenuItem value={val} key={index}>{val}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
      <Button 
        variant="contained" 
        color="primary"
        onClick={handleSearch}
        >Search</Button>
    </div>) : <></>
  )
}

export default Header
