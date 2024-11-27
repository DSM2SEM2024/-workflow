<?php
namespace Src\Controller;
use Src\Auth\TokenHandler;
use Src\Model\Message;

class TokenController {

    public function verifyPermission(){
        echo json_encode(TokenHandler::verifyPermission(json_decode(file_get_contents('php://input'),true)['role']));
    }

    public function verifyTeachersPage($id){
        $response = TokenHandler::verifyPermission('professor');
        if($response['data']->sub->ID_Professor==$id){
            echo json_encode(Message::send(true, 200, 'É seu perfil', []));
        } else {
            echo json_encode(Message::send(false, 400, 'Não é seu perfil',[]));
        }
    }

}