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
      template: '<div></div>',
      restrict: 'E',
      link: function postLink(scope, element, attrs) {
        element.text('this is the storeHouse directive');
      }
    };
  });
