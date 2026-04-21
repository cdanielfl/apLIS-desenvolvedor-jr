import { NavLink } from "react-router-dom";
import { Stethoscope, Users, UserRoundCog } from "lucide-react";
import { useI18n } from "../i18n/I18nContext";

function Sidebar() {
  const { language, setLanguage, t } = useI18n();

  const linkClass = ({ isActive }) =>
    `nav-link d-flex align-items-center gap-2 ${isActive ? "active bg-primary text-white" : "text-white-50"}`;

  return (
    <aside className="app-sidebar d-flex flex-column text-white p-3 shadow">
      <div className="d-flex align-items-center mb-3">
        <div className="brand-icon me-2 d-flex align-items-center justify-content-center">
          <Stethoscope size={20} />
        </div>
        <span className="fs-5 fw-bold">HealthCare</span>
      </div>

      <div className="mb-3">
        <select
          className="form-select form-select-sm"
          value={language}
          onChange={(event) => setLanguage(event.target.value)}
        >
          <option value="pt">Portugues</option>
          <option value="en">English</option>
        </select>
      </div>

      <hr className="border-secondary" />

      <ul className="nav nav-pills flex-column gap-2 mb-auto">
        <li className="nav-item">
          <NavLink to="/pacientes" className={linkClass}>
            <Users size={18} />
            {t("sidebar_pacientes")}
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/medicos" className={linkClass}>
            <UserRoundCog size={18} />
            {t("sidebar_medicos")}
          </NavLink>
        </li>
      </ul>

      <hr className="border-secondary" />

      <div className="d-flex align-items-center gap-2 text-white-50 small">
        <div className="admin-avatar">A</div>
        <span>{t("admin_panel")}</span>
      </div>
    </aside>
  );
}

export default Sidebar;
