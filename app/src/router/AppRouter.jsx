import { Navigate, Route, Routes } from "react-router-dom";
import DashboardLayout from "../layouts/DashboardLayout";
import PacientesPage from "../pages/PacientesPage";
import MedicosPage from "../pages/MedicosPage";

function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<DashboardLayout />}>
        <Route index element={<Navigate to="/pacientes" replace />} />
        <Route path="pacientes" element={<PacientesPage />} />
        <Route path="medicos" element={<MedicosPage />} />
      </Route>
      <Route path="*" element={<Navigate to="/pacientes" replace />} />
    </Routes>
  );
}

export default AppRouter;
