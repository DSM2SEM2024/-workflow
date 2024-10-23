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
        echo json_encode(TokenHandler::validate('professor',$professor));

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
    
}