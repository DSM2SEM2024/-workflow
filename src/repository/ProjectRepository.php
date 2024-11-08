<?php
namespace Src\Repository;
use PDO;
use PDOException;
use Src\Model\Project;
use Src\Database\Database;
use Src\Model\Message;
use Src\Model\Professor;

class ProjectRepository{

    private PDO $pdo;

    public function __construct()
    {
        $this->pdo = Database::connect();
    }

    public function create(Project $project){

        $insert = 'INSERT INTO project(Name, Description, Start_Date, End_Date, Participants, ID_Unit, Status, ID_Professor) VALUES (?,?,?,?,?,?,?,?)';
        $prepare = $this->pdo->prepare($insert);
        $prepare->bindValue(1, $project->getName());
        $prepare->bindValue(2, $project->getDescription());
        $prepare->bindValue(3, $project->getStartDate());
        $prepare->bindValue(4, $project->getEndDate());
        $prepare->bindValue(5, $project->getParticipants());
        $prepare->bindValue(6, $project->getUnit()->getId());
        $prepare->bindValue(7, $project->getStatus());
        $prepare->bindValue(8, $project->getProfessor()->getId());

        try {
            $prepare->execute();
            return Message::send(true, 200, 'Cadastro efetuado', [$this->pdo->lastInsertId()]);

        } catch(PDOException $e){
            return Message::send(false, $e->getCode(), $e->getMessage(), []);
        }

    }

    public function selectAll(){

        $select = 'SELECT * FROM project WHERE Status = 1 ORDER BY ID_Project DESC';
        try {
            $prepare = $this->pdo->prepare($select);
            $prepare->execute();
            $array = $prepare->fetchAll();
            return Message::send(true, 200, 'Projetos encontrados', $array);
        } catch (PDOException $e) {
            return Message::send(false, $e->getCode(), $e->getMessage(),[]);
        }

    }

    public function selectById(Project $project){
        $select = 'SELECT project.Name, Description, Start_Date, End_Date, Participants, project.ID_Professor, professor.Name AS Professor_Name, ID_Unit, Status FROM project
        INNER JOIN professor ON project.ID_Professor = professor.ID_Professor WHERE ID_Project = ?';
        $prepare = $this->pdo->prepare($select);
        $prepare->bindValue(1, $project->getId());
        try {
            $prepare->execute();
            $array = $prepare->fetch();
            $participants = unserialize($array['Participants']);
            $array['Participants'] = $participants;
            return Message::send(true, 200, 'Projetos encontrados', $array);
        } catch (PDOException $e) {
            return Message::send(false, $e->getCode(), $e->getMessage(),[]);
        }
    }

}