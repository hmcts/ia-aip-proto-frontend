const { check } = require('express-validator');
const { formController } = require('./form-controller');
const paths = require('../paths');

function validation() {
  return [check('address')];
}

function extractBody(req) {
  return {
    address: req.body.address
  };
}

// eslint-disable-next-line no-unused-vars
function saveAndRedirect(formData = null, req) {
  console.log(req.body);
  return paths.taskList;
}

function createFormController() {
  return formController(
    'select-address.html',
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
