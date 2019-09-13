const express = require('express');
const { check } = require('express-validator');
const paths = require('./paths');

const {
  getLandingPage,
  getCcdList,
  getCcdCaseOverview,
  getCcdQuestions,
  postCcdQuestions,
  getReviewClarifyingQuestions,
  getEditClarifyingQuestion,
  postEditClarifyingQuestion,
  getConfirmationClarifyingQuestions
} = require('./controllers/ccdController');

/* eslint-disable-next-line new-cap */
const router = express.Router({});

function validations() {
  return [ check('further-question').not().isEmpty() ];
}

router.get('/', getLandingPage);
router.get(paths.ccdCasesList, getCcdList);
router.get(paths.ccdCaseOverview, getCcdCaseOverview);
router.get(paths.ccdClarifyingQuestions, getCcdQuestions);
router.post(paths.ccdClarifyingQuestions, validations(), postCcdQuestions);
router.get(paths.ccdClarifyingQuestionsReview, getReviewClarifyingQuestions);
router.get(paths.ccdClarifyingQuestionsEdit, getEditClarifyingQuestion);
router.post(paths.ccdClarifyingQuestionsEdit, postEditClarifyingQuestion);
router.get(paths.ccdClarifyingQuestionsConfirmation, getConfirmationClarifyingQuestions);

module.exports = router;
