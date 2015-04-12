'use strict';

/**
 * @ngdoc function
 * @name congkakApp.controller:PlayCtrl
 * @description
 * # PlayCtrl
 * Controller of the congkakApp
 */
angular.module('congkakApp')
  .controller('PlayCtrl', function ($scope) {
      var numbers = [
          'one',
          'two',
          'three',
          'four',
          'five',
          'six',
          'seven'
        ];

      $scope.initializeGame = function(){
        var id = 0;
        for(var i = 0; i < numbers.length; i++){
            for(var j=0; j < 8; j++){
                $('.houses.player1 > .house.' + numbers[i]).prepend('<img class="ball" id="' + id + '" src="/images/ball.png">');
                $('img#' + id).css({top: getRandomInt(-3,38), left: getRandomInt(-3,38)});
                id = id + 1;
            }
            for(var j=0; j < 8; j++){
                $('.houses.player2 > .house.' + numbers[i]).prepend('<img class="ball" id="' + id + '" src="/images/ball.png">');
                $('img#' + id).css({top: getRandomInt(-3,38), left: getRandomInt(-3,38)});
                id = id + 1;
            }

        }
      };

      $scope.distribute = function(div){
          if ($scope.player1Turn){
            console.log($('.houses.player2 > .house.' + numbers[div+1] + ' .ball').toArray());
            var balls = $('.houses.player2 > .house.' + numbers[div+1] + ' .ball').toArray();
          }
      };

      $scope.initializeGame();
      $scope.player1Turn = true;
  });
