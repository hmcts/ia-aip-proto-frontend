module.exports = (req, res) => {
  res.render('case-building/questions-check-answers.html', {
    hideBackLink: false,
    previousPage: '/case-building/questions-from-tribunal',
    appealData: req.session.appealData
  });
};
