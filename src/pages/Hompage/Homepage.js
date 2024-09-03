import React from 'react'
import Banner from './components/Banner/Banner'
import PopularMovieSlide from './components/PopularMovieSlide/PopularMovieSlide'
import UpcomingMovieSlide from './components/UpcomingMovieSlide/UpcomingMovieSlide'
import NowPlayingMovieSlide from './components/NowPlayingMovieSlide/NowPlayingMovieSlide'
// 1. 배너 => popular movie를 들고와서 첫번째 아이템을 보여주자.
// 2. popular movie
// 3. top rated movie
// 4. upcoming movie 

const Homepage = () => {
  return (
    <div>
      <Banner/>
      <NowPlayingMovieSlide/>
      <PopularMovieSlide/>
      <UpcomingMovieSlide/>
    </div>
  )
}

export default Homepage