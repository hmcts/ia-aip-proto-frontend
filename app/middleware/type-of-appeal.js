const { formController } = require('./form-controller');
const { check } = require('express-validator');
const paths = require('../paths');

function validation(locale) {
  return [ check('appealType').not().isEmpty().withMessage(locale.typeOfAppeal.errors.selectOne) ];
}

function extractBody(req) {
  const appealType = req.body.appealType ? req.body.appealType : [];

  return {
    protection: appealType.indexOf('protection') > -1,
    humanRights: appealType.indexOf('humanRights') > -1,
    eea: appealType.indexOf('eea') > -1,
    revocationOfProtection: appealType.indexOf('revocationOfProtection') > -1,
    deprivationOfCitizenship: appealType.indexOf('deprivationOfCitizenship') > -1
  };
}

// eslint-disable-next-line no-unused-vars
function saveAndRedirect(formData = null, req) {
  return paths.taskList;
}

function createFormController() {
  return formController(
    'type-of-appeal.html',
    'appealDetails',
    'typeOfAppeal',
    validation,
    extractBody,
    false,
    false,
    saveAndRedirect
  );
}

module.exports = {
  createFormController
};
