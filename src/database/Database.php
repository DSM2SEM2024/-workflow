<?php
namespace src\database;
use PDO;
use PDOException;

class Database {

    public static function connect(){

        $host = "sql10.freesqldatabase.com";
        $db = "sql10735819";
        $charset = "utf8mb4";
        $user = "sql10735819";
        $password = "FHfE5NPBtq";

        $dsn = "mysql:host=$host;dbname=$db;charset=$charset";

        try {
            $pdo = new PDO($dsn,$user,$password,[
                PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
                PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
                PDO::ATTR_EMULATE_PREPARES => false,
            ]);
            return $pdo;
        } catch(PDOException $e){
            return false;
        }

    }

}