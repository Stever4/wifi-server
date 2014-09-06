var map;

function test(event) {
  console.log("foo");
}

function heatMap (position, map, data)
{
  var closeData = [];
  maxDistanceAway = 0.01; //In terms of lat/long
  datapoints = data.length;
  for(var i=0; i < datapoints; i++)
  {
    datapoint = data[i];
    dLat = datapoint.location.lat() - position.lat();
    dLong = datapoint.location.lng() - position.lng();
    if(-1*maxDistanceAway < dLat && dLat < maxDistanceAway && -1*maxDistanceAway < dLong && dLong < maxDistanceAway)
    {
      console.log("close enough");
      closeData.push(datapoint);
    }
  }

  var heatmap = new google.maps.visualization.HeatmapLayer({
    data:closeData
  });

  heatmap.setMap(map);

}

function getData()
{
  var data;
  var realData = [];
  jQuery.getJSON( metric_url, function (result) {
      data = result;
      console.log(data);
    length = data.length;
    for(var i=0; i < length; i++)
    {
      var lat = data['latitude'];
      var lng = data['longitude'];
      var strength = data['rssi'];
      console.log({location: new google.maps.LatLng(lat, lng), weight:strength});
      realData.push({location: new google.maps.LatLng(lat, lng), weight:strength});
    }
  });

  console.log(realData);
   return realData;
}

function initialize() {
  var mapOptions = {
    zoom: 19
  };
  map = new google.maps.Map(document.getElementById('map-canvas'),
      mapOptions);

  // Try HTML5 geolocation
  if(navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      var pos = new google.maps.LatLng(position.coords.latitude,
                                       position.coords.longitude);

      var marker = new google.maps.Marker({
        position: pos,
        map: map,
        draggable: true,
        title: ''+pos,
      });

    google.maps.event.addListener(marker, 'dragend', function (event) {
    console.log(event.latLng);
    pos = event.latLng;
    marker.title = ''+pos;
    map.setCenter(pos);
    });


    var data = getData();

  var testData = [
  {location: new google.maps.LatLng(42.293, -83.714), weight:5},
  {location: new google.maps.LatLng(42.294, -83.714), weight:10}];
  if(data !== null && data !== undefined)
  {
        heatMap(pos, map, data);
  }
  else
  {
    console.log("No data");
  }


      map.setCenter(pos);
    }, function() {
      handleNoGeolocation(true);
    });
  } else {
    // Browser doesn't support Geolocation
    handleNoGeolocation(false);
  }

}

function handleNoGeolocation(errorFlag) {
  if (errorFlag) {
    var content = 'Error: The Geolocation service failed.';
  } else {
    var content = 'Error: Your browser doesn\'t support geolocation.';
  }

  var options = {
    map: map,
    position: new google.maps.LatLng(60, 105),
    content: content
  };

  var infowindow = new google.maps.InfoWindow(options);
  map.setCenter(options.position);
}

google.maps.event.addDomListener(window, 'load', initialize);

