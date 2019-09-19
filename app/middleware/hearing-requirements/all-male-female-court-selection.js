const { formController } = require('../form-controller');
const { check } = require('express-validator');
const paths = require('../../paths');

function validation(locale) {
  return [
    // eslint-disable-next-line max-len
    check('male-or-Female').not().isEmpty().withMessage(locale.hearingRequirements.allMaleFemaleCourt.errors.selectAnOption)
  ];
}

function extractBody(req) {
  return {
    maleOrFemale: req.body['male-or-Female']
  };
}

function createFormController() {
  return formController(
    'hearing-requirements/all-male-female-court-selection.html',
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
      return paths.hearingAllMaleFemaleCourtDescription;
    },
    paths.hearingAllMaleFemaleCourt
  );
}

module.exports = {
  createFormController
};
