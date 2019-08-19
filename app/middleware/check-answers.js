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

function createFormController() {
  return formController(
    'check-answers.html',
    'checkAnswers',
    'checkAnswers',
    validation,
    extractBody,
    false,
    extraFormData,
    paths.appealSubmitted
  );
}

module.exports = {
  createFormController
};
