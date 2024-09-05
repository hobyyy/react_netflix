import React from 'react'
import { useParams } from 'react-router-dom'
import { useMovieDetailInfoQeury } from '../../hooks/useMovieDetailInfo'
import { Container, Row, Col, Alert, Spinner, Badge } from 'react-bootstrap'
import './MovieDetailPage.style.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from '@fortawesome/free-regular-svg-icons';

const MovieDetailPage = ({movie}) => {
  // console.log('detail',movie)
  const {id} = useParams();
  const {data, isLoading, isError, error} = useMovieDetailInfoQeury(id);
    
  console.log('ddd', data)
  // const posterUrl = url('https://www.themoviedb.org/t/p/w1066_and_h600_bestv2' + data.poster_path;

  // console.log('posterUrl', posterUrl)
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
        <Col md={6} sm={12}>

        </Col>
        <Col md={6} sm={12}>
          {/* <img src=concat('https://www.themoviedb.org/t/p/w1066_and_h600_bestv2',{data.poster_path}) style={{ width: "28rem", height: "17rem" }}/> */}
          <div className='movie-card-title'>
            <div className='h4'>{data.original_title}</div>
            <div>{data.tagline}</div>
          </div>
          <Badge bg='secondary' style={{ margin: "4px" }}>
            {data.adult ? "18" : "All"}
          </Badge>
          {data.genres.map((genre, index) => (
            <Badge bg='danger' key={genre.index} className='me-1'>
              {genre.name}
            </Badge>
          ))}

          <div>
            <div className="movie-vote">
              ★ {Math.floor(data.vote_average * 10) / 10}
            </div>
            <div className="movie-popularity">
              <FontAwesomeIcon icon={faUser} /> {Math.floor(data.popularity)}
            </div>
            <span>{data.release_date.substr(0,4)} | </span>
            <span>{data.runtime}분</span>
          </div>
          <div>{data.overview}</div>
        </Col>
      </Row>
    </Container>
  )
}

export default MovieDetailPage