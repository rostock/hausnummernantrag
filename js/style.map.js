var flurSurfaceStyle = new ol.style.Style({
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

var buildingEntryStyle = new ol.style.Style({
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

var highlightStyle = new ol.style.Style({
  fill: new ol.style.Fill({
    color: 'rgba(255,255,255,0.7)'
  }),
  stroke: new ol.style.Stroke({
    color: '#3399CC',
    width: 3
  })
});

var drawBuildingEntryStyle = function(feature) {
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
};

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
      })
    })
  ];
};
