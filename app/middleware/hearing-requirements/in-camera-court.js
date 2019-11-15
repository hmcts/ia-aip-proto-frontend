const { formController } = require('../form-controller');
const { check } = require('express-validator');
const paths = require('../../paths');

function validation(locale) {
  return [
    // eslint-disable-next-line max-len
    check('in-camera-court').not().isEmpty().withMessage(locale.hearingRequirements.inCameraCourt.errors.selectAnOption)
  ];
}

function extractBody(req) {
  return {
    inCameraCourt: req.body['in-camera-court']
  };
}

function createFormController() {
  return formController(
    'hearing-requirements/in-camera-court.html',
    'hearingRequirements',
    'inCameraCourt',
    validation,
    extractBody,
    false,
    false,
    (formData, req) => {
      if (req.body.saveForLater) {
        return paths.hearingAppellantOverview;
      }
      if (req.body['in-camera-court'] === 'yes') {
        return paths.hearingInCameraCourtDescription;
      }
      return paths.hearingVulnerabilities;
    },
    paths.hearingAllMaleFemaleCourtDescription
  );
}

module.exports = {
  createFormController
};
