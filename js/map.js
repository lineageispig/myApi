
// Creat a map function
function initMap() {
  var bounds = new google.maps.LatLngBounds;
  var map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: -33.8688, lng: 151.2195},
    zoom: 13
});

  var input = document.getElementById('pac-input');
  var inp = document.getElementById('query!-input')
}



// Create a function which include Google map api Autocomplete, DirectionService and DistanceMatrix. 
function initAutocomplete() {

  var directionsService = new google.maps.DirectionsService;
  var directionsDisplay = new google.maps.DirectionsRenderer;
  var map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 22.372081, lng: 114.107877},
    zoom: 7,
    mapTypeId: 'roadmap'
});
        
  var infowindow = new google.maps.InfoWindow(); 
  var marker = new google.maps.Marker({
  map: map
});
         
marker.addListener('click', function() {
            
            infowindow.close();
            var place = autocomplete.getPlace();
            if (!place.place_id) {
return; 
}
})
 
var input = document.getElementById('origin-input');
var input2 = document.getElementById('destination-input');
 
  var address = document.getElementById('origin-input').value;
  var address2 =  document.getElementById('destination-input').value;   
  
  var autocomplete =  new google.maps.places.Autocomplete(
  input, {placeIdOnly: true}); 
  var autocomplete2 =  new google.maps.places.Autocomplete(
  input2, {placeIdOnly: true}); 

  autocomplete.bindTo('bounds', map);
  autocomplete2.bindTo('bounds', map);
          
  map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);
  map.controls[google.maps.ControlPosition.TOP_LEFT].push(input2);

  var infowindow = new google.maps.InfoWindow(); 
  var geocoder = new google.maps.Geocoder();
  var marker = new google.maps.Marker({
  map: map
}); 

  marker.addListener('click', function() {
  infowindow.open(map, marker);
});
    
    autocomplete.addListener('place_change', function() {
  infowindow.close();
  var place = autocomplete.getPlace();
      if (!place.place_id) {
          return ("there is no place id"); 
}
  geocoder.geocode({'placeId': place.place_id}, function(results, status){
      if (status !=='OK') {
          window.alert('Geocoder failed due to: ' + status );
          return;
  }
})
})  
   var onChangeHandler = function() {
   calculateAndDisplayRoute(directionsService, directionsDisplay)
}; 
          
  function calculateAndDisplayRoute(directionsService, directionsDisplay) {
  directionsService.route({
    origin: document.getElementById('origin-input').value,
    destination: document.getElementById('destination-input').value, 
    travelMode: 'DRIVING'
}, function(response, status) {
      if (status == google.maps.GeocoderStatus.OK) {
          
     directionsDisplay.setDirections(response);
     var geocoder = new google.maps.Geocoder();
     var address = document.getElementById('origin-input').value;
     var address2 =  document.getElementById('destination-input').value;
    
    getLocation(address);
    }
  });
};
          
var getLocation =  function(address) {
var geocoder = new google.maps.Geocoder();
 
  geocoder.geocode( { 'address': address}, function(results, status) {

  if (status == google.maps.GeocoderStatus.OK) {
      
       var array =[]; 
      var latitude = results[0].geometry.location.lat();
      var longitude = results[0].geometry.location.lng();

      var latlng = [latitude,  longitude];
   
      array.push(latlng);

     console.log(latlng);
     console.log(array[0]) 
 
      
    document.getElementById("demo").value = latitude;  
    document.getElementById("demo").textContent = latitude;
    document.getElementById("demo2").value = longitude;  
    document.getElementById("demo2").textContent = longitude;
      return latlng
  
      }
      return latlng
  }); 

}
// the button control the direction service.
document.getElementById("myBtn").addEventListener("click", function(){
  onChangeHandler();  
});
         
};  
 // following control the button to present the json data.
function mFunction() {
  var address1 = document.getElementById('origin-input').value;
  var address2 = document.getElementById('destination-input').value;
  window.open("https://maps.googleapis.com/maps/api/distancematrix/json?origins=" + address1 + "&destinations=" + address2 + '&key=AIzaSyDH3Y5os8GvSV1IgwOXYvS50PeZbsBAFN8' ); 
}

        
function SFunction() {
  var address1 = document.getElementById('origin-input').value;
  var address2 = document.getElementById('destination-input').value;
  window.open("https://maps.googleapis.com/maps/api/geocode/json?address=" + address1 + '&key=AIzaSyDH3Y5os8GvSV1IgwOXYvS50PeZbsBAFN8' );
}
        
function EFunction() {
  var address1 = document.getElementById('origin-input').value;
  var address2 = document.getElementById('destination-input').value;
  window.open("https://maps.googleapis.com/maps/api/geocode/json?address="  + address2 + '&key=AIzaSyDH3Y5os8GvSV1IgwOXYvS50PeZbsBAFN8'
)};

// following is the ajax that control the button onclick
      $(document).ready(function(){
        var user,pass;
        $("#myBtn").click(function(){
          Lat=$("#origin-input").val();
          Lng=$("#destination-input").val();
          $.post("http://localhost:8080",{user: Lat,password: Lng}, function(data){
            if(data==='done')
              { 
 
                consol.log('success')
              }
          });
        });
      });

      $(document).ready(function(){
        var lat,lng;
        $("#myBtn").click(function(){
          lat=$("#demo").val();
          lng=$("#demo2").val();
          $.post("http://localhost:8080",{lat: lat,lng: lng}, function(data){
            if(data==='done')
              { 

                consol.log('success')
              }
          });
        });
      });


