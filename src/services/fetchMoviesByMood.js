import moodToGenres from "../utils/moodMapping";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

export default async function fetchMoviesByMood(mood, page = 1) {
  const genres = moodToGenres[mood];
  if (!genres) return [];

  const params = new URLSearchParams({
    api_key: API_KEY,
    with_genres: genres.join(","),
    sort_by: "popularity.desc",
    include_adult: "false",
    language: "en-US",
    page: String(page),
  });

  const url = `https://api.themoviedb.org/3/discover/movie?${params.toString()}`;

  const res = await fetch(url);
  if (!res.ok) throw new Error(`TMDb error ${res.status}`);
  const data = await res.json();
  return data.results || [];
}
