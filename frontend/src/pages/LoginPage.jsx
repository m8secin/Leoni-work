import { useState } from "react";
import { useNavigate } from "react-router-dom";

const API_URL = "http://localhost:9090";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");

    try {
      const res = await fetch(`${API_URL}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        setErrorMsg(data.message || "Erreur de connexion.");
        return;
      }

      localStorage.setItem("user", JSON.stringify(data));
      navigate("/");
    } catch (err) {
      console.error(err);
      setErrorMsg("Erreur serveur.");
    }
  };

  return (
    <div className="login-page">
      <div className="box">
        <h2>Connexion LEONI</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <br />

          <input
            type="password"
            placeholder="Mot de passe"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <br />

          <button type="submit" className="btn-primary">
            Se connecter
          </button>

          {errorMsg && <div className="error">{errorMsg}</div>}
        </form>
      </div>
    </div>
  );
}
