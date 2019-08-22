const { formController } = require('./form-controller');
const { check } = require('express-validator');

function validation(locale) {
  const maxNumberOfWords = 250;
  return [
    check('why').isLength({ min: 1 }).withMessage(locale.reasonsForAppeal.errors.tooShort)
      .custom(value => {
        const numbrOfWords = value.trim().split(' ');
        return numbrOfWords.length <= maxNumberOfWords;
      }).withMessage(locale.reasonsForAppeal.errors.tooLong)
  ];
}

function extractBody(req) {
  return {
    why: req.body.why
  };
}

function createFormController() {
  return formController(
    'reasons-for-appeal.html', 'appealDetails', 'reasonsForAppeal', validation, extractBody
  );
}

module.exports = {
  createFormController
};
