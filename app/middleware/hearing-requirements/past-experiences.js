const { formController } = require('../form-controller');
const { check } = require('express-validator');
const paths = require('../../paths');

function validation(locale) {
  return [
    // eslint-disable-next-line max-len
    check('past-experiences').not().isEmpty().withMessage(locale.hearingRequirements.pastExperiences.errors.selectAnOption)
  ];
}

function extractBody(req) {
  return {
    pastExperiences: req.body['past-experiences']
  };
}

function createFormController() {
  return formController(
    'hearing-requirements/past-experiences.html',
    'hearingRequirements',
    'pastExperiences',
    validation,
    extractBody,
    false,
    false,
    (formData, req) => {
      if (req.body.saveForLater) {
        return paths.hearingAppellantTaskList;
      } else if (req.body['past-experiences'] === 'yes') {
        return paths.hearingPastExperiencesDescription;
      }
      return paths.hearingAnythingElse;
    },
    paths.hearingVulnerabilities
  );
}

module.exports = {
  createFormController
};
