import React from 'react'
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Outlet } from 'react-router-dom'; // router 안에 있는 자손들을 가지고 올 수 있게 도와주는 컴포넌트 
const AppLayout = () => {
  return (
    <div>
      <Navbar expand="lg" className="bg-body-tertiary bg-dark">
        <Container fluid>
          {/* <img width='100' src='/textlogo.png'/> */}
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
          <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: '100px' }}
              navbarScroll
          >
            <Nav.Link className="text-white" href="/" >Home</Nav.Link>
            <Nav.Link className="text-white" href="/Movies" >Movies</Nav.Link>
          </Nav>
          <Form className="d-flex">
              <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
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