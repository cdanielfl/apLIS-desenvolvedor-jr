const db = require("../config/database");

async function listarTodos() {
  // Troca data_nascimento para dataNascimento na resposta.
  const [rows] = await db.query(
    "SELECT id, nome, data_nascimento AS dataNascimento, carteirinha, cpf FROM pacientes ORDER BY id ASC"
  );
  return rows;
}

async function buscarPorId(id) {
  const [rows] = await db.query(
    "SELECT id, nome, data_nascimento AS dataNascimento, carteirinha, cpf FROM pacientes WHERE id = ?",
    [id]
  );

  return rows[0] || null;
}


async function criar({ nome, dataNascimento, carteirinha, cpf }) {
  // O ? evita montar SQL na mao.
  await db.query(
    "INSERT INTO pacientes (nome, data_nascimento, carteirinha, cpf) VALUES (?, ?, ?, ?)",
    [nome, dataNascimento, carteirinha, cpf]
  );
}

async function atualizarPorId(id, { nome, dataNascimento, carteirinha, cpf }) {
  const [result] = await db.query(
    "UPDATE pacientes SET nome = ?, data_nascimento = ?, carteirinha = ?, cpf = ? WHERE id = ?",
    [nome, dataNascimento, carteirinha, cpf, id]
  );

  return result.affectedRows;
}

async function removerPorId(id) {
  const [result] = await db.query("DELETE FROM pacientes WHERE id = ?", [id]);
  return result.affectedRows;
}

module.exports = {
  listarTodos,
  buscarPorId,
  criar,
  atualizarPorId,
  removerPorId,
};
