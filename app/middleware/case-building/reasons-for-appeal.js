const { check } = require('express-validator');
const { validationResult } = require('express-validator');
const paths = require('../../paths');

const template = 'case-building/reasons-for-appeal.html';
const previousPage = paths.whyAppealingDescription;


function validation(locale) {
  return [ check('why').isLength({ min: 1 }).withMessage(locale.reasonsForAppeal.errors.tooShort) ];
}

function extractBody(req) {
  return {
    why: req.body.why
  };
}

function get(req, res) {
  const formData = req.session.appealData.appealDetails.reasonsForAppeal;

  const model = Object.assign({ formData, previousPage });

  res.render(template, model);
}

function post(req, res) {
  if (!req.session.appealData.appealDetails.reasonsForAppeal.evidence) {
    req.session.appealData.appealDetails.reasonsForAppeal.evidence = [];
  }
  if (req.body.delete && req.session.appealData.appealDetails.reasonsForAppeal.evidence) {
    const submittedFormData = extractBody(req);
    Object.assign(req.session.appealData.appealDetails.reasonsForAppeal, submittedFormData);

    const evidence = req.session.appealData.appealDetails.reasonsForAppeal.evidence;
    evidence.splice(req.body.delete, 1);

    get(req, res);
  } else if (req.body.upload) {
    const fileName = req.body.evidenceUpload;
    if (fileName) {
      req.session.appealData.appealDetails.reasonsForAppeal.evidence.push(fileName);
    }
    const formData = extractBody(req);
    Object.assign(req.session.appealData.appealDetails.reasonsForAppeal, formData);

    get(req, res);
  } else {
    const errors = validationResult(req);

    const formData = extractBody(req);
    formData.evidence = req.session.appealData.appealDetails.reasonsForAppeal.evidence;

    if (!errors.isEmpty()) {
      const fieldErrors = {};
      const fileErrorMessage = [];
      const errorList = errors.formatWith(({ msg, param }) => {
        fieldErrors[param] = {
          text: msg,
          class: ' govuk-input--error'
        };
        return {
          text: msg,
          href: `#${param}`
        };
      }).array().filter(v => {
        const alreadySeen = fileErrorMessage.indexOf(v.text) === -1;
        fileErrorMessage.push(v.text);
        return alreadySeen;
      });

      res.render(template, Object.assign({
        formData,
        previousPage,
        errors: {
          errorList,
          fieldErrors
        }
      }));
      return;
    }

    Object.assign(req.session.appealData.appealDetails.reasonsForAppeal, formData);

    res.redirect(paths.caseBuildingCheckAnswers);
  }
}

module.exports = {
  get,
  validation,
  post
};
