<?php   
namespace Src\Controller;
use Src\Auth\TokenHandler;
use Src\Model\Message;
use Src\Model\Professor;
use Src\Repository\ProfessorRepository;

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
            $token_response = TokenHandler::createAsLogin('professor',$login_response['data']);
            http_response_code($token_response['code']);
            echo json_encode(Message::send(true,$token_response['code'],'Login efetuado',$token_response['data']));
        } else {
            echo json_encode($login_response);
        }

    }

    public function mensagem(){
        echo 'mensagem de teste';
    }

    public function mensagem2($id){
        echo 'mensagem '.$id;
    }
    
    public function cadastra(){
        echo 'mandou pro db';
    }

}