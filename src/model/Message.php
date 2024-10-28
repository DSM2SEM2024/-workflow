<?php
namespace Src\Model;

class Message {

    public static function send($status,$code,$message,$data) : array {
        return [
            'status'=>$status,
            'code'=>$code,
            'message'=>$message,
            'data'=>$data
        ];
    }
}