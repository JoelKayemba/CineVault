import React, { useEffect, useState } from "react";
import { Container, Row, Col, Spinner } from "react-bootstrap";
import MovieCard from "./MovieCard";
import axios from "axios";
import { FaFire, FaStar, FaFilm, FaCalendarAlt } from "react-icons/fa";

const API_KEY = "6fe1cc64430eb530bef8e904fba8f41c";
const BASE_URL = "https://api.themoviedb.org/3";

const MovieList = () => {
  const [popularMovies, setPopularMovies] = useState([]);
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [topRatedMovies, setTopRatedMovies] = useState([]);
  const [upcomingMovies, setUpcomingMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const [popularRes, trendingRes, topRatedRes, upcomingRes] = await Promise.all([
          axios.get(`${BASE_URL}/movie/popular`, { params: { api_key: API_KEY, language: "fr-FR", page: 1 } }),
          axios.get(`${BASE_URL}/trending/movie/week`, { params: { api_key: API_KEY, language: "fr-FR" } }),
          axios.get(`${BASE_URL}/movie/top_rated`, { params: { api_key: API_KEY, language: "fr-FR", page: 1 } }),
          axios.get(`${BASE_URL}/movie/upcoming`, { params: { api_key: API_KEY, language: "fr-FR", page: 1 } }),
        ]);

        setPopularMovies(popularRes.data.results || []);
        setTrendingMovies(trendingRes.data.results || []);
        setTopRatedMovies(topRatedRes.data.results || []);
        setUpcomingMovies(upcomingRes.data.results || []);
      } catch (error) {
        console.error("❌ Erreur lors de la récupération des films :", error);
      }
      setLoading(false);
    };

    fetchMovies();
  }, []);

  return (
    <Container fluid className="p-0">
      {/* Section Vidéo */}
      <div className="video-container">
        <video autoPlay loop muted className="w-100">
          <source src="/videos/video.mp4" type="video/mp4" />
          Votre navigateur ne supporte pas la vidéo.
        </video>
        <div className="video-overlay">
          <h1 className="text-white fw-bold">Bienvenue sur CineVault</h1>
          <p>Découvrez les meilleurs films et séries du moment.</p>
        </div>
      </div>

      {loading ? (
        <div className="text-center my-5">
          <Spinner animation="border" variant="danger" />
        </div>
      ) : (
        <>
          {/* Tendances */}
          <Section title="Tendances du Moment" icon={<FaFire />} movies={trendingMovies} />
          {/* Films Populaires */}
          <Section title="Films Populaires" icon={<FaFilm />} movies={popularMovies} />
          {/* Meilleurs Films */}
          <Section title="Meilleurs Films de Tous les Temps" icon={<FaStar />} movies={topRatedMovies} />
          {/* Prochaines Sorties */}
          <Section title="Prochaines Sorties" icon={<FaCalendarAlt />} movies={upcomingMovies} />
        </>
      )}
    </Container>
  );
};

const Section = ({ title, icon, movies }) => (
  <Container className="mt-5">
    <h2 className="text-center text-white mb-4">
      {icon} {title}
    </h2>
    <Row>
      {movies.slice(0, 6).map((movie) => (
        <Col key={`${movie.id}-${Math.random()}`} md={4} className="d-flex justify-content-center">
          <MovieCard
            id={movie.id}
            title={movie.title}
            description={movie.overview ? movie.overview.substring(0, 100) + "..." : "Aucune description disponible"}
            image={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          />
        </Col>
      ))}
    </Row>
  </Container>
);

export default MovieList;
