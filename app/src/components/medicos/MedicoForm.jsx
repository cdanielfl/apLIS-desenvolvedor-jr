function MedicoForm({ form, onChange, onSubmit, isEditing, onCancelEdit, t }) {
  return (
    <form onSubmit={onSubmit}>
      <div className="mb-3">
        <label className="form-label text-muted small fw-bold text-uppercase">{t("professional_name")}</label>
        <input
          className="form-control form-control-lg fs-6"
          placeholder="Ex: Dra. Maria Souza"
          value={form.nome}
          onChange={(event) => onChange("nome", event.target.value)}
          required
        />
      </div>

      <div className="mb-3">
        <label className="form-label text-muted small fw-bold text-uppercase">{t("crm")}</label>
        <input
          className="form-control form-control-lg fs-6"
          placeholder="Ex: 123456"
          value={form.CRM}
          onChange={(event) => onChange("CRM", event.target.value)}
          required
        />
      </div>

      <div className="mb-4">
        <label className="form-label text-muted small fw-bold text-uppercase">{t("ufcrm")}</label>
        <input
          className="form-control form-control-lg fs-6"
          placeholder="Ex: CE"
          maxLength={2}
          value={form.UFCRM}
          onChange={(event) => onChange("UFCRM", event.target.value.toUpperCase())}
          required
        />
      </div>

      <div className="d-flex gap-2">
        <button type="submit" className="btn btn-success btn-lg w-100 fw-bold shadow-sm">
          {isEditing ? t("save_changes") : t("create_doctor")}
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

export default MedicoForm;
