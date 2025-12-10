import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";

const API_URL = "http://localhost:9090";

export default function MachinesPage() {
  const [name, setName] = useState("");
  const [line, setLine] = useState("");
  const [type, setType] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`${API_URL}/api/machines`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, line, type }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Erreur lors de l'ajout.");
        return;
      }

      alert(`Machine "${data.name}" ajoutée avec succès !`);
      navigate("/ajout-panne");
    } catch (err) {
      console.error(err);
      alert("Erreur serveur.");
    }
  };

  return (
    <Layout>
      <section className="form-container">
        <h2>🏭 Ajouter une machine</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="machine-name">Nom de la machine*</label>
            <input
              id="machine-name"
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="production-line">Ligne de production*</label>
            <select
              id="production-line"
              required
              value={line}
              onChange={(e) => setLine(e.target.value)}
            >
              <option value="">Sélectionnez...</option>
              <option value="A">Ligne A</option>
              <option value="B">Ligne B</option>
              <option value="C">Ligne C</option>
              <option value="D">Ligne D</option>
              <option value="E">Ligne E</option>
              <option value="F">Ligne F</option>
              <option value="G">Ligne G</option>
              <option value="H">Ligne H</option>
              <option value="I">Ligne I</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="machine-type">Type de machine*</label>
            <input
              id="machine-type"
              type="text"
              required
              value={type}
              onChange={(e) => setType(e.target.value)}
            />
          </div>

          <div className="form-actions">
            <button type="submit" className="btn-primary">Enregistrer</button>
            <button
              type="button"
              className="btn-secondary"
              onClick={() => navigate("/ajout-panne")}
            >
              Annuler
            </button>
          </div>
        </form>
      </section>
    </Layout>
  );
}
