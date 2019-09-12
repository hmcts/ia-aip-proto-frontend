const { formController } = require('../form-controller');
const { check } = require('express-validator');
const paths = require('../../paths');

function validation(locale) {
  return [
    // eslint-disable-next-line max-len
    check('number').not().isEmpty().withMessage(locale.hearingRequirements.witnesses.errors.selectHowMany),
    check('number').isInt({ min: 1, max: 20 }).withMessage(locale.hearingRequirements.witnesses.errors.selectHowMany)
  ];
}

function extractBody(req) {
  return {
    number: req.body.number
  };
}

function createFormController() {
  return formController(
    'hearing-requirements/witnesses-number.html',
    'hearingRequirements',
    'witnesses',
    validation,
    extractBody,
    false,
    false,
    paths.hearingAppellantTaskList,
    paths.hearingWitnesses,
  );
}

module.exports = {
  createFormController
};
