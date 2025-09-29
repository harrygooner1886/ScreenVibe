import "../css/Watchlist.css"
import { useMovieContext } from "../contexts/MovieContext"
import MovieCard from "../components/MovieCard"

function Watchlist() {
  const { watchlist, clearWatchlist } = useMovieContext();

  return (
    <div className="watchlist-page">
      {watchlist && watchlist.length > 0 ? (
        <>
          <div className="watchlist-header">
            <h2>My Watchlist</h2>
            <button
              className="clear-watchlist-btn"
              onClick={clearWatchlist}
            >
              Clear All
            </button>
          </div>

          <div className="movies-grid">
            {watchlist.map((movie) => (
              <MovieCard movie={movie} key={movie.id} />
            ))}
          </div>
        </>
      ) : (
        <div className="watchlist-empty">
          <h2>No Movies Yet</h2>
          <p>Start adding movies to your watchlist and they will appear here!</p>
        </div>
      )}
    </div>
  );
}

export default Watchlist;
