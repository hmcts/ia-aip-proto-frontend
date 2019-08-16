const { formController } = require('./form-controller');

function validation() {
  return [];
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