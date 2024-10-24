<?php   
namespace Src\Controller;
use Src\Auth\TokenHandler;
use Src\Model\Message;
use Src\Model\Professor;
use Src\Repository\ProfessorRepository;

class ProfessorController {

    public function login(){
        
        $data = json_decode(file_get_contents('php://input'),true);
        $repo = new ProfessorRepository();

        $professor = new Professor();
        $professor->setEmail($data['email']);
        $professor->setPassword($data['password']);
        $login_response = $repo->login($professor);
        if($login_response['status']==true){
            echo json_encode(TokenHandler::create('professor',$professor));
        } else {
            echo json_encode($login_response);
        }

    }

    public function register(){
        
        $data = json_decode(file_get_contents('php://input'),true);
        $repo = new ProfessorRepository();

        $professor = new Professor();
        $professor->setName($data['name']);
        $professor->setEmail($data['email']);
        $professor->setPassword($data['password']);
        $professor->setExpertise($data['expertise']);

        echo json_encode($repo->insert($professor));

    }

    public function verifyToken(){

        $headers = getallheaders();
        $data = json_decode(file_get_contents('php://input'),true);

        echo json_encode($headers['Authorization']);

    }
    
}