<?php

class MedicoController
{
    public function __construct(private MedicoModel $medicoModel)
    {
    }

    public function listMedicos(): void
    {
        try {
            // Busca no model e devolve JSON.
            $medicos = $this->medicoModel->listAll();
            $this->respond(200, $medicos);
        } catch (Throwable $error) {
            $this->respond(500, ["message" => "Erro interno do servidor"]);
        }
    }

    public function showMedico(int $id): void
    {
        try {
            $medico = $this->medicoModel->findById($id);

            if (!$medico) {
                $this->respond(404, ["message" => "Medico nao encontrado"]);
                return;
            }

            $this->respond(200, $medico);
        } catch (Throwable $error) {
            $this->respond(500, ["message" => "Erro interno do servidor"]);
        }
    }

    public function createMedico(array $payload): void
    {
        // Se faltar campo obrigatorio, retorna 400.
        if (!$this->isValid($payload)) {
            $this->respond(400, ["message" => "Campos obrigatorios ausentes"]);
            return;
        }

        try {
            $this->medicoModel->create($payload);
            $this->respond(201, ["message" => "Medico criado com sucesso"]);
        } catch (PDOException $error) {
            // 1062 = chave duplicada no MySQL.
            if (($error->errorInfo[1] ?? null) === 1062) {
                $this->respond(409, ["message" => "Medico ja cadastrado"]);
                return;
            }

            $this->respond(500, ["message" => "Erro interno do servidor"]);
        } catch (Throwable $error) {
            $this->respond(500, ["message" => "Erro interno do servidor"]);
        }
    }

    public function updateMedico(int $id, array $payload): void
    {
        // Se faltar campo obrigatorio, retorna 400.
        if (!$this->isValid($payload)) {
            $this->respond(400, ["message" => "Campos obrigatorios ausentes"]);
            return;
        }

        try {
            $medico = $this->medicoModel->findById($id);
            if (!$medico) {
                $this->respond(404, ["message" => "Medico nao encontrado"]);
                return;
            }

            $this->medicoModel->updateById($id, $payload);
            $this->respond(200, ["message" => "Medico atualizado com sucesso"]);
        } catch (PDOException $error) {
            // 1062 = chave duplicada no MySQL.
            if (($error->errorInfo[1] ?? null) === 1062) {
                $this->respond(409, ["message" => "Medico ja cadastrado"]);
                return;
            }

            $this->respond(500, ["message" => "Erro interno do servidor"]);
        } catch (Throwable $error) {
            $this->respond(500, ["message" => "Erro interno do servidor"]);
        }
    }

    public function deleteMedico(int $id): void
    {
        try {
            $affectedRows = $this->medicoModel->deleteById($id);

            if ($affectedRows === 0) {
                $this->respond(404, ["message" => "Medico nao encontrado"]);
                return;
            }

            $this->respond(200, ["message" => "Medico removido com sucesso"]);
        } catch (Throwable $error) {
            $this->respond(500, ["message" => "Erro interno do servidor"]);
        }
    }

    private function isValid(array $payload): bool
    {
        return !empty($payload["nome"]) && !empty($payload["CRM"]) && !empty($payload["UFCRM"]);
    }

    private function respond(int $statusCode, array $body): void
    {
        http_response_code($statusCode);
        header("Content-Type: application/json; charset=utf-8");
        echo json_encode($body, JSON_UNESCAPED_UNICODE);
    }
}
