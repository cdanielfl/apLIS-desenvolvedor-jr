import { useEffect, useMemo, useState } from "react";
import { AlertCircle, Search, Stethoscope, UserRoundCog } from "lucide-react";
import MedicoForm from "../components/medicos/MedicoForm";
import MedicoTable from "../components/medicos/MedicoTable";
import { createMedico, deleteMedico, fetchMedicos, updateMedico } from "../services/api";
import { useI18n } from "../i18n/I18nContext";

const initialForm = {
  nome: "",
  CRM: "",
  UFCRM: "",
};

function MedicosPage() {
  const { t } = useI18n();
  const [medicos, setMedicos] = useState([]);
  const [form, setForm] = useState(initialForm);
  const [editingId, setEditingId] = useState(null);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");

  async function loadData() {
    try {
      setError("");
      const data = await fetchMedicos();
      setMedicos(data);
    } catch (err) {
      setError(err.message || t("load_doctors_error"));
    }
  }

  useEffect(() => {
    loadData();
  }, []);

  const filteredMedicos = useMemo(() => {
    const term = search.trim().toLowerCase();
    if (!term) return medicos;

    return medicos.filter((medico) => {
      return medico.nome?.toLowerCase().includes(term) || medico.CRM?.toLowerCase().includes(term);
    });
  }, [medicos, search]);

  function handleChange(field, value) {
    setForm((currentForm) => ({ ...currentForm, [field]: value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setMessage("");
    setError("");

    try {
      const response = editingId ? await updateMedico(editingId, form) : await createMedico(form);
      setMessage(response.message || "OK");
      setForm(initialForm);
      setEditingId(null);
      await loadData();
    } catch (err) {
      setError(err.message || t("save_doctor_error"));
    }
  }

  function handleEdit(medico) {
    setEditingId(medico.id);
    setForm({
      nome: medico.nome || "",
      CRM: medico.CRM || "",
      UFCRM: medico.UFCRM || "",
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
    const confirmado = window.confirm(t("remove_doctor_confirm"));
    if (!confirmado) return;

    setMessage("");
    setError("");

    try {
      const response = await deleteMedico(id);
      setMessage(response.message || "OK");
      if (editingId === id) {
        handleCancelEdit();
      }
      await loadData();
    } catch (err) {
      setError(err.message || t("remove_doctor_error"));
    }
  }

  return (
    <section className="animate-in fade-in">
      <div className="d-flex flex-wrap justify-content-between align-items-center mb-4 gap-2">
        <h1 className="h3 fw-bold mb-0 text-dark">{t("doctor_team")}</h1>
      </div>

      {message && <div className="alert alert-success border-0 shadow-sm">{message}</div>}
      {error && (
        <div className="alert alert-warning d-flex align-items-center gap-2 border-0 shadow-sm" role="alert">
          <AlertCircle size={18} />
          {error}
        </div>
      )}

      <div className="row g-4">
        <div className="col-xl-4">
          <div className="card border-0 shadow-sm rounded-4 overflow-hidden transition-hover h-100">
            <div className="card-header bg-success text-white py-3">
              <div className="d-flex align-items-center gap-2">
                <Stethoscope size={18} />
                <h5 className="mb-0 fw-semibold">{editingId ? t("doctor_edit") : t("doctor_new")}</h5>
              </div>
            </div>
            <div className="card-body p-4">
              <MedicoForm
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
                <div className="d-flex align-items-center gap-2 text-success">
                  <UserRoundCog size={18} />
                  <h5 className="mb-0 fw-semibold">{t("doctor_list")}</h5>
                </div>
                <div className="input-group search-box">
                  <span className="input-group-text bg-light border-end-0">
                    <Search size={16} className="text-muted" />
                  </span>
                  <input
                    type="text"
                    className="form-control bg-light border-start-0"
                    placeholder={t("doctor_search")}
                    value={search}
                    onChange={(event) => setSearch(event.target.value)}
                  />
                </div>
              </div>
            </div>
            <div className="card-body p-0">
              <MedicoTable medicos={filteredMedicos} onEdit={handleEdit} onDelete={handleDelete} t={t} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default MedicosPage;
