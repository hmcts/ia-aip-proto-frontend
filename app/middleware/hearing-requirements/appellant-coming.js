const { formController } = require('../form-controller');
const { check } = require('express-validator');
const paths = require('../../paths');

function validation(locale) {
  return [
    // eslint-disable-next-line max-len
    check('is-coming').not().isEmpty().withMessage(locale.hearingRequirements.appellantComing.errors.selectAnOption)
  ];
}

function extractBody(req) {
  return {
    isComing: req.body['is-coming']
  };
}

function createFormController() {
  return formController(
    'hearing-requirements/appellant-coming.html',
    'hearingRequirements',
    'appellantComing',
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
