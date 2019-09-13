const { formController } = require('../form-controller');
const { check } = require('express-validator');
const paths = require('../../paths');

function validation(locale) {
  return [
    // eslint-disable-next-line max-len
    check('all-male-female-court').not().isEmpty().withMessage(locale.hearingRequirements.allMaleFemaleCourt.errors.selectAnOption)
  ];
}

function extractBody(req) {
  return {
    allMaleFemaleCourt: req.body['all-male-female-court']
  };
}

function createFormController() {
  return formController(
    'hearing-requirements/all-male-female-court.html',
    'hearingRequirements',
    'allMaleFemaleCourt',
    validation,
    extractBody,
    false,
    false,
    (formData, req) => {
      if (req.body['all-male-female-court'] === 'yes') {
        return paths.hearingAllMaleFemaleCourtSelection;
      }
      return paths.hearingAppellantTaskList;
    },
    paths.hearingAppellantTaskList
  );
}

module.exports = {
  createFormController
};
