module.exports = (req, res) => {
  const appealData = req.session.appealData;

  res.render('hearing-requirements/task-list.html', {
    appealData,
    hideBackLink: true
  });
};
