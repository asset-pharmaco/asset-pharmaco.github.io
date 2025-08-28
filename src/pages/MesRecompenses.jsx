import React, { useState, useEffect } from "react";

export default function MesRecompenses({ onBack }) {
  const [mesRecompenses, setMesRecompenses] = useState([]);
  const [chatCount, setChatCount] = useState(0);

  useEffect(() => {
    // Récupérer les récompenses depuis localStorage
    const savedRecompenses = localStorage.getItem("mesRecompenses");
    if (savedRecompenses) setMesRecompenses(JSON.parse(savedRecompenses));

    // Récupérer le nombre de chats depuis localStorage
    const savedChats = parseInt(localStorage.getItem("chatCount")) || 0;
    setChatCount(savedChats);
  }, []);

  const utiliser = (uniqueId) => {
    setMesRecompenses((prev) => {
      const newRecompenses = prev.filter((r) => r.uniqueId !== uniqueId);
      localStorage.setItem("mesRecompenses", JSON.stringify(newRecompenses));
      return newRecompenses;
    });
  };

  return (
    <div className="min-h-screen bg-grisFonce flex flex-col relative">
      {/* Header fixe avec compteur de chats */}
      <div className="fixed top-0 left-0 w-full bg-grisFonce z-10 shadow-md py-6 flex flex-col items-center">
        <h1 className="text-white text-3xl font-bold">Mes Récompenses</h1>
        <div className="mt-2 bg-grisMedium text-violetMedium px-4 py-1 rounded-full font-bold">
          🐱 Chats : {chatCount}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-6 pt-28 pb-24">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full max-w-lg mx-auto">
          {mesRecompenses.length === 0 && (
            <p className="text-white text-center col-span-full mt-4">
              Tu n'as pas encore de récompenses
            </p>
          )}
          {mesRecompenses.map((r) => (
            <div
              key={r.uniqueId}
              className="bg-bleuGris rounded-xl p-6 shadow-md flex flex-col gap-2 text-white"
            >
              <h2 className="font-bold text-xl">{r.nom} 🐱</h2>
              <p className="text-sm">{r.description}</p>
              <button
                onClick={() => utiliser(r.uniqueId)}
                className="mt-2 bg-violetMedium px-4 py-2 rounded-xl transition-colors"
              >
                Utilisé
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="fixed bottom-0 left-0 w-full bg-grisFonce p-4 flex justify-center shadow-inner">
        <button
          onClick={onBack}
          className="bg-bleuGris text-white rounded-xl px-6 py-2 transition-colors"
        >
          Menu
        </button>
      </div>
    </div>
  );
}
