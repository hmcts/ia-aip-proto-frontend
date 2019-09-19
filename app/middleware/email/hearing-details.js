module.exports = (req, res) => {
  res.render('email/hearing-details.html', {
    appealData: req.session.appealData
  });
};
