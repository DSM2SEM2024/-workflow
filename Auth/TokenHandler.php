<?php
namespace Src\Auth;
require 'config.php';

use Exception;
use Firebase\JWT\BeforeValidException;
use Firebase\JWT\ExpiredException;
use Firebase\JWT\JWT;
use Firebase\JWT\Key;
use Firebase\JWT\SignatureInvalidException;
use Src\Model\Message;
use Src\Repository\MailRepository;

class TokenHandler {

    public static function createAsLogin(string $role, $user, $exp_login) : array {

        if($exp_login){
            // trinta dias de validade para o token
            $exp = time() + 3600*24*30;
        }else{
            // Uma hora de validade para o token
            $exp = time() + 3600;
        }

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
            'exp' => $exp,
            'pages' => $pages,
            'sub' => $user,
            'role'=> $role
        ];
        
        $jwt = JWT::encode($payload, SECRET_KEY, alg);

        return Message::send(true,200,'JWT criado',$jwt);
    }

    public static function verifyPermission($role) : array {

        try{

            $headers = getallheaders();
            $token = explode(' ',$headers['Authorization'])[1];

            $decoded_token = JWT::decode($token, new Key(SECRET_KEY, alg));
            if($decoded_token->role==$role){
                return Message::send(true,200,'Permissão concedida',$decoded_token);
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

    public static function mailToken(array $data){

        $payload = [
            'iss' => 'http://localhost:8080',
            'aud' => 'http://localhost:8080',
            'iat' => time(),
            'nbf' => time(),
            // Uma hora de validade para o token
            'exp' => time() + (6*3600),
            'code'=>$data['code'],
            'role'=>$data['role'],
            'id'=>$data['id']
        ];

        $token = JWT::encode($payload, SECRET_KEY, alg);
        return Message::send(true,200,'Token criado',$token);

    }

    public static function verifyMailToken($token){

        $mail_repo = new MailRepository();
        try {

            $decoded = JWT::decode($token, new Key(SECRET_KEY, alg));
            $code = $mail_repo->verify($decoded->code)['data'];
            if($decoded->code==$code){
                return Message::send(true, 200, 'Código válido', $decoded);
            } else {
                return Message::send(false, 404, 'Código inválido',[]);
            }

        }catch (ExpiredException $e) {
            http_response_code(401);
            return Message::send(false,401,"Código expirado: " . $e->getMessage(),[]);
        } catch (BeforeValidException $e) {
            http_response_code(401);
            return Message::send(false,401,"Código ainda não é válido" . $e->getMessage(),[]);
        } catch (SignatureInvalidException $e) {
            http_response_code(401);
            return Message::send(false,401,"Assinatura do token inválida: " . $e->getMessage(),[]);
        } catch (Exception $e) {
            http_response_code(401);
            return Message::send(false,401,"Erro ao validar token: " . $e->getMessage(),[]);
        }

    }

}

