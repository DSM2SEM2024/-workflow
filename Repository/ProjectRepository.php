<?php
namespace Src\Repository;
use PDO;
use PDOException;
use Src\Model\Project;
use Src\Database\Database;
use Src\Model\Message;
use Src\Model\Professor;
use Src\Repository\FileRepository;

class ProjectRepository{

    private PDO $pdo;
    private FileRepository $fileRepository;

    public function __construct()
    {
        $this->pdo = Database::connect();
        $this->fileRepository = new FileRepository();
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

        $select = 'SELECT ID_Project, Name, Description, Start_Date, End_Date, Participants, ID_Unit, ID_Professor, Status FROM project 
        WHERE Status = 1 ORDER BY End_Date DESC';
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
    
    public function selectByProfessor(Project $project){
        $select = 'SELECT * FROM project WHERE project.ID_professor = ? ORDER BY End_Date DESC';
        $prepare = $this->pdo->prepare($select);
        $prepare->bindValue(1, $project->getProfessor()->getId());

        try{
            $prepare->execute();
            $array = $prepare->fetchAll();
            return Message::send(true, 200, 'Projetos encontrados para este id', $array);
        }catch(PDOException $e){
            return Message::send(false, $e->getCode(), $e->getMessage(), []);
        }
    }

    public function selectByProfessorLimit(Project $project){
        $select = 'SELECT * FROM project WHERE project.ID_professor = ? ORDER BY End_Date DESC LIMIT 3';
        $prepare = $this->pdo->prepare($select);
        $prepare->bindValue(1, $project->getProfessor()->getId());

        try{
            $prepare->execute();
            $array = $prepare->fetchAll();
            return Message::send(true, 200, 'Projetos encontrados para este id', $array);
        }catch(PDOException $e){
            return Message::send(false, $e->getCode(), $e->getMessage(), []);
        }
    }

    public function selectByProfId(Professor $professor){

        $select = 'SELECT * FROM project WHERE ID_Professor = ?';
        $prepare = $this->pdo->prepare($select);
        $prepare->bindValue(1, $professor->getId());

        try {
            $prepare->execute();
            $array = $prepare->fetchAll();
            return Message::send(true, 200, 'Projetos encontrados', $array);
        } catch (PDOException $e) {
            return Message::send(false, $e->getCode(),$e->getMessage(),[]);
        }

    }

    public function update(Project $project){

        $update = 'UPDATE project SET Name = ?, Description = ?, Start_Date = ?, End_Date = ?, Participants = ?, ID_Unit = ?, ID_Professor = ?, Status = ? WHERE ID_Project = ?';
        $prepare = $this->pdo->prepare($update);
        $prepare->bindValue(1, $project->getName());
        $prepare->bindValue(2, $project->getDescription());
        $prepare->bindValue(3, $project->getStartDate());
        $prepare->bindValue(4, $project->getEndDate());
        $prepare->bindValue(5, $project->getParticipants());
        $prepare->bindValue(6, $project->getUnit()->getId());
        $prepare->bindValue(7, $project->getProfessor()->getId());
        $prepare->bindValue(8, $project->getStatus());
        $prepare->bindValue(9, $project->getId());
        
        try {
            $prepare->execute();
            return Message::send(true, 200, 'Atualização bem-sucedida',[]);
        } catch (PDOException $e) {
            return Message::send(false, $e->getCode(), $e->getMessage(),[]);
        }

    }

}