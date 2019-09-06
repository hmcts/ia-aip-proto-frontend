module.exports = (req, res) => {
  const hasAnsweredAllQuestion = req.session.appealData.questions.reduce(
    (lastValue, question) => lastValue && question.completed,
    true
  );

  res.render('case-building/questions-from-tribunal.html', {
    hideBackLink: false,
    previousPage: '/case-building/overview',
    appealData: req.session.appealData,
    hasAnsweredAllQuestion
  });
};
