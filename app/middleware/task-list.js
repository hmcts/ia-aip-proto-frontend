module.exports = (req, res) => {
  const appealData = req.session.appealData;

  const hasAnsweredAllQuestion = req.session.appealData.yourDetails.homeOffice.completed &&
    req.session.appealData.yourDetails.personalDetails.completed &&
    req.session.appealData.yourDetails.contactDetails.completed &&
    req.session.appealData.appealDetails.typeOfAppeal.completed;

  res.render('task-list.html', {
    appealData,
    hideBackLink: true,
    hasAnsweredAllQuestion
  });
};
