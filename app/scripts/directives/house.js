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
                        //console.log('out');
                        //console.log(scope.id_number);
                        //console.log(scope.capacity);
                        //console.log('/out');
                        $rootScope.$broadcast('distribute', {idnumber: scope.id_number, hand: scope.capacity});
                        scope.capacity = 0;
                    }else if($rootScope.playerTurn == 2 && args.idnumber < 8 && args.idnumber > 0 && args.capacity < 0){

                    }
                };

                scope.trigleDistribute = function(hand){

                    $rootScope.$broadcast('distribute', {idnumber: scope.id_number, hand: hand});
                };

                $rootScope.$on('distribute', function(event, args){
                    if (args.idnumber == 1){
                        args.idnumber = 15;
                    }

                    if ((args.idnumber == 8) && (scope.id_number == 8) && (args.hand > 0)){
                        $rootScope.$broadcast('houseDistribute', {user: 1});
                        args.hand = args.hand - 1;
                    }

                    if ((scope.id_number == args.idnumber - 1)){
                        if (args.hand > 1){
                            scope.capacity = scope.capacity + 1;
                            //console.log('current capacity' + scope.capacity);
                            //console.log('id_number = ' + scope.id_number);
                            //console.log('hand = ' + args.hand);

                            scope.trigleDistribute(args.hand-1);
                        }else if (args.hand == 1){
                            if( scope.capacity > 0){
                                $rootScope.$broadcast('distribute', {idnumber: scope.id_number, hand: scope.capacity + 1});
                                scope.capacity = 0;
                            }
                        }
                    }
                });
            }
        };
    });
