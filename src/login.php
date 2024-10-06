<?php
require 'config.php';
require_once '../vendor/autoload.php';

use Firebase\JWT\JWT;
use Firebase\JWT\Key;

$teste_user = 'usuario';
$teste_senha = '123';

$dados = json_decode(file_get_contents("php://input"));

if ($dados->usuario == $teste_user && $dados->senha == $teste_senha){
    $payload = [
        'iat' => time(),
        'exp' => + 3600 * 12,
        'usuario' => $dados->usuario
    ];
    
    $jwt = JWT::encode($payload, SECRET_KEY, 'HS256');
    
    echo json_encode([
        'satus' => 'sucesso',
        'token' => $jwt
    ]);
} else{
    echo json_encode([
        'status' => 'erro',
        'mensagem' => 'usuario ou senha invalido'
    ]);
}
