module.exports = (req, res) => {
  res.render('case-building/check-answers.html', {
    hideBackLink: false,
    previousPage: '/case-building/reasons-for-appeal',
    appealData: req.session.appealData
  });
};
