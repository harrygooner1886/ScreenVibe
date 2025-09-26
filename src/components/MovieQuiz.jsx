import React, { useState } from "react";
import "../css/MovieQuiz.css";

function MovieQuiz({ onComplete }) {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({});

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
      options: ["Short (<90min)", "Standard (90-120min)", "Epic (>120min)"],
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

  const handleSelect = (option) => {
    const current = questions[step];
    const updatedAnswers = { ...answers, [current.id]: option };
    setAnswers(updatedAnswers);

    if (step === questions.length - 1) {
      onComplete?.(updatedAnswers);
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
          <>
            <button
              className="quiz-btn back"
              onClick={() => setStep(step - 1)}
            >
              Back
            </button>

            <button
              className="quiz-btn restart subtle"
              onClick={() => {
                setStep(0);
                setAnswers({});
              }}
            >
              Restart Quiz
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default MovieQuiz;
