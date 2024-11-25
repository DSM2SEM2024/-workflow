<?php
namespace Src\Repository;

use PDO;
use PDOException;
use Src\Database\Database;
use Src\Model\Course;
use Src\Model\Message;
use Src\Model\Unit;

class CourseRepository{

    private PDO $pdo;

    public function __construct(){
        $this->pdo = Database::connect();
    }

    public function selectAll(){
        
        $select = 'SELECT * FROM course';
        $prepare = $this->pdo->prepare($select);
        
        try {
            $prepare->execute();
            $array = $prepare->fetchAll();
            return Message::send(true, '200', 'Cursos listados', $array);
        } catch (PDOException $e) {
            return Message::send(false, $e->getCode(), $e->getMessage(),[]);
        }

    }

    public function selectByUnit(Unit $unit){

        $select = 'SELECT * FROM course WHERE ID_Unit = ? INNER JOIN course_unit ON course.ID_Course = course_unit.ID_Course';
        $prepare = $this->pdo->prepare($select);
        $prepare->bindValue(1, $unit->getId());
        try {
            $prepare->execute();
            $array = $prepare->fetchAll();
            return Message::send(true, '200','Cursos listados',$array);
        } catch (PDOException $e) {
            return Message::send(false, $e->getCode(), $e->getMessage(),[]);
        }

    }

}