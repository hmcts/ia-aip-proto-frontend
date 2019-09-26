const { formController } = require('../form-controller');
const { check } = require('express-validator');
const paths = require('../../paths');

function validation(locale) {
  return [
    // eslint-disable-next-line max-len
    check('provide-evidence').not().isEmpty().withMessage(locale.hearingRequirements.provideEvidence.errors.selectAnOption)
  ];
}

function extractBody(req) {
  return {
    'provide-evidence': req.body['provide-evidence']
  };
}

function extraBody() {
  return { action: paths.caseBuildingDoYouWantToUploadEvidence };
}

function createFormController() {
  return formController(
    'case-building/do-you-want-to-upload-evidence.html',
    'appealDetails',
    'reasonsForAppeal',
    validation,
    extractBody,
    false,
    extraBody,
    (formData, req) => {
      if (req.body['provide-evidence'] === 'yes') {
        return paths.caseBuildingUploadEvidence;
      } else if (req.body['provide-evidence'] === 'no') {
        req.session.appealData.appealDetails.reasonsForAppeal.completed = true;
      }
      return paths.caseBuildingCheckAnswers;
    },
    paths.hearingAppellantTaskList
  );
}

module.exports = {
  createFormController
};
