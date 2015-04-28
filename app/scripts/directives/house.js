'use strict';

/**
 * @ngdoc directive
 * @name congkakApp.directive:house
 * @description
 * # house
 */


angular.module('congkakApp')
    .directive('house', function ($rootScope, $timeout, $location) {
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

                var scopeID = parseInt(scope.id_number);


                // This function will change the state of a specific house
                scope.changeState = function(id, state){
                    $('.house.' + scope.numbers[id]).find('.ball').remove();
                    for(var i=1;i<=state;i++){
                        $('.house.' + scope.numbers[id]).append(
                            '<img src="/images/ball.png" class="ball ' +
                                scope.numbers[i] + '">'
                        );
                    }
                    $rootScope.boardStatus[id] = state;
                    scope.checkWinner();

                };


                // This function will return the state of a specific house
                scope.currentState = function(id){
                    return $('.house.' + scope.numbers[id] + '>.ball').length;
                };


                // Fill all the houses in first load
                $timeout(function(){
                    scope.changeState( scopeID, 7 );
                });


                // Check if all houses in uses board is empty return true
                scope.checkBoardEmpty = function (user){
                    var tmp = false;
                    if (user === 2){
                        for (var i=1; i<8; i++){
                            if ($rootScope.boardStatus[i] !== 0){
                                tmp = true;
                            }
                        }
                    }else if( user === 1){
                        for (var j=8; j<15; j++){
                            if ($rootScope.boardStatus[j] !== 0){
                                tmp = true;
                            }
                        }
                    }
                    return !tmp;
                };


                // Check the winner of game
                scope.checkWinner = function(){
                    if ((scope.checkBoardEmpty(1) === true)
                        && (scope.checkBoardEmpty(2) == true))
                    {
                        if ($rootScope.storeHousesState[1] > $rootScope.storeHousesState[2]){
                            $rootScope.winnerUser = 1;
                        }else{
                            $rootScope.winnerUser = 2;
                        }
                        $location.path('/result/' + $rootScope.winnerUser);
                        return true;
                    }
                    return false;
                };


                // Start game when cliecked on a house
                scope.trigleClick = function(){
                    if (($rootScope.playerTurn === 1)
                        && (scopeID < 15) && (scopeID > 7)
                        && (scope.currentState(scopeID) > 0)
                        && ($rootScope.gameLock == false))
                    {
                        $rootScope.gameLock = true;
                        var hand = scope.currentState(scopeID);
                        if ((scopeID === 8)){
                            $rootScope.$broadcast('houseDistribute', {user: 1, items: 1});
                            hand = hand - 1;
                            if (scope.checkBoardEmpty(1) && (hand === 0)){
                                $rootScope.playerTurn = 2;
                                $rootScope.gameLock = false;
                                changePlayerTurnAnimation();
                            }else{
                                if (hand === 0){
                                    $rootScope.gameLock = false;
                                }else{
                                    scope.trigleDistribute(hand);
                                    changePlayerTurnAnimation();
                                }
                            }

                        }else{
                            scope.trigleDistribute(hand);
                        }
                        scope.changeState( scopeID, 0 );
                    }else
                        if(($rootScope.playerTurn === 2)
                           && (scopeID < 8)
                           && (scopeID > 0)
                           && (scope.currentState(scopeID) > 0)
                           && ($rootScope.gameLock == false))
                    {
                        $rootScope.gameLock = true;
                        var hand = scope.currentState(scopeID);
                        if ((scopeID === 1)){
                            $rootScope.$broadcast('houseDistribute', {user: 2, items: 1});
                            hand = hand - 1;
                            if (scope.checkBoardEmpty(2)){
                                $rootScope.playerTurn = 1;
                                $rootScope.gameLock = false;
                                changePlayerTurnAnimation();
                            }else{
                                if (hand === 0){
                                    $rootScope.gameLock = false;
                                }else{
                                    scope.trigleDistribute(hand);
                                }
                            }
                        }else{
                            scope.trigleDistribute(hand);
                        }
                        scope.changeState(scopeID,0);
                    }
                };

                // Distribute the items to
                scope.trigleDistribute = function(hand){
                    $rootScope.$broadcast('distribute', {idnumber: scopeID, hand: hand});
                };

                // Eat the top house items
                $rootScope.$on('eatDistribute', function(event, args){
                    if (scopeID === args.eaten_house){
                        $rootScope.$broadcast('houseDistribute',
                                              {
                                                  user: $rootScope.playerTurn,
                                                  items: scope.currentState(scopeID) + 1
                                              });
                        scope.changeState( scopeID, 0 );
                        $rootScope.gameLock = false;
                        if (scope.checkBoardEmpty($rootScope.playerTurn) == true){

                            if ($rootScope.playerTurn === 2){
                                $rootScope.playerTurn = 1;
                            }else{
                                $rootScope.playerTurn = 2;
                            }
                            changePlayerTurnAnimation();
                        }else{

                            changePlayerTurnAnimation();
                        }

                    }
                });

                // Distribute handler
                $rootScope.$on('distribute', function(event, args){
                    var hand = args.hand;
                    var idnumber = args.idnumber;
                    if (idnumber === 1){
                        idnumber = 15;
                    }
                    $timeout(function(){
                        scope.counter = scope.counter++;
                        if ((scopeID === idnumber - 1)){
                            if (hand > 1){
                                hand = hand - 1;
                                scope.changeState( scopeID, scope.currentState(scopeID) + 1 );
                                if ((idnumber === 9)
                                    && (hand > 0)
                                    && (scopeID === 8)
                                    && ($rootScope.playerTurn === 1))
                                {
                                    $rootScope.$broadcast('houseDistribute', {user: 1, items: 1});
                                    hand = hand - 1;
                                    if (scope.checkBoardEmpty(1) && (hand === 0)){
                                        $rootScope.playerTurn = 2;
                                        $rootScope.gameLock = false;
                                        changePlayerTurnAnimation();
                                    }else{
                                        if (hand === 0){
                                            $rootScope.gameLock = false;
                                            changePlayerTurnAnimation();
                                        }else{
                                            scope.trigleDistribute(hand);
                                        }
                                    }

                                }else if((idnumber === 2)
                                         && (hand > 0)
                                         &&(scopeID === 1)
                                         && ($rootScope.playerTurn === 2))
                                {
                                    $rootScope.$broadcast('houseDistribute', {user: 2, items: 1});
                                    hand = hand - 1;
                                    if (scope.checkBoardEmpty(2)){
                                        $rootScope.playerTurn = 1;
                                        $rootScope.gameLock = false;
                                        changePlayerTurnAnimation();
                                    }else{
                                        if (hand === 0){
                                            $rootScope.gameLock = false;
                                            changePlayerTurnAnimation();

                                        }else{
                                            scope.trigleDistribute(hand);
                                        }
                                    }

                                }else{
                                    scope.trigleDistribute(hand);
                                }

                            }else if (hand === 1){
                                if(( scope.currentState(scopeID) > 0)){
                                    if ((scopeID === 8) || (scopeID === 1)){
                                        $rootScope.$broadcast('houseDistribute', {user: $rootScope.playerTurn, items: 1});
                                        scope.trigleDistribute(scope.currentState(scopeID));
                                    }else{
                                        scope.trigleDistribute(scope.currentState(scopeID) + hand);
                                    }
                                    scope.changeState(scopeID, 0);
                                }else{
                                    if (($rootScope.playerTurn === 1)
                                        && (scopeID < 15)
                                        && (scopeID > 7))
                                    {
                                        // if it is on your board houses you can eat the items at the opposite side
                                        var eaten_house = 15 - scopeID;
                                        hand = 0;
                                        $rootScope.$broadcast('eatDistribute', {user: 1, eaten_house: eaten_house});
                                        //changePlayerTurnAnimation();
                                    } else if (($rootScope.playerTurn === 2)
                                               && (scopeID < 8)
                                               && (scopeID > 0))
                                    {
                                        var eaten_house = 15 - scopeID;
                                        hand = 0;
                                        $rootScope.$broadcast('eatDistribute', {user: 2, eaten_house: eaten_house});
                                        //changePlayerTurnAnimation();
                                    }else{
                                        // if it is on opponent`s board houses that is empty your turn ends
                                        scope.changeState(scopeID, 1);
                                        if ($rootScope.playerTurn === 1){
                                            $rootScope.playerTurn = 2;
                                        }else if ($rootScope.playerTurn === 2){
                                            $rootScope.playerTurn = 1;
                                        }
                                        $rootScope.gameLock = false;

                                    }
                                    changePlayerTurnAnimation();
                                }
                            }
                        }
                    }, 800);
                });
            }
        };
    });
