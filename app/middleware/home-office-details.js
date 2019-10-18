const { check } = require('express-validator');
const { formController } = require('./form-controller');
const paths = require('../paths');

function validation(locale) {
  return [
    check('home-office-ref-number').matches(/^[A-Za-z][0-9]{6}[0-9]?(|\/[0-9][0-9]?[0-9]?)$/)
      .withMessage(locale.homeOfficeDetails.errors.invalidReference)
  ];
}

function extractBody(req) {
  return {
    formData: {
      refNumber: req.body['home-office-ref-number']
    }
  };
}



// eslint-disable-next-line no-unused-vars
function saveAndRedirect(formData = null, req) {
  console.log(req.body);
  if (req.body.hasOwnProperty('save-continue')) return paths.dateLetterSent;
  return paths.taskList;
}

function createFormController() {
  return formController(
    'home-office-details.html',
    'yourDetails',
    'homeOffice',
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
