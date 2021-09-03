import { useEffect, useState } from "react";
import Header from "./components/Header";
import MovieList from "./components/MovieList";
const BASEURL = "http://localhost:3001";

async function fetchMovies(page = 1, limit = 10, query = {}) {
  const response = await fetch(`${BASEURL}/search?$page=${page}&limit=${limit}`, {
    method: 'POST',
    body: {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(query)
    }
  })
  const data = await response.json();
  return data;
}

function App() {
  const [movies, setMovies] = useState([]);
  useEffect(() => {
    (async function() {
      const movies = await fetchMovies();
      setMovies(movies);
    })();
  }, [])
  return (
    <>
      <Header></Header>
      <MovieList movies={movies}></MovieList>
    </>
  );
}

export default App;
