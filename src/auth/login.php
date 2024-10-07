<?php
namespace Src\Auth;
require 'config.php';
require_once '../../vendor/autoload.php';

use Firebase\JWT\JWT;
use Firebase\JWT\Key;
use Src\Model\Message;

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
    
    echo json_encode(
        Message::send(true,200,'Login efetuado',$jwt)
    );
} else{
    echo json_encode(
        Message::send(false,401,'Usuário ou senha inválidos',[])
    );
}
