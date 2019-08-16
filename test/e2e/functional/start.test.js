const { expect } = require('test/chai-sinon');
const SinglePage = require('test/e2e/single-page');
const { index } = require('app/paths');

describe('Hello world page', () => {
  /* eslint-disable init-declarations */
  let startPage;
  /* eslint-enable init-decalarations */

  before(async() => {
    startPage = new SinglePage(index);
    await startPage.open();
  });

  after(async() => {
    await startPage.close();
  });

  it('is on the /start path', () => {
    startPage.verifyPath();
  });

  it('has Hello world heading', async() => {
    await startPage.captureScreenshot('start');
    expect(await startPage.getHeading()).to.equal('Start your appeal');
  });
});
