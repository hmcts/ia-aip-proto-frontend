module.exports = (req, res) => {
  res.render('email/questions.html', {
    appealData: req.session.appealData
  });
};
