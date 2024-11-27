<?php
namespace Src\Repository;
use Src\Model\Professor;
use Src\Database\Database;
use Src\Model\Message;
use PDO;
use PDOException;

class ProfessorRepository {

    private PDO $pdo;

    public function __construct()
    {
        $this->pdo = Database::connect();
    }

    public function insert(Professor $professor){
    
        $insert = 'INSERT INTO professor(Name,Email,Area_of_Expertise) VALUES(?,?,?)';
        $prepare = $this->pdo->prepare($insert);
        $prepare->bindValue(1, $professor->getName());
        $prepare->bindValue(2, $professor->getEmail());
        $prepare->bindValue(3, $professor->getExpertise());
        try{
            $prepare->execute();
        } catch(PDOException $e){
            return Message::send(false, $e->getCode(),$e->getMessage(),[]);
        }
        $professor->setId($this->pdo->lastInsertId());
        $insert2 = 'INSERT INTO professor_course(ID_Professor, ID_Course) VALUES(?,?)';
        $prepare2 = $this->pdo->prepare($insert2);
        $prepare2->bindValue(1, $professor->getId());
        $prepare2->bindValue(2, $professor->getCourse());
        try {
            $prepare2->execute();
        } catch (PDOException $e) {
            return Message::send(false, $e->getCode(),$professor->getCourse(),[]);
        }

        $insert3 = 'INSERT INTO professor_unit(ID_Professor, ID_Unit) VALUES(?,?)';
        $prepare3 = $this->pdo->prepare($insert3);
        $prepare3->bindValue(1, $professor->getId());
        $prepare3->bindValue(2, $professor->getUnit());
        try {
            $prepare3->execute();
            return Message::send(true,200,'Cadastro efetuado com sucesso',$professor->getId());
        } catch (PDOException $e) {
            return Message::send(false, $e->getCode(),$e->getMessage(),[]);
        }
        
    }

    public function selectByProfessor(Professor $professor){

        $select = 'SELECT * FROM course INNER JOIN professor_course ON course.ID_Course = professor_course.ID_Course WHERE professor_course.ID_Professor = ?';
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

    public function selectAll(){
        $select = 'SELECT * FROM professor';
        $prepare = $this->pdo->prepare($select);
        try {
            $prepare->execute();
            $data = $prepare->fetchAll();
            return Message::send(true,200,'Dados encontrados',$data);
        } catch (PDOException $e) {
            return Message::send(false,$e->getCode(),$e->getMessage(),[]);
        }
    }

    public function selectById(Professor $professor){
        $select = 'SELECT * FROM professor WHERE ID_Professor = ?';
        $prepare = $this->pdo->prepare($select);
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
        
        $select = 'SELECT ID_Professor, Name, Email, Password, Area_of_Expertise FROM professor WHERE Email = ?';
        $prepare = $this->pdo->prepare($select);
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
        $prepare = $this->pdo->prepare($update);
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
        $prepare = $this->pdo->prepare($update);
        $prepare->bindValue(1, $professor->getId());
        try {
            $prepare->execute();
            return Message::send(true,200,'Cadastro removido com sucesso',[]);
        } catch (PDOException $e) {
            return Message::send(false,$e->getCode(),$e->getMessage(),[]);
        }
    }

    public function updatePassword(Professor $professor){
        $update = 'UPDATE professor SET Password = ? WHERE ID_Professor = ?';
        $prepare = $this->pdo->prepare($update);
        $prepare->bindValue(1, password_hash($professor->getPassword(),PASSWORD_DEFAULT));
        $prepare->bindValue(2, $professor->getId());
        try{
            $prepare->execute();
            return Message::send(true, 200, 'Senha criada',[]);
        } catch(PDOException $e){
            return Message::send(false, $e->getCode(), $e->getMessage(),[]);
        }
    }

    public function updatePfp(Professor $professor){
        $update = 'UPDATE professor SET Profile_Picture = ? WHERE ID_Professor = ?';
        $prepare = $this->pdo->prepare($update);
        $prepare->bindValue(1, $professor->getPfp()->getData());
        $prepare->bindValue(2, $professor->getId());

        try {
            $prepare->execute();
            return Message::send(true,200,'Cadastro atualizado com sucesso',[]);
        } catch (PDOException $e) {
            return Message::send(false,$e->getCode(),$e->getMessage(),[]);
        }
    }
}