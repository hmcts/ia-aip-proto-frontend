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
  const formData = req.session.appealData.appealDetails.reasonsForAppeal;

  const model = Object.assign({
    formData,
    previousPage,
    action: '/case-building/upload-evidence'
  });

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
      const description = req.body.evidenceDescription;
      const evidence = { fileName, description };
      req.session.appealData.appealDetails.reasonsForAppeal.evidence.push(evidence);
    }
    const formData = extractBody(req);
    Object.assign(req.session.appealData.appealDetails.reasonsForAppeal, formData);

    // change
    res.redirect(paths.caseBuildingUploadEvidence);
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
    if (req.body.saveForLater) {
      req.session.appealData.appealDetails.reasonsForAppeal.draft = true;
      // change
      res.redirect(paths.caseBuildingOverview);
    } else {
      req.session.appealData.appealDetails.reasonsForAppeal.completed = true;
      // change
      res.redirect(paths.caseBuildingCheckAnswers);
    }
  }
}

module.exports = {
  get,
  validation,
  post
};
