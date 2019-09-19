const { formController } = require('../form-controller');
const { check } = require('express-validator');
const paths = require('../../paths');

function validation(locale) {
  return [
    // eslint-disable-next-line max-len
    check('description').not().isEmpty().withMessage(locale.hearingRequirements.allMaleFemaleCourt.errors.enterADescription)
  ];
}

function extractBody(req) {
  return {
    description: req.body.description
  };
}

function createFormController() {
  return formController(
    'hearing-requirements/all-male-female-court-description.html',
    'hearingRequirements',
    'allMaleFemaleCourt',
    validation,
    extractBody,
    false,
    false,
    (formData, req) => {
      if (req.body.saveForLater) {
        return paths.hearingAppellantTaskList;
      }
      return paths.hearingInCameraCourt;
    },
    paths.hearingAllMaleFemaleCourtSelection
  );
}

module.exports = {
  createFormController
};
