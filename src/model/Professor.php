<?php
namespace Src\Model;

class Professor {

    private $id;
    private string $name;
    private string $email;
    private string $expertise;
    private string $password;
    private $unit;


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
    public function getName()
    {
        return $this->name;
    }

    /**
     * Set the value of nome
     *
     * @return  self
     */ 
    public function setName($name)
    {
        $this->name = $name;
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
    public function getExpertise()
    {
        return $this->expertise;
    }

    /**
     * Set the value of atuacao
     *
     * @return  self
     */ 
    public function setExpertise($expertise)
    {
        $this->expertise = $expertise;
    }

    /**
     * Get the value of unidade
     */ 
    public function getUnit()
    {
        return $this->unit;
    }

    /**
     * Set the value of unidade
     *
     * @return  self
     */ 
    public function setUnit($unit)
    {
        $this->unit = $unit;
    }

    /**
     * Get the value of password
     *
     * @return string
     */
    public function getPassword(): string
    {
        return $this->password;
    }

    /**
     * Set the value of password
     *
     * @param string $password
     *
     * @return self
     */
    public function setPassword(string $password)
    {
        $this->password = $password;
    }
}