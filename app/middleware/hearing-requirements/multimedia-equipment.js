const { formController } = require('../form-controller');
const { check } = require('express-validator');
const paths = require('../../paths');

function validation(locale) {
  return [
    // eslint-disable-next-line max-len
    check('multimedia-equipment').not().isEmpty().withMessage(locale.hearingRequirements.multimediaEvidence.errors.selectAnOption)
  ];
}

function extractBody(req) {
  return {
    equipment: req.body['multimedia-equipment']
  };
}

function createFormController() {
  return formController(
    'hearing-requirements/multimedia-equipment.html',
    'hearingRequirements',
    'multimediaEvidence',
    validation,
    extractBody,
    false,
    false,
    (formData, req) => {
      if (req.body.saveForLater) {
        return paths.hearingAppellantOverview;
      } else if (req.body['multimedia-equipment'] === 'no') {
        return paths.hearingMultimediaEvidenceDescription;
      }
      return paths.hearingAllMaleFemaleCourt;
    },
    paths.hearingAppellantTaskList
  );
}

module.exports = {
  createFormController
};
