import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";

function DashboardLayout() {
  return (
    <div className="app-shell bg-light min-vh-100">
      <Sidebar />
      <main className="app-main p-4 p-lg-5">
        <div className="container-fluid px-0">
          <Outlet />
        </div>
      </main>
    </div>
  );
}

export default DashboardLayout;
