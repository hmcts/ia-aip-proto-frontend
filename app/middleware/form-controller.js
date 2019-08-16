const paths = require('../paths');
const { validationResult } = require('express-validator');

function formController(
  template, sessionGroupName, sessionFieldName, validateMethod, extractBodyMethod, extraFieldErrors
) {
  return {
    get(req, res) {
      const formData = req.session.appealData[sessionGroupName][sessionFieldName];

      res.render(template, { formData });
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
          errors: {
            errorList,
            fieldErrors
          }
        });
        return;
      }

      formData.completed = true;
      req.session.appealData[sessionGroupName][sessionFieldName] = formData;

      res.redirect(paths.taskList);
    }
  };
}

module.exports = {
  formController
};