<?php
namespace Src\Auth;
require 'config.php';
require_once '../../vendor/autoload.php';

use Firebase\JWT\JWT;
use Firebase\JWT\Key;
use Src\Model\Message;

use Src\Model\Professor;
use Src\Repository\ProfessorRepository;

$professor = new Professor();
$dados = json_decode(file_get_contents("php://input"));

$professor->setEmail($dados->usuario);
$professor->setPassword($dados->senha);

$prof_repo = new ProfessorRepository();
$login_data = $prof_repo->login($professor);

if ($login_data['STATUS']){
    $payload = [
        'iat' => time(),
        'exp' => + 3600 * 12,
        'usuario' => $login_data['DATA']
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
