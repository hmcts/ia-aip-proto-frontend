const { check } = require('express-validator');
const { formController } = require('./form-controller');

function validation(locale) {
  const dateLetterSentError = locale.homeOfficeDetails.errors.dateLetterSent;
  return [
    check('home-office-ref-number').matches(/^[A-Za-z][0-9]{6}[0-9]?(|\/[0-9][0-9]?[0-9]?)$/)
      .withMessage(locale.homeOfficeDetails.errors.invalidReference),
    check('date-letter-sent-day').isInt({ min: 1, max: 31 }).withMessage(dateLetterSentError),
    check('date-letter-sent-month').isInt({ min: 1, max: 12 }).withMessage(dateLetterSentError),
    check('date-letter-sent-year').isInt({ min: 1000, max: 9999 }).withMessage(dateLetterSentError)
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

function extraFieldErrors(fieldErrors) {
  if (fieldErrors['date-letter-sent-day'] ||
    fieldErrors['date-letter-sent-month'] ||
    fieldErrors['date-letter-sent-year']) {
    fieldErrors['date-letter-sent'] = {
      ...fieldErrors['date-letter-sent-day'],
      ...fieldErrors['date-letter-sent-month'],
      ...fieldErrors['date-letter-sent-year']
    };
  }
}

function createFormController() {
  return formController(
    'home-office-details.html', 'yourDetails', 'homeOffice', validation, extractBody, extraFieldErrors
  );
}

module.exports = {
  createFormController
};