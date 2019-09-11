const express = require('express');
const paths = require('./paths');
const stages = require('./data/tcwStages');

/* eslint-disable-next-line new-cap */
const router = express.Router({});

function getLandingPage(req, res) {
  return res.redirect(`${paths.ccd}${paths.ccdCasesList}`);
}

function getCcdList(req, res) {
  return res.render('ccd/index.html');
}

function getCcdCaseOverview(req, res) {
  return res.render('ccd/overview.html', { stages });
}

function getCcdQuestions(req, res) {
  const questions = req.session.appealData.questions || [];
  return res.render('ccd/question.html', { questions });
}

function postCcdQuestions(req, res) {
  const previousQuestions = req.session.appealData.questions || [];
  req.session.appealData = {
    questions: [...previousQuestions, { title: 'title', description: req.body['further-question'], completed: false }]
  };
  return res.redirect('questions');
}

router.get('/', getLandingPage);
router.get(paths.ccdCasesList, getCcdList);
router.get(paths.ccdCaseOverview, getCcdCaseOverview);
router.get(paths.ccdQuestions, getCcdQuestions);
router.post(paths.ccdQuestions, postCcdQuestions);

module.exports = router;
