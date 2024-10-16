<?php
namespace Src\Routes;
use Src\Auth\LoginAuth;

class Routes {

    // Aqui a gente define as ações conforme a rota da uri (método e id)
    public static function getRoutes(): array{
        return [
            'GET' => [
                '/auth' => [LoginAuth::class, 'login'],
                '/auth/{id}' => [LoginAuth::class, 'login'],
            ],
            'POST' => [
                '/auth' => [LoginAuth::class, 'login'],
            ],
            'PUT' => [
                '/auth/{id}' => [LoginAuth::class, 'login'],
            ],
            'DELETE' => [
                '/auth/{id}' => [LoginAuth::class, 'login'],
            ],
        ];
    }
}