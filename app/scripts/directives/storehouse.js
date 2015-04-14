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
          scope.capacity = scope.capacity || 0;
          $rootScope.$on('houseDistribute', function(event, args){
              if (args.user == scope.id_number)
                  scope.capacity = scope.capacity + args.items;
          });
      }
    };
  });
