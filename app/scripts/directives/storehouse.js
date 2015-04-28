'use strict';

/**
 * @ngdoc directive
 * @name congkakApp.directive:storehouse
 * @description
 * # storeHouse
 */

angular.module('congkakApp')
    .directive('storehouse', function ($rootScope, $timeout) {
        return {
            templateUrl: 'views/storehouse.html',
            restrict: 'E',
            replace: 'true',
            scope: {
                id_number: '@idNumber'
            },
            link: function (scope, element, attrs) {
                scope.state = scope.state || 0;
                scope.getTimes = function(n){
                    return new Array(n);
                };

                // Store house update distribute
                $rootScope.$on('houseDistribute', function(event, args){
                    if (args.user == scope.id_number){
                        scope.state = scope.state + args.items;
                        $rootScope.storeHousesState[args.user] = scope.state;
                    }
                });

                // Update the store house state
                $rootScope.$on('updateStoreHouseStates', function(event, args){
                    $timeout(function(){
                        scope.state = $rootScope.storeHousesState[scope.id_number];
                        console.log("update store house");
                    }, 800);
                });
            }
        };
    });
