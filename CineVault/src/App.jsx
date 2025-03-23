import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import MovieList from "./components/MovieList";
import MovieDetails from "./pages/MovieDetails";
import MoviesPage from "./pages/MoviesPage";
import SeriesPage from "./pages/SeriesPage";
import SerieDetails from "./pages/SerieDetails";
import FavoritesPage from "./pages/FavoritesPage";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./app.css"

const App = () => {
  return (
    <Router>
      <Header />
      <main className="container my-4 ">
        <Routes>
          <Route path="/" element={<MovieList />} />
          <Route path="/movie/:id" element={<MovieDetails />} />
          <Route path="/films" element={<MoviesPage />} />
          <Route path="/series" element={<SeriesPage />} />
          <Route path="/series/:id" element={<SerieDetails />} />
          <Route path="/favoris" element={<FavoritesPage />} />
        </Routes>
      </main>
      <Footer />
    </Router>
  );
};

export default App;
