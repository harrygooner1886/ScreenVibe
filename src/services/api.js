// src/services/api.js
import moodToGenres from "../utils/moodMapping";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

export const getPopularMovies = async () => {
  const response = await fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}`);
  const data = await response.json();
  return data.results;
};

export const searchMovies = async (query) => {
  const response = await fetch(
    `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}`
  );
  const data = await response.json();
  return data.results;
};

export const getMoviesByGenres = async (genreIds) => {
  try {
    const url = `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=${genreIds.join(",")}`;
    const res = await fetch(url);
    if (!res.ok) throw new Error("Failed to fetch mood movies");
    const data = await res.json();
    return data.results;
  } catch (err) {
    console.error("Error in getMoviesByGenres:", err);
    throw err;
  }
};

// ✨ Updated personalized fetch
export const getMoviesByPreferences = async ({ mood, decade, length, language, platform }) => {
  const genres = moodToGenres[mood];
  if (!genres) return [];

  let url = `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=${genres.join(",")}`;

  // 🎬 Decade filters
  if (decade === "Classics (before 2000)") {
    url += "&primary_release_date.lte=1999-12-31";
  } else if (decade === "2000s") {
    url += "&primary_release_date.gte=2000-01-01&primary_release_date.lte=2009-12-31";
  } else if (decade === "2010s") {
    url += "&primary_release_date.gte=2010-01-01&primary_release_date.lte=2019-12-31";
  } else if (decade === "2020s (latest releases)") {
    url += "&primary_release_date.gte=2020-01-01";
  }

  // ⏱️ Runtime filters
  if (length === "Short (<90min)") {
    url += "&with_runtime.lte=90";
  } else if (length === "Epic (>120min)") {
    url += "&with_runtime.gte=120";
  }

  // 🌍 Language filter
  if (language === "English only") {
    url += "&with_original_language=en";
  }

  // 📺 Streaming provider filter
  const platformMap = {
    Netflix: 8,
    "Amazon Prime": 9,
    "Disney+": 337,
    Hulu: 15,
    AppleTV: 350,
    "U-Next": 84,
  };
  if (platform && platformMap[platform]) {
    url += `&with_watch_providers=${platformMap[platform]}&watch_region=US`;
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
