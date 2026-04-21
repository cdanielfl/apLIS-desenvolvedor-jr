<?php

class MedicoModel
{
    public function __construct(private PDO $connection)
    {
    }

    public function listAll(): array
    {
        // Traz dados no formato esperado pela API.
        $statement = $this->connection->query(
            "SELECT id, nome, crm AS CRM, ufcrm AS UFCRM FROM medicos ORDER BY id ASC"
        );
        return $statement->fetchAll();
    }

    public function findById(int $id): ?array
    {
        $statement = $this->connection->prepare(
            "SELECT id, nome, crm AS CRM, ufcrm AS UFCRM FROM medicos WHERE id = :id"
        );
        $statement->execute([":id" => $id]);

        $medico = $statement->fetch();
        return $medico ?: null;
    }

    public function create(array $data): void
    {
        // Prepared statement evita montar SQL na mao.
        $statement = $this->connection->prepare(
            "INSERT INTO medicos (nome, crm, ufcrm) VALUES (:nome, :crm, :ufcrm)"
        );

        $statement->execute([
            ":nome" => $data["nome"],
            ":crm" => $data["CRM"],
            ":ufcrm" => $data["UFCRM"],
        ]);
    }

    public function updateById(int $id, array $data): int
    {
        $statement = $this->connection->prepare(
            "UPDATE medicos SET nome = :nome, crm = :crm, ufcrm = :ufcrm WHERE id = :id"
        );

        $statement->execute([
            ":id" => $id,
            ":nome" => $data["nome"],
            ":crm" => $data["CRM"],
            ":ufcrm" => $data["UFCRM"],
        ]);

        return $statement->rowCount();
    }

    public function deleteById(int $id): int
    {
        $statement = $this->connection->prepare("DELETE FROM medicos WHERE id = :id");
        $statement->execute([":id" => $id]);

        return $statement->rowCount();
    }
}
