<?php
namespace Src\Repository;
use Src\Database\Database;
use Src\Model\Unit;
use Src\Model\Message;
use PDO;
use PDOException;
use Src\Model\Professor;

class UnitRepository {

    private PDO $pdo;

    public function __construct(){
        $this->pdo = Database::connect();
    }

    public function insert(Unit $unit) : array {
        $insert = 'INSERT INTO unit(Unit_Name,Address) VALUES(?,?)';
        $prepare = $this->pdo->prepare($insert);
        $prepare->bindValue(1, $unit->getName());
        $prepare->bindValue(2, $unit->getAddress());
        try {
            $prepare->execute();
            return Message::send(true,200,'Cadastrado com sucesso',[]);
        } catch (PDOException $e) {
            return Message::send(false,$e->getCode(),$e->getMessage(),[]);
        }
    }

    public function selectByProfessor(Professor $professor){

        $select = 'SELECT * FROM unit INNER JOIN professor_unit ON unit.ID_Unit = professor_unit.ID_Unit WHERE professor_unit.ID_Professor = ?';
        $prepare = $this->pdo->prepare($select);
        $prepare->bindValue(1, $professor->getId()); 
        try {
            $prepare->execute();
            $array = $prepare->fetchAll();
            return Message::send(true, 200, 'Unidades encontradas',$array);
        } catch (PDOException $e) {
            return Message::send(false, $e->getCode(), $e->getMessage(),[]);
        }

    }

    public function selectAll() : array {
        $select = 'SELECT * FROM unit';
        $prepare = $this->pdo->prepare($select);
        try {
            $prepare->execute();
            $data = $prepare->fetchAll();
            return Message::send(true,200,'Dados encontrados',$data);
        } catch (PDOException $e) {
            return Message::send(false,$e->getCode(),$e->getMessage(),[]);
        }
    }

    public function selectById(Unit $unit) : array {
        $select = 'SELECT * FROM unit WHERE ID_Unit = ?';
        $prepare = $this->pdo->prepare($select);
        $prepare->bindValue(1, $unit->getId());
        try {
            $prepare->execute();
            $data = $prepare->fetch();
            return Message::send(true,200,'Dados encontrados',$data);
        } catch (PDOException $e) {
            return Message::send(false,$e->getCode(),$e->getMessage(),[]);
        }
    }

    public function update(Unit $unit) : array {
        $update = 'UPDATE unit SET Nome_Unit = ?, Endereco = ? WHERE ID_Unit = ?';
        $prepare = $this->pdo->prepare($update);
        $prepare->bindValue(1, $unit->getName());
        $prepare->bindValue(2, $unit->getAddress());
        $prepare->bindValue(3, $unit->getId());
        try {
            $prepare->execute();
            return Message::send(true,200,'Cadastro atualizado com sucesso',[]);
        } catch(PDOException $e){
            return Message::send(false,$e->getCode(),$e->getMessage(),[]);
        }
    }

    public function delete(Unit $unit){
        $delete = 'DELETE FROM unit WHERE ID_Unit = ?';
        $prepare = $this->pdo->prepare($delete);
        $prepare->bindValue(1, $unit->getId());
        try {
            $prepare->execute();
            return Message::send(true,200,'Unit removida com sucesso',[]);
        } catch (PDOException $e) {
            return Message::send(false,$e->getCode(),$e->getMessage(),[]);
        }
    }

}