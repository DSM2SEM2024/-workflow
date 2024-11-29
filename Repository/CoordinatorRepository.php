<?php
namespace Src\Repository;
use PDO;
use PDOException;
use Src\Model\Coordinator;
use Src\Database\Database;
use Src\Model\Message;

class CoordinatorRepository {

    private PDO $pdo;

    public function __construct()
    {
        $this->pdo = Database::connect();
    }

    public function insert(Coordinator $coordinator){

        $insert = 'INSERT INTO coordinator(Name, Email, ID_Unit) VALUES(?,?,?)';
        $prepare = $this->pdo->prepare($insert);
        $prepare->bindValue(1, $coordinator->getName());
        $prepare->bindValue(2, $coordinator->getEmail());
        $prepare->bindValue(3, $coordinator->getUnit()->getId());

        try {

            $prepare->execute();
            return Message::send(true, 200, 'Cadastro efetuado', $this->pdo->lastInsertId());

        } catch(PDOException $e){
            return Message::send(false, $e->getCode(),$e->getMessage(),[]);
        }

    }

    public function updatePassword(Coordinator $coordinator){
        $update = 'UPDATE coordinator SET Password = ? WHERE ID_Coordinator = ?';
        $prepare = $this->pdo->prepare($update);
        $prepare->bindValue(1, password_hash($coordinator->getPassword(),PASSWORD_DEFAULT));
        $prepare->bindValue(2, $coordinator->getId());
        try{
            $prepare->execute();
            return Message::send(true, 200, 'Senha criada',[]);
        } catch(PDOException $e){
            return Message::send(false, $e->getCode(), $e->getMessage(),[]);
        }
    }

    public function selectAll(){

        $select = 'SELECT * FROM coordinator';
        $prepare = $this->pdo->prepare($select);
        
        try {
            $prepare->execute();
            $array = $prepare->fetchAll();
            return Message::send(true, 200, 'Dados encontrados', $array);
        } catch (PDOException $e) {
            return Message::send(false, $e->getCode(), $e->getMessage(),[]);
        }

    }

    public function selectById(Coordinator $coordinator){

        $select = 'SELECT * FROM coordinator WHERE ID_Coordinator = ?';
        $prepare = $this->pdo->prepare($select);
        $prepare->bindValue(1, $coordinator->getId());
        
        try {
            $prepare->execute();
            $array = $prepare->fetch();
            return Message::send(true, 200, 'Dados encontrados', $array);
        } catch (PDOException $e) {
            return Message::send(false, $e->getCode(), $e->getMessage(),[]);
        }

    }

    public function update(Coordinator $coordinator){

        $update = 'UPDATE coordinator SET Name = ?, Email = ?, Password = ?, ID_Unit = ? WHERE ID_Coordinator = ?';
        $prepare = $this->pdo->prepare($update);
        $prepare->bindValue(1, $coordinator->getName());
        $prepare->bindValue(2, $coordinator->getEmail());
        $prepare->bindValue(3, password_hash($coordinator->getPassword(),PASSWORD_DEFAULT));
        $prepare->bindValue(4, $coordinator->getUnit()->getId());
        $prepare->bindValue(5, $coordinator->getId());
        try {
            $prepare->execute();
            return Message::send(true, 200, 'Coordenador atualizado',[]);
        } catch (PDOException $e) {
            return Message::send(false, $e->getCode(), $e->getMessage(),[]);
        }

    }

    public function delete(Coordinator $coordinator){

        $delete = 'DELETE FROM coordinator WHERE ID_Coordinator = ?';
        $prepare = $this->pdo->prepare($delete);
        $prepare->bindValue(1, $coordinator->getId());
        try {
            $prepare->execute();
            return Message::send(true, 200, 'Deleção executada', []);
        } catch (PDOException $e) {
            return Message::send(false, $e->getCode(), $e->getMessage(),[]);
        }

    }

    public function login(Coordinator $coordinator){
        
        $select = 'SELECT ID_Coordinator, Name, Email, Password, ID_Unit FROM coordinator WHERE Email = ?';
        $prepare = $this->pdo->prepare($select);
        $prepare->bindValue(1, $coordinator->getEmail());
        try {
            $prepare->execute();
            $data = $prepare->fetch();
            if(is_array($data) && count($data) > 0){
                if(password_verify($coordinator->getPassword(),$data['Password'])){
                    return Message::send(true,200,'Usuário reconhecido',$data);
                }
            }
            $email = $coordinator->getEmail();
            return Message::send(false, 404, "email: $email",[]);
           
        } catch (PDOException $e) {
            return Message::send(false, $e->getCode(),$e->getMessage(),[]);
        }
    }

}