<?php
namespace Src\Repository;
use Src\Model\Professor;
use Src\Database\Database;
use Src\Model\Message;
use PDO;
use PDOException;

class ProfessorRepository {

    private PDO $connection;

    public function __construct()
    {
        $this->connection = Database::connect();
    }

    public function insert(Professor $professor){
    
        $insert = 'INSERT INTO Professor(Name,Email,Password,Area_of_Expertise) VALUES(?,?,?,?)';
        $prepare = $this->connection->prepare($insert);
        $prepare->bindValue(1, $professor->getName());
        $prepare->bindValue(2, $professor->getEmail());
        $prepare->bindValue(3, password_hash($professor->getPassword(),PASSWORD_DEFAULT));
        $prepare->bindValue(4, $professor->getExpertise());
        try{
            $prepare->execute();
            return Message::send(true,200,'Cadastro efetuado com sucesso',[]);
        } catch(PDOException $e){
            return Message::send(false, $e->getCode(),$e->getMessage(),[]);
        }
    }

    public function selectAll(){
        $select = 'SELECT * FROM Professor';
        $prepare = $this->connection->prepare($select);
        try {
            $prepare->execute();
            $data = $prepare->fetchAll();
            return Message::send(true,200,'Dados encontrados',$data);
        } catch (PDOException $e) {
            return Message::send(false,$e->getCode(),$e->getMessage(),[]);
        }
    }

    public function selectById(Professor $professor){
        $select = 'SELECT * FROM Professor WHERE ID_Professor = ?';
        $prepare = $this->connection->prepare($select);
        $prepare->bindValue(1, $professor->getId());
        try {
            $prepare->execute();
            $data = $prepare->fetch();
            return Message::send(true,200,'Dados encontrados',$data);
        } catch (PDOException $e) {
            return Message::send(false,$e->getCode(),$e->getMessage(),[]);
        }
    }

    public function login(Professor $professor){
        $select = 'SELECT Email, Password FROM Professor WHERE Email = ?';
        $prepare = $this->connection->prepare($select);
        $prepare->bindValue(1, $professor->getEmail());
        try {
            $prepare->execute();
            $data = $prepare->fetch();
            if(is_array($data) && count($data) > 0){
                if(password_verify($professor->getPassword(),$data['Password'])){
                    return Message::send(true,200,'Usuário reconhecido',$data);
                }
            }
            return Message::send(false, 404, 'Usuário não reconhecido',[]);
           
        } catch (PDOException $e) {
            return Message::send(false, $e->getCode(),$e->getMessage(),[]);
        }
    }

    public function update(Professor $professor){
        $update = 'UPDATE Professor SET Name = ?, Email = ?,Password = ?, Area_of_Expertise = ? WHERE ID_Professor = ?';
        $prepare = $this->connection->prepare($update);
        $prepare->bindValue(1, $professor->getName());
        $prepare->bindValue(2, $professor->getEmail());
        $prepare->bindValue(3, password_hash($professor->getPassword(),PASSWORD_DEFAULT));
        $prepare->bindValue(4, $professor->getExpertise());
        $prepare->bindValue(5, $professor->getId());
        try {
            $prepare->execute();
            return Message::send(true,200,'Cadastro atualizado com sucesso',[]);
        } catch (PDOException $e) {
            return Message::send(false,$e->getCode(),$e->getMessage(),[]);
        }
    }

    public function delete(Professor $professor){
        $update = 'DELETE FROM Professor WHERE ID_Professor = ?';
        $prepare = $this->connection->prepare($update);
        $prepare->bindValue(1, $professor->getId());
        try {
            $prepare->execute();
            return Message::send(true,200,'Cadastro removido com sucesso',[]);
        } catch (PDOException $e) {
            return Message::send(false,$e->getCode(),$e->getMessage(),[]);
        }
    }

}