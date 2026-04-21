<?php

declare(strict_types=1);

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, X-Lang");

// Preflight do CORS.
if (($_SERVER["REQUEST_METHOD"] ?? "GET") === "OPTIONS") {
    http_response_code(204);
    exit;
}

require_once __DIR__ . "/config/database.php";
require_once __DIR__ . "/models/MedicoModel.php";
require_once __DIR__ . "/controllers/MedicoController.php";

try {
    $connection = createDatabaseConnection();
    $medicoModel = new MedicoModel($connection);
    $medicoController = new MedicoController($medicoModel);
} catch (Throwable $error) {
    http_response_code(500);
    header("Content-Type: application/json; charset=utf-8");
    echo json_encode(["message" => "Erro ao conectar no banco de dados"], JSON_UNESCAPED_UNICODE);
    exit;
}

$method = $_SERVER["REQUEST_METHOD"] ?? "GET";
$path = parse_url($_SERVER["REQUEST_URI"] ?? "/", PHP_URL_PATH) ?: "/";
$rawBody = file_get_contents("php://input");

function decodeJsonBody(string $rawBody): ?array
{
    $payload = json_decode($rawBody ?: "{}", true);
    return is_array($payload) ? $payload : null;
}

// GET /api/v1/medicos
if ($method === "GET" && $path === "/api/v1/medicos") {
    $medicoController->listMedicos();
    exit;
}

// POST /api/v1/medicos
if ($method === "POST" && $path === "/api/v1/medicos") {
    $payload = decodeJsonBody($rawBody);

    if ($payload === null) {
        http_response_code(400);
        header("Content-Type: application/json; charset=utf-8");
        echo json_encode(["message" => "JSON invalido"], JSON_UNESCAPED_UNICODE);
        exit;
    }

    $medicoController->createMedico($payload);
    exit;
}

// GET /api/v1/medicos/{id}
if ($method === "GET" && preg_match("#^/api/v1/medicos/(\d+)$#", $path, $matches) === 1) {
    $medicoController->showMedico((int)$matches[1]);
    exit;
}

// PUT /api/v1/medicos/{id}
if ($method === "PUT" && preg_match("#^/api/v1/medicos/(\d+)$#", $path, $matches) === 1) {
    $payload = decodeJsonBody($rawBody);

    if ($payload === null) {
        http_response_code(400);
        header("Content-Type: application/json; charset=utf-8");
        echo json_encode(["message" => "JSON invalido"], JSON_UNESCAPED_UNICODE);
        exit;
    }

    $medicoController->updateMedico((int)$matches[1], $payload);
    exit;
}

// DELETE /api/v1/medicos/{id}
if ($method === "DELETE" && preg_match("#^/api/v1/medicos/(\d+)$#", $path, $matches) === 1) {
    $medicoController->deleteMedico((int)$matches[1]);
    exit;
}

http_response_code(404);
header("Content-Type: application/json; charset=utf-8");
echo json_encode(["message" => "Rota nao encontrada"], JSON_UNESCAPED_UNICODE);
