'use strict';

/**
 * @ngdoc directive
 * @name congkakApp.directive:house
 * @description
 * # house
 */
angular.module('congkakApp')
    .directive('house', function ($rootScope, $timeout) {
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
                scope.state = scope.state || 7;

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

                scope.checkWinner = function(){

                    var tmp = false;
                    for (var i=1; i<8; i++){
                        console.log("$rootScope.boardStatus[i] = " + $rootScope.boardStatus[i]);
                        console.log("TypeOf $rootScope.boardStatus[i] = " + typeof($rootScope.boardStatus[i]));
                        if ($rootScope.boardStatus[i] !== 0){
                            tmp = true;
                            console.log("WWWWWWWWW boardstatus is not zero" + $rootScope.boardStatus[i]);
                        }
                    }
                    if (tmp === false){
                        $rootScope.playerTurn = 0;
                        alert ('Player 1 won!!');
                    }else{
                        console.log("1-7 WINNNNNI UPLOADDDDD");
                        console.dir($rootScope.boardStatus);
                    }

                    tmp = false;
                    i = 8;
                    for (i=8; i<15; i++){
                        if ($rootScope.boardStatus[i] !== 0){
                            tmp = true;
                            console.log("WWWWWWWWW boardstatus is not zero" + $rootScope.boardStatus[i]);

                        }
                    }
                    if (tmp === false){
                        $rootScope.playerTurn = 0;
                        alert ('Player 1 won!!');
                    }else{
                        console.log("8-14WINNNNNI UPLOADDDDD");
                        console.dir($rootScope.boardStatus);
                    }
                };

                scope.trigleClick = function(){
                    if (($rootScope.playerTurn == 1) && (scope.id_number < 15) && (scope.id_number > 7) && (scope.state > 0)){
                        var hand = scope.state;
                        if ((scope.id_number == 8)){
                            $rootScope.$broadcast('houseDistribute', {user: 1, items: 1});
                            hand = hand - 1;
                            scope.trigleDistribute(hand);

                            //$rootScope.$broadcast('distribute', {idnumber: scope.id_number, hand: hand});
                        }else{
                            scope.trigleDistribute(hand);
                        }

                        //$rootScope.$broadcast('distribute', {idnumber: scope.id_number, hand: scope.state});
                        scope.state = 0;
                        $rootScope.boardStatus[parseInt(scope.id_number)] = 0;
                    }else if(($rootScope.playerTurn == 2) && (scope.id_number < 8) && (scope.id_number > 0) && (scope.state > 0)){
                        var hand = scope.state;
                        if ((scope.id_number == 1)){
                            $rootScope.$broadcast('houseDistribute', {user: 2, items: 1});
                            hand = hand - 1;
                            scope.trigleDistribute(hand);
                            //$rootScope.$broadcast('distribute', {idnumber: scope.id_number, hand: hand});
                        }else{
                            scope.trigleDistribute(hand);
                        }
                        //$rootScope.$broadcast('distribute', {idnumber: scope.id_number, hand: scope.state});
                        scope.state = 0;
                        $rootScope.boardStatus[parseInt(scope.id_number)] = 0;
                    }
                };

                scope.trigleDistribute = function(hand){
                    $rootScope.$broadcast('distribute', {idnumber: scope.id_number, hand: hand});
                };

                $rootScope.$on('eatDistribute', function(event, args){
                    if (scope.id_number == args.eaten_house){
                        console.log("IN EAAAAAAAAAAT");
                        console.log("Eaten House :" + args.eaten_house);
                        console.log("STATE" + scope.state);
                        console.log("IN EAAAAAAAAAAT");
                        $rootScope.$broadcast('houseDistribute', {user: $rootScope.playerTurn, items: scope.state + 1});
                        scope.state = 0;
                        $rootScope.boardStatus[parseInt(scope.id_number)] = 0;
                        alert("You can select another one");
                    }
                });

                $rootScope.$on('distribute', function(event, args){
                    var hand = args.hand;
                    var idnumber = args.idnumber;
                    if (idnumber == 1){
                        idnumber = 15;
                        console.log("-------end line---------" + hand);
                    }


                    if ((scope.id_number == idnumber - 1)){
                        if((idnumber == 2) && (hand > 0) && (scope.id_number == 1))
                            console.log("HHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHH");

                        if (hand > 1){
                            hand = hand - 1;
                            console.log("** out of timeout " + hand);
                            scope.state = scope.state + 1;
                            $rootScope.boardStatus[parseInt(scope.id_number) ] = scope.state;
                            $timeout(function(){
                                console.log("before trigle" + hand);
                                if ((idnumber == 9) && (hand > 0) && (scope.id_number = 8) && ($rootScope.playerTurn == 1)){
                                    $rootScope.$broadcast('houseDistribute', {user: 1, items: 1});
                                    hand = hand - 1;
                                    if (hand == 0){
                                        alert("You can select another one");
                                    }else{
                                        scope.trigleDistribute(hand);
                                    }
                                    console.log("daaakheelee householde"+hand);
                                }else if((idnumber == 2) && (hand > 0) && (scope.id_number == 1) && ($rootScope.playerTurn == 2)){
                                    console.log("hhhhhhhhooooouuuuuuusssssseeeeeeee1");
                                    $rootScope.$broadcast('houseDistribute', {user: 2, items: 1});
                                    hand = hand - 1;
                                    if (hand == 0){
                                        alert("You can select another one");
                                    }else{
                                        scope.trigleDistribute(hand);
                                    }
                                }else{
                                    scope.trigleDistribute(hand);
                                }
                                scope.checkWinner();
                                console.log("after trigle" + hand);
                            }, 40);
                        }else if ((hand == 1)) {
                            if( scope.state > 0){
                                console.log('1 item in hand');
                                scope.trigleDistribute(scope.state + hand);
                                scope.state = 0;
                                $rootScope.boardStatus[parseInt(scope.id_number)] = 0;
                            }else{
                                if (($rootScope.playerTurn == 1) && (scope.id_number < 15) && (scope.id_number > 7)){
                                    // if it is on your board houses you can eat the items at the opposite side
                                    var eaten_house = 15 - scope.id_number;
                                    $rootScope.$broadcast('eatDistribute', {user: 1, eaten_house: eaten_house});
                                    hand = 0;
                                } else if (($rootScope.playerTurn == 2) && (scope.id_number < 8) && (scope.id_number > 0)){
                                    var eaten_house = 15 - scope.id_number;
                                    $rootScope.$broadcast('eatDistribute', {user: 2, eaten_house: eaten_house});
                                    hand = 0;
                                }else{
                                    // if it is on opponent`s board houses that is empty your turn ends
                                    // TODO: change to shorthand condition
                                    scope.state = 1;
                                    $rootScope.boardStatus[parseInt(scope.id_number)] = 1;
                                    if ($rootScope.playerTurn == 1){
                                        $rootScope.playerTurn = 2;
                                    }else if ($rootScope.playerTurn == 2){
                                        $rootScope.playerTurn = 1;
                                    }
                                    alert("Player " + $rootScope.playerTurn + " play time !");
                                }
                            }
                        }

                    }
                });
            }
        };
    });
