import React from "react";
import { Container } from "react-bootstrap";

const Footer = () => {
  return (
    <footer className="bg-black text-white text-center py-3 mt-5">
      <Container>
        <p className="m-0">
          &copy; {new Date().getFullYear()} 🎬 CineVault - Tous droits réservés.
        </p>
      </Container>
    </footer>
  );
};

export default Footer;
