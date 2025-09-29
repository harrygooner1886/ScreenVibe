import "../css/MovieCard.css"
import { useState } from "react"
import { useMovieContext } from "../contexts/MovieContext"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faCheck } from "@fortawesome/free-solid-svg-icons";

function MovieCard({ movie }) {
  const { isInWatchlist, addToWatchlist, removeFromWatchlist } = useMovieContext()
  const inWatchlist = isInWatchlist(movie.id)

  const [expanded, setExpanded] = useState(false)

  function onWatchlistClick(e) {
    e.preventDefault()
    if (inWatchlist) removeFromWatchlist(movie.id)
    else addToWatchlist(movie)
  }

  return (
    <div className="movie-card">
      <div className="movie-poster">
        <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
        <div className="movie-overlay">
          <button
            className={`watchlist-btn ${inWatchlist ? "active" : ""}`}
            onClick={onWatchlistClick}
          >
            <FontAwesomeIcon
              icon={inWatchlist ? faCheck : faPlus}
              className="watchlist-icon"
            />
          </button>
        </div>
      </div>

      <div className="movie-info">
        <h3>{movie.title}</h3>
        <p>{movie.release_date?.split("-")[0]}</p>

        <button
          className="toggle-description"
          onClick={() => setExpanded(!expanded)}
        >
          {expanded ? "Hide Details ▲" : "More Info ▼"}
        </button>

        {expanded && (
          <div className="movie-description">
            <p>{movie.overview || "No description available."}</p>
            <p>
              <strong>Rating:</strong>{" "}
              {movie.vote_average ? (
                <>
                  ⭐ {movie.vote_average.toFixed(1)}/10
                </>
              ) : (
                "N/A"
              )}
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

export default MovieCard
