<?php
namespace Src\Auth;
require 'config.php';
require_once __DIR__.'/../../vendor/autoload.php';

use Exception;
use Firebase\JWT\JWT;
use Firebase\JWT\Key;
use Src\Model\Message;

use Src\Model\Professor;
use Src\Repository\ProfessorRepository;

class TokenHandler {

    public static function create(string $role, $user) : array {

        switch ($role) {
            case 'professor':
                $pages = [
                    'createProject'
                ];
                break;
            
            case 'coordinator':
                $pages = [
                    'createProject',
                    'insertProfessor'
                ];
                break;
            
            case 'admin':
                $pages = [
                    'createProject',
                    'createProfessor',
                    'createCoordinator',
                    'createUnit'
                ];
                break;
        }
    
        $payload = [
            'iss' => 'http://localhost:8080',
            'aud' => 'http://localhost:8080',
            'iat' => time(),
            'nbf' => time(),
            'exp' => time() + 20,
            'pages' => $pages,
            'sub' => $user,
            'role'=> $role
        ];
        
        $jwt = JWT::encode($payload, SECRET_KEY, alg);

        return Message::send(true,200,'JWT criado',$jwt);
    }

    public static function verify(string $token) : array {

        try{
            $token_data = JWT::decode($token, new Key(SECRET_KEY, alg));
            return Message::send(true,200,'Token válido',null);

            // tratar as exceções de código posteriormente para caso de erro por expirar, corrompido, outro servidor etc.
        }catch(Exception $e){
            return Message::send(false,400,'Erro na decodificação',null);
        }

    }

}

