<?php
namespace Src\Model;
use Src\Model\Unit;
use Src\Model\Professor;

class Project {

    private int $id;
    private string $name;
    private string $description;
    private string $startDate;
    private string $endDate;
    private string $participants;
    private Unit $unit;
    private int $status;
    private Professor $professor;

    public function __construct()
    {
        $this->unit = new Unit();
        $p = new Professor();
        $p->setId(0);
        $this->professor = $p;
    }


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
     * Get the value of description
     *
     * @return string
     */
    public function getDescription(): string {
        return $this->description;
    }

    /**
     * Set the value of description
     *
     * @param string $description
     *
     * @return self
     */
    public function setDescription(string $description) {
        $this->description = $description;
    }

    /**
     * Get the value of startDate
     *
     * @return string
     */
    public function getStartDate(): string {
        return $this->startDate;
    }

    /**
     * Set the value of startDate
     *
     * @param string $startDate
     *
     * @return self
     */
    public function setStartDate(string $startDate) {
        $this->startDate = $startDate;
    }

    /**
     * Get the value of endDate
     *
     * @return string
     */
    public function getEndDate(): string {
        return $this->endDate;
    }

    /**
     * Set the value of endDate
     *
     * @param string $endDate
     *
     * @return self
     */
    public function setEndDate(string $endDate) {
        $this->endDate = $endDate;
    }

    /**
     * Get the value of participants
     *
     * @return string
     */
    public function getParticipants(): string {
        return $this->participants;
    }

    /**
     * Set the value of participants
     *
     * @param string $participants
     *
     * @return self
     */
    public function setParticipants(string $participants) {
        $this->participants = $participants;
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
     * Get the value of status
     *
     * @return int
     */
    public function getStatus(): int {
        return $this->status;
    }

    /**
     * Set the value of status
     *
     * @param int $status
     *
     * @return self
     */
    public function setStatus(int $status) {
        $this->status = $status;
    }

    public function getProfessor() : Professor{
        return $this->professor;
    }

    public function setProfessor(Professor $professor){
        $this->professor = $professor;
    }
}