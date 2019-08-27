const ccd = require('../thirdparty/ccd');
const s2s = require('../thirdparty/s2s');

module.exports = (req, res) => {
  const appealData = req.session.appealData;

  const errorStatus = 500;
  s2s.generateHeaders().then(headers => {
    ccd.createCase(headers, appealData,
      // eslint-disable-next-line max-len
      () => res.render('appeal-submitted.html', { hideBackLink: true }), error => res.status(errorStatus).send(`Something went wrong!!\n${error}`)
    );
  }).catch(createHeaderError => res.status(errorStatus).send(`Something went wrong!!\n${createHeaderError}`));
};
