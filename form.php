<?php
  require_once 'conf/templates.secure.inc.php';
  require_once 'src/Controller/Proxy.php';
  require_once 'src/Controller/RedmineInterface.php';
  
  $values = [];
  $files = [];
  
  /*
   * Filter Post values
   */
  foreach ($fieldNames as $key) {
    if(array_key_exists($key, $_POST)) {
      //$values[$key] = filter_input(INPUT_POST, $key, FILTER_SANITIZE_SPECIAL_CHARS);
		$values[$key] = filter_input(INPUT_POST, $key);
    }
  }
  
  /*
   * add files to the value variable
   */
  
  $i = 0;
  foreach ($_FILES as $file) {
   // if(0 < count(array_intersect(explode(' ', strtolower($string)), $file_extensions))) {
      $files[$i] = $file;
      $i++;
   // }
  }
  $values['files'] = $files;
  
  /*
  * Send Data to Proxy
  * 
  */
  $interface = new Proxy($values);
  $interface->createIssue();
  //$interface->responseOutput();

  /*
   * Get response and send header metadata
   */
  
?>
