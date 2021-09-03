import React from 'react'
import "./movielist.css";
import Pagination from '@material-ui/lab/Pagination';

function MovieList({ movies, setPagination }) {

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
            {infoproperties.map(infoName =>{ 
              if(infoName==="img"){
                return <></>
              }
              return (
              <div className="info-container" key={infoName}>
                <div className="info-title">
                  {infoName}
                </div>
                <div className="info-description">
                  {movie[infoName]}
                </div>
              </div>
             ) })}
          </div>
        </div>
      ))}
      <Pagination 
        style={{textAlign: "center"}} 
        onChange={(e,value) => setPagination(value)}
        count={movies.data.length} 
        color="primary" />
    </>) : <div> No movies found</div>
}

export default MovieList
