import React, { useState, useEffect } from "react";
import Login from "./pages/Login";
import TrainingSelect from "./pages/TrainingSelect";
import QCM from "./pages/QCM";
import OuiNonQuiz from "./pages/OuiNon";
import Magasin from "./pages/magasin";
import MesRecompenses from "./pages/MesRecompenses";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [trainingType, setTrainingType] = useState(null);
  const [chatCount, setChatCount] = useState(0);

  // Initialisation du nombre de chats depuis le cookie
  useEffect(() => {
    const getCookie = (name) => {
      const value = `; ${document.cookie}`;
      const parts = value.split(`; ${name}=`);
      if (parts.length === 2) return parts.pop().split(";").shift();
    };
    const saved = getCookie("chatCount");
    if (saved) setChatCount(parseInt(saved));
  }, []);

  if (!loggedIn) {
    return <Login onLogin={() => setLoggedIn(true)} />;
  }

  if (!trainingType) {
    return <TrainingSelect onSelect={(type) => setTrainingType(type)} chatCount={chatCount} setChatCount={setChatCount} />;
  }

  switch (trainingType) {
    case "qcm":
      return <QCM category="anatomie" onBack={() => setTrainingType(null)} />;
    case "carte":
      return <OuiNonQuiz onBack={() => setTrainingType(null)} />;
    case "magasin":
      return (
        <Magasin
          chatCount={chatCount}
          setChatCount={setChatCount}
          onBack={() => setTrainingType(null)}
          goToMesRecompenses={() => setTrainingType("mesRecompenses")}
        />
      );
    case "mesRecompenses":
      return <MesRecompenses onBack={() => setTrainingType(null)} />;
    default:
      return (
        <div className="min-h-screen flex items-center justify-center text-white">
          Page pour {trainingType} à créer...
        </div>
      );
  }
}

export default App;
