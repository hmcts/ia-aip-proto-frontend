const { check } = require('express-validator');
const { formController } = require('./form-controller');
const paths = require('../paths');

function validation(locale) {
  const errors = locale.personalDetails.errors;
  return [check('postcode').not().isEmpty().withMessage(errors.givenName)];
}

function extractBody(req) {
  return {
    postcode: req.body.postcode
  };
}

// eslint-disable-next-line no-unused-vars
function saveAndRedirect(formData = null, req) {
  console.log(req.body);
  if (req.body.hasOwnProperty('save-continue')) return paths.selectAddress;
  return paths.taskList;
}

function createFormController() {
  return formController(
    'enter-postcode.html',
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
