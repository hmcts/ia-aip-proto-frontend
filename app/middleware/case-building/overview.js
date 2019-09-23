const stages = require('../../data/appealStages');

module.exports = (req, res) => {
  const reasonsForAppealCompleted = req.session.appealData.appealDetails.reasonsForAppeal.completed;
  if (reasonsForAppealCompleted) {
    stages[1].ticked = true;
    stages[2].active = true;
  }

  res.render('case-building/overview.html', {
    hideBackLink: true,
    stages,
    reasonsForAppealCompleted,
    appealData: req.session.appealData
  });
};
