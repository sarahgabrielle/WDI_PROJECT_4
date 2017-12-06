/* globals expect, describe, it */
require('../api/helper');

const errorHandler = require('../../lib/errorHandler');

describe('ErrorHandler', function() {
  it('should be defined', (done) => {
    expect(errorHandler).to.be.a('function');
    done();
  });
});
