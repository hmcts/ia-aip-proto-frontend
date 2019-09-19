const { formController } = require('../form-controller');
const { check } = require('express-validator');
const paths = require('../../paths');

function validation(locale) {
  return [
    // eslint-disable-next-line max-len
    check('description').not().isEmpty().withMessage(locale.hearingRequirements.inCameraCourt.errors.enterADescription)
  ];
}

function extractBody(req) {
  return {
    description: req.body.description
  };
}

function createFormController() {
  return formController(
    'hearing-requirements/in-camera-court-description.html',
    'hearingRequirements',
    'inCameraCourt',
    validation,
    extractBody,
    false,
    false,
    (formData, req) => {
      if (req.body.saveForLater) {
        return paths.hearingAppellantTaskList;
      }
      return paths.hearingAnythingElse;
    },
    paths.hearingInCameraCourt
  );
}

module.exports = {
  createFormController
};
