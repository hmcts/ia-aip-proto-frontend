const stages = require('../../data/appealStages');

module.exports = (req, res) => {
  const reasonsForAppealCompleted = req.session.appealData.appealDetails.reasonsForAppeal.completed;

  res.render('case-building/overview.html', {
    hideBackLink: true,
    stages,
    reasonsForAppealCompleted,
    appealData: req.session.appealData
  });
};
