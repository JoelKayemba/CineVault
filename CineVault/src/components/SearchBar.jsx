import React, { useState } from "react";
import { Form, FormControl, ListGroup, Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";

const API_KEY = "6fe1cc64430eb530bef8e904fba8f41c";
const BASE_URL = "https://api.themoviedb.org/3";

const SearchBar = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (event) => {
    const searchTerm = event.target.value;
    setQuery(searchTerm);

    if (searchTerm.length > 2) {
      setLoading(true);
      try {
        const response = await axios.get(`${BASE_URL}/search/multi`, {
          params: { api_key: API_KEY, language: "fr-FR", query: searchTerm },
        });

        // Filtrer les résultats pour garder seulement ceux avec une image
        const filteredResults = response.data.results.filter(
          (item) => item.poster_path !== null
        );

        setResults(filteredResults);
      } catch (error) {
        console.error("Erreur de recherche :", error);
      }
      setLoading(false);
    } else {
      setResults([]);
    }
  };

  return (
    <div className="search-container position-relative">
      <Form className="d-flex">
        <FormControl
          type="search"
          placeholder="Rechercher un film ou une série..."
          className="me-2"
          value={query}
          onChange={handleSearch}
        />
      </Form>

      {loading && (
        <div className="text-center mt-2">
          <Spinner animation="border" variant="light" />
        </div>
      )}

      <AnimatePresence>
        {results.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="position-absolute w-100 mt-2 bg-dark text-white rounded shadow-lg"
          >
            <ListGroup>
              {results.slice(0, 6).map((item) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                >
                  <ListGroup.Item className="bg-dark border-0">
                    <Link
                      to={item.media_type === "movie" ? `/movie/${item.id}` : `/series/${item.id}`}
                      className="text-decoration-none text-white d-flex align-items-center"
                    >
                      <img
                        src={`https://image.tmdb.org/t/p/w92${item.poster_path}`}
                        alt={item.title || item.name}
                        className="me-2 rounded"
                        width="50"
                      />
                      {item.title || item.name}
                    </Link>
                  </ListGroup.Item>
                </motion.div>
              ))}
            </ListGroup>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SearchBar;
