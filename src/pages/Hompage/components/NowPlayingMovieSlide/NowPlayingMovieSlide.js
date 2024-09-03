import React from 'react'
import { useNowPlayingMoviesQuery } from '../../../../hooks/useNowPlayingMovies';
import { Alert } from 'bootstrap'
import { MovieSlider } from '../../../../common/MovieSlider/MovieSlider';
import { responsive } from '../../../../constants/responsive';

const NowPlayingMovieSlide = () => {
  const {data, isLoading, isError, error} = useNowPlayingMoviesQuery()
  if(isLoading) {
    return <h1>Loading...</h1>
  }
  if(isError) {
    return <Alert variant='danger'>{error.message}</Alert>
  }
  return (
    <div>
      <MovieSlider 
        title='Now Playing Movies' 
        movies={data?.results} 
        responsive={responsive}
      />
    </div>
  )
}

export default NowPlayingMovieSlide