<?php
class GeocodrInterface {
  
  private $url;
  private $key;
  private $class;
  private $limit;
  private $out_epsg;
  private $type;

  private $curlIns;
  
  function __construct() {
    require_once(__DIR__ . '/../../conf/config.inc.php');  
    $this->url = $urlgeocodr;
    $this->key = $apikey;
    $this->class = $class;
    $this->limit =  $limit;
    $this->out_epsg = $out_epsg;
    $this->type = $type;
    
    $this->initCurl();
  }
  
  public function getResponse($query) {
    
    $params = [];
    $params['key'] = $this->key;
    $params['query'] = $query;
    $params['out_epsg'] = $this->out_epsg;
    $params['limit'] = $this->limit;      
    $params['type'] = $this->type ;
    $params['class'] = $this->class;
    
    $url = $this->url . '?' . http_build_query($params);
    curl_setopt($this->curlIns, CURLOPT_URL, $url);
    curl_setopt($this->curlIns, CURLOPT_RETURNTRANSFER, 1);
    $results = curl_exec($this->curlIns);
    $results = json_decode ($results, TRUE);  
    $items = [];
	//return $results;  
    foreach ($results['features'] as  $result) {
	  //return $result;
      $item['geometry'] =  $result['geometry'];
      $item['label'] = $result['properties']['_title_'];
      $items[] = $item;	
    }
    return json_encode($items);
  }
  
  public function initCurl() {
    $this->curlIns = curl_init();
  }
  
  public function closeCurl() {
    curl_close($this->curlIns);
  }
}
?>
