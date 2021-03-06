const { check } = require('express-validator');
const { validationResult } = require('express-validator');
const paths = require('../../paths');

const template = 'case-building/question.html';
const previousPage = paths.questionsFromTribunal;

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
    question: req.session.appealData.questions[req.query.index],
    questionIndex: req.query.index
  });
}

function post(req, res) {
  if (!req.session.appealData.questions[req.query.index].evidence) {
    req.session.appealData.questions[req.query.index].evidence = [];
  }
  if (req.body.delete && req.session.appealData.questions[req.query.index].evidence) {
    const submittedFormData = extractBody(req);
    Object.assign(req.session.appealData.questions[req.query.index], submittedFormData);

    const evidence = req.session.appealData.questions[req.query.index].evidence;
    evidence.splice(req.body.delete, 1);

    get(req, res);
  } else if (req.body.upload) {
    const fileName = req.body.evidenceUpload;
    if (fileName) {
      const description = req.body.evidenceDescription;
      const evidence = { fileName, description };
      req.session.appealData.questions[req.query.index].evidence.push(evidence);
    }
    const formData = extractBody(req);
    Object.assign(req.session.appealData.questions[req.query.index], formData);

    res.redirect(`${paths.question}?index=${req.query.index}#fileUpload`);
  } else {
    const errors = validationResult(req);

    const formData = extractBody(req);
    formData.evidence = req.session.appealData.questions[req.query.index].evidence;

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
        question: req.session.appealData.questions[req.query.index],
        questionIndex: req.query.index,
        errors: {
          errorList,
          fieldErrors
        }
      }));
      return;
    }

    Object.assign(req.session.appealData.questions[req.query.index], formData);
    if (req.body.saveForLater) {
      req.session.appealData.questions[req.query.index].draft = true;
      res.redirect(paths.questionsFromTribunal);
    } else {
      req.session.appealData.questions[req.query.index].completed = true;
      // eslint-disable-next-line max-len
      res.redirect(`${paths.caseBuildingDoYouWantToUploadEvidenceQuestions}?index=${req.query.index}`);
    }
  }
}

module.exports = {
  get,
  validation,
  post
};
