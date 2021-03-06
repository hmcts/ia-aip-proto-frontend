const { formController } = require('../form-controller');
const { check } = require('express-validator');
const paths = require('../../paths');

function validation(locale) {
  return [
    // eslint-disable-next-line max-len
    check('step-free').not().isEmpty().withMessage(locale.hearingRequirements.stepFree.errors.selectAnOption)
  ];
}

function extractBody(req) {
  return {
    stepFree: req.body['step-free']
  };
}

function createFormController() {
  return formController(
    'hearing-requirements/step-free.html',
    'hearingRequirements',
    'stepFree',
    validation,
    extractBody,
    false,
    false,
    (formData, req) => {
      if (req.body.saveForLater) {
        return paths.hearingAppellantOverview;
      }
      return paths.hearingHearingLoop;
    },
    paths.hearingInterpreterDetails
  );
}

module.exports = {
  createFormController
};
