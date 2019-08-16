const { expect } = require('test/chai-sinon');
const paths = require('app/paths');

describe('paths', () => {
  it('should return paths', () => {
    expect(paths).to.have.property('health').that.equals('/health');
    expect(paths).to.have.property('robots').that.equals('/robots.txt');
  });
});
