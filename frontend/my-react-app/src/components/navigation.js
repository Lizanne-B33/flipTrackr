// Code accreditation: https://medium.com/@ronakchitlangya1997/jwt-authentication-with-react-js-and-django-c034aae1e60d
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import Container from 'react-bootstrap/Container'
import { Link } from 'react-router-dom'
import logo from '../media/logo.png'

export function Navigation({ isAuth }) {
  return (
    <Navbar bg="light" variant="light" expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/">
          <img
            alt="flipTrackr logo"
            src={logo}
            width="50"
            className="d-inline-block align-top ms-2"
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {isAuth && (
              <Nav.Link as={Link} to="/">
                Home
              </Nav.Link>
            )}
          </Nav>
          <Nav>
            {isAuth ? (
              <Nav.Link as={Link} to="/logout">
                Logout
              </Nav.Link>
            ) : (
              <Nav.Link as={Link} to="/login">
                Login
              </Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}
