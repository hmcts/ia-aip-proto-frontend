module.exports = (req, res) => {
  res.render('case-building/questions-submitted.html', {
    hideBackLink: true,
    appealData: req.session.appealData
  });
};
