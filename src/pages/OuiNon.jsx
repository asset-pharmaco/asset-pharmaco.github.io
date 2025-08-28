import React, { useState, useRef, useEffect } from "react";
import anatomie from "../assets/OuiNon/anatomie.json";
import pharmacologie from "../assets/OuiNon/pharmacologie.json";
import pathologies from "../assets/OuiNon/pathologie.json";

const allQuestions = {
  Anatomie: anatomie,
  Pharmacologie: pharmacologie,
  Pathologies: pathologies,
};

export default function OuiNonQuiz({ onBack }) {
  const categories = Object.keys(allQuestions);

  const [selectedCat, setSelectedCat] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [finished, setFinished] = useState(false);
  const [chatCount, setChatCount] = useState(0);

  const resultsRefs = useRef([]);

  // --- sauvegarde et lecture depuis localStorage ---
  const saveChatCount = (count) => {
    setChatCount(count);
    localStorage.setItem("chatCount", count);
  };

  useEffect(() => {
    const saved = parseInt(localStorage.getItem("chatCount")) || 0;
    setChatCount(saved);
  }, []);

  const startQuiz = (cat) => {
    setSelectedCat(cat);
    const q = allQuestions[cat].sort(() => Math.random() - 0.5).slice(0, 10);
    setQuestions(q);
    setCurrent(0);
    setAnswers([]);
    setFinished(false);
  };

  const handleAnswer = (choice) => {
    const newAnswers = [...answers, choice];
    setAnswers(newAnswers);

    // Incrémenter chatCount si bonne réponse
    if (choice === questions[current].answer) {
      saveChatCount(chatCount + 1);
    }

    if (current + 1 < questions.length) setCurrent(current + 1);
    else setFinished(true);
  };

  const score = answers.reduce(
    (acc, a, i) => acc + (a === questions[i].answer ? 1 : 0),
    0
  );

  return (
    <div className="min-h-screen bg-grisFonce p-6 flex flex-col items-center relative">

      {!selectedCat && (
        <>
          <h1 className="text-white text-3xl font-bold mb-6 text-center">
            Choisis une catégorie
          </h1>
          <div className="grid grid-cols-2 gap-6 w-full max-w-lg">
            {categories.map((c) => (
              <div
                key={c}
                onClick={() => startQuiz(c)}
                className="text-white bg-violetMedium cursor-pointer rounded-xl shadow-md p-6 flex items-center justify-center text-center font-semibold text-lg"
              >
                {c}
              </div>
            ))}
          </div>
        <button
          onClick={onBack}
          className="mt-6 bg-bleuGris text-white rounded-xl px-6 py-2 transition-colors"
        >
          Retour
        </button>
        </>
      )}

      {selectedCat && !finished && (
        <div className="flex flex-col items-center justify-center h-screen overflow-hidden">
          <h2 className="text-white text-xl font-bold mb-6">
            Question {current + 1}/{questions.length}
          </h2>
          <p className="text-white text-lg mb-6 text-center max-w-md">
            {questions[current].question}
          </p>
          <div className="flex gap-6">
            <button
              onClick={() => handleAnswer("Oui")}
              className="bg-violetMedium text-white font-bold py-2 px-6 rounded-xl shadow"
            >
              Oui
            </button>
            <button
              onClick={() => handleAnswer("Non")}
              className="bg-red-600 text-white font-bold py-2 px-6 rounded-xl shadow"
            >
              Non
            </button>
          </div>
        </div>
      )}

      {finished && (
        <div className="mt-6 w-full max-w-md">
          <div className="flex items-center justify-center gap-4 mb-4">
            <h2 className="text-white text-2xl font-bold text-center">
              Résultats : {score} / {questions.length}
            </h2>
            <div className="bg-grisMedium text-violetMedium px-4 py-2 rounded-full shadow-md font-bold">
              🐱 : {chatCount}
            </div>
          </div>

          <div className="flex flex-col gap-4 overflow-y-auto max-h-[70vh]">
            {questions.map((q, i) => (
              <div
                key={i}
                ref={(el) => (resultsRefs.current[i] = el)}
                className="bg-grisMedium p-4 rounded-xl shadow flex flex-col"
              >
                <p className="text-white font-semibold mb-2">
                  Q{i + 1}. {q.question}
                </p>
                <p className={`text-white mb-1`}>
                  Ta réponse :{" "}
                  <span
                    className={
                      answers[i] === q.answer ? "text-violetMedium" : "text-red-400"
                    }
                  >
                    {answers[i]}
                  </span>
                </p>
                {answers[i] !== q.answer && (
                  <p className="text-violetMedium">✔ Bonne réponse : {q.answer}</p>
                )}
              </div>
            ))}
          </div>

          <div className="flex flex-col items-center mt-6 gap-3">
            <button
              onClick={onBack}
              className="bg-violetMedium text-black rounded-xl px-6 py-2 transition-colors font-bold"
            >
              Menu
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
