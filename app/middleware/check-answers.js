const paths = require('../paths');
const { check } = require('express-validator');
const { formController } = require('./form-controller');

function validation() {
  return [ check('confirm').equals('confirm').withMessage('Confirm to continue') ];
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
