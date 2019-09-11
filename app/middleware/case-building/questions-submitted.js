module.exports = (req, res) => {
  req.session.appealData.caseBuilding = { completed: true };

  res.render('case-building/questions-submitted.html', {
    hideBackLink: true,
    appealData: req.session.appealData
  });
};
