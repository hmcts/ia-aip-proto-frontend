const paths = require('../paths');

function get(req, res) {
  const homeOfficeAppealData = req.session.appealData.yourDetails.homeOffice;

  res.render('home-office-details.html', { homeOfficeAppealData });
}

function post(req, res) {
  req.session.appealData.yourDetails.homeOffice.completed = true;
  req.session.appealData.yourDetails.homeOffice.refNumber = req.body['home-office-ref-number'];
  req.session.appealData.yourDetails.homeOffice.letterDate = {
    day: req.body['date-letter-sent-day'],
    month: req.body['date-letter-sent-month'],
    year: req.body['date-letter-sent-year']
  };

  res.redirect(paths.taskList);
}

module.exports = {
  get,
  post
};