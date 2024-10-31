<?php
namespace Src\Controller;
use Src\Model\Project;
use Src\Model\Unit;
use Src\Repository\ProjectRepository;
use Src\Auth\TokenHandler;
use Src\Model\Message;

class ProjectController {

    public function create(){

        $data = json_decode(file_get_contents('php://input'),true);
        $project = new Project();
        $project->setName($data['name']);
        $project->setDescription($data['description']);
        $project->setStartDate($data['startDate']);
        $project->setEndDate($data['endDate']);
        $project->setParticipants(serialize($data['participants']));
        $unit = new Unit();
        $unit->setId($data['unit']);
        $project->setUnit($unit);
        $project->setStatus(0);

        $repo = new ProjectRepository();

        $token_response = TokenHandler::verifyPermission();
        if($token_response['status']==true){
            $insert_response = $repo->create($project);
            if($insert_response['status']==true){
                $project->setId($insert_response['data']);
                http_response_code($insert_response['code']);
                echo json_encode(Message::send(true,$insert_response['code'],$insert_response['message'],$project));
            } else {
                http_response_code($insert_response['code']);
                echo json_encode($insert_response);
            }
        } else {
            http_response_code($token_response['code']);
            echo json_encode($token_response);
        }

    }

    public function list(){

        $repo = new ProjectRepository();

        echo json_encode($repo->selectAll());

    }

    public function getById($id){

        $project = new Project();
        $project->setId($id);
        $repo = new ProjectRepository();
        echo json_encode($repo->selectById($project));

    }

}