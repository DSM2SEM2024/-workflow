<?php
namespace Src\Routes;
use Src\Controller\ProfessorController;
use Src\Model\Professor;

class Routes {

    // Aqui a gente define as ações conforme a rota da uri (método e id)
    public static function getRoutes(): array{
        return [
            'GET' => [
                '/projetos' => [ProfessorController::class, 'mensagem'],
                '/projetos/{id}' => [ProfessorController::class,'mensagem2']
            ],
            'POST' => [
                '/login/professor' => [ProfessorController::class, 'login'],
                '/professor/cadastrar' => [ProfessorController::class, 'cadastra']
            ],
            'PUT' => [
                '/a/{id}' => [ProfessorController::class, 'login'],
            ],
            'DELETE' => [
                '/b/{id}' => [ProfessorController::class, 'login'],
            ],
        ];
    }
}