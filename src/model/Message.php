<?php
namespace Src\Model;

class Message {

    public static function send($status,$code,$message,$data) : array {
        return [
            'STATUS'=>$status,
            'CODE'=>$code,
            'MESSAGE'=>$message,
            'DATA'=>$data
        ];
    }
}