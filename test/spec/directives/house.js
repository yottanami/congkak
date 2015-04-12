'use strict';

describe('Directive: house', function () {

  // load the directive's module
  beforeEach(module('congkakApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<house></house>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the house directive');
  }));
});
