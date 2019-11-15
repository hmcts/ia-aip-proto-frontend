const { formController } = require('../form-controller');
const { check } = require('express-validator');
const paths = require('../../paths');

function validation(locale) {
  return [
    // eslint-disable-next-line max-len
    check('vulnerabilities').not().isEmpty().withMessage(locale.hearingRequirements.vulnerabilities.errors.selectAnOption)
  ];
}

function extractBody(req) {
  return {
    vulnerabilities: req.body.vulnerabilities
  };
}

function createFormController() {
  return formController(
    'hearing-requirements/vulnerabilities.html',
    'hearingRequirements',
    'vulnerabilities',
    validation,
    extractBody,
    false,
    false,
    (formData, req) => {
      if (req.body.saveForLater) {
        return paths.hearingAppellantOverview;
      } else if (formData.vulnerabilities === 'yes') {
        return paths.hearingVulnerabilitiesDescription;
      }
      return paths.hearingPastExperiences;
    },
    paths.hearingOtherNeeds
  );
}

module.exports = {
  createFormController
};
