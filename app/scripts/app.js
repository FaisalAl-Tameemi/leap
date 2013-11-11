'use strict';

var myApp = angular.module('leapAngularApp', ['ngCookies','ngResource','ngSanitize', 'firebase', 'ngTouch']);

myApp.config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
