import { Pencil, Trash2 } from "lucide-react";

function PacienteTable({ pacientes, onEdit, onDelete, t }) {
  return (
    <div className="table-responsive">
      <table className="table table-hover align-middle mb-0">
        <thead className="bg-light">
          <tr>
            <th className="px-4 py-3 text-muted small fw-bold text-uppercase">{t("sidebar_pacientes")}</th>
            <th className="py-3 text-muted small fw-bold text-uppercase">{t("cpf")}</th>
            <th className="py-3 text-muted small fw-bold text-uppercase">{t("card_number")}</th>
            <th className="py-3 text-muted small fw-bold text-uppercase">{t("birth_date")}</th>
            <th className="py-3 text-muted small fw-bold text-uppercase text-center">{t("actions")}</th>
          </tr>
        </thead>
        <tbody>
          {pacientes.length === 0 ? (
            <tr>
              <td colSpan={5} className="text-center py-5 text-muted">
                {t("no_patients")}
              </td>
            </tr>
          ) : (
            pacientes.map((paciente) => (
              <tr key={paciente.id}>
                <td className="px-4 py-3">
                  <div className="d-flex align-items-center gap-3">
                    <div className="avatar-circle bg-primary-subtle text-primary fw-bold">
                      {(paciente.nome || "?").charAt(0).toUpperCase()}
                    </div>
                    <div className="fw-semibold text-dark">{paciente.nome}</div>
                  </div>
                </td>
                <td className="py-3 text-muted">{paciente.cpf}</td>
                <td className="py-3 text-muted">{paciente.carteirinha}</td>
                <td className="py-3 text-muted">{paciente.dataNascimento}</td>
                <td className="py-3 text-center">
                  <div className="d-inline-flex gap-2">
                    <button type="button" className="btn btn-sm btn-outline-primary" onClick={() => onEdit(paciente)}>
                      <Pencil size={14} />
                    </button>
                    <button type="button" className="btn btn-sm btn-outline-danger" onClick={() => onDelete(paciente.id)}>
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

export default PacienteTable;
