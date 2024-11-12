<?php
namespace Src\Routes;
use Src\Controller\ProfessorController;
use Src\Controller\TokenController;
use Src\Controller\ProjectController;
use Src\Controller\UnitController;
use Src\Controller\FileController;
use Src\Controller\MailController;
use Src\Controller\UserController;
use Src\Routes\Router;

class Routes {

    // Aqui a gente define as ações conforme a rota da uri (método e id)
    public static function getRoutes(): array{
        return [
            'GET' => [
                '/project' => [ProjectController::class, 'list'],
                '/project/{id}' => [ProjectController::class,'getById'],
                '/unit' => [UnitController::class, 'list'],
                '/files/{id}' => [FileController::class, 'list'],
                '/projectByProf' => [ProjectController::class, 'getByProfessor'],
                '/cover' => [FileController::class, 'getCover'],
            ],
            'POST' => [
                '/professor/login' => [ProfessorController::class, 'login'],
                '/user/create' => [UserController::class, 'userSwitch'],
                '/token/validateAccess' => [TokenController::class, 'verifyPermission'],
                '/project/create' => [ProjectController::class, 'create'],
                '/unit/create' => [UnitController::class, 'create'],
                '/password/define' => [UserController::class, 'switchPassword']
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