import React, { useState, useEffect, useRef } from "react";
import anatomie from "../assets/qcm/anatomie.json";
import classes from "../assets/qcm/classes.json";
import effets from "../assets/qcm/effets.json";

const categoriesData = { anatomie, classes, effets };

export default function QCM({ onBack }) {
  const [category, setCategory] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [chatCount, setChatCount] = useState(0);
  const [answers, setAnswers] = useState([]);

  const resultsRefs = useRef([]);

  // --- sauvegarde et lecture depuis localStorage ---
  const setChatCountStorage = (count) => {
    setChatCount(count);
    localStorage.setItem("chatCount", count);
  };

  useEffect(() => {
    const saved = parseInt(localStorage.getItem("chatCount")) || 0;
    setChatCount(saved);
  }, []);

  // Charger les questions quand une catégorie est choisie
  useEffect(() => {
    if (!category) return;
    const data = categoriesData[category] || [];
    const shuffled = [...data].sort(() => Math.random() - 0.5).slice(0, 20);
    setQuestions(shuffled);
    setCurrent(0);
    setScore(0);
    setShowScore(false);
    setAnswers([]); // réinitialisation des réponses pour nouvelle catégorie
  }, [category]);

  const handleAnswer = (index) => {
    const isCorrect = index === questions[current].answer;
    if (isCorrect) {
      setScore((prev) => prev + 1);
      setChatCountStorage(chatCount + 1);
    }

    setAnswers((prev) => [...prev, index]); // stocke la réponse

    const next = current + 1;
    if (next < questions.length) setCurrent(next);
    else setShowScore(true);
  };

  if (!category) {
    const categories = Object.keys(categoriesData);
    return (
      <div className="min-h-screen bg-grisFonce p-6 flex flex-col items-center justify-center">
        <h1 className="text-white text-3xl font-bold mb-8 text-center">
          Choisis la catégorie du QCM
        </h1>
        <div className="grid grid-cols-2 gap-6 w-full max-w-lg">
          {categories.map((cat) => (
            <div
              key={cat}
              onClick={() => setCategory(cat)}
              className="bg-violetMedium cursor-pointer rounded-xl shadow-md p-6 flex items-center justify-center text-center text-white font-semibold text-lg transition-colors"
            >
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </div>
          ))}
        </div>
        <button
          onClick={onBack}
          className="mt-6 bg-bleuGris text-white rounded-xl px-6 py-2 transition-colors"
        >
          Retour
        </button>
      </div>
    );
  }

  if (questions.length === 0) return <div>Chargement...</div>;

  return (
    <div className="bg-grisFonce flex flex-col justify-center items-center h-screen relative px-6">
      {/* Compteur de chats */}

      {!showScore ? (
        <div className="flex flex-col items-center justify-center w-full max-w-md">
          <h2 className="text-white text-2xl font-bold mb-6 text-center">
            Question {current + 1} / {questions.length}
          </h2>
          <div className="bg-grisMedium rounded-xl p-6 w-full shadow-md">
            <p className="mb-6 text-lg text-white text-center">
              {questions[current].question}
            </p>
            <div className="grid gap-4">
              {questions[current].options.map((opt, i) => (
                <button
                  key={i}
                  onClick={() => handleAnswer(i)}
                  className="bg-violetMedium text-white font-bold rounded-xl p-3 transition-colors"
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="w-full max-w-md flex flex-col items-center">
          <div className="flex items-center gap-4 mb-4">
            <h2 className="text-white text-3xl font-bold text-center">
              Ton score: {score} / {questions.length}
            </h2>
            <div className="bg-grisMedium text-violetMedium px-4 py-2 rounded-full shadow-md">
              🐱 : {chatCount}
            </div>
          </div>

          <div className="flex flex-col gap-4 overflow-y-auto max-h-[70vh] w-full">
            {questions.map((q, i) => (
              <div
                key={i}
                ref={(el) => (resultsRefs.current[i] = el)}
                className="bg-grisMedium p-4 rounded-xl shadow flex flex-col"
              >
                <p className="text-white font-semibold mb-2">
                  Q{i + 1}. {q.question}
                </p>
                <p className="text-white mb-1">
                  Ta réponse :{" "}
                  <span
                    className={
                      answers[i] !== undefined
                        ? answers[i] === q.answer
                          ? "text-green-400"
                          : "text-red-400"
                        : "text-white"
                    }
                  >
                    {answers[i] !== undefined ? q.options[answers[i]] : "-"}
                  </span>
                </p>
                {answers[i] !== undefined && answers[i] !== q.answer && (
                  <p className="text-violetMedium">
                    ✔ Bonne réponse : {q.options[q.answer]}
                  </p>
                )}
              </div>
            ))}
          </div>

          <div className="flex flex-col items-center mt-6 gap-3">
            <button
              onClick={onBack}
              className="bg-violetMedium text-white rounded-xl px-6 py-2 transition-colors font-bold"
            >
              Menu
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
