<?php
namespace Src\Routes;

class Router{
    public static function resolve(array $arrayRotas, $method, $uri) {
        //extrai do array a classe e o metodo
       foreach ($arrayRotas[$method] as $route => $controller) {
           //extrai da rota o recurso  /user/1 u /user
           $pattern = preg_replace('/\{([a-zA-Z0-9_]+)\}/', '([a-zA-Z0-9_]+)', $route);
           if (preg_match("#^$pattern$#", $uri, $recurso)) {
               array_shift($recurso);
                           //'/users' => [UserController::class, 'getAllUsers']
               return call_user_func_array([new $controller[0], $controller[1]], $recurso);
           }
       }
       http_response_code(404);
       echo json_encode(['status' => false, 'message' => 'Rota não encontrada']);
       exit();
   }
}