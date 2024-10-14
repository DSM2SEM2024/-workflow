<?php
namespace Src\Database;
use PDO;
use PDOException;

class Database {

    public static function connect(){

        // $host = "sql10.freesqldatabase.com";
        $db = "sql10735819";
        // $user = "sql10735819";
        // $password = "FHfE5NPBtq";
        $host = "localhost:3306";
        $user = "root";
        $password = "root";
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