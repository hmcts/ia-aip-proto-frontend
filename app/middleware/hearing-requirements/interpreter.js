const { formController } = require('../form-controller');
const { check } = require('express-validator');
const paths = require('../../paths');

function validation(locale) {
  return [
    // eslint-disable-next-line max-len
    check('required').not().isEmpty().withMessage(locale.hearingRequirements.interpreter.errors.selectAnOption)
  ];
}

function extractBody(req) {
  return {
    required: req.body.required
  };
}

function createFormController() {
  return formController(
    'hearing-requirements/interpreter.html',
    'hearingRequirements',
    'interpreter',
    validation,
    extractBody,
    false,
    false,
    formData => {
      if (formData.required === 'yes') {
        return paths.hearingInterpreterDetails;
      }
      return paths.hearingAppellantTaskList;
    },
    paths.hearingAppellantTaskList
  );
}

module.exports = {
  createFormController
};
