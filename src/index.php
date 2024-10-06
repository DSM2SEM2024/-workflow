<?php
namespace App\Src;
include_once (__DIR__.'/../vendor/autoload.php');

if( $_SERVER['REQUEST_METHOD'] == 'GET'){
    http_response_code('200');
    echo json_encode(["message" => "get funcionando"]);
}

