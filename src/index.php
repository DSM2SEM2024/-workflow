<?php
namespace Src;
require_once '../vendor/autoload.php';

use Src\Auth\LoginAuth;
use Src\Model\Message;


$dados = json_decode(file_get_contents("php://input"),true);

echo json_encode(LoginAuth::login($dados));
