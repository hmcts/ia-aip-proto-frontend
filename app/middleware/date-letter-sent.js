const { check } = require('express-validator');
const { formController } = require('./form-controller');
const paths = require('../paths');

function validation(locale) {
  const dateLetterSentError = locale.homeOfficeDetails.errors.dateLetterSent;
  return [
    check('date-letter-sent-day').isInt({ min: 1, max: 31 }).withMessage(dateLetterSentError),
    check('date-letter-sent-month').isInt({ min: 1, max: 12 }).withMessage(dateLetterSentError),
    check('date-letter-sent-year').isInt({ min: 1000, max: 9999 }).withMessage(dateLetterSentError)
  ];
}

function extractBody(req) {
  return {
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


function checkDate(date) {
  const EXPIRATION = 14;
  const currentDay = new Date().getDate();
  const currentMonth = new Date().getUTCMonth() + 1;
  const currentYear = new Date().getFullYear();

  const currentDate = new Date(`${currentYear}/${currentMonth}/${currentDay}`);
  const dateEntered = new Date(`${date['date-letter-sent-year']}
  /${date['date-letter-sent-month']}/${date['date-letter-sent-day']}`);

  const difference = ((currentDate.getTime() - dateEntered.getTime()) / (1000 * 3600 * 24));

  return difference >= EXPIRATION;
}


// eslint-disable-next-line no-unused-vars
function saveAndRedirect(formData = null, req) {
  if (checkDate(req.body)) return paths.appealOutOfTime;
  return paths.taskList;
}

function createFormController() {
  return formController(
    'date-letter-sent.html',
    'yourDetails',
    'homeOffice',
    validation,
    extractBody,
    extraFieldErrors,
    false,
    saveAndRedirect
  );
}

module.exports = {
  createFormController
};
