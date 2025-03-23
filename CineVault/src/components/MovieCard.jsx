import React, { useState, useEffect } from "react";
import { Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const MovieCard = ({ id, title, description, image, isSerie = false }) => {
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setIsFavorite(favorites.some((fav) => fav.id === id));
  }, [id]);

  const toggleFavorite = () => {
    let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

    if (isFavorite) {
      favorites = favorites.filter((fav) => fav.id !== id);
    } else {
      favorites.push({ id, title, image, isSerie });
    }

    localStorage.setItem("favorites", JSON.stringify(favorites));
    setIsFavorite(!isFavorite);
  };

  return (
    <Card className="mb-4 shadow-lg border-0 bg-dark text-white" style={{ width: "18rem" }}>
      <Card.Img variant="top" src={image} alt={title} className="rounded" />
      <Card.Body>
        <Card.Title className="fw-bold">{title}</Card.Title>
        <Card.Text>{description}</Card.Text>
        <Link to={isSerie ? `/series/${id}` : `/movie/${id}`}>
          <Button variant="primary" className="w-100 mb-2">Voir les détails 🎬</Button>
        </Link>
        <Button variant={isFavorite ? "warning" : "outline-warning"} onClick={toggleFavorite} className="w-100">
          {isFavorite ? "★ Favori" : "☆ Ajouter aux favoris"}
        </Button>
      </Card.Body>
    </Card>
  );
};

export default MovieCard;
