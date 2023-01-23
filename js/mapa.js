mapboxgl.accessToken = 'pk.eyJ1IjoiYW5kcmVzY2FybG9zMjIxMSIsImEiOiJjbGNqYmRleGswNXVnNDF0OWk0eTR5NHYyIn0.UY24vF15k-2db6b_rnhrNQ';
var map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/mapbox/streets-v11',
  zoom:10,
  center: [-71.5,-33.02],
  attributionControl: false

});

// setTimeout( 
//   function(){
  
// map.resize();
//   }
//   ,3000);
map.scrollZoom.enable();
map.addControl(new mapboxgl.AttributionControl(), 'top-left');
map.addControl(
    new mapboxgl.GeolocateControl({
    positionOptions: {
    enableHighAccuracy: true
    },
    // When active the map will receive updates to the device's location as it changes.
    trackUserLocation: true,
    // Draw an arrow next to the location dot to indicate which direction the device is heading.
    showUserHeading: true
    })
    );

map.on('load', () => {
      map.addSource('places', {
      type: 'geojson',
      // Use a URL for the value for the `data` property.
      data: 'js/lugares.geojson'
      });
       
      map.addLayer({
      'id': 'earthquakes-layer',
      'type': 'circle',
      'source': 'earthquakes',
      'paint': {
      'circle-radius': 4,
      'circle-stroke-width': 2,
      'circle-color': 'red',
      'circle-stroke-color': 'white'
      }
      });
                    });



map.on('load', () => {
  
  // Load an image from an external URL.
  map.loadImage(
  'img/tomato.png',
  (error, image) => {
  if (error) throw error;
   
  // Add the image to the map style.
  map.addImage('tomato', image);
   
  // Add a data source containing one point feature.
  map.addSource('point', {
  'type': 'geojson',
  'data': {
  'type': 'FeatureCollection',
  'features': [
  {
  'type': 'Feature',
  'geometry': {
  'type': 'Point',
  'coordinates': [-72,-33]
  }
  }
  ]
  }
  });
   
  // Add a layer to use the image to represent the data.
  map.addLayer({
  'id': 'points',
  'type': 'symbol',
  'source': 'point', // reference the data source
  'layout': {
  'icon-image': 'tomato', // reference the image
  'icon-size': 0.1
  }
  });
  }
  );
                    });
  
map.on('load', () => {
  
                      // Load an image from an external URL.
                      map.loadImage(
                      'https://cdn.shopify.com/s/files/1/1061/1924/products/Beer_Emoji_large.png',
                      (error, image) => {
                      if (error) throw error;
                       
                      // Add the image to the map style.
                      map.addImage('cat', image);
                       
                      // Add a data source containing one point feature.
                      map.addSource('point', {
                      'type': 'geojson',
                      'data': {
                      'type': 'FeatureCollection',
                      'features': [
                      {
                      'type': 'Feature',
                      'geometry': {
                      'type': 'Point',
                      'coordinates': [-71.5,-33.02]
                      }
                      }
                      ]
                      }
                      });
                       
                      // Add a layer to use the image to represent the data.
                      map.addLayer({
                      'id': 'points',
                      'type': 'symbol',
                      'source': 'point', // reference the data source
                      'layout': {
                      'icon-image': 'cat', // reference the image
                      'icon-size': 0.1
                      }
                      });
                      }
                      );
                    });

                    // Create a popup, but don't add it to the map yet.
const popup = new mapboxgl.Popup({
  closeButton: false,
  closeOnClick: false
  });
   
  map.on('mouseenter', 'places', (e) => {
  // Change the cursor style as a UI indicator.
  map.getCanvas().style.cursor = 'pointer';
   
  // Copy coordinates array.
  const coordinates = e.features[0].geometry.coordinates.slice();
  const description = e.features[0].properties.description;
   
  // Ensure that if the map is zoomed out such that multiple
  // copies of the feature are visible, the popup appears
  // over the copy being pointed to.
  while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
  coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
  }
   
  // Populate the popup and set its coordinates
  // based on the feature found.
  popup.setLngLat(coordinates).setHTML(description).addTo(map);
  });
   
  map.on('mouseleave', 'places', () => {
  map.getCanvas().style.cursor = '';
  popup.remove();
  });
