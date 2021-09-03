import React from 'react'
import "./movielist.css";

function MovieList({ movies }) {

  let infoproperties = [];
  if (movies.data?.length > 0) {
    infoproperties = Object.keys(movies.data[0]);
  }

  return movies.data?.length > 0 ? (
    <>
      {movies.data.map(movie => (
        <div className="container" key={movie.rank}>
          <div className="left">
            <img src={movie.img} alt="" />
          </div>
          <div className="right">
            {infoproperties.map(infoName => (
              <div className="info-container" key={infoName}>
                <div className="info-title">
                  {infoName}
                </div>
                <div className="info-description">
                  {movie[infoName]}
                </div>
              </div>
          ))}
          </div>
        </div>
      ))}
    </>) : <></>
}

      export default MovieList
