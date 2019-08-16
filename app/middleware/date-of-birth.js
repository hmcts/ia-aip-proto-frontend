const { formController } = require('./form-controller');
const paths = require('../paths');

function validation() {
  return [];
}

function extractBody(req) {
  return {
    dateOfBirth: {
      day: req.body['date-of-birth-day'],
      month: req.body['date-of-birth-month'],
      year: req.body['date-of-birth-year']
    }
  };
}

function createFormController() {
  return formController(
    'date-of-birth.html',
    'yourDetails',
    'personalDetails',
    validation,
    extractBody,
    false,
    paths.taskList,
    paths.personalDetails
  );
}

module.exports = {
  createFormController
};