import React from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import SearchBar from "./SearchBar";

const Header = () => {
  return (
    <Navbar bg="black" variant="dark" expand="lg" className="shadow">
      <Container>
        <Navbar.Brand as={Link} to="/" className="fw-bold text-white">
          CineVault
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbar-nav" />
        <Navbar.Collapse id="navbar-nav">
          <Nav className="ms-auto me-3">
            <Nav.Link as={Link} to="/">Accueil</Nav.Link>
            <Nav.Link as={Link} to="/films">Films</Nav.Link>
            <Nav.Link as={Link} to="/series">Séries</Nav.Link>
            <Nav.Link as={Link} to="/favoris">⭐ Favoris</Nav.Link>

          </Nav>
          <SearchBar />
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
