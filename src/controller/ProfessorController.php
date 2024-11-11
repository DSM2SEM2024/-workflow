<?php   
namespace Src\Controller;
use Src\Auth\TokenHandler;
use Src\Model\Message;
use Src\Model\Professor;
use Src\Repository\ProfessorRepository;
use Src\Controller\MailController;
use Src\Controller\MailRepository;
use Src\Model\Project;
use Src\Repository\MailRepository as RepositoryMailRepository;

class ProfessorController {

    public function register(){

        $data = json_decode(file_get_contents('php://input'),true);
        $repo = new ProfessorRepository();

        $professor = new Professor();
        $professor->setName($data['name']);
        $professor->setEmail($data['email']);
        $professor->setExpertise($data['expertise']);
        $professor->setPassword($data['password']);

        $permission_response = TokenHandler::verifyPermission('coordinator');

        if($permission_response['status']){
            $insert_response = $repo->insert($professor);
            http_response_code($insert_response['code']);
            echo json_encode($insert_response);
        } else {
            http_response_code(401);
            echo json_encode($permission_response);
        }

    }

    public function login(){

        $data = json_decode(file_get_contents('php://input'),true);
        $repo = new ProfessorRepository();
        $professor = new Professor();
        $professor->setEmail($data['email']);
        $professor->setPassword($data['password']);

        $login_response = $repo->login($professor);
        if($login_response['status']){
            $token_response = TokenHandler::createAsLogin('professor',$login_response['data'], $data['login']);
            http_response_code($token_response['code']);
            echo json_encode(Message::send(true,$token_response['code'],'Login efetuado',$token_response['data']));
        } else {
            echo json_encode($login_response);
        }

    }

    public function signin(){
        $data = json_decode(file_get_contents('php://input'),true);
        $repo = new ProfessorRepository();

        $professor = new Professor();
        $professor->setName($data['name']);
        $professor->setEmail($data['email']);

        $insert_response = $repo->insert($professor);
        $professor->setId($insert_response['data']);
        http_response_code($insert_response['code']);
        $mail_system = new MailController();
        if($insert_response['status']==true){
            $mail_system->requestPassword($professor->getName(),$professor->getEmail(), $professor->getId(),'professor');
        }
        return $insert_response;


    }

    public function definePassword(){

        $data = json_decode(file_get_contents('php://input'),true);
        $token_response = TokenHandler::verifyMailToken($data['code']);

        $repo = new ProfessorRepository();
        $professor = new Professor();
        $professor->setPassword($data['password']);

        if($token_response['status']==true){
            $professor->setId($token_response['data']->id);
            $update_response = $repo->updatePassword($professor);
            $mail_repo = new RepositoryMailRepository();
            if($update_response['status']){
                $mail_repo->clearCode($data['code']);
            }
            return $update_response;
            
        } else {
            return $token_response;
        }

    }

}