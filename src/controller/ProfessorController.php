<?php   
namespace Src\Controller;
use Src\Auth\LoginAuth;
use Src\Model\Message;

class ProfessorController {

    public function login(){
        
        $data = json_decode(file_get_contents('php://input'),true);

        echo json_encode(LoginAuth::validate($data));

    }

    public function teste(){
        echo 'teste ai';
    }
    
}