import { Link } from "react-router-dom";
import Layout from "../components/Layout";

export default function HomePage() {
  return (
    <Layout>
      <section className="welcome">
        <h2>Maintenance</h2>
        <ul className="maintenance-menu">
          <li><Link to="/">Accueil</Link></li>
          <li><Link to="/ajout-panne">Ajouter une panne</Link></li>
          <li><Link to="/statistiques">Statistiques</Link></li>
        </ul>

        <hr className="separator" />

        <h1>Dashboard de Maintenance</h1> <br />
        <p>
          Ce tableau de bord vous permet de suivre et gérer les opérations de maintenance
          des équipements industriels.
        </p> <br />

        <div className="intro-cards">
          <Link to="/ajout-panne" className="intro-card">
            <h3>🛠 Gestion des pannes</h3>
            <p>Ajoutez, visualisez et suivez les incidents techniques.</p>
          </Link>

          <Link to="/statistiques" className="intro-card">
            <h3>📊 Statistiques dynamiques</h3>
            <p>Analysez l&apos;évolution des pannes.</p>
          </Link>

          <Link to="/machines" className="intro-card">
            <h3>🏭 Données machines</h3>
            <p>Renseignez les informations sur vos équipements.</p>
          </Link>
        </div>
      </section>
    </Layout>
  );
}
