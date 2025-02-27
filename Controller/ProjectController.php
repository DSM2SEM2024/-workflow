<?php
namespace Src\Controller;

use Exception;
use Src\Model\Project;
use Src\Model\Unit;
use Src\Repository\ProjectRepository;
use Src\Auth\TokenHandler;
use Src\Model\Message;
use Src\Model\Professor;
use Src\Controller\FileController;
use Src\Repository\FileRepository;

class ProjectController {

    public function create(){

        $project = new Project();

        $project->setName($_POST['name']);
        $project->setDescription($_POST['description']);
        $project->setStartDate($_POST['startDate']);
        $project->setEndDate($_POST['endDate']);
        $project->setParticipants(serialize(json_decode($_POST['participants'],true)));

        $unit = new Unit();
        $unit->setId($_POST['unit']);
        $project->setUnit($unit);
        $project->setStatus(0);
        $repo = new ProjectRepository();
        $token_response = TokenHandler::verifyPermission($_POST['role']);
        $professor = new Professor();
        $id = $token_response['data']->sub->ID_Professor;
        $professor->setId($id);
        $project->setProfessor($professor);

        if($token_response['status']==true){

            $insert_response = $repo->create($project);

            if($insert_response['status']==true){
                $project->setId($insert_response['data'][0]);

                $file_controller = new FileController();

                if (!empty($_FILES['arquivos'])) {
                    $create_file_response1 = $file_controller->create($_FILES['arquivos'],'file',$project);
                    if($create_file_response1['status']==false){
                        echo json_encode($create_file_response1);
                        exit();
                    }
                }
    
                // Tratamento de links (caso haja links no FormData)
                $links = [];
                if (!empty($_POST['links'])) {

                    foreach ($_POST['links'] as $link) {
                        $links[] = $link; // Adiciona cada link a um array para salvar ou processar
                    }
                    $create_file_response2 = $file_controller->create($links,'link',$project);
                    if($create_file_response2['status']==false){
                        echo json_encode($create_file_response2);
                    }
                }

                echo json_encode(Message::send(true,$insert_response['code'],$insert_response['message'],$project->getId()));
            } else {
                echo json_encode($insert_response);
            }
        } else {
            echo json_encode($token_response);
        }

    }

    public function list(){

        $repo = new ProjectRepository();

        echo json_encode($repo->selectAll());

    }

    public function getById($id){

        $repo = new ProjectRepository();
        $project = new Project();
        $project->setId($id);
        echo json_encode($repo->selectById($project));

    }

    public function getProjectByProfId($id){

        $professor = new Professor();
        $professor->setId($id);
        $repo = new ProjectRepository();

        echo json_encode($repo->selectByProfId($professor));

    }

    public function getByProfessor(){
        $array = TokenHandler::verifyPermission("professor");
        $repo = new ProjectRepository();
        $project = new Project();
        $prof_token = $array['data']->sub;
        $prof = new Professor();
        $prof->setId($prof_token->ID_Professor);

        $project->setProfessor($prof);
        echo json_encode($repo->selectByProfessor($project));
    }

    public function getByProfessorLimit(){
        $array = TokenHandler::verifyPermission("professor");
        $repo = new ProjectRepository();
        $project = new Project();
        $prof_token = $array['data']->sub;
        $prof = new Professor();
        $prof->setId($prof_token->ID_Professor);

        $project->setProfessor($prof);
        echo json_encode($repo->selectByProfessorLimit($project));
    }

    public function update($id){
        $project = new Project();
        $project->setId($id);

        $project->setName($_POST['name']);
        $project->setDescription($_POST['description']);
        $project->setStartDate($_POST['startDate']);
        $project->setEndDate($_POST['endDate']);
        $project->setParticipants(serialize(json_decode($_POST['participants'],true)));

        $unit = new Unit();
        $unit->setId($_POST['unit']);
        $project->setUnit($unit);
        $project->setStatus(2);
        $professor = new Professor();
        $professor->setId($_POST['idProfessor']);
        $project->setProfessor($professor);

        $token_response = TokenHandler::verifyPermission($_POST['role']);
        $repo = new ProjectRepository();

        if($token_response['status']){
            $update_response = $repo->update($project);
            if($update_response['status']){

                $file_controller = new FileController();
                $file_repo = new FileRepository();
                $file_repo->clearAttachs($project,'files');
                if(!empty($_POST['arquivos'])){
                    $response = $file_controller->recreate(json_decode($_POST['arquivos'],true),'file',$project);
                    
                    if(!$response['status']){
                        echo json_encode($response);
                    }
                }
                
                $file_repo->clearAttachs($project,'link');
                $links = json_decode($_POST['links']);
                if(!empty($links)){
                    $response = $file_controller->recreate(json_decode($_POST['links'],true),'link',$project);
                    if(!$response['status']){
                        echo json_encode($response);
                    }
                }
                

                if(!empty($_FILES['novos_arquivos'])){
                    $response = $file_controller->create($_FILES['novos_arquivos'],'file',$project);
                    if(!$response['status']){
                        echo json_encode($response);
                    }
                }

                if(!empty($_POST['novos_links'])){
                    $response = $file_controller->create($_POST['novos_links'],'link',$project);
                    if(!$response['status']){
                        echo json_encode($response);
                    }
                }
                
                echo json_encode(Message::send(true, 200, 'Atualizado com sucesso',[]));exit();
                
            } else {
                echo json_encode($update_response);
            }
        } else {
            echo json_encode($token_response);
        }

    }

}