const { formController } = require('../form-controller');
const { check, oneOf } = require('express-validator');
const paths = require('../../paths');

function validation(locale) {
  return [
    oneOf([
      check('witness')
        .if((value, { req }) => {
          const { witnesses } = req.session.appealData.hearingRequirements;
          if (witnesses.names && witnesses.names.length > 0) {
            return false;
          }
          return true;
        })
        .not()
        .isEmpty()
        .withMessage(locale.hearingRequirements.witnesses.errors.enterWitnessName),
      check('delete')
        .not()
        .isEmpty()
    ])
  ];
}

function extractBody(req) {
  const { names } = req.session.appealData.hearingRequirements.witnesses;
  if (req.body.delete) {
    return {
      names: names.filter(curr => Object.keys(req.body.delete)[0] !== curr)
    };
  }
  if (req.body.witness) {
    return {
      names: [
        ...req.session.appealData.hearingRequirements.witnesses.names || [],
        req.body.witness
      ]
    };
  }
  return { names };
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
    (formData, req) => {
      if (req.body.addAnotherWitness || req.body.delete) {
        return paths.hearingWitnessesNumber;
      }
      return paths.hearingAppellantTaskList;
    },
    paths.hearingWitnesses,
  );
}

module.exports = {
  createFormController
};
