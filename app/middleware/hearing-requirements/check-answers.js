const paths = require('../../paths');

module.exports = (req, res) => {
  const appealData = req.session.appealData;
  res.render('hearing-requirements/check-answers.html', {
    appealData,
    hideBackLink: false,
    previousPage: paths.hearingAppellantTaskList
  });
};
