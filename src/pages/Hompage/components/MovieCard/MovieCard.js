import React from 'react'
import { Badge } from 'react-bootstrap'
import './MovieCard.style.css'
const MovieCard = (movie) => {
  console.log('movie', movie.movie)
  return (
    <div
      style={{backgroundImage:`url(https://www.themoviedb.org/t/p/w1066_and_h600_bestv2${movie?.movie.poster_path})`}}
      className='movie-card'  
    >
      <div className='overlay'>
        <h4>{movie.movie.title}</h4>
        {movie.movie.genre_ids.map((id) => (
          <Badge bg='danger'>{id}</Badge>
          ))}
        <div>
          <div>{movie.movie.vote_average}</div>
          <div>{movie.movie.popularity}</div>
          <div className={`adult ${movie.movie.adult === "18" ? "" : "all"}`}>
          {movie.movie.adult ? "18" : "All"}
        </div>
          <div>{movie.movie.adult ? "over18" : "under18"}</div>
        </div>
      </div>
    </div>
  )
}

export default MovieCard