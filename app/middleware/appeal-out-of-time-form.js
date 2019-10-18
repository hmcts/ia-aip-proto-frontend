const { check } = require('express-validator');
const { formController } = require('./form-controller');
const paths = require('../paths');

function validation() {
  return [check('reason').not().isEmpty().withMessage('Enter the reason your appeal is late')];
}

function extractBody(req) {
  return {
    reason: req.body.reason,
    fileUpload: req.body['file-upload'],
    file: req.body.file
  };
}

// eslint-disable-next-line no-unused-vars
function saveAndRedirect(formData = null, req) {
  return paths.taskList;
}

function createFormController() {
  return formController(
    'appeal-out-of-time.html',
    'yourDetails',
    'homeOffice',
    validation,
    extractBody,
    false,
    false,
    saveAndRedirect
  );
}

module.exports = {
  createFormController
};
