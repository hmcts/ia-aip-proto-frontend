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

  if (req.body.addNew) {
    languages.push({
      name: req.body.name,
      dialect: req.body.dialect
    });
  } else if (req.body.delete) {
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
      if (req.body.addNew || req.body.delete) {
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
