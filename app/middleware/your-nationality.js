const { check, oneOf } = require('express-validator');
const { formController } = require('./form-controller');
const paths = require('../paths');

// eslint-disable-next-line consistent-return
function validation() {
  // const errors = locale.yourNationality.errors;
  return oneOf([
    [check('nationality').not().isEmpty().withMessage('One')],
    [check('stateless').not().isEmpty().withMessage('One')]
    // eslint-disable-next-line no-unused-vars
  ]);
}
function extractBody(req) {
  return {
    nationality: req.body.nationality,
    stateless: req.body.stateless
  };
}


// eslint-disable-next-line no-unused-vars,consistent-return
function saveAndRedirect(formData = null, req) {
  if (req.body.hasOwnProperty('save-continue')) return paths.enterPostcode;
}

function createFormController() {
  return formController(
    'your-nationality.html',
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
