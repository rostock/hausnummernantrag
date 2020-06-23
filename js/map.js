var formatWKT = new ol.format.WKT();
var formatJSON = new ol.format.GeoJSON();

var view = new ol.View({
  center: [0, 0],
  zoom: 2
});

/*
 * Gebäudeumring
 */
var flurSurfaceSource = new ol.source.Vector();
var flurSurfaceLayer = new ol.layer.Vector({
  source: flurSurfaceSource,
  style: new ol.style.Style({
    fill: new ol.style.Fill({
      color: 'rgba(255, 255, 255, 0.2)'
    }),
    stroke: new ol.style.Stroke({
      color: '#ffcc33',
      width: 2
    }),
    image: new ol.style.Circle({
      radius: 7,
      fill: new ol.style.Fill({
        color: '#ffcc33'
      })
    })
  })
});

var styleBuilding = function(feature){
  return [
    new ol.style.Style({
      stroke: new ol.style.Stroke({
        color: 'blue',
        width: 3
      }),
      fill: new ol.style.Fill({
        color: 'rgba(0, 0, 255, 0.1)'
      })
    }),
    new ol.style.Style({
      image: new ol.style.Circle({
        radius: 7,
        fill: new ol.style.Fill({
          color: 'orange'
        })
      }),
      geometry: function(feature) {
        var coordinates = feature.getGeometry().getCoordinates()[0];
        return new ol.geom.Point(coordinates[2]);
      }
    })
  ];
};

var styleBuilding_2 = function(feature){
  return [
    new ol.style.Style({
      stroke: new ol.style.Stroke({
        color: 'blue',
        width: 3
      }),
      fill: new ol.style.Fill({
        color: 'rgba(0, 0, 255, 0.1)'
      })
    }),
    new ol.style.Style({
      image: new ol.style.Circle({
        radius: 7,
        fill: new ol.style.Fill({
          color: 'orange'
        })
      })
    })
  ];
};

/*
 * Gebäudeumring
 */
var buildingSurfaceSource = new ol.source.Vector();
var buildingSurfaceLayer = new ol.layer.Vector({
  name: 'Gebäudegrundriss',	
  source: buildingSurfaceSource,
  style: styleBuilding,
});

var buildingSurfaceLayer_2 = new ol.layer.Vector({
  name: 'Gebäudegrundriss',	
  source: buildingSurfaceSource,
  style: styleBuilding_2,
});

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
  style: new ol.style.Style({
    fill: new ol.style.Fill({
      color: 'rgba(255, 255, 255, 0.2)'
    }),
    stroke: new ol.style.Stroke({
      color: '#ffcc33',
      width: 2
    }),
    image: new ol.style.Circle({
      radius: 7,
      fill: new ol.style.Fill({
        color: '#ffcc33'
      })
    })
  })
});

/*
 * Interactions
 */
var modifyBuildingSurface = new ol.interaction.Modify({source: buildingSurfaceSource});
var snapBuildingSurface = new ol.interaction.Snap({source: buildingSurfaceSource});
var drawBuildingSurface = new ol.interaction.Draw({
  source: buildingSurfaceSource,
  type: 'Polygon'
});


drawBuildingSurface.on('drawstart', function (event) {
  buildingSurfaceSource.clear();
  buildingEntrySource.clear();	
});


drawBuildingSurface.on('drawend', function (event) {
  var wkt = formatWKT.writeGeometry(event.feature.getGeometry())
  $('#mapSurfaceValue').html(wkt);  
});


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
  style: function(feature) {
    var entryDrawColor = '#FF0000';
    var geometry = feature.getGeometry();
    
    if (geometry.getType() === 'Point') {
      var coordinates = geometry.getCoordinates();
      var pixel = mapEntry.getPixelFromCoordinate(coordinates);
      var features = [];
      mapEntry.forEachFeatureAtPixel(pixel, function(feature, layer) {
        if(layer !== null && layer.get('name') === 'Gebäudegrundriss') {
          features.push(feature);
        }
      });
      
      if(features.length  === 1 ) {
        if(checkBoundary(features[0], coordinates) === true) {
            entryDrawColor = '#40FF00'
        }
      };
    }
    
    return new ol.style.Style({
      image: new ol.style.Circle({
        radius: 7,
        fill: new ol.style.Fill({
          color: entryDrawColor,
        }),
        stroke: new ol.style.Stroke({
          color: 'white',
          width: 3
        })
      })
    })
  }
});

drawBuildingEntry.on('drawstart', function (event) {
  buildingEntrySource.clear();	
});

drawBuildingEntry.on('drawend', function (event) {
  var wkt = formatWKT.writeGeometry(event.feature.getGeometry())
  $('#mapEntryValue').html(wkt);  
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

//var polygon = new ol.Feature({
//  name: 'polygon',
//  geometry: new ol.geom.Polygon([ [
//    [ -14482348.171434438, 6661491.741627443 ],
//    [ -9541458.663080638, 6221214.458704827 ],
//    [ -11473786.738129886, 3300708.4819848104 ],
//    [ -14482348.171434438, 6661491.741627443 ]
//  ] ])
//})
//
//buildingSurfaceSource.addFeature(polygon);
//var styles = { 
//  anchor: [
//    new ol.style.Style({
//      image: new ol.style.RegularShape({
//        fill: new ol.style.Fill({
//          color: 'blue'
//        }),
//        stroke: new ol.style.Stroke({
//          color: 'blue',
//          width: 1
//        }),
//        radius: 4,
//        points: 6
//      }),
//      zIndex: Infinity
//    })
//  ]
//};
//var rotateFeature = new RotateFeatureInteraction({
//  features: [polygon],
//  anchor: polygon.getGeometry().getFirstCoordinate(),
//  style: styles,
//})
//
//rotateFeature.on('rotatestart', evt => console.log('rotate start', evt))
//rotateFeature.on('rotating', evt => console.log('rotating', evt))
//rotateFeature.on('rotateend', evt => console.log('rotate end', evt))

mapSurface.addInteraction(featureDrager);
//mapSurface.addInteraction(rotateFeature);
mapSurface.addInteraction(snapBuildingSurface);
var highlightStyle = new ol.style.Style({
  fill: new ol.style.Fill({
    color: 'rgba(255,255,255,0.7)'
  }),
  stroke: new ol.style.Stroke({
    color: '#3399CC',
    width: 3
  })
});
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

var mapEntry = new ol.Map({
  layers: [
    new ol.layer.Tile({
      source: new ol.source.OSM()
    }),
    flurSurfaceLayer,  
    buildingSurfaceLayer_2,
    buildingEntryLayer
  ],
  target: 'mapEntry',
  view: view
});
mapEntry.addInteraction(modifyBuildingEntry);
mapEntry.addInteraction(drawBuildingEntry);
mapEntry.addInteraction(snapBuildingEntry);


(function() {
  var ev = new $.Event('styleChanging'),
  orig = $.fn.css;
  $.fn.css = function() {
    $(this).trigger(ev);
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
  focus: function( event, ui ) {
    $( "#flurId" ).val( ui.item.label );
    return false;
  },
  select: function( event, ui ) {
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
	console.log("change");
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