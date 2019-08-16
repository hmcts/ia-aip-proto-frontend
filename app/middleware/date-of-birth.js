const { check } = require('express-validator');
const { formController } = require('./form-controller');
const paths = require('../paths');

function validation() {
  return [
    check('date-of-birth-day').not().isEmpty().withMessage('Must set date of birth'),
    check('date-of-birth-month').not().isEmpty().withMessage('Must set date of birth'),
    check('date-of-birth-year').not().isEmpty().withMessage('Must set date of birth')
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