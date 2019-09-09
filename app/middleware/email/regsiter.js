module.exports = (req, res) => {
  res.render('email/register.html', {
    appealData: req.session.appealData
  });
};
