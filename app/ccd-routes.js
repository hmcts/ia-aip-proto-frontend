const express = require('express');
const paths = require('./paths');
const {
  caseManagementAppointmentValidations,
  clarifyingQuestionsValidations,
  directionsExplanationValidations
} = require('./utils/validators');

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
  postCaseManagementAppointment,
  getCaseManagementAppointmentReview,
  postCaseManagementAppointmentReview,
  getCaseManagementAppointmentConfirmation,
  getDirectionOptions,
  postDirectionOptions,
  getDirectionExplanation,
  postDirectionExplanation
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
router.post(paths.ccdCaseManagementAppointment, caseManagementAppointmentValidations(), postCaseManagementAppointment);
router.get(paths.ccdCaseManagementAppointmentReview, getCaseManagementAppointmentReview);
router.post(paths.ccdCaseManagementAppointmentReview, postCaseManagementAppointmentReview);
router.get(paths.ccdCaseManagementAppointmentConfirmation, getCaseManagementAppointmentConfirmation);
router.get(paths.ccdsendDirectionOptions, getDirectionOptions);
router.get(paths.ccdsendDirectionOptions, postDirectionOptions);
router.get(paths.ccdDirectionExplanation, getDirectionExplanation);
router.post(paths.ccdDirectionExplanation, directionsExplanationValidations(), postDirectionExplanation);

module.exports = router;
