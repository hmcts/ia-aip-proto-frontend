module.exports = (req, res) => {
  res.render('case-building/questions-from-tribunal.html', {
    hideBackLink: false,
    previousPage: '/case-building/overview',
    appealData: req.session.appealData
  });
};
