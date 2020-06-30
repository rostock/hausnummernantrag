/*
 * 
 * @type ol.source.Vector
 * Layer and Sources
 */
/*
 * Gebäudeumring
 */
var flurSurfaceSource = new ol.source.Vector();
var flurSurfaceLayer = new ol.layer.Vector({
  source: flurSurfaceSource,
  style: flurSurfaceStyle
});

/*
 * Gebäudeumring
 */
var buildingSurfaceSource = new ol.source.Vector();
var buildingSurfaceLayer = new ol.layer.Vector({
  name: 'Gebäudegrundriss',	
  source: buildingSurfaceSource,
  style: styleBuilding,
});

/*
 * Gebäudeeingang
 */
var buildingEntrySource = new ol.source.Vector();
var buildingEntryLayer = new ol.layer.Vector({
  name: 'Gebäudeeingang',	
  source: buildingEntrySource,
  style: buildingEntryStyle
});


(function() {
  var evt = new $.Event('styleChanging'),
  orig = $.fn.css;
  $.fn.css = function() {
    $(this).trigger(evt);
    return orig.apply(this, arguments);
  }
})();

$('#houseSurface').bind('styleChanging', function(e) {
  setTimeout(function() {
    mapEntry.updateSize();
    mapSurface.updateSize();
  }, 100);
});

var defaultJSON = {
  'type': 'FeatureCollection',
  'crs': {
    'type': 'name',
    'properties': {
      'name': 'EPSG:3857'
    }
  },
  'features': [{
    'type': 'Feature',
    'geometry': {
      'type': 'Point',
      'coordinates': [0, 0]
    }
  }]
};


$( "#flurId" ).autocomplete({
  source: "geocodr.php",
  minLength: 2,
  focus: function( evt, ui ) {
    $( "#flurId" ).val( ui.item.label );
    return false;
  },
  select: function( evt, ui ) {
	flurSurfaceSource.clear();
	defaultJSON.features[0].geometry = ui.item.geometry;
	var features = formatJSON.readFeatures(defaultJSON);  
	flurSurfaceSource.addFeatures(features);  
	var extent = flurSurfaceSource.getExtent(); 
	mapEntry.getView().fit(extent, {size:mapEntry.getSize(), maxZoom:20});
	mapSurface.getView().fit(extent, {size:mapSurface.getSize(), maxZoom:20});  
  }
});

/*
 * Funtion to set firma or first and last name display:none.
 */
$( ".polygonType" ).click(function(evt) {
  evt.preventDefault();
  var value = $(this).val();
  $('.formConfig').css('display','none');	
  $( '.' + value ).css('display','');	
});

$('.squareInput').change(function(evt) {
	
	buildingSurfaceSource.clear();
  var center = mapSurface.getView().getCenter();
	var length = ($(this).val()/2)/100;
	
	var a,b,c,d;
	
	a = [center[0] - length , center[1] - length];
	b = [center[0] + length , center[1] - length];
	c = [center[0] + length , center[1] + length];
	d =	[center[0] - length , center[1] + length];
	
	var feature = new ol.Feature({
    geometry: new ol.geom.Polygon([[a,b,c,d,a]])
  });
	
	buildingSurfaceSource.addFeature(feature);
});

$('.rectangleInput').change(function(evt) {
	buildingSurfaceSource.clear();
	
	var lengthA, lengthB;
	
	lengthA = $('#rectangleInputA').val();
	lengthB = $('#rectangleInputB').val();
	lengthA = (lengthA/2)/100;
	lengthB = (lengthB/2)/100;
	
    var center = mapSurface.getView().getCenter();
		
	var a,b,c,d;
	
	a = [center[0] - lengthA , center[1] - lengthB];
	b = [center[0] + lengthA, center[1] - lengthB];
	c = [center[0] + lengthA , center[1] + lengthB];
	d =	[center[0] - lengthA , center[1] + lengthB];
	
	var feature = new ol.Feature({
      geometry: new ol.geom.Polygon([[a,b,c,d,a]])
    });
	
	buildingSurfaceSource.addFeature(feature);
});

$('.lFormInput').change(function(evt) {
	
	buildingSurfaceSource.clear();
	
	var lengthA, lengthB, lengthC, lengthD, lengthE, lengthF;
	
	lengthA = $('#lFormInputA').val() / 100;
	lengthB = $('#lFormInputB').val() / 100;
	lengthC = $('#lFormInputC').val() / 100;
	lengthD = $('#lFormInputD').val() / 100;
	
	lengthE = lengthA - lengthC;
	lengthF = (lengthB + lengthD) / 2;
	
	lengthA = lengthA / 2;
	
    var center = mapSurface.getView().getCenter();
		
	var a, b, c, d, e, f;
	
	a = [center[0] - lengthA , center[1] - lengthF];
	b = [center[0] + lengthA, center[1] - lengthF];
	
	c = [center[0] + lengthA, center[1] - lengthF + lengthB];
	d =	[center[0] - lengthA + lengthE, center[1] + lengthF - lengthD];
	
	e =	[center[0] - lengthA + lengthE, center[1] + lengthF];
	f =	[center[0] - lengthA, center[1] + lengthF];
		
	var feature = new ol.Feature({
    geometry: new ol.geom.Polygon([[a, b, c, d, e, f, a]])
  });
	
	buildingSurfaceSource.addFeature(feature);
});
