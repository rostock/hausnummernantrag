<?php
//require_once 'src/Controller/CreateIssue.php';

class Proxy {
  
  private $data = null;
  private $response;
  
  function __construct($values) {
    $this->data = $values;
  }
  
  public function getData() {
    return $this->data;
  }
  
  function createIssue() {
    $redmine =  new RedmineInterface();
    $uploads = null;
    if (count($this->data['files']) > 0 ) {
      $uploads = $redmine->uploadFiles($this->data['files']);
    }
	
	
    $redmine->createIssue($this->data, $uploads);
  }
}