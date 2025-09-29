import React, { useState, useEffect } from "react";
import "../css/MovieQuiz.css";
import moodToGenres from "../utils/moodMapping";

function MovieQuiz({ onConfirm, initialAnswers }) {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState(initialAnswers || {});

  useEffect(() => {
    if (initialAnswers) {
      setAnswers(initialAnswers);
    }
  }, [initialAnswers]);

  const questions = [
    {
      id: "mood",
      question: "What kind of vibe are you in the mood for?",
      options: [
        "Feel-good",
        "Funny / Lighthearted",
        "Romantic",
        "Dark / Intense",
        "Scary / Creepy",
        "Mind-bending",
        "Chill background movie",
      ],
    },
    {
      id: "decade",
      question: "Do you prefer classics or more recent movies?",
      options: [
        "Classics (before 2000)",
        "2000s",
        "2010s",
        "2020s (latest releases)",
      ],
    },
    {
      id: "length",
      question: "What kind of runtime suits you?",
      options: ["Short (<90min)", "Standard (90–120min)", "Epic (>120min)"],
    },
    {
      id: "language",
      question: "Do you prefer English or are you open to foreign films?",
      options: ["English only", "Foreign films welcome"],
    },
    {
      id: "platform",
      question: "Where do you plan to watch?",
      options: [
        "Netflix",
        "U-Next",
        "Amazon Prime",
        "Disney+",
        "Hulu",
        "AppleTV",
      ],
    },
  ];

  if (step === questions.length) {
    return (
      <div className="quiz-summary">
        <h3>Here's what you picked:</h3>
        <ul>
          {Object.entries(answers).map(([key, value]) => (
            <li key={key}>
              <strong>{key}:</strong> {value}
            </li>
          ))}
        </ul>

        <button
          className="quiz-btn confirm"
          onClick={() => {
            const mappedAnswers = {
              ...answers,
              genres: moodToGenres[answers.mood] || [],
            };
            onConfirm?.(mappedAnswers);
          }}
        >
          Confirm & Show Movies
        </button>

        <button
          className="quiz-btn restart subtle"
          onClick={() => {
            setStep(0);
            setAnswers({});
          }}
        >
          Retake Quiz
        </button>
      </div>
    );
  }

  const handleSelect = (option) => {
    const current = questions[step];
    const updatedAnswers = { ...answers, [current.id]: option };
    setAnswers(updatedAnswers);

    if (step === questions.length - 1) {
      setStep(step + 1);
    } else {
      setStep(step + 1);
    }
  };

  const currentQuestion = questions[step];

  return (
    <div className="movie-quiz">
      <h3>{currentQuestion.question}</h3>
      <div className="quiz-options">
        {currentQuestion.options.map((opt) => (
          <button
            key={opt}
            className="quiz-btn"
            onClick={() => handleSelect(opt)}
          >
            {opt}
          </button>
        ))}
      </div>

      <div className="quiz-controls">
        {step > 0 && (
          <button
            className="quiz-btn back"
            onClick={() => setStep(step - 1)}
          >
            Back
          </button>
        )}

        {step > 0 && (
          <button
            className="quiz-btn restart subtle"
            onClick={() => {
              setStep(0);
              setAnswers({});
            }}
          >
            Retake Quiz
          </button>
        )}
      </div>
    </div>
  );
}

export default MovieQuiz;
