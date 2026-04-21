function PacienteForm({ form, onChange, onSubmit, isEditing, onCancelEdit, t }) {
  return (
    <form onSubmit={onSubmit}>
      <div className="mb-3">
        <label className="form-label text-muted small fw-bold text-uppercase">{t("full_name")}</label>
        <input
          className="form-control form-control-lg fs-6"
          placeholder="Ex: Joao da Silva"
          value={form.nome}
          onChange={(event) => onChange("nome", event.target.value)}
          required
        />
      </div>

      <div className="mb-3">
        <label className="form-label text-muted small fw-bold text-uppercase">{t("birth_date")}</label>
        <input
          type="date"
          className="form-control form-control-lg fs-6"
          value={form.dataNascimento}
          onChange={(event) => onChange("dataNascimento", event.target.value)}
          required
        />
      </div>

      <div className="mb-3">
        <label className="form-label text-muted small fw-bold text-uppercase">{t("card_number")}</label>
        <input
          className="form-control form-control-lg fs-6"
          placeholder="Ex: 123456"
          value={form.carteirinha}
          onChange={(event) => onChange("carteirinha", event.target.value)}
          required
        />
      </div>

      <div className="mb-4">
        <label className="form-label text-muted small fw-bold text-uppercase">{t("cpf")}</label>
        <input
          className="form-control form-control-lg fs-6"
          placeholder="Somente numeros"
          value={form.cpf}
          onChange={(event) => onChange("cpf", event.target.value)}
          required
        />
      </div>

      <div className="d-flex gap-2">
        <button type="submit" className="btn btn-primary btn-lg w-100 fw-bold shadow-sm">
          {isEditing ? t("save_changes") : t("create_patient")}
        </button>
        {isEditing && (
          <button type="button" className="btn btn-outline-secondary btn-lg" onClick={onCancelEdit}>
            {t("cancel")}
          </button>
        )}
      </div>
    </form>
  );
}

export default PacienteForm;
