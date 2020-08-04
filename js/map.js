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

$( ".polygonType" ).click(function(evt) {
  evt.preventDefault();
  var value = $(this).val();
  $('.formConfig').css('display','none');	
  $( '.' + value ).css('display','');	
});

$('.squareInput').change(function(evt) {
	
	buildingSurfaceSource.clear();
  
  if($('#requestFor_02').val() === 'Einfamilienhaus') {
    
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
  }
  if($('#requestFor_02').val() === 'Doppelhaus') {
    
    var center = mapSurface.getView().getCenter();
    var length = ($(this).val()/2)/100;

    var a0,b0,c0,d0, a1, b1, c1, d1;

    a0 = [center[0] - (length*2) , center[1] - length];
    b0 = [center[0]  , center[1] - length];
    c0 = [center[0]  , center[1] + length];
    d0 =	[center[0] - (length*2) , center[1] + length];
    
    a1 = [center[0] + (length*2) , center[1] - length];
    b1 = [center[0]  , center[1] - length];
    c1 = [center[0]  , center[1] + length];
    d1 =	[center[0] + (length*2) , center[1] + length];

    var feature = new ol.Feature({
      geometry: new ol.geom.Polygon([[a0,b0,c0,d0,a0],[a1,b1,c1,d1,a1]])
    });

    buildingSurfaceSource.addFeature(feature);
    
  }
  if($('#requestFor_02').val() === 'Reihenhaus'){
    
  }
  
});

$('.rectangleInput').change(function(evt) {
	buildingSurfaceSource.clear();
	
  if($('#requestFor_02').val() === 'Einfamilienhaus'){
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
  }
  if($('#requestFor_02').val() === 'Doppelhaus'){
    var lengthA, lengthB;

    lengthA = $('#rectangleInputA').val();
    lengthB = $('#rectangleInputB').val();
    lengthA = (lengthA)/100;
    lengthB = (lengthB/2)/100;

    var center = mapSurface.getView().getCenter();

    var a0, b0, c0, d0, a1, b1, c1, d1;

    a0 = [center[0] - lengthA , center[1] - lengthB];
    b0 = [center[0], center[1] - lengthB];
    c0 = [center[0], center[1] + lengthB];
    d0 =	[center[0] - lengthA , center[1] + lengthB];
    
    a1 = [center[0]  , center[1] - lengthB];
    b1 = [center[0] + lengthA, center[1] - lengthB];
    c1 = [center[0] + lengthA, center[1] + lengthB];
    d1 =[center[0] , center[1] + lengthB];

    var feature = new ol.Feature({
      geometry: new ol.geom.Polygon([[a0,b0,c0,d0,a0],[a1,b1,c1,d1,a1]])
    });

    buildingSurfaceSource.addFeature(feature);  
  }
  if($('#requestFor_02').val() === 'Reihenhaus'){
    
  }
  
  
	
});

$('.lFormInput').change(function(evt) {
	
	buildingSurfaceSource.clear();
	
  if($('#requestFor_02').val() === 'Einfamilienhaus'){
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
  }
  if($('#requestFor_02').val() === 'Doppelhaus') {
    var lengthA, lengthB, lengthC, lengthD, lengthE, lengthF;
	
    lengthA = $('#lFormInputA').val() / 100;
    lengthB = $('#lFormInputB').val() / 100;
    lengthC = $('#lFormInputC').val() / 100;
    lengthD = $('#lFormInputD').val() / 100;

    lengthE = lengthA - lengthC;
    lengthF = (lengthB + lengthD) / 2;

    var center = mapSurface.getView().getCenter();

    var a0, b0, c0, d0, e0, f0, a1, b1, c1, d1, e1, f1;
    if(!$('#doppelhausGeomOptionsCheck2').prop('checked') === true) {
      a0 = [center[0] - lengthA , center[1] - lengthF];
      b0 = [center[0], center[1] - lengthF];

      c0 = [center[0], center[1] - lengthF + lengthB];
      d0 =	[center[0] - lengthA + lengthE, center[1] + lengthF - lengthD];

      e0 =	[center[0] - lengthA + lengthE, center[1] + lengthF];
      f0 =	[center[0] - lengthA, center[1] + lengthF];

      a1 = [center[0] , center[1] - lengthF];
      b1 = [center[0] + lengthA, center[1] - lengthF];

      c1 = [center[0] + lengthA, center[1] - lengthF + lengthB];
      d1 =	[center[0]  + lengthE, center[1] + lengthF - lengthD];

      e1 =	[center[0] + lengthE, center[1] + lengthF];
      f1 =	[center[0], center[1] + lengthF];
    } else {
      
      a0 = [center[0] - lengthA , center[1] - lengthF];
      b0 = [center[0], center[1] - lengthF];

      c0 = [center[0], center[1] - lengthF + lengthB];
      d0 =	[center[0] - lengthA + lengthE, center[1] + lengthF - lengthD];

      e0 =	[center[0] - lengthA + lengthE, center[1] + lengthF];
      f0 =	[center[0] - lengthA, center[1] + lengthF];

      a1 = [center[0] , center[1] - lengthF];
      b1 = [center[0] , center[1] - lengthF + lengthB];

      c1 = [center[0] + lengthC, center[1] - lengthF + lengthB];
      d1 =	[center[0]  + lengthC, center[1] - lengthF + lengthD + lengthB];

      e1 =	[center[0] + lengthA, center[1] + lengthF];
      f1 =	[center[0] + lengthA, center[1] - lengthF];
    }
    

    var feature = new ol.Feature({
      geometry: new ol.geom.Polygon([[a0, b0, c0, d0, e0, f0, a0],[a1, b1, c1, d1, e1, f1, a1]])
    });

    buildingSurfaceSource.addFeature(feature);
    
  }
  if($('#requestFor_02').val() === 'Reihenhaus'){
    
  }
});

