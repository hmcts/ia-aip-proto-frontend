const { check } = require('express-validator');
const { formController } = require('./form-controller');

function extractDataFromSession(req) {
  return req.session.appealData.yourDetails.personalDetails;
}

function setDataToSession(req, formData) {
  req.session.appealData.yourDetails.personalDetails = formData;
}

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
    'personal-details.html', extractDataFromSession, setDataToSession, validation, extractBody
  );
}

module.exports = {
  createFormController
};