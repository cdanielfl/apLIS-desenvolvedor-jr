USE aplisdemo;

INSERT INTO medicos (nome, crm, ufcrm) VALUES
  ('Joao da Silva', '123456', 'CE'),
  ('Francisco Pereira', '876543', 'CE')
ON DUPLICATE KEY UPDATE
  nome = VALUES(nome);

INSERT INTO pacientes (nome, data_nascimento, carteirinha, cpf) VALUES
  ('Joao da Silva', '2026-01-01', '123456', '12345678909'),
  ('Francisco Pereira', '2026-01-02', '876543', '12345678901')
ON DUPLICATE KEY UPDATE
  nome = VALUES(nome),
  data_nascimento = VALUES(data_nascimento);
