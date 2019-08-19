const { check } = require('express-validator');
const { formController } = require('./form-controller');
const paths = require('../paths');

function validation(locale) {
  const dateOfBirthError = locale.personalDetails.errors.dateOfBirth;
  return [
    check('date-of-birth-day').isInt({ min: 1, max: 31 }).withMessage(dateOfBirthError),
    check('date-of-birth-month').isInt({ min: 1, max: 12 }).withMessage(dateOfBirthError),
    check('date-of-birth-year').isInt({ min: 1000, max: 9999 }).withMessage(dateOfBirthError)
  ];
}

function extractBody(req) {
  return {
    dateOfBirth: {
      day: req.body['date-of-birth-day'],
      month: req.body['date-of-birth-month'],
      year: req.body['date-of-birth-year']
    }
  };
}

function extraFieldErrors(fieldErrors) {
  if (fieldErrors['date-of-birth-day'] ||
    fieldErrors['date-of-birth-month'] ||
    fieldErrors['date-of-birth-year']) {
    fieldErrors['date-of-birth'] = {
      ...fieldErrors['date-of-birth-day'],
      ...fieldErrors['date-of-birth-month'],
      ...fieldErrors['date-of-birth-year']
    };
  }
}

function createFormController() {
  return formController(
    'date-of-birth.html',
    'yourDetails',
    'personalDetails',
    validation,
    extractBody,
    extraFieldErrors,
    false,
    paths.taskList,
    paths.personalDetails
  );
}

module.exports = {
  createFormController
};