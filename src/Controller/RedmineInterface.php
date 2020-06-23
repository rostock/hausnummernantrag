<?php
// This file ships with php-redmine-api
require_once(__DIR__ . '/../../vendor/autoload.php');
//require_once(__DIR__ . '/../../conf/config.inc.php');
//require_once('../../conf/config.inc.php');

class RedmineInterface {
  
  public $client;
  private $issue;
  private $user;
  private $password;
  private $url;
  private $project;
  
  function __construct() {
    
    require_once(__DIR__ . '/../../conf/config.inc.php');
    $this->user = $user;
    $this->password = $password;
    $this->project = $project;
    $this->url = $url;
    
    $this->setClient();
  }
    
  private function setClient() {
    $this->client = new Redmine\Client($this->url, $this->user, $this->password);
    $this->client->user->all();
    $this->client->user->listing();
  }
    
  public function uploadFiles($files) {
    $uploads = [];
    
    foreach ($files as $file) {
      $filecontent = file_get_contents($file['tmp_name'], true);
      $upload = json_decode($this->client->attachment->upload($filecontent));
      $fileMeta['token'] = $upload->upload->token;
      $fileMeta['filename'] = $file['name'];
      $fileMeta['description'] = '';
      $fileMeta['content_type'] = $file['type'];
      array_push($uploads, $fileMeta);
    }
    return $uploads;
  }
  
  public function createIssue ($fieldValues, $fileMeta) {
	
    $issue = $this->client->issue->create([
      'project_id'  => $this->project,
      'subject'     => 'neu',
      'tracker_id' => 7,
      //'description' => json_encode($fieldValues),
	  'description' => $fieldValues['description'],
      'assigned_to' => 'r62ad002',
      'uploads' =>  $fileMeta,
      'custom_fields' => [
        [
        'id' => 16,
        'name' => 'Gebäudeart',
        'value' => $fieldValues['typeOfBuilding'],
        ],[
          'id' => 21,
          'name' => 'Anrede',
          'value' =>  $fieldValues['contactFormOf'],
        ],[
          'id' => 22,
          'name' => 'Vorname',
          'value' =>  $fieldValues['firstName'],
        ],[
          'id' => 23,
          'name' => 'Nachname',
          'value' =>  $fieldValues['lastName'],
        ],[
          'id' => 35,
          'name' => 'E-Mail',
          'value' =>  $fieldValues['email'],
        ],[
          'id' => 24,
          'name' => 'Firmenname',
          'value' =>  $fieldValues['firma'],
        ],[
          'id' => 32,
          'name' => 'Straße',
          'value' =>  $fieldValues['address'],
        ],[
          'id' => 25,
          'name' => 'Hausnummer',
          'value' =>  $fieldValues['number'],
        ],[
          'id' => 26,
          'name' => 'Hausnummerzusatz',
          'value' =>  $fieldValues['numberextra'],
        ],[
          'id' => 27,
          'name' => 'Postleitzahl',
          'value' =>  $fieldValues['zip'],
        ],[
          'id' => 28,
          'name' => 'Stadt',
          'value' =>  $fieldValues['city'],
        ],[
          'id' => 29,
          'name' => 'Telefonnummer',
          'value' =>  $fieldValues['phone'],
        ],[
          'id' => 36,
          'name' => 'Staat',
          'value' =>  $fieldValues['state'],
        ],[
          'id' => 37,
          'name' => 'Bundesland',
          'value' =>  $fieldValues['province'],
        ],[
          'id' => 31,
          'name' => 'Flur',
          'value' =>  $fieldValues['flurId'],
        ],[
          'id' => 19,
          'name' => 'Gebäudeeingang',
          'value' =>  $fieldValues['mapEntryValue'],
        ],[
          'id' => 18,
          'name' => 'Gebäudegrundriss',
          'value' =>  $fieldValues['mapSurfaceValue'],
        ]
      ]
    ]);    
    return $issue;
  }
  
  public function getId() {
    return $this->issue->id;
  }
}
?>

