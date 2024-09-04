import React, { useState } from 'react'
import { useSearchMovieQuery } from '../../hooks/useSearchMovie'
import { useSearchParams } from 'react-router-dom';
import { Alert, Container, Row, Col, Spinner } from 'react-bootstrap';
import MovieCard from '../../common/MovieCard/MovieCard.js'
import ReactPaginate from 'react-paginate';

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

  const {data,isLoading,isError,error} = useSearchMovieQuery({keyword, page});
  // console.log('ddd',data)

  const handlePageClick = ({selected}) => {
    setPage(selected + 1);
  }
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
  return (
    <Container>
      <Row>
        <Col lg={4} xs={12}>필터</Col>
        <Col lg={8} xs={12}>
          <Row>
            {data?.results.map((movie,index)=>
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
              pageCount={data?.total_pages} // 전체 page
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
  )
  
}

export default MoviePage