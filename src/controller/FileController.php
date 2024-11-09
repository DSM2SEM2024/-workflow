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
        $files = [];

        foreach ($response['data'] as $key => $file) {
            $data = $file['File_Data'];
            $f = [
                'ID_File' => $file['ID_File'],
                'File_Name' => $file['File_Name'],
                'File_Type' => $file['File_Type'],
                'URL' => $file['URL'],
                'File_Data' => "data:application/octet-stream;base64,$data",
                'ID_Project' => $file['ID_Project']
            ];
            array_push($files, $f);
        }
        $response['data'] = $files;

        echo json_encode($response);

    }

    public function getCover(){

        $repo = new FileRepository();
        $img_response = $repo->selectCoverImage();
        if($img_response['status']){
            $files = [];
            foreach ($img_response['data'] as $key => $file) {
                $data = $file['File_Data'];
                $file_extension = explode('.',$file['File_Name'])[1];
                $f = [
                    'ID_File' => $file['ID_File'],
                    'File_Name' => $file['File_Name'],
                    'File_Type' => $file['File_Type'],
                    'URL' => $file['URL'],
                    'File_Data' => "data:image/$file_extension;base64,$data",
                    'ID_Project' => $file['ID_Project']
                ];
                array_push($files, $f);
            }
            $img_response['data'] = $files;
        }
        echo json_encode($img_response);

    }

}