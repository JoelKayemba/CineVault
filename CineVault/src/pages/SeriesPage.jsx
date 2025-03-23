import React, { useEffect, useState } from "react";
import { Container, Row, Col, Spinner, Button } from "react-bootstrap";
import MovieCard from "../components/MovieCard";
import axios from "axios";

const API_KEY = "6fe1cc64430eb530bef8e904fba8f41c";
const BASE_URL = "https://api.themoviedb.org/3";

const SeriesPage = () => {
  const [series, setSeries] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);

  useEffect(() => {
    fetchSeries(1);
  }, []);

  const fetchSeries = async (pageNumber) => {
    try {
      const response = await axios.get(`${BASE_URL}/tv/popular`, {
        params: { api_key: API_KEY, language: "fr-FR", page: pageNumber },
      });

      setSeries((prevSeries) => [...prevSeries, ...response.data.results]);
      setLoading(false);
      setLoadingMore(false);
    } catch (error) {
        console.error("Erreur lors de la récupération des séries :", error);
    }
  };

  const loadMoreSeries = () => {
    setLoadingMore(true);
    setPage((prevPage) => {
      const nextPage = prevPage + 1;
      fetchSeries(nextPage);
      return nextPage;
    });
  };

  return (
    <Container className="mt-4">
      <h2 className="text-center text-white mb-4">📺 Toutes les Séries</h2>
      {loading ? (
        <div className="text-center">
          <Spinner animation="border" variant="danger" />
        </div>
      ) : (
        <>
          <Row>
            {series.map((serie) => (
              <Col key={serie.id} md={4} className="d-flex justify-content-center">
                <MovieCard
                  id={serie.id}
                  title={serie.name}
                  description={serie.overview.substring(0, 100) + "..."}
                  image={`https://image.tmdb.org/t/p/w500${serie.poster_path}`}
                />
              </Col>
            ))}
          </Row>
          <div className="text-center mt-4">
            <Button variant="danger" onClick={loadMoreSeries} disabled={loadingMore}>
              {loadingMore ? "Chargement..." : "Voir plus"}
            </Button>
          </div>
        </>
      )}
    </Container>
  );
};

export default SeriesPage;
