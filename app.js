// script.js
    var aqualize = angular.module('aqualize', ['ngRoute', 'ngMap', 'ngFileUpload', 'ngTagsInput']);

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
            .when('/empresa', {
                templateUrl : 'pages/empresa.html',
                controller  : 'companyController'
            })
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
		  "comment": "",
          "id": 1,
          "type": "Vazamento",
          "report": "Há dias percebi um fluxo de água anormal perto da minha casa, segui o caminho que a água percorreria e identifiquei alguns canos rompidos por onde sai muita água limpa.",
          "lat": -23.5631141,
          "lng": -46.65439200000003, 
		  "author": "Caio Lopes",
		  "sugestao": "Arruma",
          "img": "vazamento.jpg",
		  "likes": 0,
      "liked": false,
      "solved": false,
          "help": "Entrei em contato com a SABESP e os mesmos ficaram responsáveis pelo reparo do cano, mas até agora nada. Como é uma água limpa, consegui captar um pouco com alguns baldes, o que vai me ajudar na lavagem do quintal e banheiros.",
		  "comments": []
        }, {
          "id": 2,
		  "comment": "",
          "type": "Poluição",
           "report": "Meu vizinho joga restos de óleo de cozinhar no riacho que tem perto de casa. Já o avisei dos problemas que isto pode causar mas ele continua jogando.",
          "lat": -23.5523329,
          "lng": -46.658268899999996, 
		  "author": "Caio Lopes",
		  "sugestao": "Arruma",
          "img": "poluicao.jpg",
          "help": "Enviar coleta seletiva para materiais orgânicos que podem prejudicar o meio ambiente quando descartados incorretamente.",
          "likes": 5,
          "liked": false,
          "solved": false,
          "comments": [
            {  
              "id": 1,
              "comment": "Boa!!",
              "author": "Caio Lopes",
              "liked": false,
			  "likes": 0
            }
          ]
        }];

        return {
            get: function () {
                return reports;
            },
            add: function(report) {
                reports.push(report);
            },
			addComment: function(post) {
				var comment = {}
				comment.likes = 0;
				if(post.comments.length > 0){
					comment.id = post.comments[post.comments.length -1].id+1;
				}
				else{
					comment.id = 0;
				}
				comment.author = "Caio Lopes",
        comment.liked = false;
				comment.comment = post.comment;
				post.comments.push(comment);
				post.comment = "";
			}
        };
    });

    // create the controller and inject Angular's $scope
    aqualize.controller('reportController', function($rootScope, $scope, NgMap, Upload, $location, markersArr, reportList) {
        var myMap, marker, lat = -23.5977319, lng = -46.6821862;
        $rootScope.nav = "report";
        $scope.report = {};
        $rootScope.showfootnav = true;
        // create a message to display in our view
        $scope.message = 'Everyone come and see how good I look!';
        $scope.googleMapsUrl="https://maps.googleapis.com/maps/api/js?key=AIzaSyCEdyZcl5KZB3RkXr6JeI8mg1HjG5ZduEU";
        $scope.submit = function() {
          $scope.report.id = reportList.get().length;
          $scope.report.img = "vazamento.jpg";
          $scope.report.liked = false;
          $scope.report.solved = false;
    		  $scope.report.likes = 0;
    		  $scope.report.comments = [];
    		  $scope.report.comment = "";
    		  $scope.report.author = "Caio Lopes";
          console.log($scope.report);
          reportList.add($scope.report);
          $location.path("timeline");
        };

        $scope.search = function() {
            console.log($scope.address);
            geocoder.geocode({
                'address': $scope.report.address
              }, function(results, status) {
                if (status === google.maps.GeocoderStatus.OK) {
                  myMap.setCenter(results[0].geometry.location);
                  console.log(results[0].geometry.location)
                  myMap.setZoom(16);
                  marker.setPosition(results[0].geometry.location);
                  myMap.setCenter(marker.position);
                  $scope.report.lat = results[0].geometry.location.lat();
                  $scope.report.lng = results[0].geometry.location.lng();
                  console.log($scope.report);
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
          $scope.report.lat = evt.latLng.lat();
          $scope.report.lng = evt.latLng.lng();
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
            // Try HTML5 geolocation.
            if (navigator.geolocation) {
              navigator.geolocation.getCurrentPosition(function(position) {
                var pos = {
                  lat: position.coords.latitude,
                  lng: position.coords.longitude
                };
                var currentMarker = new google.maps.Marker({
                    position: new google.maps.LatLng(pos.lat, pos.lng),
                    draggable: false,
                    icon: 'http://www.greaterdandenong.com/Public/images/Maps/CurrentLocation.png'
                });
                markersArr.add(currentMarker);
                currentMarker.setMap(map);
                map.setCenter(pos);
              }, function() {
                handleLocationError(true, infoWindow, map.getCenter());
              });
            } else {
              // Browser doesn't support Geolocation
              handleLocationError(false, infoWindow, map.getCenter());
            }
          }
        });
		
		$scope.incLikes = function(comment) {
      if (!comment.liked)
			 comment.likes = comment.likes+1;
      else
        comment.likes = comment.likes-1;
      
      comment.liked = !comment.liked;
		};
		
		$scope.addComment = function(post) {
			reportList.addComment(post);
		};
  });

    aqualize.controller('companyController', function($rootScope, $scope, $location, NgMap, markersArr, reportList) {
        $rootScope.nav = "empresa";
        $rootScope.showfootnav = true;
        $scope.tags = [];
        $scope.array = angular.copy(reportList.get());
        $scope.tag = function() {
          $scope.array = angular.copy(reportList.get());
          var i = $scope.array.length;
          if ($scope.tags.length > 0) {
            while (i--) {
              var report = reportList.get()[i];
              var found = false;
              for (var j = 0; j < $scope.tags.length; j++) {
                if(report.report.indexOf($scope.tags[j].text) !== -1) {
                  found = true;
                }
              }
              if (!found) {
                $scope.array.splice(i, 1);
              } 
            }
          }
        };

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
    
    $scope.solve = function(post) {      
      post.solved = !post.solved;
      console.log(post);
      for (var index in reportList.get()) {
        var report = reportList.get()[index];
        console.log(report);
        if (report.id == post.id) {
          report.solved = true;
        }
      }
    };
    
    $scope.addComment = function(post) {
      reportList.addComment(post);
    };
  });

  aqualize.controller('loginController', function($rootScope) {
      $rootScope.showfootnav = false;
  });
