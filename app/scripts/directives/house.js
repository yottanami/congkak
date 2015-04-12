'use strict';

/**
 * @ngdoc directive
 * @name congkakApp.directive:house
 * @description
 * # house
 */
angular.module('congkakApp')
  .directive('house', function () {
    return {
        templateUrl: 'views/house.html',
        restrict: 'E',
        replace: 'true',
        scope: {
            id_number: '@idNumber'
        },
        link: function (scope, element, attrs) {
            scope.numbers = [
                'zero',
                'one',
                'two',
                'three',
                'four',
                'five',
                'six',
                'seven'
            ];
            scope.random_position = getRandomInt(-3,38);
            scope.capacity = 7;
            scope.getRandomInt = function(min, max) {
                min = min * 10;
                max = max * 10;
                return Math.floor(((Math.random() * (max - min + 1)) + min) / 10);
            };
            scope.getTimes = function(n){
                return new Array(n);
            };
        }
    };
  });
