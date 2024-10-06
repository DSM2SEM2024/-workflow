<?php
namespace App\Src\Repository;
use App\Src\Model\Professor;
use App\Src\Model\Unidade;
use App\Src\Database\Database;
use App\Src\Service\MessageService;
use PDO;
use PDOException;

class ProfessorRepository {

    private PDO $connection;

    public function __construct()
    {
        $this->connection = Database::connect();
    }

    public function insert(Professor $professor){
        $insert = 'INSERT INTO Professor(Nome_Professor, Email_Professor,Area_Atuacao,ID_Unidade) VALUES(?,?,?,?)';
        $prepare = $this->connection->prepare($insert);
        $prepare->bindValue(1, $professor->getNome());
        $prepare->bindValue(2, $professor->getEmail());
        $prepare->bindValue(3, $professor->getAtuacao());
        $prepare->bindValue(4, $professor->getUnidade()->getId());
        try{
            $prepare->execute();
            return MessageService::message(true,200,'Cadastro efetuado com sucesso',[]);
        } catch(PDOException $e){
            return MessageService::message(false, $e->getCode(),$e->getMessage(),[]);
        }
    }

    public function selectAll(){
        $select = 'SELECT * FROM Professor';
        $prepare = $this->connection->prepare($select);
        try {
            $prepare->execute();
            $data = $prepare->fetchAll();
            return MessageService::message(true,200,'Dados encontrados',$data);
        } catch (PDOException $e) {
            return MessageService::message(false,$e->getCode(),$e->getMessage(),[]);
        }
    }

    public function selectById(Professor $professor){
        $select = 'SELECT * FROM Professor WHERE ID_Professor = ?';
        $prepare = $this->connection->prepare($select);
        $prepare->bindValue(1, $professor->getId());
        try {
            $prepare->execute();
            $data = $prepare->fetch();
            return MessageService::message(true,200,'Dados encontrados',$data);
        } catch (PDOException $e) {
            return MessageService::message(false,$e->getCode(),$e->getMessage(),[]);
        }
    }

    public function update(Professor $professor){
        $update = 'UPDATE Professor SET Nome_Professor = ?, Email_Professor = ?, Area_Atuacao = ?, ID_Unidade = ? WHERE ID_Professor = ?';
        $prepare = $this->connection->prepare($update);
        $prepare->bindValue(1, $professor->getNome());
        $prepare->bindValue(2, $professor->getEmail());
        $prepare->bindValue(3, $professor->getAtuacao());
        $prepare->bindValue(4, $professor->getUnidade()->getId());
        $prepare->bindValue(5, $professor->getId());
        try {
            $prepare->execute();
            return MessageService::message(true,200,'Cadastro atualizado com sucesso',[]);
        } catch (PDOException $e) {
            return MessageService::message(false,$e->getCode(),$e->getMessage(),[]);
        }
    }

    public function delete(Professor $professor){
        $update = 'DELETE FROM Professor WHERE ID_Professor = ?';
        $prepare = $this->connection->prepare($update);
        $prepare->bindValue(1, $professor->getId());
        try {
            $prepare->execute();
            return MessageService::message(true,200,'Cadastro removido com sucesso',[]);
        } catch (PDOException $e) {
            return MessageService::message(false,$e->getCode(),$e->getMessage(),[]);
        }
    }

}