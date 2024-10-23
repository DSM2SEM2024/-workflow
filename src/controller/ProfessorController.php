<?php   
namespace Src\Controller;
use Src\Auth\LoginAuth;
use Src\Model\Message;
use Src\Model\Professor;
use Src\Repository\ProfessorRepository;

class ProfessorController {

    public function login(){
        
        $data = json_decode(file_get_contents('php://input'),true);

        $professor = new Professor();
        $professor->setEmail($data['email']);
        $professor->setPassword($data['password']);
        echo json_encode(LoginAuth::validate($professor));

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