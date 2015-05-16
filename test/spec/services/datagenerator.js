'use strict';

describe('Service: DataGenerator', function () {

  // load the service's module
  beforeEach(module('reforMadApp'));

  // instantiate service
  var DataGenerator;
  beforeEach(inject(function (_DataGenerator_) {
    DataGenerator = _DataGenerator_;
  }));

  it('should do something', function () {
    expect(!!DataGenerator).toBe(true);
  });

});
