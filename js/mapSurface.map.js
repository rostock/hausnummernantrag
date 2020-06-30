/*
 * Interactions
 */
var modifyBuildingSurface = new ol.interaction.Modify({source: buildingSurfaceSource});
var snapBuildingSurface = new ol.interaction.Snap({source: buildingSurfaceSource});
var drawBuildingSurface = new ol.interaction.Draw({
  source: buildingSurfaceSource,
  type: 'Polygon'
});


drawBuildingSurface.on('drawstart', function (evt) {
  buildingSurfaceSource.clear();
  buildingEntrySource.clear();	
});


drawBuildingSurface.on('drawend', function (evt) {
  var wkt = formatWKT.writeGeometry(evt.feature.getGeometry())
  $('#mapSurfaceValue').html(wkt);  
});


var mapSurface = new ol.Map({
  layers: [
    new ol.layer.Tile({
      source: new ol.source.OSM()
    }),
    flurSurfaceLayer,  
    buildingSurfaceLayer
  ],
  target: 'mapSurface',
  view: view
});

var featureDrager = new ol.interaction.Translate({
  layers: [buildingSurfaceLayer]
});

mapSurface.addInteraction(featureDrager);
mapSurface.addInteraction(snapBuildingSurface);

var selected = null;


mapSurface.on('pointermove', function(e) {
  if (selected !== null) {
    selected.setStyle(undefined);
    selected = null;
  }

  mapSurface.forEachFeatureAtPixel(e.pixel, function(feature, layer) {
    selected = feature;
    if(layer !== null && layer.get('name') === 'Gebäudegrundriss') {
      feature.setStyle(highlightStyle);
      return true;
    }
    return false;
  });
});


mapSurface.on('click', function(evt) {
  evt.preventDefault();
  var f = mapSurface.forEachFeatureAtPixel(
    evt.pixel,
    function(ft, layer){return ft;}
  );
  if (f) {
    var anchor = ol.extent.getCenter(f.getGeometry().getExtent());
    var rad = Math.PI /180; // 0,01745 rad;
    f.getGeometry().rotate(rad, anchor);
  }
});

mapSurface.getViewport().addEventListener('contextmenu', function (evt) {
  evt.preventDefault();
  var pixel = new Array(evt.layerX,evt.layerY);
  var f = mapSurface.forEachFeatureAtPixel(
    pixel,
    function(ft, layer){return ft;}
  );
  if (f) {
    var anchor = ol.extent.getCenter(f.getGeometry().getExtent());
    var rad = Math.PI /180; // 0,01745 rad;
    rad = rad * -1;
    f.getGeometry().rotate(rad, anchor);
  }
})

mapSurface.on('dblclick', function(evt) {
  var f = mapSurface.forEachFeatureAtPixel(
    evt.pixel,
    function(ft, layer){return ft;}
  );
  if (f) {
    evt.preventDefault();
  }
});