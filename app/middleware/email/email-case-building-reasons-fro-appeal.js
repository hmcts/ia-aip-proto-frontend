module.exports = (req, res) => {
  res.render('email/email-case-building-reasons-for-appeal.html', {
    appealData: req.session.appealData
  });
};
