import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Container, Spinner, Button, Row, Col, Alert, ProgressBar } from "react-bootstrap";
import axios from "axios";
import io from "socket.io-client";
import { motion, AnimatePresence } from "framer-motion";
import { FaHeart, FaRegHeart } from "react-icons/fa";

const API_KEY = "6fe1cc64430eb530bef8e904fba8f41c";
const BASE_URL = "https://api.themoviedb.org/3";
const SOCKET_SERVER = "http://localhost:5000"; // À modifier en prod

const MovieDetails = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [freeLinks, setFreeLinks] = useState([]);
  const [error, setError] = useState(null);
  const [loadingSources, setLoadingSources] = useState(true);
  const [progress, setProgress] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const socket = io(SOCKET_SERVER);

    const fetchMovieDetails = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/movie/${id}`, {
          params: { api_key: API_KEY, language: "fr-FR" },
        });
        setMovie(response.data);
        checkFavorite(response.data);
        if (response.data.title) {
          searchFreeLinks(response.data.title);
        }
      } catch (error) {
        console.error("❌ Erreur lors de la récupération du film :", error);
        setError("Impossible de récupérer les détails du film.");
      }
      setLoading(false);
    };

    const searchFreeLinks = async (title) => {
      try {
        await axios.get(`http://localhost:5000/search-advanced?title=${encodeURIComponent(title)}`);
      } catch (error) {
        console.error("❌ Erreur lors du lancement de la recherche :", error);
      }
    };

    socket.on("search-started", () => {
      setLoadingSources(true);
      setFreeLinks([]);
      setProgress(10);
    });

    socket.on("search-update", ({ source, results }) => {
      if (results.length > 0) {
        setFreeLinks((prevLinks) => [...prevLinks, ...results]);
        setProgress((prev) => Math.min(prev + 15, 100));
      }
    });

    socket.on("search-finished", () => {
      setLoadingSources(false);
      setProgress(100);
      setTimeout(() => setProgress(0), 1000);
    });

    fetchMovieDetails();
    return () => socket.disconnect();
  }, [id]);

  const checkFavorite = (movieData) => {
    const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    const exists = storedFavorites.some((fav) => fav.id === movieData.id);
    setIsFavorite(exists);
  };

  const toggleFavorite = () => {
    let storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];

    if (isFavorite) {
      storedFavorites = storedFavorites.filter((fav) => fav.id !== movie.id);
    } else {
      storedFavorites.push({
        id: movie.id,
        title: movie.title,
        image: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
      });
    }

    localStorage.setItem("favorites", JSON.stringify(storedFavorites));
    setIsFavorite(!isFavorite);
  };

  if (loading) {
    return (
      <Container className="text-center my-5">
        <Spinner animation="border" variant="danger" />
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="text-center my-5">
        <Alert variant="danger">{error}</Alert>
      </Container>
    );
  }

  return (
    <Container className="mt-4 text-white">
      <div className="position-relative">
        <img
          src={`https://image.tmdb.org/t/p/w500${movie?.poster_path}`}
          alt={movie?.title}
          className="img-fluid my-3 rounded w-10"
        />
        <Button
          variant={isFavorite ? "warning" : "outline-warning"}
          className="position-absolute top-0 end-0 m-3"
          onClick={toggleFavorite}
          style={{ fontSize: "1.5rem", padding: "10px 15px", borderRadius: "50%" }}
        >
          {isFavorite ? <FaHeart /> : <FaRegHeart />}
        </Button>
      </div>

      <h2 className="fw-bold text-danger">{movie?.title || "Titre inconnu"}</h2>
      <p><strong>Date de sortie :</strong> {movie?.release_date || "Non disponible"}</p>
      <p><strong>Note :</strong> {movie?.vote_average || "N/A"} / 10</p>
      <p>{movie?.overview || "Aucune description disponible"}</p>

      {/* Barre de progression pendant la recherche */}
      {loadingSources && <ProgressBar animated now={progress} className="mb-3" />}

      <h4 className="mt-4">📺 Liens trouvés :</h4>
      <AnimatePresence>
        {freeLinks.length > 0 ? (
          <Row>
            {freeLinks.map((link, index) => (
              <Col key={`${link.url}-${index}`} md={6} className="mb-3">
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                >
                  <Button href={link.url} target="_blank" variant="info" className="w-100">
                    📲 {link.title || "Lien disponible"}
                  </Button>
                </motion.div>
              </Col>
            ))}
          </Row>
        ) : (
          !loadingSources && <p className="text-muted">Aucun lien trouvé pour l'instant.</p>
        )}
      </AnimatePresence>

      <Button
        variant="warning"
        className="mt-3"
        onClick={() => window.open(`https://www.google.com/search?q=site:t.me/s "${movie?.title} streaming film VF"`, "_blank")}
      >
        🔍 Chercher sur Google
      </Button>
    </Container>
  );
};

export default MovieDetails;
