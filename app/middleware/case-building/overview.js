module.exports = (req, res) => {
  res.render('case-building/overview.html', {
    hideBackLink: true,
    appealData: req.session.appealData
  });
};
