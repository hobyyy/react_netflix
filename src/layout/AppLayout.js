import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Outlet, useNavigate } from 'react-router-dom'; // router 안에 있는 자손들을 가지고 올 수 있게 도와주는 컴포넌트 
const AppLayout = () => {
  const [keyword, setKeyword] = useState("");
  const navigate = useNavigate();
  const searchByKeyword = (event) => {
    event.preventDefault();
    //url 바꿔주기
    navigate(`/movies?q=${keyword}`);
    setKeyword('');
  }
  return (
    <div>
      <Navbar 
        bg="dark"
        data-bs-theme="dark"
        expand="lg" 
        className="bg-body-tertiary bg-dark"
      >
        <Container fluid>
          <a className="logo" href="/">
            <img 
              width='100' 
              src={`${process.env.PUBLIC_URL}/textlogo.png`}
            />
          </a>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
          <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: '100px' }}
              navbarScroll
          >
            <Nav.Link className="text-white" href="/" >Home</Nav.Link>
            <Nav.Link className="text-white" href="/movies" >Movies</Nav.Link>
          </Nav>
          <Form className="d-flex" onSubmit={searchByKeyword}>
              <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
              value={keyword}
              onChange={(event) => setKeyword(event.target.value)}
              />
              <Button variant="outline-danger">Search</Button>
          </Form>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Outlet/>
    </div>
  )
}

export default AppLayout