const { check } = require('express-validator');
const { formController } = require('./form-controller');
const paths = require('../paths');

function validation(locale) {
  const errors = locale.manualAddress.errors;
  return [
    check('addressline1').not().isEmpty().withMessage(errors.addressOne),
    check('addresspostcode').not().isEmpty().withMessage(errors.postcode)
  ];
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
  return paths.taskList;
}

function createFormController() {
  return formController(
    'check-address.html',
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
