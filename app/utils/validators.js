const { check } = require('express-validator');

function clarifyingQuestionsValidations() {
  return [
    check('question-title').not().isEmpty(),
    check('further-question').not().isEmpty()
  ];
}

module.exports = {
  clarifyingQuestionsValidations
};
