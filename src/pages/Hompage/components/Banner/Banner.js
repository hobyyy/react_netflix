import React from 'react'
import { usePopularMoviesQuery } from '../../../../hooks/usePopularMovies'


const Banner = () => {
  const {data} = usePopularMoviesQuery();
  console.log('data', data.results);
  return (
    <div>
      
    </div>
  )
}

export default Banner