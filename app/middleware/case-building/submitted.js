module.exports = (req, res) => {
  res.render('case-building/submitted.html', {
    hideBackLink: true,
    appealData: req.session.appealData
  });
};
