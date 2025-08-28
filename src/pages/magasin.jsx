import React, { useState, useEffect } from "react";
import recompenses from "../assets/recompenses.json";
import { v4 as uuidv4 } from "uuid";

export default function Magasin({ chatCount, setChatCount, onBack, goToMesRecompenses }) {
  const [mesRecompenses, setMesRecompenses] = useState([]);

  useEffect(() => {
    // Récupérer les récompenses depuis localStorage
    const saved = localStorage.getItem("mesRecompenses");
    if (saved) setMesRecompenses(JSON.parse(saved));

    // Récupérer chatCount depuis localStorage si présent
    const savedChats = parseInt(localStorage.getItem("chatCount")) || chatCount || 0;
    setChatCount(savedChats);
  }, []);

  const acheter = (item) => {
    if (chatCount >= item.prix) {
      const nouvChatCount = chatCount - item.prix;
      setChatCount(nouvChatCount);

      // Sauvegarder uniquement dans localStorage
      localStorage.setItem("chatCount", nouvChatCount);

      // Ajouter la récompense
      const newRecompense = { ...item, uniqueId: uuidv4() };
      const newRecompenses = [...mesRecompenses, newRecompense];
      setMesRecompenses(newRecompenses);
      localStorage.setItem("mesRecompenses", JSON.stringify(newRecompenses));

      alert(`✅ Tu as acheté : ${item.nom}`);
    } else {
      alert("❌ Pas assez de chats !");
    }
  };

  return (
    <div className="min-h-screen bg-grisFonce flex flex-col relative">
      {/* Header fixe */}
      <h1 className="fixed top-0 left-0 w-full text-center text-white text-3xl font-bold py-6 bg-grisFonce z-10 shadow-md flex justify-center items-center gap-4">
        Magasin
        <span className="text-white font-bold px-3 py-1 rounded-xl bg-bleuGris">
          {chatCount} 🐱
        </span>
      </h1>

      {/* Conteneur scrollable */}
      <div className="flex-1 overflow-y-auto px-6 pt-28 pb-28">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full max-w-lg mx-auto">
          {recompenses.map((r) => (
            <div
              key={r.id}
              className="bg-bleuGris rounded-xl p-6 shadow-md flex flex-col gap-2 text-white"
            >
              <h2 className="font-bold text-xl">{r.nom}</h2>
              <p className="text-sm">{r.description}</p>
              <p className="font-semibold">Prix : {r.prix} 🐱</p>
              <button
                onClick={() => acheter(r)}
                className="mt-2 bg-violetMedium px-4 py-2 rounded-xl transition-colors"
              >
                Acheter
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Footer fixe */}
      <div className="fixed bottom-0 left-0 w-full bg-grisFonce p-4 flex justify-center gap-4 shadow-inner">
        <button
          onClick={onBack}
          className="bg-bleuGris text-white rounded-xl px-6 py-2 transition-colors"
        >
          Retour
        </button>
        <button
          onClick={goToMesRecompenses}
          className="bg-violetMedium text-white rounded-xl px-6 py-2 transition-colors"
        >
          🤯 Mes Récompenses
        </button>
      </div>
    </div>
  );
}
