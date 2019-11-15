const { formController } = require('../form-controller');
const { check } = require('express-validator');
const paths = require('../../paths');

function validation(locale) {
  return [
    // eslint-disable-next-line max-len
    check('anything-else').not().isEmpty().withMessage(locale.hearingRequirements.anythingElse.errors.selectAnOption)
  ];
}

function extractBody(req) {
  return {
    anythingElse: req.body['anything-else']
  };
}

function createFormController() {
  return formController(
    'hearing-requirements/anything-else.html',
    'hearingRequirements',
    'anythingElse',
    validation,
    extractBody,
    false,
    false,
    (formData, req) => {
      if (req.body.saveForLater) {
        return paths.hearingAppellantOverview;
      } else if (req.body['anything-else'] === 'yes') {
        return paths.hearingAnythingElseDescription;
      }
      return paths.hearingAppellantTaskList;
    },
    paths.hearingAppellantTaskList
  );
}

module.exports = {
  createFormController
};
