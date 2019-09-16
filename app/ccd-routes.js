const express = require('express');
const paths = require('./paths');
const { clarifyingQuestionsValidations } = require('./utils/validators');

const {
  getLandingPage,
  getCcdList,
  getCcdCaseOverview,
  getCcdQuestions,
  postCcdQuestions,
  getReviewClarifyingQuestions,
  getEditClarifyingQuestion,
  postEditClarifyingQuestion,
  getConfirmationClarifyingQuestions,
  postConfirmationClarifyingQuestions,
  getCaseManagementAppointment,
  postCaseManagementAppointment
} = require('./controllers/ccdController');

/* eslint-disable-next-line new-cap */
const router = express.Router({});

router.get('/', getLandingPage);
router.get(paths.ccdCasesList, getCcdList);
router.get(paths.ccdCaseOverview, getCcdCaseOverview);
router.get(paths.ccdClarifyingQuestions, getCcdQuestions);
router.post(paths.ccdClarifyingQuestions, clarifyingQuestionsValidations(), postCcdQuestions);
router.get(paths.ccdClarifyingQuestionsReview, getReviewClarifyingQuestions);
router.get(paths.ccdClarifyingQuestionsEdit, getEditClarifyingQuestion);
router.post(paths.ccdClarifyingQuestionsEdit, postEditClarifyingQuestion);
router.get(paths.ccdClarifyingQuestionsConfirmation, getConfirmationClarifyingQuestions);
router.post(paths.ccdClarifyingQuestionsConfirmation, postConfirmationClarifyingQuestions);
router.get(paths.ccdCaseManagementAppointment, getCaseManagementAppointment);
router.post(paths.ccdCaseManagementAppointment, postCaseManagementAppointment);

module.exports = router;
