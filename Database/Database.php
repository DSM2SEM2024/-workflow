<?php
namespace Src\Database;
use PDO;
use PDOException;

class Database {

    public static function connect(){

        $db = "faust537_pi-1";
        $host = "216.172.172.207";
        $user = "faust537_pi-1";
        $password = "P1_@p1_testando";
        // $password = "root";
        $charset = "utf8mb4";

        $dsn = "mysql:host=$host;dbname=$db;charset=$charset";

        try {
            $pdo = new PDO($dsn,$user,$password,[
                PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
                PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
                PDO::ATTR_EMULATE_PREPARES => false,
            ]);
            return $pdo;
        } catch(PDOException $e){
            return $e->getMessage();
        }

    }

}