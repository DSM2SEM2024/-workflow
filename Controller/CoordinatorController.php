<?php
namespace Src\Controller;
use Src\Model\Coordinator;
use Src\Auth\TokenHandler;
use Src\Model\Message;
use Src\Model\Unit;
use Src\Repository\CoordinatorRepository;
use Src\Repository\MailRepository;

class CoordinatorController {

    public function signin(){

        $data = json_decode(file_get_contents('php://input'),true);
        $repo = new CoordinatorRepository();

        $coordinator = new Coordinator();
        $coordinator->setName($data['name']);
        $coordinator->setEmail($data['email']);
        $unit = new Unit();
        $unit->setId($data['unit']);
        $coordinator->setUnit($unit);

        $insert_response = $repo->insert($coordinator);
        $coordinator->setId($insert_response['data']);
        http_response_code($insert_response['code']);
        $mail_system = new MailController();
        if($insert_response['status']==true){
            $mail_system->requestPassword($coordinator->getName(),$coordinator->getEmail(), $coordinator->getId(),'coordinator');
        }
        return $insert_response;

    }

    public function login(){

        $data = json_decode(file_get_contents('php://input'),true);
        $repo = new CoordinatorRepository();
        $professor = new Coordinator();
        $professor->setEmail($data['email']);
        $professor->setPassword($data['password']);

        $login_response = $repo->login($professor);
        if($login_response['status']){
            $token_response = TokenHandler::createAsLogin('professor',$login_response['data'], $data['login']);
            http_response_code($token_response['code']);
            return Message::send(true,$token_response['code'],'Login efetuado',$token_response['data']);
        } else {
            return $login_response;
        }

    }

    public function definePassword(){

        $data = json_decode(file_get_contents('php://input'),true);
        $token_response = TokenHandler::verifyMailToken($data['code']);

        $repo = new CoordinatorRepository();
        $coordinator = new Coordinator();
        $coordinator->setPassword($data['password']);

        if($token_response['status']==true){
            $coordinator->setId($token_response['data']->id);
            $update_response = $repo->updatePassword($coordinator);
            $mail_repo = new MailRepository();
            if($update_response['status']){
                $mail_repo->clearCode($data['code']);
            }
            return $update_response;
            
        } else {
            return $token_response;
        }

    }

}