<?php
namespace Src\Repository;
use Src\Database\Database;
use Src\Model\File;

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

}