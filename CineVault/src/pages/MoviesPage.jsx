import React, { useEffect, useState } from "react";
import { Container, Row, Col, Spinner, Button } from "react-bootstrap";
import MovieCard from "../components/MovieCard";
import axios from "axios";

const API_KEY = "6fe1cc64430eb530bef8e904fba8f41c";
const BASE_URL = "https://api.themoviedb.org/3";

const MoviesPage = () => {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);

  useEffect(() => {
    fetchMovies(1);
  }, []);

  const fetchMovies = async (pageNumber) => {
    try {
      const response = await axios.get(`${BASE_URL}/movie/popular`, {
        params: { api_key: API_KEY, language: "fr-FR", page: pageNumber },
      });

      setMovies((prevMovies) => [...prevMovies, ...response.data.results]);
      setLoading(false);
      setLoadingMore(false);
    } catch (error) {
      console.error("Erreur lors de la récupération des films :", error);
    }
  };

  const loadMoreMovies = () => {
    setLoadingMore(true);
    setPage((prevPage) => {
      const nextPage = prevPage + 1;
      fetchMovies(nextPage);
      return nextPage;
    });
  };

  return (
    <Container className="mt-4">
      <h2 className="text-center text-white mb-4">🎬 Tous les Films</h2>
      {loading ? (
        <div className="text-center">
          <Spinner animation="border" variant="danger" />
        </div>
      ) : (
        <>
          <Row>
            {movies.map((movie) => (
              <Col key={movie.id} md={4} className="d-flex justify-content-center">
                <MovieCard
                  id={movie.id}
                  title={movie.title}
                  description={movie.overview.substring(0, 100) + "..."}
                  image={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                />
              </Col>
            ))}
          </Row>
          <div className="text-center mt-4">
            <Button variant="danger" onClick={loadMoreMovies} disabled={loadingMore}>
              {loadingMore ? "Chargement..." : "Voir plus"}
            </Button>
          </div>
        </>
      )}
    </Container>
  );
};

export default MoviesPage;
