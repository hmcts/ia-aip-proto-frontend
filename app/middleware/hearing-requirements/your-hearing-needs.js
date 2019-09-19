const paths = require('../../paths');

module.exports = (req, res) => {
  res.render('hearing-requirements/your-hearing-needs.html', {
    hideBackLink: false,
    previousPage: paths.hearingAppellantTaskList
  });
};
