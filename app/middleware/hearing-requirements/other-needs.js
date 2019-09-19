const paths = require('../../paths');

module.exports = (req, res) => {
  res.render('hearing-requirements/other-needs.html', {
    hideBackLink: false,
    previousPage: paths.hearingAppellantTaskList
  });
};
