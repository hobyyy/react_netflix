import React, { useEffect, useState } from 'react'
import { useSearchMovieQuery } from '../../hooks/useSearchMovie'
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Alert, Container, Row, Col, Spinner } from 'react-bootstrap';
import MovieCard from '../../common/MovieCard/MovieCard.js'
import ReactPaginate from 'react-paginate';
import { useMovieGenreQuery } from '../../hooks/useMovieGenre.js';
import './MoviePage.style.css';
import NotFoundPage from '../NotFoundPage/NotFoundPage.js';
// 경로 2가지
// 1. nav-bar에서 클릭해서 온 경우 => popularMovie 보여주기
// 2. keyword를 입력해서 온 경우 => keyword와 관련된 영화들을 보여주기

// pagenation 설치
// page state 만들기
// page 클릭할때마다 page 바꿔주기
// page 값이 바뀔때 마다 useSearchMovie에 page넣어서 fetch
const MoviePage = () => {
  // url에서 keyword 가져오기
  const [query,setQeury] = useSearchParams();
  const keyword = query.get("q");
  
  // page state
  const [page,setPage] = useState(1);
  const handlePageClick = ({selected}) => {
    setPage(selected + 1);
  }
  
  // genre toggle
  const [selectedMovies,setSelectedMovies] = useState([]);
  const genre = query.get("g");

  const {data:genreData} = useMovieGenreQuery();
  const {data:movieData,isLoading,isError,error} = useSearchMovieQuery({keyword, genre, page});
  const navigate = useNavigate();
  // console.log('ddd',data)

  useEffect(() => {
    if(!keyword && genre) {
      const filteredMovieArray = movieData?.results?.filter((movie) => 
        genre ? movie.genre_ids.includes(Number(genre)) : true
      ) || [];
      setSelectedMovies(filteredMovieArray);
    }
  }, [movieData, genre, page, keyword])

  if(isLoading) {
    return (
      <div className='spinner-area'>
        <Spinner
          animation='border'
          variant='danger'
          style={{ width: "5rem", height: "5rem"}}
        />
      </div>
    )
  }
  if(isError) {
    return <Alert variant='danger'>{error.message}</Alert>
  }

  // const showMoviesByGenre = (genreID) => {
  //   navigate(`/movies?g=${genreID}`)
  //   const filteredMovieArray = movieData?.results?.filter((movie) => 
  //     genreID ? movie.genre_ids.includes(Number(genreID)) : true
  //   ) || [];
  //   console.log('filteredMovieArray', filteredMovieArray)
  //   setPage(1);
  //   return setSelectedMovies(filteredMovieArray);
  // }
  
  const showMoviesByGenre = (genreId) => {
    navigate(`/movies?g=${genreId}`)
    const filteredMovieArray = movieData?.results?.filter((movie) =>
      genreId ? movie.genre_ids.includes(Number(genreId)) : true
    ) || [];
    console.log('filteredMovieArray', filteredMovieArray)
    // setPage(1);
    setSelectedMovies(filteredMovieArray);
  }
  console.log('data1',movieData)
  console.log('data2',genreData)
  return (
    <div>
      {movieData?.total_results === 0 
        ? <NotFoundPage errorType={'noSearch'}></NotFoundPage>
        : <Container>
          <div className='moviepage-genreList'>
            {genreData?.map((genre,index) => (
              <button key={index} onClick={()=>showMoviesByGenre(genre.id)}>{genre.name}</button>
            ))}
          </div>
          <Row>
            <Col>
              <Row>
                {movieData?.results.map((movie,index)=>
                  <Col key={index}>
                    <MovieCard movie={movie}/>
                  </Col>
                )}
              </Row>
                <ReactPaginate
                  nextLabel="next >"
                  onPageChange={handlePageClick}
                  pageRangeDisplayed={3}
                  marginPagesDisplayed={2}
                  pageCount={movieData?.total_pages} // 전체 page
                  previousLabel="< previous"
                  pageClassName="page-item"
                  pageLinkClassName="page-link"
                  previousClassName="page-item"
                  previousLinkClassName="page-link"
                  nextClassName="page-item"
                  nextLinkClassName="page-link"
                  breakLabel="..."
                  breakClassName="page-item"
                  breakLinkClassName="page-link"
                  containerClassName="pagination"
                  activeClassName="active"
                  renderOnZeroPageCount={null}
                  forcePage={page-1}
                />
            </Col>
          </Row>
        </Container>
      }
    </div>
    
  )
  
}

export default MoviePage