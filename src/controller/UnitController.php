<?php
namespace Src\Controller;
use Src\Model\Unit;
use Src\Repository\UnitRepository;

class UnitController {

    public function list(){

        $repo = new UnitRepository();
        echo json_encode($repo->selectAll());

    }

}