const stages = require('../../data/appealStages');

module.exports = (req, res) => {
  const reasonsForAppealCompleted = req.session.appealData.appealDetails.reasonsForAppeal.completed;
  stages[1].ticked = true;
  stages[2].active = true;
  stages[2].ticked = true;
  stages[3].active = true;
  stages[3].ticked = true;
  stages[4].active = true;

  res.render('hearing-requirements/overview.html', {
    hideBackLink: true,
    stages,
    reasonsForAppealCompleted,
    appealData: req.session.appealData
  });
};
