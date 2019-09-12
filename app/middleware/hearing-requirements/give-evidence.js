const { formController } = require('../form-controller');
const { check } = require('express-validator');
const paths = require('../../paths');

function validation(locale) {
  return [
    // eslint-disable-next-line max-len
    check('give-evidence').not().isEmpty().withMessage(locale.hearingRequirements.giveEvidence.errors.selectAnOption)
  ];
}

function extractBody(req) {
  return {
    giveEvidence: req.body['give-evidence']
  };
}

function createFormController() {
  return formController(
    'hearing-requirements/give-evidence.html',
    'hearingRequirements',
    'giveEvidence',
    validation,
    extractBody,
    false,
    false,
    paths.hearingAppellantTaskList,
    paths.hearingAppellantTaskList
  );
}

module.exports = {
  createFormController
};
