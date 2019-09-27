const { formController } = require('../form-controller');
const paths = require('../../paths');

function validation() {
  return [ ];
}

function extractBody(req) {
  let languages = req.session.appealData.hearingRequirements.interpreter.languages;
  if (!languages) {
    languages = [];
  }

  // eslint-disable-next-line no-undefined
  if (req.body.delete === undefined) {
    if (req.body.name !== 'Select language') {
      languages.push({
        name: req.body.name,
        dialect: req.body.dialect
      });
    }
  } else {
    languages.splice(req.body.delete, 1);
  }
  return {
    languages
  };
}

function createFormController() {
  return formController(
    'hearing-requirements/interpreter-details.html',
    'hearingRequirements',
    'interpreter',
    validation,
    extractBody,
    false,
    false,
    (formData, req) => {
      // eslint-disable-next-line no-undefined
      if (req.body.addNew || req.body.delete !== undefined) {
        return paths.hearingInterpreterDetails;
      } else if (req.body.saveForLater) {
        return paths.hearingAppellantTaskList;
      }
      return paths.hearingStepFree;
    },
    paths.hearingInterpreter
  );
}

module.exports = {
  createFormController
};
