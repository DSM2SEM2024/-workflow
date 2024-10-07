<?php
namespace Src\Repository;
use Src\Database\Database;
use Src\Model\Unidade;
use Src\model\Message;
use PDO;
use PDOException;

class UnidadeRepository {

    private PDO $connection;

    public function __construct(){
        $this->connection = Database::connect();
    }

    public function insert(Unidade $unidade) : array {
        $insert = 'INSERT INTO Unit(Unit_Name,Address) VALUES(?,?)';
        $prepare = $this->connection->prepare($insert);
        $prepare->bindValue(1, $unidade->getNome());
        $prepare->bindValue(2, $unidade->getEndereco());
        try {
            $prepare->execute();
            return Message::send(true,200,'Cadastrado com sucesso',[]);
        } catch (PDOException $e) {
            return Message::send(false,$e->getCode(),$e->getMessage(),[]);
        }
    }

    public function selectAll() : array {
        $select = 'SELECT * FROM Unidade';
        $prepare = $this->connection->prepare($select);
        try {
            $prepare->execute();
            $data = $prepare->fetchAll();
            return Message::send(true,200,'Dados encontrados',$data);
        } catch (PDOException $e) {
            return Message::send(false,$e->getCode(),$e->getMessage(),[]);
        }
    }

    public function selectById(Unidade $unidade) : array {
        $select = 'SELECT * FROM Unidade WHERE ID_Unidade = ?';
        $prepare = $this->connection->prepare($select);
        $prepare->bindValue(1, $unidade->getId());
        try {
            $prepare->execute();
            $data = $prepare->fetch();
            return Message::send(true,200,'Dados encontrados',$data);
        } catch (PDOException $e) {
            return Message::send(false,$e->getCode(),$e->getMessage(),[]);
        }
    }

    public function update(Unidade $unidade) : array {
        $update = 'UPDATE Unidade SET Nome_Unidade = ?, Endereco = ? WHERE ID_Unidade = ?';
        $prepare = $this->connection->prepare($update);
        $prepare->bindValue(1, $unidade->getNome());
        $prepare->bindValue(2, $unidade->getEndereco());
        $prepare->bindValue(3, $unidade->getId());
        try {
            $prepare->execute();
            return Message::send(true,200,'Cadastro atualizado com sucesso',[]);
        } catch(PDOException $e){
            return Message::send(false,$e->getCode(),$e->getMessage(),[]);
        }
    }

    public function delete(Unidade $unidade){
        $delete = 'DELETE FROM Unidade WHERE ID_Unidade = ?';
        $prepare = $this->connection->prepare($delete);
        $prepare->bindValue(1, $unidade->getId());
        try {
            $prepare->execute();
            return Message::send(true,200,'Unidade removida com sucesso',[]);
        } catch (PDOException $e) {
            return Message::send(false,$e->getCode(),$e->getMessage(),[]);
        }
    }

}