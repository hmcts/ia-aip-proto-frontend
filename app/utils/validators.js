const { check } = require('express-validator');

function clarifyingQuestionsValidations() {
  return [ check('further-question').not().isEmpty() ];
}

function caseManagementAppointmentValidations() {
  return [
    check('appellant-direction').not().isEmpty(),
    check('respondent-direction').not().isEmpty(),
    check('date__day').not().isEmpty().isNumeric(),
    check('date__month').not().isEmpty().isNumeric(),
    check('date__year').not().isEmpty().isNumeric(),
    check('date__hours').not().isEmpty().isNumeric(),
    check('date__minutes').not().isEmpty().isNumeric(),
    check('date__seconds').not().isEmpty().isNumeric()
  ];
}

function directionsExplanationValidations() {
  return [
    check('appellant-direction').not().isEmpty(),
    check('date__day').not().isEmpty().isNumeric(),
    check('date__month').not().isEmpty().isNumeric(),
    check('date__year').not().isEmpty().isNumeric(),
    check('date__hours').not().isEmpty().isNumeric(),
    check('date__minutes').not().isEmpty().isNumeric(),
    check('date__seconds').not().isEmpty().isNumeric()
  ];
}

module.exports = {
  caseManagementAppointmentValidations,
  clarifyingQuestionsValidations,
  directionsExplanationValidations
};
