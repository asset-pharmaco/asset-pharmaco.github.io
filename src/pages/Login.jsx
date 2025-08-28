import { useState } from "react";

export default function Login({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username === "portailcoulissant" && password === "3metres") {
      setError("");
      onLogin();
    } else {
      setError("Identifiant ou mot de passe incorrect");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-grisFonce p-6">
      <h1 className="text-white text-3xl font-bold mb-8">🐱 PharmacoPortail 🐱</h1>

      <form
        onSubmit={handleSubmit}
        className="bg-bleuGris rounded-xl p-6 w-full max-w-sm shadow-md"
      >
        {error && (
          <div className="bg-roseSombre text-gray-100 p-2 mb-4 rounded text-center">
            {error}
          </div>
        )}
        <div className="mb-4">
          <label className="block text-white font-semibold mb-1">Identifiant</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-3 py-2 rounded border border-gray-600 bg-grisFonce text-gray-100 focus:outline-none focus:ring-2 focus:ring-bleuFonce"
            placeholder="Identifiant"
          />
        </div>
        <div className="mb-6">
          <label className="block text-white font-semibold mb-1">Mot de passe</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2 rounded border border-gray-600 bg-grisFonce text-gray-100 focus:outline-none focus:ring-2 focus:ring-bleuFonce"
            placeholder="Mot de passe"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-violetMedium text-gray-100 font-bold py-2 rounded-xl transition-colors"
        >
          Se connecter
        </button>
      </form>
    </div>
  );
}
