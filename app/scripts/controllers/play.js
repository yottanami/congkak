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

      $scope.move = function(item){
          $("#animation_ball").css({top: 150, left: 420});
          $("#animation_ball").show();
          //$("#animation_ball").animate({left: "+=90", top: "+=0"}, 4000);
          //$("#animation_ball").animate({left: "+=0", top: "+=80"}, 4000);
          //var left = "+40"
          //$("#animation_ball").animate({left: left, top: top}, 4000);
      };

      $scope.initializeGame = function(){
          $rootScope.playerTurn = 1;
          $rootScope.boardStatus = [-1,7,7,7,7,7,7,7,7,7,7,7,7,7,7];
          $rootScope.gameLock = false;
          $('#animation_ball').hide();
          $scope.move();
      };
      $scope.initializeGame();


  });
