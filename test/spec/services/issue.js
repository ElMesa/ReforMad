'use strict';

describe('Service: Issue', function () {

  // load the service's module
  beforeEach(module('reforMadApp'));

  // instantiate service
  var Issue;
  beforeEach(inject(function (_Issue_) {
    Issue = _Issue_;
  }));

  it('should do something', function () {
    expect(!!Issue).toBe(true);
  });

});
