module.exports = (req, res) => {
  const appealData = req.session.appealData;

  res.render('check-answers.html', { appealData });
};
