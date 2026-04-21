<?php

function createDatabaseConnection(): PDO
{
    // Pega dados do .env. Se faltar, usa padrao local.
    $host = getenv("DB_HOST") ?: "127.0.0.1";
    $port = getenv("DB_PORT") ?: "3306";
    $dbName = getenv("DB_NAME") ?: "aplisdemo";
    $user = getenv("DB_USER") ?: "root";
    $password = getenv("DB_PASSWORD") ?: "";

    $dsn = "mysql:host={$host};port={$port};dbname={$dbName};charset=utf8mb4";
    $options = [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
    ];

    // Cria a conexao com MySQL.
    return new PDO($dsn, $user, $password, $options);
}
