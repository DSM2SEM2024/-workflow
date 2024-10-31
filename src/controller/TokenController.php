<?php
namespace Src\Controller;
use Src\Auth\TokenHandler;

class TokenController {

    public function verifyPermission(){
        $handler = new TokenHandler();
        echo json_encode($handler->verifyPermission());
    }

}