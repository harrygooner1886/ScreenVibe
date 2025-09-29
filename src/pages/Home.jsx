import MovieCard from "../components/MovieCard";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { searchMovies, getMoviesByPreferences } from "../services/api";
import "../css/Home.css";
import MovieQuiz from "../components/MovieQuiz";

function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const [quizComplete, setQuizComplete] = useState(false);
  const [quizAnswers, setQuizAnswers] = useState(null);

  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/") {
      setMovies([]);
      setSearchQuery("");
      setError(null);
      setLoading(false);
      setQuizComplete(false);
      setQuizAnswers(null);
    }
  }, [location.key]);

  const handleQuizConfirm = async (answers) => {
    setQuizAnswers(answers);
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

      if (!searchResults || searchResults.length === 0) {
        setMovies([]);
        setError(`No results found for "${searchQuery}"`);
      } else {
        setMovies(searchResults);
        setError(null);
      }

      setQuizComplete(false);
    } catch (err) {
      console.log(err);
      setError("Failed to search movies...");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="home-page">
      <div className="home">
        {!quizComplete && (
          <div className="quiz-container">
            <MovieQuiz
              key={location.key}
              onConfirm={handleQuizConfirm}
              initialAnswers={quizAnswers}
            />
          </div>
        )}

        {quizComplete && quizAnswers && (
          <div className="quiz-summary-box">
            <h3>Here's what you picked:</h3>
            <ul>
              <li><strong>mood:</strong> {quizAnswers.mood}</li>
              <li><strong>decade:</strong> {quizAnswers.decade}</li>
              <li><strong>length:</strong> {quizAnswers.length}</li>
              <li><strong>language:</strong> {quizAnswers.language}</li>
              <li><strong>platform:</strong> {quizAnswers.platform}</li>
            </ul>
            <button
              className="quiz-btn restart"
              onClick={() => setQuizComplete(false)}
            >
              Change Answers
            </button>
          </div>
        )}

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

        {loading ? (
          <div className="loading">Loading...</div>
        ) : (
          movies.length > 0 && (
            <div className="movies-grid">
              {movies.map((movie) => (
                <MovieCard movie={movie} key={movie.id} />
              ))}
            </div>
          )
        )}
      </div>
    </div>
  );
}

export default Home;
