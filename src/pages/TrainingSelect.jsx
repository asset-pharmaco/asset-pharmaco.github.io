import React, { useEffect, useState } from "react";

export default function TrainingSelect({ onSelect }) {
  const trainings = [
    { id: "qcm", label: "QCM" },
    { id: "carte", label: "Carte Oui / Non" },
    { id: "trou", label: "Mot ou phrase à trou" },
    { id: "situation", label: "Description de situation" },
  ];

  const [chatCount, setChatCount] = useState(0);

  // --- Lecture et sauvegarde depuis localStorage ---
  const setChatCountStorage = (count) => {
    setChatCount(count);
    localStorage.setItem("chatCount", count);
  };

  useEffect(() => {
    const saved = parseInt(localStorage.getItem("chatCount")) || 0;
    setChatCount(saved);
  }, []);

  return (
    <div className="min-h-screen bg-grisFonce p-6 flex flex-col items-center relative">
      <h1 className="text-white text-3xl font-bold mb-8 text-left w-full">
        Choisis ton type d'entraînement
      </h1>

      <div className="grid grid-cols-2 gap-6 w-full max-w-lg">
        {trainings.map((t) => (
          <div
            key={t.id}
            onClick={() => onSelect(t.id)}
            className="text-white bg-violetMedium cursor-pointer rounded-xl shadow-md p-6 flex items-center justify-center text-center text-lg font-semibold transition-colors"
          >
            {t.label.split("\n").map((line, i) => (
              <span key={i}>
                {line}
                <br />
              </span>
            ))}
          </div>
        ))}
      </div>

        {/* Compteur de chats et bouton magasin */}
        <div className="fixed bottom-4 w-full flex justify-center items-center gap-4 z-10">
        <div className="bg-grisMedium text-violetMedium px-6 py-2 rounded-full shadow-md font-bold">
            🐱 Chats : {chatCount}
        </div>
        <button
            onClick={() => onSelect("magasin")}
            className="bg-violetMedium text-white px-6 py-2 rounded-full shadow-md transition-colors"
        >
            🏆 Récompenses
        </button>
        </div>
    </div>
  );
}
