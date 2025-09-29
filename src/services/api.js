import moodToGenres from "../utils/moodMapping";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

export const searchMovies = async (query) => {
  if (!query) return [];
  const url = `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}`;

  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error("Failed to fetch search results");
    const data = await res.json();
    return data.results;
  } catch (err) {
    console.error("Error in searchMovies:", err);
    throw err;
  }
};

export const getMoviesByPreferences = async ({
  mood,
  decade,
  length,
  language,
  platform,
}) => {
  const genres = moodToGenres[mood];

  let url;
  if (!genres) {
    url = `${BASE_URL}/trending/movie/week?api_key=${API_KEY}`;
  } else {
    url = `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=${genres.join("|")}`;
  }

  if (decade === "Classics (before 2000)") {
    url += "&primary_release_date.lte=1999-12-31";
  } else if (decade === "2000s") {
    url += "&primary_release_date.gte=2000-01-01&primary_release_date.lte=2009-12-31";
  } else if (decade === "2010s") {
    url += "&primary_release_date.gte=2010-01-01&primary_release_date.lte=2019-12-31";
  } else if (decade === "2020s (latest releases)") {
    url += "&primary_release_date.gte=2020-01-01";
  }

  if (length === "Short (<90min)") {
    url += "&with_runtime.lte=90";
  } else if (length === "Standard (90-120min)") {
    url += "&with_runtime.gte=90&with_runtime.lte=120";
  } else if (length === "Epic (>120min)") {
    url += "&with_runtime.gte=120";
  }

  if (language === "English only") {
    url += "&with_original_language=en";
  }

  const providerMap = {
    "Netflix": 8,
    "Amazon Prime": 9,
    "Disney+": 337,
    "Hulu": 15,
    "AppleTV": 2,
    "U-Next": 84,
  };

  if (platform && providerMap[platform]) {
    url += `&with_watch_providers=${providerMap[platform]}&watch_region=JP`;
  }

  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error("Failed to fetch personalized movies");
    const data = await res.json();
    return data.results;
  } catch (err) {
    console.error("Error in getMoviesByPreferences:", err);
    throw err;
  }
};
