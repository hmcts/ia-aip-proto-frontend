module.exports = (req, res) => {
  const appealData = req.session.appealData;

  res.render('task-list.html', { appealData });
};
