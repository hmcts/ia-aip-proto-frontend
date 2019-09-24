const paths = require('../../paths');

function get(req, res) {
  res.render('case-building/anything-else-to-add.html', {
    hideBackLink: false,
    previousPage: '/case-building/questions-from-tribunal'
  });
}

function post(req, res) {
  if (req.body.anythingElseToAdd === 'yes') {
    res.redirect(paths.anythingElseToAddQuestion);
  }
  if (!req.session.appealData.anythingElseToAdd) {
    req.session.appealData.anythingElseToAdd = {};
  }
  req.session.appealData.anythingElseToAdd.completed = true;
  res.redirect(paths.questionCheckAnswers);
}

module.exports = {
  get,
  post
};
