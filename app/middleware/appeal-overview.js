const stages = require('../data/appealStages');

function getAppealOverview(req, res) {
  const userStages = JSON.parse(JSON.stringify(stages));


  return res.render('appeal-overview.html', {
    hideBackLink: true,
    appealData: req.session.appealData,
    stages: userStages
  });
}

module.exports = getAppealOverview;
