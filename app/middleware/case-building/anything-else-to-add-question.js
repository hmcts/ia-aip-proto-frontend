const { check } = require('express-validator');
const { validationResult } = require('express-validator');
const paths = require('../../paths');

const template = 'case-building/anything-else-to-add-question.html';
const previousPage = paths.anythingElseToAdd;

function validation(locale) {
  return [ check('answer').isLength({ min: 1 }).withMessage(locale.questions.errors.tooShort) ];
}

function extractBody(req) {
  return {
    answer: req.body.answer
  };
}

function get(req, res) {
  res.render(template, {
    hideBackLink: false,
    previousPage,
    formData: req.session.appealData.anythingElseToAdd
  });
}

function post(req, res) {
  if (!req.session.appealData.anythingElseToAdd.evidence) {
    req.session.appealData.anythingElseToAdd.evidence = [];
  }
  if (req.body.delete && req.session.appealData.anythingElseToAdd.evidence) {
    const submittedFormData = extractBody(req);
    Object.assign(req.session.appealData.anythingElseToAdd, submittedFormData);

    const evidence = req.session.appealData.anythingElseToAdd.evidence;
    evidence.splice(req.body.delete, 1);

    get(req, res);
  } else if (req.body.upload) {
    const fileName = req.body.evidenceUpload;
    if (fileName) {
      const description = req.body.evidenceDescription;
      const evidence = { fileName, description };
      req.session.appealData.anythingElseToAdd.evidence.push(evidence);
    }
    const formData = extractBody(req);
    Object.assign(req.session.appealData.anythingElseToAdd, formData);

    get(req, res);
  } else {
    const errors = validationResult(req);

    const formData = extractBody(req);
    formData.evidence = req.session.appealData.anythingElseToAdd.evidence;

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
        hideBackLink: false,
        previousPage,
        formData: req.session.appealData.anythingElseToAdd,
        errors: {
          errorList,
          fieldErrors
        }
      }));
      return;
    }

    Object.assign(req.session.appealData.anythingElseToAdd, formData);
    if (req.body.saveForLater) {
      req.session.appealData.anythingElseToAdd.draft = true;
    } else {
      req.session.appealData.anythingElseToAdd.completed = true;
    }

    res.redirect(paths.questionsFromTribunal);
  }
}

module.exports = {
  get,
  validation,
  post
};
