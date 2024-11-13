<?php
namespace Src\Controller;
use Src\Model\Unit;
use Src\Repository\UnitRepository;

class UnitController {

    public function list(){

        $repo = new UnitRepository();
        echo json_encode($repo->selectAll());

    }

    public function create(){

        $data = json_decode(file_get_contents('php://input'),true);
        $repo = new UnitRepository();

        $unit = new Unit();
        $unit->setName($data['Unit_Name']);
        $unit->setAddress($data['Address']);

        echo json_encode($repo->insert($unit));

    }

}