var map;

function heatMap (position, map, data)
{
  console.log("HEATMAP");
  var closeData = [];
  maxDistanceAway = 0.005; //In terms of lat/long
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
    data: closeData,
    dissipating: true,
    radius: 10
  });

  heatmap.setMap(map);

}
function parseData(raw_data, pos)
{
    console.log("PARSEDATA");
    console.log("DATA:");
    console.log(raw_data);
    var data = [];
    for(var i=0; i < raw_data.length; i++)
    {
      var row = raw_data[i];
      var lat = row.latitude;
      var lng = row.longitude;
      var strength = row.rssi;
      row = {location: new google.maps.LatLng(lat, lng), weight:strength};
      console.log("Pushing row:");
      console.log(row);
      data.push(row);
    }
    if(data !== null && data !== undefined)
    {
        heatMap(pos, map, data);
    }
    else
    {
      console.log("No data");
    }
}

function getData(pos){
  console.log("GETDATA");
  jQuery.getJSON(metric_url,
    function(raw_data) {
      parseData(raw_data, pos);});
}

function initialize() {
  console.log("INITIALIZE");
  var mapOptions = {
    zoom: 19
  };
  map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);

  // Try HTML5 geolocation
  if(navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      var pos = new google.maps.LatLng(position.coords.latitude,
                                       position.coords.longitude);
      console.log("P1");
      console.log(pos);
      var marker = new google.maps.Marker({
        position: pos,
        map: map,
        draggable: true,
        title: ''+pos,
      });
      getData(pos);
    google.maps.event.addListener(marker, 'dragend', function (event) {
        console.log("drag");
        console.log(event.latLng);
        pos = event.latLng;
        marker.title = ''+pos;
        map.setCenter(pos);
      });

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
  console.log("HANDLENOGEOLOCATION");
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

