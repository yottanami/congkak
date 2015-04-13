'use strict';

/**
 * @ngdoc function
 * @name congkakApp.controller:PlayCtrl
 * @description
 * # PlayCtrl
 * Controller of the congkakApp
 */
angular.module('congkakApp')
  .controller('PlayCtrl', function ($scope, $rootScope) {

      $scope.initializeGame = function(){
          $rootScope.playerTurn = 1;
      };
      $scope.initializeGame();

  });
