import { Pencil, Trash2 } from "lucide-react";

function MedicoTable({ medicos, onEdit, onDelete, t }) {
  return (
    <div className="table-responsive">
      <table className="table table-hover align-middle mb-0">
        <thead className="bg-light">
          <tr>
            <th className="px-4 py-3 text-muted small fw-bold text-uppercase">{t("professional_name")}</th>
            <th className="py-3 text-muted small fw-bold text-uppercase">{t("crm")}</th>
            <th className="py-3 text-muted small fw-bold text-uppercase">{t("ufcrm")}</th>
            <th className="py-3 text-muted small fw-bold text-uppercase text-center">{t("actions")}</th>
          </tr>
        </thead>
        <tbody>
          {medicos.length === 0 ? (
            <tr>
              <td colSpan={4} className="text-center py-5 text-muted">
                {t("no_doctors")}
              </td>
            </tr>
          ) : (
            medicos.map((medico) => (
              <tr key={medico.id}>
                <td className="px-4 py-3">
                  <div className="d-flex align-items-center gap-3">
                    <div className="avatar-circle bg-success-subtle text-success fw-bold">
                      {(medico.nome || "?").charAt(0).toUpperCase()}
                    </div>
                    <div className="fw-semibold text-dark">{medico.nome}</div>
                  </div>
                </td>
                <td className="py-3 text-muted">{medico.CRM}</td>
                <td className="py-3">
                  <span className="badge rounded-pill text-bg-light border">{medico.UFCRM}</span>
                </td>
                <td className="py-3 text-center">
                  <div className="d-inline-flex gap-2">
                    <button type="button" className="btn btn-sm btn-outline-success" onClick={() => onEdit(medico)}>
                      <Pencil size={14} />
                    </button>
                    <button type="button" className="btn btn-sm btn-outline-danger" onClick={() => onDelete(medico.id)}>
                      <Trash2 size={14} />
                    </button>
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default MedicoTable;
