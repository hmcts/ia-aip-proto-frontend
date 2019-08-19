const { formController } = require('./form-controller');
const { check } = require('express-validator');

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

function createFormController() {
  return formController(
    'type-of-appeal.html', 'appealDetails', 'typeOfAppeal', validation, extractBody
  );
}

module.exports = {
  createFormController
};