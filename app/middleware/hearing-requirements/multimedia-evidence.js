const { formController } = require('../form-controller');
const { check } = require('express-validator');
const paths = require('../../paths');

function validation(locale) {
  return [
    // eslint-disable-next-line max-len
    check('multimedia-evidence').not().isEmpty().withMessage(locale.hearingRequirements.multimediaEvidence.errors.selectAnOption)
  ];
}

function extractBody(req) {
  return {
    multimediaEvidence: req.body['multimedia-evidence']
  };
}

function createFormController() {
  return formController(
    'hearing-requirements/multimedia-evidence.html',
    'hearingRequirements',
    'multimediaEvidence',
    validation,
    extractBody,
    false,
    false,
    (formData, req) => {
      if (req.body.saveForLater) {
        return paths.hearingAppellantOverview;
      } else if (req.body['multimedia-evidence'] === 'yes') {
        return paths.hearingMultimediaEquipment;
      }
      return paths.hearingAllMaleFemaleCourt;
    },
    paths.hearingAppellantTaskList
  );
}

module.exports = {
  createFormController
};
