// script.js
    var aqualize = angular.module('aqualize', ['ngRoute', 'ngMap', 'ngFileUpload']);

    // configure our routes
    aqualize.config(function($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl : 'pages/login.html',
                controller  : 'loginController' 
            })
            .when('/relatar', {
                templateUrl : 'pages/relatar.html',
                controller  : 'reportController'
            })
            .when('/timeline', {
                templateUrl : 'pages/timeline.html',
                controller  : 'timelineController'
            })
            .when('/contact', {
                templateUrl : 'pages/contact.html',
                controller  : 'contactController'
            });

    });

    aqualize.service('markersArr', function() {
      var markers = [];

        return {
            get: function () {
                return markers;
            },
            add: function(marker) {
                markers.push(marker);
            }
        };
    });

    aqualize.service('infowindowArr', function() {
      var info = [];

        return {
            get: function () {
                return info;
            },
            add: function(marker) {
                info.push(marker);
            }
        };
    });

    aqualize.service('reportList', function() {
      var reports = [{
          "id": 1,
          "type": "Vazamento",
          "description": "Há dias percebi um fluxo de água anormal perto da minha casa, segui o caminho que a água percorreria e identifiquei alguns canos rompidos por onde sai muita água limpa.",
          "lat": -23.5631141,
          "lng": -46.65439200000003, 
          "img": "vazamento.jpg",
          "help": "Entrei em contato com a SABESP e os mesmos ficaram responsáveis pelo reparo do cano, mas até agora nada. Como é uma água limpa, consegui captar um pouco com alguns baldes, o que vai me ajudar na lavagem do quintal e banheiros."
        }, {
          "id": 2,
          "type": "Poluição",
           "description": "Meu vizinho joga restos de óleo de cozinhar no riacho que tem perto de casa. Já o avisei dos problemas que isto pode causar mas ele continua jogando.",
          "lat": -23.5523329,
          "lng": -46.658268899999996, 
          "img": "poluicao.jpg",
          "help": "Enviar coleta seletiva para materiais orgânicos que podem prejudicar o meio ambiente quando descartados incorretamente.",
          "likes": 5,
          "comments": [
            {  
              "id": 1,
              "comment": "Boa!!",
              "author": "Caio Lopes"
            }
          ]
        }];

        return {
            get: function () {
                return reports;
            },
            add: function(report) {
                reports.push(report);
            }
        };
    });

    // create the controller and inject Angular's $scope
    aqualize.controller('reportController', function($rootScope, $scope, NgMap, Upload, $location, markersArr) {
        var myMap, marker, lat = -23.5977319, lng = -46.6821862;
        $rootScope.nav = "report";
        $rootScope.showfootnav = true;
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
        for (var i = 0; i < markersArr.get().length; i++) {
          markersArr.get()[i].setMap(null);
        }
        marker = new google.maps.Marker({
            position: new google.maps.LatLng(lat, lng),
            draggable: true,
            icon: 'https://s12.postimg.org/ouov6akgt/water_drop.png',
        });
        markersArr.add(marker);
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

    aqualize.controller('timelineController', function($rootScope, $scope, $location, NgMap, markersArr, reportList) {
        $rootScope.nav = "timeline";
        $rootScope.showfootnav = true;
        $scope.array = reportList.get();

        NgMap.getMap().then(function(map) {
          for (var i = 0; i < markersArr.get().length; i++) {
            markersArr.get()[i].setMap(null);
            markersArr.get().splice(i, 1);
          }
          for (index in $scope.array) {
            var myinfowindow = new google.maps.InfoWindow({
              content: "<img src='images/"+$scope.array[index].img+"' width='200' height='200'>"
            });
            var marker = new google.maps.Marker({
                position: new google.maps.LatLng($scope.array[index].lat, $scope.array[index].lng),
                draggable: false,
                icon: 'https://s12.postimg.org/ouov6akgt/water_drop.png',
                infowindow: myinfowindow
            });
            markersArr.add(marker);
            marker.setMap(map);
            google.maps.event.addListener(marker, 'click', function() {
              this.infowindow.open(map, this);
            });
          }
        });
    });

    aqualize.controller('loginController', function($rootScope) {
        $rootScope.showfootnav = false;
    });
