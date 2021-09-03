import { useEffect, useState } from "react";
import Header from "./components/Header";
import MovieList from "./components/MovieList";
import {fetchMovies, fetchSelectorFields} from "./utils.js"

function App() {
  const [movies, setMovies] = useState([]);
  const [selectorFields, setSelectorFields] = useState(null)
  const [pagination, setPagination] = useState(1);

  useEffect(()=> {
    (async function() {
      const movies = await fetchMovies(pagination);
      setMovies(movies);
    })();
  }, [pagination])

  useEffect(() => {
    (async function() {
      const movies = await fetchMovies();
      const selectorFields = await fetchSelectorFields();
      setMovies(movies);
      setSelectorFields(selectorFields);
    })();
  }, [])
  return (
    <>
      <Header selectorFields={selectorFields} setMovieFields={setMovies}></Header>
      <MovieList movies={movies} setPagination={setPagination}></MovieList>
    </>
  );
}

export default App;
