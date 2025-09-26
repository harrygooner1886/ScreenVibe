// src/utils/moodMapping.js

// TMDb genre IDs reference:
// 28: Action, 12: Adventure, 16: Animation, 35: Comedy, 80: Crime,
// 18: Drama, 10751: Family, 14: Fantasy, 36: History, 27: Horror,
// 10402: Music, 9648: Mystery, 10749: Romance, 878: Sci-Fi,
// 10770: TV Movie, 53: Thriller, 10752: War, 37: Western

const moodToGenres = {
  // 🆕 Feel-good → light, fun, uplifting
  "Feel-good": [35, 10751], // Comedy + Family

  // 🆕 Funny / Lighthearted
  "Funny / Lighthearted": [35], // Comedy only

  // Romantic → already existed but clarified
  Romantic: [10749],

  // Dark / Intense → drama + thriller + crime
  "Dark / Intense": [18, 53, 80],

  // Scary / Creepy → horror + mystery
  "Scary / Creepy": [27, 9648],

  // 🆕 Mind-bending → sci-fi + mystery
  "Mind-bending": [878, 9648],

  // 🆕 Chill background movie → animation + family + comedy
  "Chill background movie": [16, 35, 10751],
};

export default moodToGenres;
