'use strict';

/**
 * @ngdoc directive
 * @name congkakApp.directive:storeHouse
 * @description
 * # storeHouse
 */
angular.module('congkakApp')
  .directive('storeHouse', function () {
    return {
      template: 'views/storehouse.html',
      restrict: 'E',
      replace: 'true',
      scope: {
          id_number: '@idNumber'
      }
      link: function (scope, element, attrs) {
          scope.capacity = 0;
      }
    };
  });
