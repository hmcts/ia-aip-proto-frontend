const { check } = require('express-validator');
const { formController } = require('./form-controller');

function validation() {
  return [
    check('title').not().isEmpty().withMessage('Must enter title'),
    check('given-names').not().isEmpty().withMessage('Must enter given names'),
    check('family-name').not().isEmpty().withMessage('Must enter family name')
  ];
}

function extractBody(req) {
  return {
    title: req.body.title,
    givenNames: req.body['given-names'],
    familyName: req.body['family-name']
  };
}

function createFormController() {
  return formController(
    'personal-details.html', 'personalDetails', validation, extractBody
  );
}

module.exports = {
  createFormController
};