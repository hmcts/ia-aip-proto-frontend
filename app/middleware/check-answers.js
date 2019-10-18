const paths = require('../paths');
const { check } = require('express-validator');
const { formController } = require('./form-controller');

function validation(locale) {
  return [ check('confirm').equals('confirm').withMessage(locale.checkAnswers.errors.notChecked) ];
}

function extractBody() {
  return {};
}
function extraFormData(req) {
  const appealData = req.session.appealData;
  return { appealData };
}

function checkDate(date) {
  const EXPIRATION = 14;
  const HOURS = 24;
  const MINUTES = 1000;
  const SECONDS = 3600;

  const currentDay = new Date().getDate();
  const currentMonth = new Date().getUTCMonth() + 1;
  const currentYear = new Date().getFullYear();

  const currentDate = new Date(`${currentYear}/${currentMonth}/${currentDay}`);
  const dateEntered = new Date(`${date.year}
  /${date.month}/${date.day}`);

  const difference = ((currentDate.getTime() - dateEntered.getTime()) / (MINUTES * SECONDS * HOURS));

  return difference >= EXPIRATION;
}

// eslint-disable-next-line no-unused-vars
function submitNextPage(formData = null, req) {
  if (checkDate(req.session.appealData.yourDetails.homeOffice.letterDate)) return paths.appealOutOfTimeSubmission;
  return paths.appealSubmitted;
  // text: appealData.yourDetails.homeOffice.letterDate.day + '
  // ' + appealData.yourDetails.homeOffice.letterDate.month + '
  // ' + appealData.yourDetails.homeOffice.letterDate.year
}


function createFormController() {
  return formController(
    'check-answers.html',
    'checkAnswers',
    'checkAnswers',
    validation,
    extractBody,
    false,
    extraFormData,
    submitNextPage,
  );
}

module.exports = {
  createFormController
};
