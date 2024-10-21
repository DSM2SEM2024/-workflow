<?php
namespace Src\Auth;
require 'config.php';
require_once __DIR__.'/../../vendor/autoload.php';

use Firebase\JWT\JWT;
use Firebase\JWT\Key;
use Src\Model\Message;

use Src\Model\Professor;
use Src\Repository\ProfessorRepository;

class LoginAuth {

    public static function validate(array $dados) : array {

        $professor = new Professor();
        
        $professor->setEmail($dados['usuario']);
        $professor->setPassword($dados['senha']);
        
        $prof_repo = new ProfessorRepository();
        $login_data = $prof_repo->login($professor);
        
        if ($login_data['status']==true){
            $payload = [
                'iat' => time(),
                'exp' => + 3600 * 12,
                'usuario' => $login_data['data']
            ];
            
            $jwt = JWT::encode($payload, SECRET_KEY, 'HS256');
            
            return Message::send(true,200,'Login efetuado',$jwt);
        } else{
            return Message::send(false,401,'Usuário ou senha inválidos',null);
        }
    }

}

