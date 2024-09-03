import React from 'react'
import { Badge } from 'react-bootstrap'
import './MovieCard.style.css'
import { useMovieGenreQuery } from '../../hooks/useMovieGenre'


const MovieCard = (movie) => {
  const { data:genreData } = useMovieGenreQuery();
  const showGenre = (genreIDList) => {
    if(!genreData) return[]
    const genreNameList = genreIDList.map((id) => {
      const genreObj = genreData.find((genre) => genre.id === id)
      return genreObj.name
    })
    return genreNameList
  }
  return (
    <div
      style={{backgroundImage:`url(https://www.themoviedb.org/t/p/w1066_and_h600_bestv2${movie?.movie.poster_path})`}}
      className='movie-card'  
    >
      <div className='overlay'>
        <h4>{movie.movie.title}</h4>
        {showGenre(movie.movie.genre_ids).map((genre, index) => (
          <Badge bg='danger' key={index} className='me-1'>
            {genre}
          </Badge>
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