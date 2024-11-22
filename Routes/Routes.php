<?php
namespace Src\Routes;
use Src\Controller\ProfessorController;
use Src\Controller\TokenController;
use Src\Controller\ProjectController;
use Src\Controller\UnitController;
use Src\Controller\FileController;
use Src\Controller\CourseController;
use Src\Controller\UserController;

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
                '/projectByProfLimit' => [ProjectController::class, 'getByProfessorLimit'],
                '/cover' => [FileController::class, 'getCover'],
                '/course' => [CourseController::class, 'list'],
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