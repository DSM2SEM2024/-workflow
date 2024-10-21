<?php
namespace Src;
require_once '../vendor/autoload.php';

use Src\Routes\Routes;
use Src\Routes\Router;
use Src\Model\Message;

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    echo json_encode(Message::send(false, 404, 'Erro na requisição',null));
    exit();
}

$method = $_SERVER['REQUEST_METHOD'];
$uri = $_SERVER['REQUEST_URI'];

$arrayRotas = Routes::getRoutes();

Router::resolve($arrayRotas, $method, $uri);