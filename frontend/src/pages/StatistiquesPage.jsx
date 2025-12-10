import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import {
  PieChart, Pie, Cell,
  LineChart, Line,
  BarChart, Bar,
  XAxis, YAxis, Tooltip, Legend, CartesianGrid,
  ResponsiveContainer
} from "recharts";

// Styles for table
const thStyle = {
  textAlign: "left",
  padding: "10px 8px",
  fontWeight: "600",
  color: "#f1f5f9",
  borderBottom: "1px solid rgba(148,163,184,0.4)"
};

const tdStyle = {
  padding: "10px 8px",
  color: "#e2e8f0"
};

const getColor = (g) => {
  if (g === "critique") return "#ef4444";
  if (g === "moderee") return "#f59e0b";
  return "#10b981";
};

const API_URL = "http://localhost:9090";

// Chart colors
const COLORS = ["#6366f1", "#ec4899", "#10b981", "#f59e0b", "#ef4444"];

export default function StatistiquesPage() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // ==========================================================
  // LOAD BOTH: statistics AND list of pannes
  // ==========================================================
  useEffect(() => {
    const loadStats = async () => {
      try {
        setLoading(true);
        setError("");

        // 1️⃣ Fetch des statistiques
        const resStats = await fetch(`${API_URL}/api/pannes/stats`);
        if (!resStats.ok) throw new Error("Erreur stats");
        const statsData = await resStats.json();

        // 2️⃣ Fetch des pannes complètes
        const resPannes = await fetch(`${API_URL}/api/pannes`);
        if (!resPannes.ok) throw new Error("Erreur pannes");
        const pannesData = await resPannes.json();

        console.log("STATS:", statsData);
        console.log("PANNES:", pannesData);

        // 3️⃣ Combine all
        setStats({
          ...statsData,
          allPannes: pannesData
        });

      } catch (err) {
        console.error(err);
        setError("Impossible de charger les statistiques.");
      } finally {
        setLoading(false);
      }
    };

    loadStats();
  }, []);

  // ==========================================================
  // LOADING OR ERROR
  // ==========================================================
  if (loading) {
    return (
      <Layout>
        <section className="form-container" style={{ maxWidth: "900px" }}>
          <h2>📈 Statistiques des pannes</h2>
          <p>Chargement...</p>
        </section>
      </Layout>
    );
  }

  if (error || !stats) {
    return (
      <Layout>
        <section className="form-container" style={{ maxWidth: "900px" }}>
          <h2>📈 Statistiques des pannes</h2>
          <p className="error">{error}</p>
        </section>
      </Layout>
    );
  }

  // ==========================================================
  // TRANSFORM JSON TO CHART DATA
  // ==========================================================
  const byTypeData = Object.entries(stats.byType).map(([name, value]) => ({ name, value }));

  const byGraviteData = Object.entries(stats.byGravite).map(([name, value]) => ({ name, value }));

  const byDayData = Object.entries(stats.byDay).map(([date, count]) => ({ date, count }));

  // ==========================================================
  // UI
  // ==========================================================
  return (
    <Layout>
      <section className="welcome" style={{ maxWidth: "1100px", margin: "0 auto" }}>
        <h2>📊 Statistiques des pannes</h2>

        {/* =======================
            PIE CHART — Types
        ======================== */}
        <div style={{ width: "100%", height: 320, marginTop: 40 }}>
          <h3>Répartition des pannes par type</h3>
          <ResponsiveContainer>
            <PieChart>
              <Pie
                data={byTypeData}
                cx="50%"
                cy="50%"
                outerRadius={110}
                dataKey="value"
                label
              >
                {byTypeData.map((entry, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* =======================
            LINE CHART — Évolution
        ======================== */}
        <div style={{ width: "100%", height: 300, marginTop: 60 }}>
          <h3>Évolution des pannes dans le temps</h3>
          <ResponsiveContainer>
            <LineChart data={byDayData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="count" stroke="#10b981" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* =======================
            BAR CHART — Gravité
        ======================== */}
        <div style={{ width: "100%", height: 300, marginTop: 60 }}>
          <h3>Pannes par gravité</h3>
          <ResponsiveContainer>
            <BarChart data={byGraviteData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="value" fill="#6366f1" />
            </BarChart>
          </ResponsiveContainer>
        </div>

      </section>

      {/* =======================
          TABLEAU DES PANNES
      ======================== */}
      <div style={{
        marginTop: "70px",
        padding: "20px",
        background: "rgba(255,255,255,0.03)",
        borderRadius: "12px",
        border: "1px solid rgba(148,163,184,0.25)"
      }}>
        <h3 style={{ marginBottom: "15px" }}>📋 Liste des pannes enregistrées</h3>

        {stats.allPannes.length === 0 ? (
          <p>Aucune panne trouvée.</p>
        ) : (
          <div style={{ overflowX: "auto" }}>
            <table style={{
              width: "100%",
              borderCollapse: "collapse",
              color: "#e5e7eb",
              fontSize: "0.9rem"
            }}>
              <thead>
                <tr style={{ background: "rgba(255,255,255,0.08)" }}>
                  <th style={thStyle}>Machine</th>
                  <th style={thStyle}>Type panne</th>
                  <th style={thStyle}>Gravité</th>
                  <th style={thStyle}>Date</th>
                  <th style={thStyle}>Description</th>
                </tr>
              </thead>

              <tbody>
                {stats.allPannes.map((p, idx) => (
                  <tr key={idx} style={{ borderBottom: "1px solid rgba(148,163,184,0.2)" }}>
                    <td style={tdStyle}>{p.machine?.name || "Non définie"}</td>
                    <td style={tdStyle}>{p.typePanne}</td>
                    <td style={{ ...tdStyle, color: getColor(p.niveauGravite) }}>
                      {p.niveauGravite}
                    </td>
                    <td style={tdStyle}>
                      {p.datePanne?.replace("T", " ").slice(0, 16)}
                    </td>
                    <td style={tdStyle}>{p.description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

    </Layout>
  );
}
