import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import MovieCard from "../components/MovieCard";

const FavoritesPage = () => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const savedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(savedFavorites);
  }, []);

  const clearFavorites = () => {
    localStorage.removeItem("favorites");
    setFavorites([]);
  };

  return (
    <Container className="mt-4">
      <h2 className="text-center text-white mb-4">⭐ Mes Favoris</h2>
      {favorites.length === 0 ? (
        <p className="text-center text-white">Aucun favori enregistré.</p>
      ) : (
        <>
          <Row>
            {favorites.map((fav) => (
              <Col key={fav.id} md={4} className="d-flex justify-content-center">
                <MovieCard {...fav} />
              </Col>
            ))}
          </Row>
          <div className="text-center mt-4">
            <Button variant="danger" onClick={clearFavorites}>Effacer tous les favoris</Button>
          </div>
        </>
      )}
    </Container>
  );
};

export default FavoritesPage;
