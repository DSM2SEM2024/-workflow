<?php
namespace Src;
require_once '../vendor/autoload.php';

use Src\Model\Message;

echo json_encode(Message::send(true,200,'Requisição funcionando',[]));
