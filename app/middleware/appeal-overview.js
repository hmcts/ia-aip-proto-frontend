const stages = require('../data/appealStages');

function getAppealOverview(req, res) {
  stages[1].ticked = false;
  stages[1].active = false;

  return res.render('appeal-overview.html', {
    hideBackLink: true,
    appealData: req.session.appealData,
    stages
  });
}

module.exports = getAppealOverview;
