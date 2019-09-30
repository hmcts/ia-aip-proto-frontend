const stages = require('../../data/appealStages');

module.exports = (req, res) => {
  const reasonsForAppealCompleted = req.session.appealData.appealDetails.reasonsForAppeal.completed;
  const userStages = JSON.parse(JSON.stringify(stages));
  userStages[1].ticked = true;
  userStages[2].active = true;
  userStages[2].ticked = true;
  userStages[3].active = true;
  userStages[3].ticked = true;
  userStages[4].active = true;

  res.render('hearing-requirements/overview.html', {
    hideBackLink: true,
    stages: userStages,
    reasonsForAppealCompleted,
    appealData: req.session.appealData
  });
};
