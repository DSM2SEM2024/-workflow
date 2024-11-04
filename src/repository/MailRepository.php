<?php
namespace Src\Repository;

use PDO;
use PDOException;
use Src\Database\Database;
use Src\Model\Message;

class MailRepository {

    private PDO $pdo;

    public function __construct()
    {
        $this->pdo = Database::connect();
    }

    public function registerCode($code){

        $insert = 'INSERT INTO mail_code VALUES (?)';
        $prepare = $this->pdo->prepare($insert);
        $prepare->bindValue(1, $code);

        try {
            $prepare->execute();
            return Message::send(true, 200, 'Código registrado',[]);
        } catch (PDOException $e) {
            return Message::send(false, $e->getCode(), $e->getMessage(),[]);
        }

    }

    public function verify($code){

        $select = 'SELECT * FROM mail_code WHERE Code = ?';
        $prepare = $this->pdo->prepare($select);
        $prepare->bindValue(1, $code);

        try {
            $prepare->execute();
            $array = $prepare->fetchAll();
            if(count($array)>0){
                return Message::send(true, 200, 'Permitido',[]);
            } else {
                return Message::send(false, 404, 'Negado',[]);
            }
        } catch (PDOException $e) {
            return Message::send(false, $e->getCode(), $e->getMessage(), []);
        }

    }

}