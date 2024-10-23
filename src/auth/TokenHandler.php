<?php
namespace Src\Auth;
require 'config.php';
require_once __DIR__.'/../../vendor/autoload.php';

use Firebase\JWT\JWT;
use Firebase\JWT\Key;
use Src\Model\Message;

use Src\Model\Professor;
use Src\Repository\ProfessorRepository;

class TokenHandler {

    public static function validate(string $role, $user) : array {

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
            'iat' => time(),
            'exp' => + 3600 * 12,
            'pages' => $pages,
            'user' => $user
        ];
        
        $jwt = JWT::encode($payload, SECRET_KEY, 'HS256');

        return Message::send(true,200,'JWT criado',$jwt);
    }

}

