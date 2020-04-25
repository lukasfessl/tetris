<?php

if (isset($_POST['name']) && strlen($_POST['name']) < 32 && is_numeric($_POST['score']) && is_numeric($_POST['level'])) {
    
    extract(include 'config.php');
    $pdo = new PDO($dsn, $user, $password);

    $data = [
        'name' => $_POST['name'],
        'score' => $_POST['score'],
        'level' => $_POST['level'],
    ];
    $sql = "INSERT INTO score (name, score, level) VALUES (:name, :score, :level)";
    $pdo->prepare($sql)->execute($data);
    $pdo = null;

    http_response_code(200);
} else {
    http_response_code(400);
}