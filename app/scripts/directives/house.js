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
                scope.random_position = 30;
                var scopeID = parseInt(scope.id_number);
                var scopeState = parseInt(scope.state);
                var round = 1;
                scope.counter = 0;
                scope.state = scope.state || 7;
                $rootScope.blockHouses = [];

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


                scope.changeState = function(id, state){
                    $('.house.' + scope.numbers[id] + '>.ball').not('.ball.one').remove();
                    for(i=1;i<=state;i++){
                        $('.house.' + scope.numbers[id] + '>.ball').append('');
                    }
                };

                scope.startSecondRound = function(winner){

                    var firstPlayerMaxHouses = parseInt($rootScope.storeHousesState[1]/7);
                    var secondPlayerMaxHouses = parseInt($rootScope.storeHousesState[2]/7);
                    console.log('firstmaxHouses of '+ winner + ' ' + firstPlayerMaxHouses);
                    console.log('secondmaxHouses of '+ winner + ' ' + secondPlayerMaxHouses);

                    //if (winner == 1){
                    for(var i=1;i<8;i++){
                        if ( i > secondPlayerMaxHouses){
                            $rootScope.blockHouses.push(i);
                            console.log("pushed" + i);
                        }
                    }
                    //}else{
                    for(var i=8;i<15;i++){
                        if ( i-7 > firstPlayerMaxHouses){
                            console.log("pushed" + 1);
                            $rootScope.blockHouses.push(i);
                        }
                    }
                    //}
                    console.log(winner);
                    console.dir($rootScope.blockHouses);
                    $rootScope.$broadcast('initializeSecondRound', {});
                };


                scope.checkBoardEmpty = function (user){
                    console.log($rootScope.boardStatus);
                    console.log("User that checked " + user);
                    var tmp = false;
                    if (user == 2){
                        for (var i=1; i<8; i++){
                            if ($rootScope.boardStatus[i] !== 0){
                                tmp = true;
                                console.log("item is not zero" + $rootScope.boardStatus[i]);
                            }
                        }
                    }else if( user == 1){
                        for (var j=8; j<15; j++){
                            if ($rootScope.boardStatus[j] !== 0){
                                tmp = true;
                                console.log("item is not zero" + $rootScope.boardStatus[j]);
                            }
                        }
                    }
                    return !tmp;
                };

                scope.checkWinner = function(){
                    console.log("winner checked" + scope.checkBoardEmpty(1) + scope.checkBoardEmpty(2));

                    if ((scope.checkBoardEmpty(1)) && (scope.checkBoardEmpty(2))){
                        if ($rootScope.storeHousesState[1] > $rootScope.storeHousesState[2]){
                            var winnerUser = 1;
                        }else{
                            var winnerUser = 2;
                        }

                        if (round == 1){
                            if (winnerUser == 1){
                                alert("Player 1 won in first round!");
                            }else{
                                alert("Player 2 won in first round!");
                            }
                        }else{
                            $location.path('/result/' + winnerUser);
                        }
                        scope.startSecondRound(2);
                        return true;
                    }
                };



                scope.trigleClick = function(){
                    console.log(scope.getTimes(scope.state));
                    console.log(scope.getTimes(10));
                    console.log("Player Turn : " + $rootScope.playerTurn);
                    console.log("lock : " + $rootScope.gameLock);
                    if (($rootScope.playerTurn == 1) && (scopeID < 15) && (scopeID > 7) && (scope.state > 0) && ($rootScope.gameLock == false)){

                        $rootScope.gameLock = true;
                        var hand = scope.state;
                        if ((scopeID == 8)){
                            $rootScope.$broadcast('houseDistribute', {user: 1, items: 1});
                            hand = hand - 1;

                            if (scope.checkBoardEmpty(1)){
                                $rootScope.playerTurn = 2;
                                $rootScope.gameLock = false;
                                alert("Player 2 time");
                            }else{
                                if (hand == 0){
                                    $rootScope.gameLock = false;
                                    if ( scope.checkWinner() != true )
                                        alert("You can select another one 8");
                                }else{
                                    scope.trigleDistribute(hand);
                                }
                            }
                            //$rootScope.$broadcast('distribute', {idnumber: scope.id_number, hand: hand});
                        }else{
                            scope.trigleDistribute(hand);
                        }
                        //$rootScope.$broadcast('distribute', {idnumber: scope.id_number, hand: scope.state});
                        scope.state = 0;
                        scope.$apply();
                        //$('.house.' + scope.numbers[scope.id_number] + '>.ball').not('.ball.one').remove();
                        //console.log('.house.'+scope.numbers[scope.id_number]);
                        $rootScope.boardStatus[scopeID] = 0;
                        scope.checkWinner();

                    }else
                        if(($rootScope.playerTurn == 2) && (scopeID < 8) && (scopeID > 0) && (scope.state > 0) && ($rootScope.gameLock == false)){
                            $rootScope.gameLock = true;
                            var hand = scope.state;
                            if ((scopeID == 1)){
                                $rootScope.$broadcast('houseDistribute', {user: 2, items: 1});
                                hand = hand - 1;

                                if (scope.checkBoardEmpty(2)){
                                    $rootScope.playerTurn = 1;
                                    $rootScope.gameLock = false;
                                    alert("Player 1 time");
                                }else{
                                    if (hand == 0){
                                        $rootScope.gameLock = false;
                                        if (scope.checkWinner() != true )
                                            alert("You can select another one 10");
                                    }else{
                                        scope.trigleDistribute(hand);
                                    }
                                }



                                //$rootScope.$broadcast('distribute', {idnumber: scope.id_number, hand: hand});
                            }else{
                                scope.trigleDistribute(hand);
                            }
                            //$rootScope.$broadcast('distribute', {idnumber: scope.id_number, hand: scope.state});
                            scope.state = 0;
                            $rootScope.boardStatus[scopeID] = 0;
                            scope.checkWinner();
                        }
                };

                scope.trigleDistribute = function(hand){
                    $rootScope.$broadcast('distribute', {idnumber: scopeID, hand: hand});
                    scope.checkWinner();
                };


                $rootScope.$on('initializeSecondRound', function(event,args){
                    $rootScope.playerTurn == 1;
                    var firstPlayerMaxHouses = parseInt($rootScope.storeHousesState[1]/7);
                    var secondPlayerMaxHouses = parseInt($rootScope.storeHousesState[2]/7);
                    console.log("1111111111111111111initializing");
                    if ($.inArray(scopeID, $rootScope.blockHouses) !== -1){
                        scope.state = 0;
                        $rootScope.boardStatus[scopeID] = 0;
                        console.log("block"+ scopeID);
                    }else{
                        console.log("scope.id " + scopeID);
                        console.log("scope.block " + $rootScope.blockHouses);
                        scope.state = 7;
                        $rootScope.boardStatus[scopeID] = 7;
                        if (scopeID > 7){
                            $rootScope.storeHousesState[1] = $rootScope.storeHousesState[1] - 7;
                        }else{
                            $rootScope.storeHousesState[2] = $rootScope.storeHousesState[2] - 7;
                        }

                        $rootScope.$broadcast('updateStoreHouseStates', {});
                    }

                });
                $rootScope.$on('eatDistribute', function(event, args){
                    if (scopeID == args.eaten_house){
                        //console.log("IN EAAAAAAAAAAT");
                        //console.log("Eaten House :" + args.eaten_house);
                        //console.log("STATE" + scope.state);
                        //console.log("IN EAAAAAAAAAAT");
                        $rootScope.$broadcast('houseDistribute', {user: $rootScope.playerTurn, items: scope.state + 1});
                        scope.state = 0;
                        $rootScope.boardStatus[scopeID] = 0;
                        $rootScope.gameLock = false;


                        if (scope.checkBoardEmpty($rootScope.playerTurn) == true){
                            if ( scope.checkWinner() != true ){
                                if ($rootScope.playerTurn == 2){
                                    console.log("BBBB--------------------------------------------------------" + $rootScope.playerTurn);
                                    $rootScope.playerTurn = 1;
                                }else{
                                    console.log("XXXX--------------------------------------------------------" + $rootScope.playerTurn);
                                    $rootScope.playerTurn = 2;
                                }
                                alert("Player " + $rootScope.playerTurn +" time");
                            }
                        }else{
                            //if (hand == 0){

                            console.log("You can select another one 1");
                            // }else{
                            //scope.trigleDistribute(0);
                            //}
                        }

                    }
                });

                $rootScope.$on('distribute', function(event, args){
                    var hand = args.hand;
                    var idnumber = args.idnumber;

                    if (idnumber == 1){
                        idnumber = 15;
                        //console.log("-------end line---------" + hand);
                    }
                    $timeout(function(){
                        scope.counter = scope.counter++;
                        if ((scopeID == idnumber - 1)){
                            if (hand > 1){
                                hand = hand - 1;
                                //hconsole.log("** out of timeout " + hand);
                                if ($.inArray(scopeID, $rootScope.blockHouses) === -1){
                                    scope.state = scope.state + 1;
                                    $rootScope.boardStatus[scopeID] = scope.state;
                                }

                                scope.checkWinner();

                                //console.log("before trigle" + hand);
                                if ((idnumber == 9) && (hand > 0) && (scopeID = 8) && ($rootScope.playerTurn == 1) && ($.inArray(scopeID, $rootScope.blockHouses) === -1)){
                                    $rootScope.$broadcast('houseDistribute', {user: 1, items: 1});
                                    hand = hand - 1;
                                    console.log("hand1: " + hand);

                                    if (scope.checkBoardEmpty(1)){
                                        $rootScope.playerTurn = 2;
                                        $rootScope.gameLock = false;
                                        alert("Player 2 time");
                                    }else{
                                        if (hand == 0){
                                            $rootScope.gameLock = false;
                                            alert("You can select another one 2");
                                        }else{
                                            scope.trigleDistribute(hand);
                                        }
                                    }


                                    //console.log("daaakheelee householde"+hand);
                                }else if((idnumber == 2) && (hand > 0) && (scopeID == 1) && ($rootScope.playerTurn == 2) &&  ($.inArray(scopeID, $rootScope.blockHouses) === -1)){
                                    //console.log("hhhhhhhhooooouuuuuuusssssseeeeeeee1");
                                    $rootScope.$broadcast('houseDistribute', {user: 2, items: 1});
                                    hand = hand - 1;
                                    console.log("hand2: " + hand);

                                    if (scope.checkBoardEmpty(2)){
                                        $rootScope.playerTurn = 1;
                                        $rootScope.gameLock = false;
                                        alert("Player 1 time");
                                    }else{
                                        if (hand == 0){
                                            $rootScope.gameLock = false;
                                            alert("You can select another one 3");

                                        }else{
                                            scope.trigleDistribute(hand);
                                        }
                                    }


                                }else{
                                    scope.trigleDistribute(hand);
                                }

                                //}, 10);
                            }else if ((hand == 1)) {
                                if( scope.state > 0){
                                    //console.log('1 item in hand');
                                    scope.trigleDistribute(scope.state + hand);
                                    scope.state = 0;
                                    $rootScope.boardStatus[scopeID] = 0;
                                    scope.checkWinner();
                                }else{
                                    if (($rootScope.playerTurn == 1) && (scopeID < 15) && (scopeID > 7)){
                                        // if it is on your board houses you can eat the items at the opposite side
                                        var eaten_house = 15 - scopeID;
                                        hand = 0;
                                        $rootScope.$broadcast('eatDistribute', {user: 1, eaten_house: eaten_house});
                                    } else if (($rootScope.playerTurn == 2) && (scopeID < 8) && (scopeID > 0)){
                                        var eaten_house = 15 - scopeID;
                                        hand = 0;
                                        $rootScope.$broadcast('eatDistribute', {user: 2, eaten_house: eaten_house});

                                    }else{
                                        // if it is on opponent`s board houses that is empty your turn ends
                                        // TODO: change to shorthand condition
                                        scope.state = 1;
                                        $rootScope.boardStatus[scopeID] = 1;
                                        scope.checkWinner();
                                        if ($rootScope.playerTurn == 1){
                                            $rootScope.playerTurn = 2;
                                        }else if ($rootScope.playerTurn == 2){
                                            $rootScope.playerTurn = 1;
                                        }
                                        $rootScope.gameLock = false;
                                        alert("Player " + $rootScope.playerTurn + " play time !");
                                    }
                                }
                            }

                        }

                    }, 100);
                });
            }
        };
    });
