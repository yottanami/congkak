'use strict';

/**
 * @ngdoc overview
 * @name congkakApp
 * @description
 * # congkakApp
 *
 * Main module of the application.
 */
angular
  .module('congkakApp', [
    'ngAnimate',
    'ngRoute'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl'
      })
      .when('/play',{
        templateUrl: 'views/play.html',
        controller: 'PlayCtrl'
      })
      .when('/result/:winner',{
        templateUrl: 'views/result.html',
        controller: 'ResultCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
