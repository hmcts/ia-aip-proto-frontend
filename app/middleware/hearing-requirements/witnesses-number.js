const { formController } = require('../form-controller');
const { check, oneOf } = require('express-validator');
const paths = require('../../paths');

function validation(locale) {
  return [
    oneOf([
      check('witness')
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
  const { witness } = req.session.appealData.hearingRequirements.witnesses;
  if (req.body.delete) {
    return {
      witness: witness.filter(curr => Object.keys(req.body.delete)[0] !== curr)
    };
  }
  if (req.body.witness) {
    return {
      witness: [
        ...req.session.appealData.hearingRequirements.witnesses.witness || [],
        req.body.witness
      ]
    };
  }
  return { witness };
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
