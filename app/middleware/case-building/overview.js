const stages = require('../../data/appealStages');

module.exports = (req, res) => {
  const userStages = JSON.parse(JSON.stringify(stages));
  const reasonsForAppealCompleted = req.session.appealData.appealDetails.reasonsForAppeal.completed;

  res.render('case-building/overview.html', {
    hideBackLink: true,
    stages: userStages,
    reasonsForAppealCompleted,
    appealData: req.session.appealData
  });
};
