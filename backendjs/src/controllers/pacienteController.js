const pacienteModel = require("../models/pacienteModel");

const MESSAGES = {
  pt: {
    internal_error: "Erro interno do servidor",
    invalid_id: "Id invalido",
    patient_not_found: "Paciente nao encontrado",
    required_fields: "Campos obrigatorios ausentes",
    patient_created: "Paciente criado com sucesso",
    patient_duplicate: "Paciente ja cadastrado",
    patient_updated: "Paciente atualizado com sucesso",
    patient_removed: "Paciente removido com sucesso",
  },
  en: {
    internal_error: "Internal server error",
    invalid_id: "Invalid id",
    patient_not_found: "Patient not found",
    required_fields: "Required fields are missing",
    patient_created: "Patient created successfully",
    patient_duplicate: "Patient already registered",
    patient_updated: "Patient updated successfully",
    patient_removed: "Patient removed successfully",
  },
};

function getLang(req) {
  const langHeader = String(req.headers["x-lang"] || req.headers["accept-language"] || "pt").toLowerCase();
  return langHeader.startsWith("en") ? "en" : "pt";
}

function msg(req, key) {
  const lang = getLang(req);
  return MESSAGES[lang][key] || MESSAGES.pt[key] || key;
}

function parseId(idParam) {
  const id = Number(idParam);
  return Number.isInteger(id) && id > 0 ? id : null;
}

// Controller recebe a requisicao e chama o model.
async function listarPacientes(req, res) {
  try {
    const pacientes = await pacienteModel.listarTodos();
    return res.json(pacientes);
  } catch (error) {
    return res.status(500).json({ message: msg(req, "internal_error") });
  }
}

async function buscarPaciente(req, res) {
  try {
    const id = parseId(req.params.id);
    if (!id) {
      return res.status(400).json({ message: msg(req, "invalid_id") });
    }

    const paciente = await pacienteModel.buscarPorId(id);

    if (!paciente) {
      return res.status(404).json({ message: msg(req, "patient_not_found") });
    }

    return res.json(paciente);
  } catch (error) {
    return res.status(500).json({ message: msg(req, "internal_error") });
  }
}

async function criarPaciente(req, res) {
  const { nome, dataNascimento, carteirinha, cpf } = req.body;

  // Se faltar campo, ja retorna erro 400.
  if (!nome || !dataNascimento || !carteirinha || !cpf) {
    return res.status(400).json({ message: msg(req, "required_fields") });
  }

  try {
    await pacienteModel.criar({ nome, dataNascimento, carteirinha, cpf });
    return res.status(201).json({ message: msg(req, "patient_created") });
  } catch (error) {
    if (error?.code === "ER_DUP_ENTRY") {
      return res.status(409).json({ message: msg(req, "patient_duplicate") });
    }

    return res.status(500).json({ message: msg(req, "internal_error") });
  }
}

async function atualizarPaciente(req, res) {
  const { nome, dataNascimento, carteirinha, cpf } = req.body;
  const id = parseId(req.params.id);

  if (!id) {
    return res.status(400).json({ message: msg(req, "invalid_id") });
  }

  // Se faltar campo, ja retorna erro 400.
  if (!nome || !dataNascimento || !carteirinha || !cpf) {
    return res.status(400).json({ message: msg(req, "required_fields") });
  }

  try {
    const paciente = await pacienteModel.buscarPorId(id);
    if (!paciente) {
      return res.status(404).json({ message: msg(req, "patient_not_found") });
    }

    await pacienteModel.atualizarPorId(id, {
      nome,
      dataNascimento,
      carteirinha,
      cpf,
    });

    return res.json({ message: msg(req, "patient_updated") });
  } catch (error) {
    if (error?.code === "ER_DUP_ENTRY") {
      return res.status(409).json({ message: msg(req, "patient_duplicate") });
    }

    return res.status(500).json({ message: msg(req, "internal_error") });
  }
}

async function removerPaciente(req, res) {
  try {
    const id = parseId(req.params.id);
    if (!id) {
      return res.status(400).json({ message: msg(req, "invalid_id") });
    }

    const linhasAfetadas = await pacienteModel.removerPorId(id);

    if (!linhasAfetadas) {
      return res.status(404).json({ message: msg(req, "patient_not_found") });
    }

    return res.json({ message: msg(req, "patient_removed") });
  } catch (error) {
    return res.status(500).json({ message: msg(req, "internal_error") });
  }
}

module.exports = {
  listarPacientes,
  buscarPaciente,
  criarPaciente,
  atualizarPaciente,
  removerPaciente,
};
