const { formController } = require('../form-controller');
const { check } = require('express-validator');
const paths = require('../../paths');

function validation(locale) {
  return [
    // eslint-disable-next-line max-len
    check('witnesses').not().isEmpty().withMessage(locale.hearingRequirements.witnesses.errors.selectAnOption)
  ];
}

function extractBody(req) {
  return {
    witnesses: req.body.witnesses
  };
}

function createFormController() {
  return formController(
    'hearing-requirements/witnesses.html',
    'hearingRequirements',
    'witnesses',
    validation,
    extractBody,
    false,
    false,
    formData => {
      if (formData.witnesses === 'yes') {
        return paths.hearingWitnessesNumber;
      }
      return paths.hearingAppellantTaskList;
    },
    paths.hearingAppellantTaskList
  );
}

module.exports = {
  createFormController
};
