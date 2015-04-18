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

      $scope.move = function(from, to){
          $("#animation_ball").css({top: $("#"+from).css("top") , left: $("#"+from).css("left")});
          $("#animation_ball").show();
          var toPositionTop = $("#" + to).css("top") - $("#" + from).css("top");
          var toPositionLeft = $("#" + to).css("left") - $("#" + from).css("left");
          $("#animation_ball").animate({left: "+="+ toPositionLeft , top: "+=" + toPositionT }, 4000);
          //$("#animation_ball").animate({left: "+=0", top: "+=80"}, 4000);
          //var left = "+40"
          //$("#animation_ball").animate({left: left, top: top}, 4000);
      };

      $scope.initializeGame = function(){
          $rootScope.playerTurn = 1;
          $rootScope.boardStatus = [-1,7,7,7,7,7,7,7,7,7,7,7,7,7,7];
          $rootScope.gameLock = false;
          $rootScope.storeHousesState = [0,0];
          $('#animation_ball').hide();
      };
      $scope.initializeGame();


  });
