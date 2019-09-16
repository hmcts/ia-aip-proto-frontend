const { validationResult } = require('express-validator');
const paths = require('../paths');
const stages = require('../data/tcwStages');
const i18n = require('../locale/en.json');
const { directionsPrepopulated } = require('../data/prepopulatedData');

const {
  CLARIFYING_QUESTIONS_SENT,
  DIRECTED_CASE_MANAGEMENT_APPOINTMENT
} = require('../data/constants');

function getLandingPage(req, res) {
  return res.redirect(`${paths.ccd}${paths.ccdCasesList}`);
}

function getCcdList(req, res) {
  return res.render('ccd/index.html');
}

function getCcdCaseOverview(req, res) {
  const { tcw, directions } = req.session.appealData || null;
  const state = tcw && tcw.state ? tcw.state : null;
  return res.render('ccd/overview.html', { stages, state, directions });
}

function getCcdQuestions(req, res) {
  if (req.query['edit-question']) {
    const questionId = req.query['edit-question'];
    const question = req.session.appealData.questions[questionId];
    return res.render('ccd/edit-clarifying-questions.html', { question });
  }
  const questions = req.session.appealData.questions || [];
  return res.render('ccd/new-clarifying-questions.html', { questions });
}

function postCcdQuestions(req, res) {
  const errorFields = {};
  const errorFormatter = ({ param }) => {
    const text = i18n.tcw.errors[param];
    errorFields[param] = text;
    return {
      text,
      href: `#${param}`
    };
  };
  const questions = req.session.appealData.questions || [];
  const errorList = validationResult(req).formatWith(errorFormatter);
  if (!errorList.isEmpty()) {
    return res.render('ccd/new-clarifying-questions.html',
      { questions, errors: { errorList: errorList.array(), errorFields } }
    );
  }
  
  req.session.appealData = {
    questions: [
      ...questions,
      {
        title: req.body['question-title'], description: req.body['further-question'],
        completed: false
      }
    ]
  };
  if (req.body.hasOwnProperty('new')) return res.redirect(`${paths.ccd}${paths.ccdClarifyingQuestions}`);
  return res.redirect(`${paths.ccd}${paths.ccdClarifyingQuestionsReview}`);
}

function getReviewClarifyingQuestions(req, res) {
  const questions = req.session.appealData.questions;
  return res.render('ccd/new-clarifying-questions-review.html', { questions });
}

function getEditClarifyingQuestion(req, res) {
  const questionId = req.query.question;
  const question = {
    ...req.session.appealData.questions[questionId],
    questionId
  };
  return res.render('ccd/edit-clarifying-questions.html', { question });
}

function postEditClarifyingQuestion(req, res) {
  const questionId = req.query.question;
  const question = {
    title: req.body['question-title'],
    description: req.body['further-question']
  };
  const { questions } = req.session.appealData;
  req.session.appealData.questions = [
    ...questions.slice(0, questionId),
    question,
    ...questions.slice(parseInt(questionId) + 1)
  ];
  return res.redirect(`${paths.ccd}${paths.ccdClarifyingQuestionsReview}`);
}

function getConfirmationClarifyingQuestions(req, res) {
  res.render('ccd/new-clarifying-questions-confirmation.html');
}

function postConfirmationClarifyingQuestions(req, res) {
  Object.assign(req.session.appealData, {
    tcw: {
      state: CLARIFYING_QUESTIONS_SENT
    }
  });
  res.redirect('/ccd/case/overview');
}

function getCaseManagementAppointment(req, res) {
  const directions = req.session.appealData.directions || { ...directionsPrepopulated };
  res.render('ccd/case-management-appointment.html', { directions });
}

function postCaseManagementAppointment(req, res) {
  const errorFields = {};
  const errorFormatter = ({ param }) => {
    const text = i18n.tcw.errors[param];
    errorFields[param] = text;
    return {
      text,
      href: `#${param}`
    };
  };
  const directions = req.session.appealData.directions || { ...directionsPrepopulated };
  const errorList = validationResult(req).formatWith(errorFormatter);
  if (!errorList.isEmpty()) {
    return res.render('ccd/case-management-appointment.html',
      { directions, errors: { errorList: errorList.array(), errorFields } }
    );
  }
  
  req.session.appealData = {
    directions: {
      appellant: req.body['appellant-direction'],
      respondent: req.body['respondent-direction'],
      date: {
        year: req.body.date__year,
        month: req.body.date__month,
        day: req.body.date__day,
        hours: req.body.date__hours,
        minutes: req.body.date__minutes,
        seconds: req.body.date__seconds
      }
    }
  };

  return res.redirect(`${paths.ccd}${paths.ccdCaseManagementAppointmentReview}`);
}

function getCaseManagementAppointmentReview(req, res) {
  const directions = req.session.appealData.directions || { ...directionsPrepopulated };
  
  res.render('ccd/case-management-appointment-review.html', { directions });
}

function postCaseManagementAppointmentReview(req, res) {
  Object.assign(req.session.appealData, {
    tcw: {
      state: DIRECTED_CASE_MANAGEMENT_APPOINTMENT
    }
  });
  res.redirect(`${paths.ccd}${paths.ccdCaseManagementAppointmentConfirmation}`);
}

function getCaseManagementAppointmentConfirmation(req, res) {
  res.render('ccd/case-management-appointment-confirmation.html');
}

module.exports = {
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
  getCaseManagementAppointmentConfirmation
};
