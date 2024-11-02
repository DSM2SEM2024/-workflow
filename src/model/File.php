<?php
namespace Src\Model;
use Src\Model\Project;

class File {

    private int $id;
    private Project $project;
    private string $name;
    private string $type;
    private string $url;
    private string $data;


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
     * Get the value of project
     *
     * @return Project
     */
    public function getProject(): Project {
        return $this->project;
    }

    /**
     * Set the value of project
     *
     * @param Project $project
     *
     * @return self
     */
    public function setProject(Project $project) {
        $this->project = $project;
        
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
     * Get the value of type
     *
     * @return string
     */
    public function getType(): string {
        return $this->type;
    }

    /**
     * Set the value of type
     *
     * @param string $type
     *
     * @return self
     */
    public function setType(string $type) {
        $this->type = $type;
        
    }

    /**
     * Get the value of url
     *
     * @return string
     */
    public function getUrl(): string {
        return $this->url;
    }

    /**
     * Set the value of url
     *
     * @param string $url
     *
     * @return self
     */
    public function setUrl(string $url) {
        $this->url = $url;
        
    }

    /**
     * Get the value of data
     *
     * @return string
     */
    public function getData(): string {
        return $this->data;
    }

    /**
     * Set the value of data
     *
     * @param string $data
     *
     * @return self
     */
    public function setData(string $data) {
        $this->data = $data;
        
    }
}