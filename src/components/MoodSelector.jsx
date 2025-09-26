import React, { useState } from "react";
import "../css/MoodSelector.css";

function MoodSelector({ onSelectMood }) {
  const moods = ["chill", "adventurous", "romantic", "spooky", "nostalgic"];
  const [selectedMood, setSelectedMood] = useState(null);

  const handleClick = (mood) => {
    setSelectedMood(mood);
    onSelectMood(mood);
  };

  return (
    <div className="mood-selector">
      <h3>How are you feeling tonight?</h3>
      <div className="mood-buttons">
        {moods.map((mood) => (
          <button
            key={mood}
            type="button"
            onClick={() => handleClick(mood)}
            className={`mood-btn ${mood} ${selectedMood === mood ? "selected" : ""
              }`}
          >
            {mood.charAt(0).toUpperCase() + mood.slice(1)}
          </button>
        ))}
      </div>
    </div>
  );
}

export default MoodSelector;
