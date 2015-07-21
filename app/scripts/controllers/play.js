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
          $route.reload();
          $rootScope.playerTurn = 1;
          $rootScope.boardStatus = [-1,7,7,7,7,7,7,7,7,7,7,7,7,7,7];
          $rootScope.winnerUser = 0;
          $rootScope.gameLock = false;
          $rootScope.storeHousesState = [0,0];
          initializeGameAnimation();
          $('#winnerReport').hide();
      };
      $scope.initializeGame();


  });
