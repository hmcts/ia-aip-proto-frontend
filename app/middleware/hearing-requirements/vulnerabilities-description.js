const { formController } = require('../form-controller');
const { check } = require('express-validator');
const paths = require('../../paths');

function validation(locale) {
  return [
    // eslint-disable-next-line max-len
    check('description').not().isEmpty().withMessage(locale.hearingRequirements.vulnerabilitiesDescription.errors.enterADescription)
  ];
}

function extractBody(req) {
  return {
    description: req.body.description
  };
}

function createFormController() {
  return formController(
    'hearing-requirements/vulnerabilities-description.html',
    'hearingRequirements',
    'vulnerabilities',
    validation,
    extractBody,
    false,
    false,
    paths.hearingAppellantTaskList,
    paths.hearingVulnerabilitiesList
  );
}

module.exports = {
  createFormController
};
