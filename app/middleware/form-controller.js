const paths = require('../paths');
const { validationResult } = require('express-validator');

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
        const errorList = errors.formatWith(({ msg, param }) => {
          fieldErrors[param] = {
            text: msg,
            class: ' govuk-input--error'
          };
          return {
            text: msg,
            href: `#${param}`
          };
        }).array();

        if (extraFieldErrors) {
          extraFieldErrors(fieldErrors);
        }

        res.render(template, {
          formData,
          previousPage,
          errors: {
            errorList,
            fieldErrors
          }
        });
        return;
      }

      if (nextPage === paths.taskList) {
        formData.completed = true;
      }
      Object.assign(req.session.appealData[sessionGroupName][sessionFieldName], formData);

      res.redirect(nextPage);
    }
  };
}

module.exports = {
  formController
};