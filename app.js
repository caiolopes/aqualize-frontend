// script.js

/*
var geocodeAddress;

window.initMap = function() {
  console.log("AQUI");
  var current, drag, geocoder, lat, latitude, lng, longitude, map, marker;
  latitude = $('#latitude');
  longitude = $('#longitude');
  current = $('#current');
  marker = null;
  drag = false;
  map = new google.maps.Map(document.getElementById('map'), {
    zoom: 12,
    center: {
      lat: -34.397,
      lng: 150.644
    }
  });
  lat = -22.005;
  lng = -47.898;
  map.setZoom(15);
  if (latitude.length && longitude.length) {
    drag = true;
    if (latitude.val().length > 0 && longitude.val().length > 0) {
      lat = latitude.val();
      lng = longitude.val();
    }
  }
  marker = new google.maps.Marker({
    position: new google.maps.LatLng(lat, lng),
    draggable: drag
  });
  map.setCenter(marker.position);
  marker.setMap(map);
  if (latitude.length && longitude.length) {
    google.maps.event.addListener(marker, 'dragend', function(evt) {
      current.html('<p>O lugar foi posicionado na latitude: ' + evt.latLng.lat().toFixed(3) + ' e longitude: ' + evt.latLng.lng().toFixed(3) + '</p>');
      latitude.val(marker.getPosition().lat());
      longitude.val(marker.getPosition().lng());
    });
    google.maps.event.addListener(marker, 'dragstart', function(evt) {
      current.html('<p>Posicionando o lugar...</p>');
    });
    geocoder = new google.maps.Geocoder;
    $('#search').click(function() {
      geocodeAddress(geocoder, map, marker);
    });
  }
};

geocodeAddress = function(geocoder, resultsMap, marker) {
  var address, current, latitude, longitude;
  latitude = $('#latitude');
  longitude = $('#longitude');
  current = $('#current');
  address = document.getElementById('address').value;
  geocoder.geocode({
    'address': address
  }, function(results, status) {
    if (status === google.maps.GeocoderStatus.OK) {
      resultsMap.setCenter(results[0].geometry.location);
      resultsMap.setZoom(15);
      marker.setPosition(results[0].geometry.location);
      resultsMap.setCenter(marker.position);
      current.html('<p>O lugar foi posicionado na latitude: ' + marker.getPosition().lat().toFixed(3) + ' e longitude: ' + marker.getPosition().lng().toFixed(3) + '</p>');
      latitude.val(marker.getPosition().lat());
      longitude.val(marker.getPosition().lng());
    } else {
      alert('Geocode was not successful for the following reason: ' + status);
    }
  });
};

$(document).ready(function() {
  var getCategories, getTypes, getUrlVars, pathname;
  getCategories = function(edit) {
    var category, placeCategory, vars;
    if (edit == null) {
      edit = false;
    }
    placeCategory = edit ? $('.place-category').first() : $('.place-category').last();
    category = void 0;
    vars = getUrlVars();
    if (vars.category !== void 0) {
      category = vars.category;
    } else if (placeCategory.length) {
      category = placeCategory.val();
    }
    $.getJSON('/categories', function(data) {
      var html;
      html = '';
      $.each(data, function(index, value) {
        if (category === value.category) {
          html += '<option value="' + value.category + '" selected>' + value.category + '</option>';
        } else {
          html += '<option value="' + value.category + '">' + value.category + '</option>';
        }
      });
      category = edit ? $('.category').first() : $('.category').last();
      category.html(html);
      category.on('change', function() {
        getTypes(category.val(), edit);
      });
      getTypes(category.val(), edit);
    });
  };
  getTypes = function(category, edit) {
    var placeType, type, vars;
    if (edit == null) {
      edit = false;
    }
    console.log(edit);
    placeType = edit ? $('.place-type').first() : $('.place-type').last();
    console.log(placeType.val());
    type = void 0;
    vars = getUrlVars();
    if (vars.type !== void 0) {
      type = vars.type;
    } else if (placeType.length) {
      type = placeType.val();
    }
    $.getJSON('/types?category=' + category, function(data) {
      var html;
      html = '';
      $.each(data, function(index, value) {
        if (value.id === type || value.type === type) {
          html += '<option value="' + value.id + '" selected>' + value.type + '</option>';
        } else {
          html += '<option value="' + value.id + '">' + value.type + '</option>';
        }
      });
      if (edit) {
        $('.type').first().html(html);
      } else {
        $('.type').last().html(html);
      }
    });
  };
  getUrlVars = function() {
    var hash, hashes, i, vars;
    vars = [];
    hash = void 0;
    hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    i = 0;
    while (i < hashes.length) {
      hash = hashes[i].split('=');
      vars.push(hash[0]);
      vars[hash[0]] = hash[1];
      i++;
    }
    return vars;
  };
  pathname = window.location.pathname;
  if (pathname === '/place' || pathname === '/places' || pathname === '/places/search') {
    getCategories();
  } else if (pathname.indexOf('/place/edit/') > -1) {
    getCategories(true);
  }
  if ($('#message').length) {
    setTimeout(function() {
      $('#message').fadeOut('slow');
    }, 5000);
  }
  $('#confirm-delete').on('show.bs.modal', function(e) {
    return $(this).find('.btn-ok').attr('href', $(e.relatedTarget).data('href'));
  });
  
  $('.repeater').repeater({
    show: function() {
      $(this).slideDown();
      getCategories();
      $(".category").eq(-2).prop('disabled', true);
    },
    hide: function(deleteElement) {
      $(".category").eq(-2).prop('disabled', false);
      $(this).slideUp(deleteElement);
    },
    isFirstItemUndeletable: true
  });
});
*/
    // create the module and name it aqualize
        // also include ngRoute for all our routing needs
    var aqualize = angular.module('aqualize', ['ngRoute', 'ngMap', 'ngFileUpload']);

    // configure our routes
    aqualize.config(function($routeProvider) {
        $routeProvider

            // route for the home page
            .when('/', {
                templateUrl : 'pages/login.html',
                controller  : 'mainController'
            })

            // route for the about page
            .when('/about', {
                templateUrl : 'pages/about.html',
                controller  : 'aboutController'
            })

            // route for the contact page
            .when('/contact', {
                templateUrl : 'pages/contact.html',
                controller  : 'contactController'
            });
    });

    // create the controller and inject Angular's $scope
    aqualize.controller('mainController', function($scope, NgMap, Upload) {
        var myMap, marker, lat = -23.5977319, lng = -46.6821862;
        // create a message to display in our view
        $scope.message = 'Everyone come and see how good I look!';
        $scope.googleMapsUrl="https://maps.googleapis.com/maps/api/js?key=AIzaSyCEdyZcl5KZB3RkXr6JeI8mg1HjG5ZduEU";
        $scope.search = function() {
            console.log($scope.address);
            geocoder.geocode({
                'address': $scope.address
              }, function(results, status) {
                if (status === google.maps.GeocoderStatus.OK) {
                  myMap.setCenter(results[0].geometry.location);
                  myMap.setZoom(16);
                  marker.setPosition(results[0].geometry.location);
                  myMap.setCenter(marker.position);
                  //latitude.val(marker.getPosition().lat());
                  //longitude.val(marker.getPosition().lng());
                } else {
                  alert('Geocode was not successful for the following reason: ' + status);
                }
              });
        };
      var geocoder;
      NgMap.getMap().then(function(map) {
        myMap = map;
        marker = new google.maps.Marker({
            position: new google.maps.LatLng(lat, lng),
            draggable: true
        });
        map.setCenter(marker.position);
        marker.setMap(myMap);
        google.maps.event.addListener(marker, 'dragend', function(evt) {

        });
        google.maps.event.addListener(marker, 'dragstart', function(evt) {
          
        });
        geocoder = new google.maps.Geocoder;
      });
      
        // upload on file select or drop
        $scope.upload = function (file) {
            Upload.upload({
                url: 'upload/url',
                data: {file: file, 'username': $scope.username}
            }).then(function (resp) {
                console.log('Success ' + resp.config.data.file.name + 'uploaded. Response: ' + resp.data);
            }, function (resp) {
                console.log('Error status: ' + resp.status);
            }, function (evt) {
                var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
                console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
            });
        };
    });

    aqualize.controller('aboutController', function($scope) {
        $scope.message = 'Look! I am an about page.';
        $scope.submitForm = function() {
            alert("Name: " + $scope.name);
        };
    });

    aqualize.controller('contactController', function($scope) {
        $scope.message = 'Contact us! JK. This is just a demo.';
    });