<?php
namespace Src\Routes;
use Src\Controller\ProfessorController;
use Src\Model\Professor;

class Routes {

    // Aqui a gente define as ações conforme a rota da uri (método e id)
    public static function getRoutes(): array{
        return [
            'GET' => [
                '/teste' => [ProfessorController::class, 'teste'],
                '/auth/{id}' => [ProfessorController::class, 'login'],
            ],
            'POST' => [
                '/login/professor' => [ProfessorController::class, 'login'],
                '/register/professor' => [ProfessorController::class, 'register'],
                '/verify/jwt' => [ProfessorController::class, 'verifyToken']
            ],
            'PUT' => [
                '/auth/{id}' => [ProfessorController::class, 'login'],
            ],
            'DELETE' => [
                '/auth/{id}' => [ProfessorController::class, 'login'],
            ],
        ];
    }
}