const { check } = require('express-validator');
const { formController } = require('./form-controller');
const paths = require('../paths');

function validation(locale) {
  const errors = locale.personalDetails.errors;
  return [
    check('given-names').not().isEmpty().withMessage(errors.givenName),
    check('family-name').not().isEmpty().withMessage(errors.familyName)
  ];
}

function extractBody(req) {
  return {
    givenNames: req.body['given-names'],
    familyName: req.body['family-name']
  };
}

// eslint-disable-next-line no-unused-vars
function saveAndRedirect(formData = null, req) {
  if (req.body.hasOwnProperty('save-continue')) return paths.dateOfBirth;
  return paths.taskList;
}

function createFormController() {
  return formController(
    'personal-details.html',
    'yourDetails',
    'personalDetails',
    validation,
    extractBody,
    false,
    false,
    saveAndRedirect
  );
}

module.exports = {
  createFormController
};
