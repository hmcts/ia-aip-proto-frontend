const { check } = require('express-validator');
const { formController } = require('./form-controller');

function validation() {
  return [
    check('home-office-ref-number').not().isEmpty().withMessage('Must set home office ref number'),
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