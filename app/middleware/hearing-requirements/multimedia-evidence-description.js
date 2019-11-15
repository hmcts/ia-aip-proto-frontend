const { formController } = require('../form-controller');
const { check } = require('express-validator');
const paths = require('../../paths');

function validation(locale) {
  return [
    // eslint-disable-next-line max-len
    check('description').not().isEmpty().withMessage(locale.hearingRequirements.multimediaEvidenceDescription.errors.enterADescription)
  ];
}

function extractBody(req) {
  return {
    description: req.body.description
  };
}

function createFormController() {
  return formController(
    'hearing-requirements/multimedia-evidence-description.html',
    'hearingRequirements',
    'multimediaEvidence',
    validation,
    extractBody,
    false,
    false,
    (formData, req) => {
      if (req.body.saveForLater) {
        return paths.hearingAppellantOverview;
      }
      return paths.hearingAllMaleFemaleCourt;
    },
    paths.hearingMultimediaEvidence
  );
}

module.exports = {
  createFormController
};
