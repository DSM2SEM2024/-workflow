<?php
namespace Src\Model;
use Src\Model\Unit;

class Coordinator {

    private int $id;
    private string $name;
    private string $email;
    private string $password;
    private Unit $unit;

    /**
     * Get the value of id
     *
     * @return int
     */
    public function getId(): int {
        return $this->id;
    }

    /**
     * Set the value of id
     *
     * @param int $id
     *
     * @return self
     */
    public function setId(int $id) {
        $this->id = $id;
    }

    /**
     * Get the value of name
     *
     * @return string
     */
    public function getName(): string {
        return $this->name;
    }

    /**
     * Set the value of name
     *
     * @param string $name
     *
     * @return self
     */
    public function setName(string $name) {
        $this->name = $name;
    }

    /**
     * Get the value of password
     *
     * @return string
     */
    public function getPassword(): string {
        return $this->password;
    }

    /**
     * Set the value of password
     *
     * @param string $password
     *
     * @return self
     */
    public function setPassword(string $password) {
        $this->password = $password;
    }

    /**
     * Get the value of unit
     *
     * @return Unit
     */
    public function getUnit(): Unit {
        return $this->unit;
    }

    /**
     * Set the value of unit
     *
     * @param Unit $unit
     *
     * @return self
     */
    public function setUnit(Unit $unit) {
        $this->unit = $unit;
    }

    /**
     * Get the value of email
     *
     * @return string
     */
    public function getEmail(): string {
        return $this->email;
    }

    /**
     * Set the value of email
     *
     * @param string $email
     *
     * @return self
     */
    public function setEmail(string $email) {
        $this->email = $email;
    }
}