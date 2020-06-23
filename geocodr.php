<?php
  require_once 'src/Controller/GeocodrInterface.php';
  
  $geocodr = new GeocodrInterface();
  $test = $_GET['term'];
  $response = $geocodr->getResponse($test);
  echo $response;
?>
