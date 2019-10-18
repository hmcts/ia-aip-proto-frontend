const { check, oneOf } = require('express-validator');
const { formController } = require('./form-controller');
const paths = require('../paths');

// eslint-disable-next-line consistent-return
function validation() {
  // const errors = locale.yourNationality.errors;
  return oneOf([

    [check('stateless').not().isEmpty().withMessage('One')],
    [check('nationality').equals('').withMessage('One')],
    [check('stateless').not().isEmpty().withMessage('Two')],
    [check('nationality').not().isEmpty().withMessage('Two')],
    [check('stateless').not().isEmpty().withMessage('Three')]
  ]);
}

function extractBody(req) {
  if (req.body.nationality === '') {
    return {
      nationality: req.body.nationality
    };
  }
  if (req.body.stateless === 'stateless') {
    return {
      nationality: 'req.body.nationality'
    };
  }
  return 0;
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
