<?php
namespace App\Src\Model;
use App\Src\Model\Unidade;

class Professor {

    private int $id;
    private string $nome;
    private string $email;
    private string $atuacao;
    private Unidade $unidade;


    /**
     * Get the value of id
     */ 
    public function getId()
    {
        return $this->id;
    }

    /**
     * Set the value of id
     *
     * @return  self
     */ 
    public function setId($id)
    {
        $this->id = $id;
    }

    /**
     * Get the value of nome
     */ 
    public function getNome()
    {
        return $this->nome;
    }

    /**
     * Set the value of nome
     *
     * @return  self
     */ 
    public function setNome($nome)
    {
        $this->nome = $nome;
    }

    /**
     * Get the value of email
     */ 
    public function getEmail()
    {
        return $this->email;
    }

    /**
     * Set the value of email
     *
     * @return  self
     */ 
    public function setEmail($email)
    {
        $this->email = $email;
    }

    /**
     * Get the value of atuacao
     */ 
    public function getAtuacao()
    {
        return $this->atuacao;
    }

    /**
     * Set the value of atuacao
     *
     * @return  self
     */ 
    public function setAtuacao($atuacao)
    {
        $this->atuacao = $atuacao;
    }

    /**
     * Get the value of unidade
     */ 
    public function getUnidade()
    {
        return $this->unidade;
    }

    /**
     * Set the value of unidade
     *
     * @return  self
     */ 
    public function setUnidade($unidade)
    {
        $this->unidade = $unidade;
    }
}