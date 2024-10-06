<?php
namespace src\Model;

class Message {

    public static function message($status,$code,$message,$data) : array {
        return [
            'STATUS'=>$status,
            'CODE'=>$code,
            'MESSAGE'=>$message,
            'DATA'=>$data
        ];
    }
}