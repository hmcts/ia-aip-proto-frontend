const { check } = require('express-validator');
const { formController } = require('./form-controller');
const paths = require('../paths');

function validation(locale) {
  const errors = locale.personalDetails.errors;
  return [check('addressline1').not().isEmpty().withMessage(errors.givenName)];
}

function extractBody(req) {
  return {
    addressline1: req.body.addressline1,
    addressline2: req.body.addressline2,
    addresstown: req.body.addresstown,
    addresscounty: req.body.addresscounty,
    addresspostcode: req.body.addresspostcode
  };
}

// eslint-disable-next-line no-unused-vars
function saveAndRedirect(formData = null, req) {
  console.log(req.body);
  return paths.taskList;
}

function createFormController() {
  return formController(
    'manual-address.html',
    'yourDetails',
    'personalDetails',
    validation,
    extractBody,
    false,
    false,
    saveAndRedirect,

  );
}

module.exports = {
  createFormController
};
