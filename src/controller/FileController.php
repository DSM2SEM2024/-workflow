<?php
namespace Src\Controller;
use Src\Model\File;
use Src\Model\Message;
use Src\Model\Project;
use Src\Repository\FileRepository;

class FileController {

    private FileRepository $repo;

    public function __construct()
    {
        $this->repo = new FileRepository();
    }

    public function create(Array $file, string $type, Project $project){

        if($type=='file'){
            foreach ($file['name'] as $index => $fileName) {
                $f = new File();
                $tmpName = $file['tmp_name'][$index];
                $f->setName($fileName);
                $f->setData(base64_encode(file_get_contents($tmpName)));
                $f->setType(explode('.',$f->getName())[1]);
                $f->setProject($project);
    
                $create_response = $this->repo->insert($f);
            }
            return $create_response;
        } else {
            foreach ($file as $index => $url) {
                $f = new File();
                $f->setName($url);
                $f->setUrl($url);
                $f->setType($type);
                $f->setProject($project);
    
                $create_response = $this->repo->insert($f);
            }
            return $create_response;
        }

    }

    public function list($project_id){

        $project = new Project();
        $project->setId($project_id);
        $file = new File();
        $file->setProject($project);
        $repo = new FileRepository();
        $response = $repo->selectByProject($file);

        foreach ($response['data'] as $key => $file) {
            $file['File_Data'] = 'data:application/octet-stream;base64,'.$file['File_Data'];
        }

        echo json_encode($response);

    }

}