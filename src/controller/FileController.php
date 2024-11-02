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

}