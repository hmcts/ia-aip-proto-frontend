const paths = require('../paths');

module.exports = (req, res) => {
  const appealData = req.session.appealData;

  res.render('check-answers.html', {
    appealData,
    previousPage: paths.taskList
  });
};
