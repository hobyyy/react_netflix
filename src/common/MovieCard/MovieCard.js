import React from 'react'
import { Badge } from 'react-bootstrap'
import './MovieCard.style.css'
import { useMovieGenreQuery } from '../../hooks/useMovieGenre'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from '@fortawesome/free-regular-svg-icons';

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
        <div className='movie-card-title'>
          <div className='h4'>{movie.movie.title}</div>
          <div className={`adult ${movie.movie.adult === "18" ? "" : "all"}`}>
            {movie.movie.adult ? "18" : "All"}
          </div>
        </div>
        {showGenre(movie.movie.genre_ids).map((genre, index) => (
          <Badge bg='danger' key={index} className='me-1'>
            {genre}
          </Badge>
          ))}
        <div>
          <div className="movie-vote">
            ★ {Math.floor(movie.movie.vote_average * 10) / 10}
          </div>
          <div className="movie-popularity">
            <FontAwesomeIcon icon={faUser} /> {Math.floor(movie.movie.popularity)}
          </div>

        </div>
      </div>
    </div>
  )
}

export default MovieCard