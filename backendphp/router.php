<?php

// Se for arquivo estatico, deixa o servidor embutido responder.
$requestedPath = parse_url($_SERVER["REQUEST_URI"] ?? "/", PHP_URL_PATH);
$fullPath = __DIR__ . $requestedPath;

if ($requestedPath !== "/" && is_file($fullPath)) {
    return false;
}

// Se nao for arquivo, cai no index da API.
require __DIR__ . "/src/index.php";
