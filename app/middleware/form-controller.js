const paths = require('../paths');
const { validationResult } = require('express-validator');

function isFunction(functionToCheck) {
  return functionToCheck && {}.toString.call(functionToCheck) === '[object Function]';
}

function formController(
  template,
  sessionGroupName,
  sessionFieldName,
  validateMethod,
  extractBodyMethod,
  extraFieldErrors,
  extraModelData,
  nextPage = paths.taskList,
  previousPage = paths.taskList
) {
  return {
    get(req, res) {
      const formData = req.session.appealData[sessionGroupName][sessionFieldName];
      const extraData = extraModelData ? extraModelData(req, res) : {};

      const model = Object.assign({ formData, previousPage }, extraData);

      res.render(template, model);
    },

    validation: validateMethod,

    post(req, res) {
      const errors = validationResult(req);

      const formData = extractBodyMethod(req);

      if (!errors.isEmpty()) {
        const fieldErrors = {};
        const fileErrorMessage = [];
        const errorList = errors.formatWith(({ msg, param }) => {
          fieldErrors[param] = {
            text: msg,
            class: ' govuk-input--error'
          };
          return {
            text: msg === 'Invalid value(s)' ? 'Please select a one value' : msg,
            href: `#${param}`
          };
        }).array().filter(v => {
          const alreadySeen = fileErrorMessage.indexOf(v.text) === -1;
          fileErrorMessage.push(v.text);
          return alreadySeen;
        });

        if (extraFieldErrors) {
          extraFieldErrors(fieldErrors);
        }

        const extraData = extraModelData ? extraModelData(req, res) : {};
        res.render(template, Object.assign({
          formData,
          previousPage,
          errors: {
            errorList,
            fieldErrors
          }
        }, extraData));
        return;
      }

      const redirectTo = (isFunction(nextPage)) ? nextPage(formData, req) : nextPage;
      if (req.body.saveForLater) {
        formData.draft = true;
      } else if (redirectTo === paths.taskList || redirectTo === paths.hearingAppellantTaskList) {
        formData.completed = true;
      }
      Object.assign(req.session.appealData[sessionGroupName][sessionFieldName], formData);

      res.redirect(redirectTo);
    }
  };
}

module.exports = {
  formController
};
