module.exports = (req, res) => {
  res.render('email/reasons-for-appeal.html', {
    appealData: req.session.appealData
  });
};
