<?php
namespace Src\Repository;
use Src\Database\Database;
use Src\Model\File;
use Src\Model\Project;

use PDO;
use PDOException;
use Src\Model\Message;

class FileRepository {

    private PDO $pdo;

    public function __construct()
    {
        $this->pdo = Database::connect();
    }

    public function insert(File $file){
        if($file->getType()!='link'){
            $insert = 'INSERT INTO files(ID_Project,File_Name,File_Type,File_Data) VALUES (?,?,?,?)';
            $prepare = $this->pdo->prepare($insert);
            $prepare->bindValue(1, $file->getProject()->getId());
            $prepare->bindValue(2, $file->getName());
            $prepare->bindValue(3, $file->getType());
            $prepare->bindValue(4, $file->getData());
        } else {
            $insert = 'INSERT INTO files(ID_Project,File_Name,File_Type,URL) VALUES (?,?,?,?)';
            $prepare = $this->pdo->prepare($insert);
            $prepare->bindValue(1, $file->getProject()->getId());
            $prepare->bindValue(2, $file->getName());
            $prepare->bindValue(3, $file->getType());
            $prepare->bindValue(4, $file->getUrl());
        }
        try{
            $prepare->execute();
            return Message::send(true,200,'Cadastro de arquivo bem sucedido',[]);
        } catch(PDOException $e){
            return Message::send(false,$e->getCode(),$e->getMessage(),[]);
        }

    }

    public function selectByProject(File $file){

        $select = 'SELECT * FROM files WHERE ID_Project = ?';
        $prepare = $this->pdo->prepare($select);
        $prepare->bindValue(1, $file->getProject()->getId());
        try{
            $prepare->execute();
            $array = $prepare->fetchAll();

            return Message::send(true, 200, 'Arquivos encontrados', $array);
        } catch(PDOException $e){
            return Message::send(false, $e->getCode(), $e->getMessage(),[]);
        }

    }

    public function selectCoverImage(){

        $select = "SELECT * FROM files WHERE (File_Name LIKE '%.png' OR File_Name LIKE '%.jpg')";
        $prepare = $this->pdo->prepare($select);
        try {
            $prepare->execute();
            $array = $prepare->fetchAll();
            return Message::send(true, 200, 'Fotos encontradas', $array);  
        } catch (PDOException $e) {
            return Message::send(false, $e->getCode(), $e->getMessage(),[]);
        }

    }

    public function clearAttachs(Project $project, $type){

        if($type=='link'){
            $delete = 'DELETE FROM files WHERE ID_Project = ? AND File_Type = "link"';
            $prepare = $this->pdo->prepare($delete);
            $prepare->bindValue(1, $project->getId());
        } else {
            $delete = 'DELETE FROM files WHERE ID_Project = ? AND File_Type <> "link"';
            $prepare = $this->pdo->prepare($delete);
            $prepare->bindValue(1, $project->getId());
        }
        try {
            $prepare->execute();
            return Message::send(true,200,'Remoção concluída',[]);
        } catch (PDOException $e) {
            return Message::send(false,$e->getCode(),$e->getMessage(),[]);
        }

    }

}