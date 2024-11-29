<?php
namespace Src\Controller;
use Src\Controller\ProfessorController;
use Src\Controller\CoordinatorController;
use Src\Auth\TokenHandler;
use Src\Model\Message;

class UserController {

    public function userSwitch(){
        $data = json_decode(file_get_contents('php://input'),true);
        switch ($data['role']) {
            case 'professor':
                $pc = new ProfessorController();
                echo json_encode($pc->signin());
                break;
                
            case 'coordinator':
                $cc = new CoordinatorController();
                echo json_encode($cc->signin());
                break;
        }
    }

    public function loginSwitch(){

        $pc = new ProfessorController();
        $cc = new CoordinatorController();
        $pc_r = $pc->login();
        $cc_r = $cc->login();
        if($pc_r['status']){
            echo json_encode($pc_r);
        } else {
            echo json_encode($cc_r);
        }
        
    }

    public function switchPassword(){

        $data = json_decode(file_get_contents('php://input'),true);
        $token_response = TokenHandler::verifyMailToken($data['code']);
        $pc = new ProfessorController();
        $cc = new CoordinatorController();

        switch ($token_response['data']->role) {
            case 'professor':
                echo json_encode($pc->definePassword());
                break;
            
            case 'coordinator':
                echo json_encode($cc->definePassword());
                break;
        }

    }

}