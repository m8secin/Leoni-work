import { useEffect, useState } from "react";
import Layout from "../components/Layout";

const API_URL = "http://localhost:9090";

export default function AjoutPannePage() {
  const [machines, setMachines] = useState([]);
  const [machineId, setMachineId] = useState("");
  const [typePanne, setTypePanne] = useState("");
  const [gravite, setGravite] = useState("");
  const [datePanne, setDatePanne] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    const fetchMachines = async () => {
      try {
        const res = await fetch(`${API_URL}/api/machines`);
        const data = await res.json();
        setMachines(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchMachines();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`${API_URL}/api/pannes`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          machineId: machineId ? Number(machineId) : null,
          typePanne,
          gravite,
          description,
          datePanne: datePanne || null,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data || "Erreur lors de l'ajout de la panne.");
        return;
      }

      alert("Panne enregistrée avec succès !");
      setMachineId("");
      setTypePanne("");
      setGravite("");
      setDatePanne("");
      setDescription("");
    } catch (err) {
      console.error(err);
      alert("Erreur serveur.");
    }
  };

  return (
    <Layout>
      <section className="form-container">
        <h2>🛠 Ajouter une panne</h2>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="machine">Machine concernée</label>
            <select
              id="machine"
              required
              value={machineId}
              onChange={(e) => setMachineId(e.target.value)}
            >
              <option value="">Sélectionnez une machine</option>
              {machines.map((m) => (
                <option key={m.id} value={m.id}>
                  {m.name}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="type-panne">Type de panne</label>
            <select
              id="type-panne"
              required
              value={typePanne}
              onChange={(e) => setTypePanne(e.target.value)}
            >
              <option value="">Sélectionnez un type</option>
              <option value="mecanique">Mécanique</option>
              <option value="electrique">Électrique</option>
              <option value="electronique">Électronique</option>
            </select>
          </div>

          <div className="form-group">
            <label>Niveau de gravité</label>
            <div className="radio-group">
              <label className="radio-option">
                <input
                  type="radio"
                  name="gravite"
                  value="mineure"
                  checked={gravite === "mineure"}
                  onChange={(e) => setGravite(e.target.value)}
                />
                Mineure
              </label>
              <label className="radio-option">
                <input
                  type="radio"
                  name="gravite"
                  value="moderee"
                  checked={gravite === "moderee"}
                  onChange={(e) => setGravite(e.target.value)}
                />
                Modérée
              </label>
              <label className="radio-option">
                <input
                  type="radio"
                  name="gravite"
                  value="critique"
                  checked={gravite === "critique"}
                  onChange={(e) => setGravite(e.target.value)}
                />
                Critique
              </label>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="date_panne">Date panne</label>
            <input
              id="date_panne"
              type="datetime-local"
              value={datePanne}
              onChange={(e) => setDatePanne(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Description détaillée</label>
            <textarea
              id="description"
              rows="4"
              required
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div className="form-actions">
            <button type="submit" className="btn-primary">Enregistrer</button>
            <button type="reset" className="btn-secondary">Annuler</button>
          </div>
        </form>
      </section>
    </Layout>
  );
}
