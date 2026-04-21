const NODE_API = "http://localhost:3001/api/v1/pacientes";
const PHP_API = "http://localhost:3002/api/v1/medicos";

function getLang() {
  return localStorage.getItem("app_lang") || "pt";
}

async function handleResponse(response, fallbackMessage) {
  const contentType = response.headers.get("content-type") || "";
  const rawBody = await response.text();
  let data = { message: rawBody };

  if (contentType.includes("application/json")) {
    try {
      data = JSON.parse(rawBody || "{}");
    } catch (_error) {
      data = { message: rawBody };
    }
  }

  if (!response.ok) {
    throw new Error(data.message || fallbackMessage);
  }

  return data;
}

export async function fetchPacientes() {
  const response = await fetch(NODE_API, {
    headers: { "X-Lang": getLang() },
  });
  return handleResponse(response, "Erro ao listar pacientes");
}

export async function createPaciente(payload) {
  const response = await fetch(NODE_API, {
    method: "POST",
    headers: { "Content-Type": "application/json", "X-Lang": getLang() },
    body: JSON.stringify(payload),
  });

  return handleResponse(response, "Erro ao cadastrar paciente");
}

export async function updatePaciente(id, payload) {
  const response = await fetch(`${NODE_API}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json", "X-Lang": getLang() },
    body: JSON.stringify(payload),
  });

  return handleResponse(response, "Erro ao atualizar paciente");
}

export async function deletePaciente(id) {
  const response = await fetch(`${NODE_API}/${id}`, {
    method: "DELETE",
    headers: { "X-Lang": getLang() },
  });

  return handleResponse(response, "Erro ao remover paciente");
}

export async function fetchMedicos() {
  const response = await fetch(PHP_API, {
    headers: { "X-Lang": getLang() },
  });
  return handleResponse(response, "Erro ao listar medicos");
}

export async function createMedico(payload) {
  const response = await fetch(PHP_API, {
    method: "POST",
    headers: { "Content-Type": "application/json", "X-Lang": getLang() },
    body: JSON.stringify(payload),
  });

  return handleResponse(response, "Erro ao cadastrar medico");
}

export async function updateMedico(id, payload) {
  const response = await fetch(`${PHP_API}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json", "X-Lang": getLang() },
    body: JSON.stringify(payload),
  });

  return handleResponse(response, "Erro ao atualizar medico");
}

export async function deleteMedico(id) {
  const response = await fetch(`${PHP_API}/${id}`, {
    method: "DELETE",
    headers: { "X-Lang": getLang() },
  });

  return handleResponse(response, "Erro ao remover medico");
}
