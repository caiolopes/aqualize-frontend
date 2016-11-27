// script.js

    // create the module and name it aqualize
        // also include ngRoute for all our routing needs
    var aqualize = angular.module('aqualize', ['ngRoute']);

    // configure our routes
    aqualize.config(function($routeProvider) {
        $routeProvider

            // route for the home page
            .when('/', {
                templateUrl : 'pages/home.html',
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
    aqualize.controller('mainController', function($scope, $location) {
        // create a message to display in our view
        $scope.message = 'Everyone come and see how good I look!';
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