$('.uFormInput').change(function(evt) {
  
  buildingSurfaceSource.clear();
  
	console.log("Änderung");
  if($('#requestFor_02').val() === 'Einfamilienhaus') {
    var lengthA, lengthB, lengthC, lengthD, lengthE, lengthF, lengthG, lengthH;

    lengthA = $('#uFormInputA').val() / 100;
    lengthB = $('#uFormInputB').val() / 100;
    lengthC = $('#uFormInputC').val() / 100;
    lengthD = $('#uFormInputD').val() / 100;
    lengthE = $('#uFormInputE').val() / 100;
    lengthF = $('#uFormInputF').val() / 100;

    lengthG = lengthA - lengthC + lengthE;
    lengthH = lengthB + lengthD + lengthF;

    var center = mapSurface.getView().getCenter();
    var a, b, c, d, e, f, g , h;

    a = [ center[0] - (lengthH/2) , center[1] - (lengthA/2) ];
    b = [ center[0] - (lengthH/2) , center[1] + (lengthA/2) ];
    c = [ center[0] - (lengthH/2) + lengthB , center[1] + (lengthA/2)];
    d = [ center[0] - (lengthH/2) + lengthB , center[1] + (lengthA/2) - lengthC ];
    e = [ center[0] - (lengthH/2) + lengthB + lengthD , center[1] + (lengthA/2) - lengthC ];
    f = [ center[0] - (lengthH/2) + lengthB + lengthD , center[1] + (lengthA/2) - lengthC + lengthE];
    g = [ center[0] + (lengthH/2) , center[1] - (lengthA/2) + lengthG];
    h = [ center[0] + (lengthH/2) , center[1] - (lengthA/2)];

    var feature = new ol.Feature({
      geometry: new ol.geom.Polygon([[a, b, c, d, e, f, g, h, a]])
    });

    buildingSurfaceSource.addFeature(feature);
  }
  if($('#requestFor_02').val() === 'Doppelhaus') {
    if(!$('#doppelhausGeomOptionsCheck2').prop('checked') === true) {
      console.log("keine Spiegelung");
      var lengthA, lengthB, lengthC, lengthD, lengthE, lengthF, lengthG, lengthH;

      lengthA = $('#uFormInputA').val() / 100;
      lengthB = $('#uFormInputB').val() / 100;
      lengthC = $('#uFormInputC').val() / 100;
      lengthD = $('#uFormInputD').val() / 100;
      lengthE = $('#uFormInputE').val() / 100;
      lengthF = $('#uFormInputF').val() / 100;

      lengthG = lengthA - lengthC + lengthE;
      lengthH = lengthB + lengthD + lengthF;

      var center = mapSurface.getView().getCenter();
      var a0, b0, c0, d0, e0, f0, g0 , h0, a1, b1, c1, d1, e1, f1, g1 , h1;

      a0 = [ center[0] - (lengthH) , center[1] - (lengthA/2) ];
      b0 = [ center[0] - (lengthH) , center[1] + (lengthA/2) ];
      c0 = [ center[0] - (lengthH) + lengthB , center[1] + (lengthA/2)];
      d0 = [ center[0] - (lengthH) + lengthB , center[1] + (lengthA/2) - lengthC ];
      e0 = [ center[0] - (lengthH) + lengthB + lengthD , center[1] + (lengthA/2) - lengthC ];
      f0 = [ center[0] - (lengthH) + lengthB + lengthD , center[1] + (lengthA/2) - lengthC + lengthE];
      g0 = [ center[0] , center[1] - (lengthA/2) + lengthG];
      h0 = [ center[0] , center[1] - (lengthA/2)];
      
      
      a1 = [ center[0] , center[1] - (lengthA/2) ];
      b1 = [ center[0] , center[1] + (lengthA/2) ];
      c1 = [ center[0] + lengthB , center[1] + (lengthA/2)];
      d1 = [ center[0] + lengthB , center[1] + (lengthA/2) - lengthC ];
      e1 = [ center[0] + lengthB + lengthD , center[1] + (lengthA/2) - lengthC ];
      f1 = [ center[0] + lengthB + lengthD , center[1] + (lengthA/2) - lengthC + lengthE];
      g1 = [ center[0] + (lengthH) , center[1] - (lengthA/2) + lengthG];
      h1 = [ center[0] + (lengthH) , center[1] - (lengthA/2)];

      var feature = new ol.Feature({
        geometry: new ol.geom.Polygon([[a0, b0, c0, d0, e0, f0, g0, h0, a0], [a1, b1, c1, d1, e1, f1, g1, h1, a1]])
      });
      console.log(feature);
      buildingSurfaceSource.addFeature(feature);
      
    } else {
      var lengthA, lengthB, lengthC, lengthD, lengthE, lengthF, lengthG, lengthH;

      lengthA = $('#uFormInputA').val() / 100;
      lengthB = $('#uFormInputB').val() / 100;
      lengthC = $('#uFormInputC').val() / 100;
      lengthD = $('#uFormInputD').val() / 100;
      lengthE = $('#uFormInputE').val() / 100;
      lengthF = $('#uFormInputF').val() / 100;

      lengthG = lengthA - lengthC + lengthE;
      lengthH = lengthB + lengthD + lengthF;

      var center = mapSurface.getView().getCenter();
      var a0, b0, c0, d0, e0, f0, g0 , h0, a1, b1, c1, d1, e1, f1, g1 , h1;

      a0 = [ center[0] - lengthH , center[1] - (lengthA/2) ];
      b0 = [ center[0] - lengthH , center[1] + (lengthA/2) ];
      c0 = [ center[0] - lengthH + lengthB , center[1] + (lengthA/2)];
      d0 = [ center[0] - lengthH + lengthB , center[1] + (lengthA/2) - lengthC ];
      e0 = [ center[0] - lengthH + lengthB + lengthD , center[1] + (lengthA/2) - lengthC ];
      f0 = [ center[0] - lengthH + lengthB + lengthD , center[1] + (lengthA/2) - lengthC + lengthE];
      g0 = [ center[0] , center[1] - (lengthA/2) + lengthG];
      h0 = [ center[0] , center[1] - (lengthA/2)];
      
      
      a1 = [ center[0] , center[1] - (lengthA/2) ];
      b1 = [ center[0] , center[1] - (lengthA/2) + lengthG ];
      c1 = [ center[0] + lengthF , center[1] - (lengthA/2) + lengthG ];
      d1 = [ center[0] + lengthF , center[1] + (lengthA/2) - lengthE ];
      e1 = [ center[0] + lengthF + lengthD , center[1] + (lengthA/2) - lengthE ];
      f1 = [ center[0] + lengthF + lengthD , center[1] + (lengthA/2)];
      g1 = [ center[0] + lengthH , center[1] + (lengthA/2)];
      h1 = [ center[0] + lengthH , center[1] - (lengthA/2)];

      var feature = new ol.Feature({
        geometry: new ol.geom.Polygon([[a0, b0, c0, d0, e0, f0, g0, h0, a0], [a1, b1, c1, d1, e1, f1, g1, h1, a1]])
      });

      buildingSurfaceSource.addFeature(feature);
    }
    
  }
  if($('#requestFor_02').val() === 'Reihenhaus'){
    
  }
});