import MovieCard from "../components/MovieCard";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { searchMovies } from "../services/api";
import "../css/Home.css";
import MovieQuiz from "../components/MovieQuiz";
import { getMoviesByPreferences } from "../services/api";

function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const [quizComplete, setQuizComplete] = useState(false);

  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/") {
      setMovies([]);
      setSearchQuery("");
      setError(null);
      setLoading(false);
      setQuizComplete(false);
    }
  }, [location.key]);

  const handleQuizComplete = async (answers) => {
    setLoading(true);
    try {
      const personalizedMovies = await getMoviesByPreferences(answers);
      setMovies(personalizedMovies);
      setError(null);
      setQuizComplete(true);
    } catch (err) {
      console.log(err);
      setError("Failed to load personalized movies...");
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    if (loading) return;

    setLoading(true);
    try {
      const searchResults = await searchMovies(searchQuery);
      setMovies(searchResults);
      setError(null);
    } catch (err) {
      console.log(err);
      setError("Failed to search movies...");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="home">
      <div className="mood-fixed">
        <MovieQuiz
          key={location.key}
          onComplete={handleQuizComplete}
        />
      </div>

      <div className="mood-spacer"></div>

      <form onSubmit={handleSearch} className="search-form">
        <input
          type="text"
          placeholder="Search for movies..."
          className="search-input"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button type="submit" className="search-button">Search</button>
      </form>

      {error && <div className="error-message">{error}</div>}

      {quizComplete && (
        loading ? (
          <div className="loading">Loading...</div>
        ) : (
          <div className="movies-grid">
            {movies.map((movie) => (
              <MovieCard movie={movie} key={movie.id} />
            ))}
          </div>
        )
      )}
    </div>
  );
}

export default Home;
