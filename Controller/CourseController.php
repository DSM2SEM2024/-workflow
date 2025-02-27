<?php
namespace Src\Controller;
use Src\Model\Course;
use Src\Model\Unit;
use Src\Repository\CourseRepository;
use Src\Model\Professor;

class CourseController {

    public function list(){
        $repo = new CourseRepository();
        echo json_encode($repo->selectAll());
    }

    public function listByUnit($id){

        $unit = new Unit();
        $unit->setId($id);
        $repo = new CourseRepository();

        echo json_encode($repo->selectByUnit($unit));

    }

    public function getByProfessor($id){
        
        $professor = new Professor();
        $professor->setId($id);
        $repo = new CourseRepository();
        
        echo json_encode($repo->selectByProfessor($professor));


    }

}