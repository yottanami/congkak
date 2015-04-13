'use strict';

/**
 * @ngdoc directive
 * @name congkakApp.directive:house
 * @description
 * # house
 */
angular.module('congkakApp')
    .directive('house', function ($rootScope) {
        return {
            templateUrl: 'views/house.html',
            restrict: 'E',
            replace: 'true',
            scope: {
                id_number: '@idNumber'
            },
            link: function (scope, element, attrs ) {
                scope.numbers = [
                    'zero',
                    'one',
                    'two',
                    'three',
                    'four',
                    'five',
                    'six',
                    'seven',
                    'eight',
                    'nine',
                    'ten',
                    'eleven',
                    'twelve',
                    'thirteen',
                    'fourteen'
                ];
                scope.random_position =30;
                scope.capacity = scope.capacity || 7;

                /*
                 scope.getRandomInt = function(min, max) {
                 min = min * 10;
                 max = max * 10;
                 return Math.floor(((Math.random() * (max - min + 1)) + min) / 10);
                 };
                 */
                scope.getTimes = function(n){
                    return new Array(n);
                };
                scope.trigleClick = function(){
                    if (($rootScope.playerTurn == 1) && (scope.id_number < 15) && (scope.id_number > 7) && (scope.capacity > 0)){
                        $rootScope.$broadcast('distribute', {idnumber: scope.id_number, hand: scope.capacity});
                        scope.capacity = 0;
                    }else if($rootScope.playerTurn == 2 && scope.idnumber < 8 && scope.idnumber > 0 && scope.capacity > 0){

                    }
                };

                scope.trigleDistribute = function(hand){
                    $rootScope.$broadcast('distribute', {idnumber: scope.id_number, hand: hand});
                };

                $rootScope.$on('distribute', function(event, args){
                    var hand = args.hand;
                    var idnumber = args.idnumber;
                    if (idnumber == 1){
                        idnumber = 15;
                    }

                    if ((idnumber == 8) && (scope.id_number == 8) && (hand > 0)){
                        $rootScope.$broadcast('houseDistribute', {user: 1});
                        hand = hand - 1;
                    }

                    if ((scope.id_number == idnumber - 1)){
                        if (hand > 1){
                            scope.capacity = scope.capacity + 1;
                            hand = hand - 1;
                            scope.trigleDistribute(hand);
                        }else if (hand == 1){
                            if( scope.capacity > 0){
                                scope.trigleDistribute(scope.capacity + hand);
                                scope.capacity = 0;
                            }else{
                                console.log("------Player2--time----");
                            }
                        }
                    }
                });
            }
        };
    });
