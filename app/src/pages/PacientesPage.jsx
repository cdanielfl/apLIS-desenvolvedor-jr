import { useEffect, useMemo, useState } from "react";
import { AlertCircle, Search, UserPlus, Users } from "lucide-react";
import PacienteForm from "../components/pacientes/PacienteForm";
import PacienteTable from "../components/pacientes/PacienteTable";
import { createPaciente, deletePaciente, fetchPacientes, updatePaciente } from "../services/api";
import { useI18n } from "../i18n/I18nContext";

const initialForm = {
  nome: "",
  dataNascimento: "",
  carteirinha: "",
  cpf: "",
};

function PacientesPage() {
  const { t } = useI18n();
  const [pacientes, setPacientes] = useState([]);
  const [form, setForm] = useState(initialForm);
  const [editingId, setEditingId] = useState(null);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");

  async function loadData() {
    try {
      setError("");
      const data = await fetchPacientes();
      setPacientes(data);
    } catch (err) {
      setError(err.message || t("load_patients_error"));
    }
  }

  useEffect(() => {
    loadData();
  }, []);

  const filteredPacientes = useMemo(() => {
    const term = search.trim().toLowerCase();
    if (!term) return pacientes;

    return pacientes.filter((paciente) => {
      return (
        paciente.nome?.toLowerCase().includes(term) ||
        paciente.cpf?.includes(term) ||
        paciente.carteirinha?.includes(term)
      );
    });
  }, [pacientes, search]);

  function handleChange(field, value) {
    setForm((currentForm) => ({ ...currentForm, [field]: value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setMessage("");
    setError("");

    try {
      const response = editingId ? await updatePaciente(editingId, form) : await createPaciente(form);
      setMessage(response.message || "OK");
      setForm(initialForm);
      setEditingId(null);
      await loadData();
    } catch (err) {
      setError(err.message || t("save_patient_error"));
    }
  }

  function handleEdit(paciente) {
    setEditingId(paciente.id);
    setForm({
      nome: paciente.nome || "",
      dataNascimento: paciente.dataNascimento || "",
      carteirinha: paciente.carteirinha || "",
      cpf: paciente.cpf || "",
    });
    setMessage("");
    setError("");
  }

  function handleCancelEdit() {
    setEditingId(null);
    setForm(initialForm);
    setMessage("");
    setError("");
  }

  async function handleDelete(id) {
    const confirmado = window.confirm(t("remove_patient_confirm"));
    if (!confirmado) return;

    setMessage("");
    setError("");

    try {
      const response = await deletePaciente(id);
      setMessage(response.message || "OK");
      if (editingId === id) {
        handleCancelEdit();
      }
      await loadData();
    } catch (err) {
      setError(err.message || t("remove_patient_error"));
    }
  }

  return (
    <section className="animate-in fade-in">
      <div className="d-flex flex-wrap justify-content-between align-items-center mb-4 gap-2">
        <h1 className="h3 fw-bold mb-0 text-dark">{t("manage_patients")}</h1>
      </div>

      {message && <div className="alert alert-success border-0 shadow-sm">{message}</div>}
      {error && (
        <div className="alert alert-danger d-flex align-items-center gap-2 border-0 shadow-sm" role="alert">
          <AlertCircle size={18} />
          {error}
        </div>
      )}

      <div className="row g-4">
        <div className="col-xl-4">
          <div className="card border-0 shadow-sm rounded-4 overflow-hidden transition-hover h-100">
            <div className="card-header bg-primary text-white py-3">
              <div className="d-flex align-items-center gap-2">
                <UserPlus size={18} />
                <h5 className="mb-0 fw-semibold">{editingId ? t("patient_edit") : t("patient_new")}</h5>
              </div>
            </div>
            <div className="card-body p-4">
              <PacienteForm
                form={form}
                onChange={handleChange}
                onSubmit={handleSubmit}
                isEditing={Boolean(editingId)}
                onCancelEdit={handleCancelEdit}
                t={t}
              />
            </div>
          </div>
        </div>

        <div className="col-xl-8">
          <div className="card border-0 shadow-sm rounded-4 overflow-hidden transition-hover">
            <div className="card-header bg-white py-3 border-bottom">
              <div className="d-flex flex-wrap justify-content-between align-items-center gap-3">
                <div className="d-flex align-items-center gap-2 text-primary">
                  <Users size={18} />
                  <h5 className="mb-0 fw-semibold">{t("patient_list")}</h5>
                </div>
                <div className="input-group search-box">
                  <span className="input-group-text bg-light border-end-0">
                    <Search size={16} className="text-muted" />
                  </span>
                  <input
                    type="text"
                    className="form-control bg-light border-start-0"
                    placeholder={t("patient_search")}
                    value={search}
                    onChange={(event) => setSearch(event.target.value)}
                  />
                </div>
              </div>
            </div>
            <div className="card-body p-0">
              <PacienteTable pacientes={filteredPacientes} onEdit={handleEdit} onDelete={handleDelete} t={t} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default PacientesPage;
