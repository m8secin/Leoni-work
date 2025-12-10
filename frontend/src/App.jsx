import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import MachinesPage from "./pages/MachinesPage";
import AjoutPannePage from "./pages/AjoutPannePage";
import StatistiquesPage from "./pages/StatistiquesPage";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/" element={<HomePage />} />
      <Route path="/machines" element={<MachinesPage />} />
      <Route path="/ajout-panne" element={<AjoutPannePage />} />
      <Route path="/statistiques" element={<StatistiquesPage />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default App;
