<?php
namespace Src\Auth;
require 'config.php';
require_once __DIR__.'/../../vendor/autoload.php';

use Exception;
use Firebase\JWT\BeforeValidException;
use Firebase\JWT\ExpiredException;
use Firebase\JWT\JWT;
use Firebase\JWT\Key;
use Firebase\JWT\SignatureInvalidException;
use Src\Model\Message;

class TokenHandler {

    public static function createAsLogin(string $role, $user) : array {

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
            // Uma hora de validade para o token
            'exp' => time() + 3600,
            'pages' => $pages,
            'sub' => $user,
            'role'=> $role
        ];
        
        $jwt = JWT::encode($payload, SECRET_KEY, alg);

        return Message::send(true,200,'JWT criado',$jwt);
    }

    public static function verifyPermission() : array {
        
        try{

            $headers = getallheaders();
            $token = explode(' ',$headers['Authorization'])[1];
            $role = json_decode(file_get_contents('php://input'),true)['role'];

            $decoded_token = JWT::decode($token, new Key(SECRET_KEY, alg));
            if($decoded_token->role==$role){
                return Message::send(true,200,'Permissão concedida',[$decoded_token]);
            } else {
                return Message::send(false,401,'Permissão negada',[]);
            }
        }catch (ExpiredException $e) {
            http_response_code(401);
            return Message::send(false,401,"Token expirado: " . $e->getMessage(),[]);
        } catch (BeforeValidException $e) {
            http_response_code(401);
            return Message::send(false,401,"Token ainda não é válido" . $e->getMessage(),[]);
        } catch (SignatureInvalidException $e) {
            http_response_code(401);
            return Message::send(false,401,"Assinatura do token inválida: " . $e->getMessage(),[]);
        } catch (Exception $e) {
            http_response_code(401);
            return Message::send(false,401,"Erro ao validar token: " . $e->getMessage(),[]);
        }

    }

}

