const DATA_URL = "data/";
app = angular.module('main', [])

app.controller('test', function($scope, $http) {

    // Variables for the map and map related objects
    var l_map;
    var l_markers = [];
    var l_infowindow;
    var l_events = [];
    var l_area = null;
    var map_center = {lat: 39.099727, lng: -94.578567};

    // On load, create the map and render it
    initMap();

    function initMap(){
        l_map = new google.maps.Map(document.getElementById('map'), {
            zoom: 9,
            center: map_center
        });
        l_infowindow = new google.maps.InfoWindow({});
        populate();
    }

    // Draw the selection rea

    // Retrive data from back-end
    function populate(){
        if($scope.tag_flag === undefined){
            $scope.tag_flag = false
        }
        data_req = $http({
            url: DATA_URL,
            method: "GET",
            params: {
            }
        }).then(res=>{
            l_events = res.data;
            console.log(l_events);
            plotMarkers(l_events, l_map, l_markers, l_infowindow);
        });
    }


    // Plot the markers on the map
    function plotMarkers(events,map, markers, infowindow){
        for (var i = 0; i < events.length; i++) {
            event = events[i]
            addMarker(map, markers, infowindow, "Placeholder", event['lat'], event['lon'])
        }
    }

    // Add marker to map, along with stuff like description & click listener
    function addMarker(map, markers, infowindow, desc, lat, lng){
        console.log(desc, lat, lng)
        var marker = new google.maps.Marker({
            position: {lat: lat, lng: lng},
            title: desc
        });
        
        marker.setMap(map);
        marker.addListener('click', function(){
            infowindow.setContent(desc);
            infowindow.open(map, marker);
        });
        markers.push({'marker':marker})
    };
});

