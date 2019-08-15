const paths = require('../paths');
const { check, validationResult } = require('express-validator');

function get(req, res) {
  const homeOfficeAppealData = req.session.appealData.yourDetails.homeOffice;

  res.render('home-office-details.html', { homeOfficeAppealData });
}

function validation() {
  return [
    check('home-office-ref-number').not().isEmpty().withMessage('Must set home office ref number')
      .isNumeric().withMessage('Invalid home office ref'),
    check('date-letter-sent-day').not().isEmpty().withMessage('Must set date letter sent'),
    check('date-letter-sent-month').not().isEmpty().withMessage('Must set date letter sent'),
    check('date-letter-sent-year').not().isEmpty().withMessage('Must set date letter sent')
  ];
}

function extractBody(req) {
  return {
    refNumber: req.body['home-office-ref-number'],
    letterDate: {
      day: req.body['date-letter-sent-day'],
      month: req.body['date-letter-sent-month'],
      year: req.body['date-letter-sent-year']
    }
  };
}

function post(req, res) {
  const errors = validationResult(req);

  const homeOfficeAppealData = extractBody(req);
  if (!errors.isEmpty()) {
    const fieldErrors = {};
    const errorList = errors.formatWith(({ msg, param }) => {
      fieldErrors[param] = {
        text: msg,
        class: ' govuk-input--error'
      };
      return {
        text: msg,
        href: `#${param}`
      };
    }).array();

    fieldErrors['date-letter-sent'] = {
      ...fieldErrors['date-letter-sent-day'],
      ...fieldErrors['date-letter-sent-month'],
      ...fieldErrors['date-letter-sent-year']
    };

    res.render('home-office-details.html', { homeOfficeAppealData, errors: {
      errorList,
      fieldErrors
    } });
    return;
  }

  req.session.appealData.yourDetails.homeOffice = homeOfficeAppealData;
  req.session.appealData.yourDetails.homeOffice.completed = true;

  res.redirect(paths.taskList);
}

module.exports = {
  get,
  validation,
  post
};