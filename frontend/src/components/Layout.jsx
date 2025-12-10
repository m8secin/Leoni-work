import { Link } from "react-router-dom";

export default function Layout({ children }) {
  return (
    <div className="dashboard">
      <aside className="sidebar">
        <h1>LEONI</h1>
        <ul>
          <li><Link to="/">🏠 Accueil</Link></li>
          <li><Link to="/machines">🏭 Ajouter une Machine</Link></li>
          <li><Link to="/ajout-panne">🛠 Ajouter une panne</Link></li>
          <li><Link to="/statistiques">📈 Statistiques</Link></li>
        </ul>
      </aside>

      <main className="content">
        <header className="header-main">
          <h2>LEONI - Dashboard Maintenance</h2>
          <Link to="/login" className="btn-secondary">Déconnexion</Link>
        </header>
        {children}
      </main>
    </div>
  );
}
