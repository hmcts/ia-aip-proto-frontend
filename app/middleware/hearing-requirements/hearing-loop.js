const { formController } = require('../form-controller');
const { check } = require('express-validator');
const paths = require('../../paths');

function validation(locale) {
  return [
    // eslint-disable-next-line max-len
    check('hearing-loop').not().isEmpty().withMessage(locale.hearingRequirements.hearingLoop.errors.selectAnOption)
  ];
}

function extractBody(req) {
  return {
    hearingLoop: req.body['hearing-loop']
  };
}

function createFormController() {
  return formController(
    'hearing-requirements/hearing-loop.html',
    'hearingRequirements',
    'hearingLoop',
    validation,
    extractBody,
    false,
    false,
    paths.hearingAppellantTaskList,
    paths.hearingAppellantTaskList
  );
}

module.exports = {
  createFormController
};
