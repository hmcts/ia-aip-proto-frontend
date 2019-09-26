const { validationResult } = require('express-validator');
const paths = require('../../paths');

const template = 'case-building/upload-evidence.html';
// change
const previousPage = paths.caseBuildingDoYouWantToUploadEvidence;


function validation() {
  return [ ];
}

function extractBody() {
  return {};
}

function get(req, res) {
  // change
  const formData = req.session.appealData.anythingElseToAdd;

  const model = Object.assign({
    formData,
    previousPage,
    action: paths.caseBuildingUploadEvidenceAnythingElse
  });

  res.render(template, model);
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

    // change
    res.redirect(paths.caseBuildingUploadEvidenceAnythingElse);
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
        formData,
        previousPage,
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
      // change
      res.redirect(paths.questionsFromTribunal);
    } else {
      req.session.appealData.anythingElseToAdd.completed = true;
      // change
      res.redirect(paths.questionCheckAnswers);
    }
  }
}

module.exports = {
  get,
  validation,
  post
};
