<?php
namespace Src\Model;

class MailConfig {

    private $username;
    private $password;
    private $host;
    private $port;
    private $name;

    public function __construct()
    {
        $this->name = 'Equipe Workflow';
        $this->username = 'workflow.fatec.pi@gmail.com';
        $this->password = 'xnzq buzs ylmo ujai';
        $this->host = 'smtp.gmail.com';
        $this->port = 587;
    }

    public function getName(){
        return $this->name;
    }

    public function getUsername(){
        return $this->username;
    }

    public function getPassword(){
        return $this->password;
    }

    public function getHost(){
        return $this->host;
    }

    public function getPort(){
        return $this->port;
    }

}