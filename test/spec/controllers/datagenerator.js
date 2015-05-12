'use strict';

describe('Controller: DatageneratorCtrl', function () {

  // load the controller's module
  beforeEach(module('reforMadApp'));

  var DatageneratorCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    DatageneratorCtrl = $controller('DatageneratorCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
