const { formController } = require('./form-controller');
const { check } = require('express-validator');

function validation() {
  return [
    check('why').isLength({ min: 1 }).withMessage('Must enter a reason for your appeal')
      .isLength({ max: 250 }).withMessage('Reason for appeal too long')
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