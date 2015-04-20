'use strict';

/**
 * @ngdoc directive
 * @name congkakApp.directive:storehouse
 * @description
 * # storeHouse
 */
angular.module('congkakApp')
    .directive('storehouse', function ($rootScope) {
        return {
            templateUrl: 'views/storehouse.html',
            restrict: 'E',
            replace: 'true',
            scope: {
                id_number: '@idNumber'
            },
            link: function (scope, element, attrs) {
                scope.state = scope.state || 0;
                scope.getRandomInt = function(min, max) {
                    min = min * 10;
                    max = max * 10;
                    return Math.floor(((Math.random() * (max - min + 1)) + min) / 10);
                };

                scope.getTimes = function(n){
                    return new Array(n);
                };

                $rootScope.$on('houseDistribute', function(event, args){
                    if (args.user == scope.id_number){
                        scope.state = scope.state + args.items;
                        $rootScope.storeHousesState[args.user] = scope.state;
                    }

                });

                $rootScope.$on('updateStoreHouseStates', function(event, args){
                    scope.state = $rootScope.storeHousesState[scope.id_number];
                    console.log("update store house");
                });
            }
        };
    });
