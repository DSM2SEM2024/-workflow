<?php
namespace App\Src\Repository;
use App\Src\Database\Database;
use App\Src\Model\Unidade;
use App\Src\Service\MessageService;
use PDO;
use PDOException;

class UnidadeRepository {

    private PDO $connection;

    public function __construct(){
        $this->connection = Database::connect();
    }

    public function insert(Unidade $unidade) : array {
        $insert = 'INSERT INTO Unidade(Nome_Unidade,Endereco) VALUES(?,?)';
        $prepare = $this->connection->prepare($insert);
        $prepare->bindValue(1, $unidade->getNome());
        $prepare->bindValue(2, $unidade->getEndereco());
        try {
            $prepare->execute();
            return MessageService::message(true,200,'Cadastrado com sucesso',[]);
        } catch (PDOException $e) {
            return MessageService::message(false,$e->getCode(),$e->getMessage(),[]);
        }
    }

    public function selectAll() : array {
        $select = 'SELECT * FROM Unidade';
        $prepare = $this->connection->prepare($select);
        try {
            $prepare->execute();
            $data = $prepare->fetchAll();
            return MessageService::message(true,200,'Cadastrado com sucesso',$data);
        } catch (PDOException $e) {
            return MessageService::message(false,$e->getCode(),$e->getMessage(),[]);
        }
    }

    public function selectById(Unidade $unidade) : array {
        $select = 'SELECT * FROM Unidade WHERE ID_Unidade = ?';
        $prepare = $this->connection->prepare($select);
        $prepare->bindValue(1, $unidade->getId());
        try {
            $prepare->execute();
            $data = $prepare->fetch();
            return MessageService::message(true,200,'Cadastrado com sucesso',$data);
        } catch (PDOException $e) {
            return MessageService::message(false,$e->getCode(),$e->getMessage(),[]);
        }
    }

    public function update(Unidade $unidade) : array {

    }

}