var modifyBuildingEntry = new ol.interaction.Modify({source: buildingEntrySource});
var snapBuildingEntry = new ol.interaction.Snap({source: buildingSurfaceSource});

var snapCondition = function(evt){
  var features = [];
  mapEntry.forEachFeatureAtPixel(evt.pixel, function(feature, layer) {
    if(layer != null && layer.get('name') === 'Gebäudegrundriss') {
      features.push(feature);
    }
  });
  
  if(features.length  === 1 ) {
    return checkBoundary(features[0], evt.coordinate);
  } else {
    return false;
  };
};

var checkBoundary = function(feature, coords) {
  var geom = feature.getGeometry();
  var closestPoint = geom.getClosestPoint(coords);
  if((closestPoint[0] === coords[0]) && (closestPoint[1] === coords[1])) {
    return true;
  }
  return false;
}


var drawBuildingEntry = new ol.interaction.Draw({
  source: buildingEntrySource,
  type: 'Point',
  condition: snapCondition,
  style: drawBuildingEntryStyle
});

drawBuildingEntry.on('drawstart', function (evt) {
  buildingEntrySource.clear();	
});

drawBuildingEntry.on('drawend', function (evt) {
  var wkt = formatWKT.writeGeometry(evt.feature.getGeometry())
  $('#mapEntryValue').html(wkt);  
});




























var mapEntry = new ol.Map({
  layers: [
    new ol.layer.Tile({
      source: new ol.source.OSM()
    }),
    flurSurfaceLayer,  
    buildingSurfaceLayer,
    buildingEntryLayer
  ],
  target: 'mapEntry',
  view: view
});
mapEntry.addInteraction(modifyBuildingEntry);
mapEntry.addInteraction(drawBuildingEntry);
mapEntry.addInteraction(snapBuildingEntry);


