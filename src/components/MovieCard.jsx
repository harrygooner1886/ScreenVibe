import { useState, useEffect } from "react";
import { getMovieProviders } from "../services/api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faCheck } from "@fortawesome/free-solid-svg-icons";
import { useMovieContext } from "../contexts/MovieContext";
import "../css/MovieCard.css";

function MovieCard({ movie }) {
  const { isInWatchlist, addToWatchlist, removeFromWatchlist } = useMovieContext();
  const inWatchlist = isInWatchlist(movie.id);

  const [expanded, setExpanded] = useState(false);
  const [providers, setProviders] = useState([]);

  function onWatchlistClick(e) {
    e.preventDefault();
    if (inWatchlist) removeFromWatchlist(movie.id);
    else addToWatchlist(movie);
  }

  useEffect(() => {
    if (expanded) {
      getMovieProviders(movie.id).then((data) => {
        const jpData = data.results?.JP || {};
        const jpProviders = jpData.flatrate || [];
        setProviders(jpProviders);
      });
    }
  }, [expanded, movie.id]);

  const providerLinks = {
    "Netflix": "https://www.netflix.com",
    "Amazon Prime Video": "https://www.amazon.co.jp/primevideo",
    "Disney+": "https://www.disneyplus.com/ja-jp",
    "Hulu": "https://www.hulu.jp/",
    "Apple TV+": "https://tv.apple.com/",
    "U-NEXT": "https://video.unext.jp/",
  };

  return (
    <div className="movie-card">
      <div className="movie-poster">
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
        />
        <div className="movie-overlay">
          <button
            className={`watchlist-btn ${inWatchlist ? "active" : ""}`}
            onClick={onWatchlistClick}
          >
            <FontAwesomeIcon icon={inWatchlist ? faCheck : faPlus} />
          </button>
        </div>
      </div>

      <div className="movie-info">
        <h3>{movie.title}</h3>
        <p>{movie.release_date?.split("-")[0]}</p>

        <button
          className={`watchlist-btn-mobile ${inWatchlist ? "active" : ""}`}
          onClick={onWatchlistClick}
        >
          {inWatchlist ? "Remove from Watchlist" : "Add to Watchlist"}
        </button>

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
              {movie.vote_average ? `⭐ ${movie.vote_average.toFixed(1)}/10` : "N/A"}
            </p>

            {providers.length > 0 ? (
              <div className="providers">
                <h4>Available on:</h4>
                <div className="provider-logos">
                  {providers.map((p) => {
                    const officialLink = providerLinks[p.provider_name];
                    const href = officialLink
                      ? officialLink
                      : `https://www.google.com/search?q=${encodeURIComponent(
                        movie.title + " " + p.provider_name
                      )}`;

                    return (
                      <a
                        key={p.provider_id}
                        href={href}
                        target="_blank"
                        rel="noreferrer"
                      >
                        <img
                          src={`https://image.tmdb.org/t/p/original${p.logo_path}`}
                          alt={p.provider_name}
                          className="provider-logo"
                        />
                      </a>
                    );
                  })}
                </div>
              </div>
            ) : (
              <p>Not available for streaming in Japan</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default MovieCard;
