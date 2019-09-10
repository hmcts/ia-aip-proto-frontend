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

router.get('/', getLandingPage);
router.get(paths.ccdCasesList, getCcdList);
router.get(paths.ccdCaseOverview, getCcdCaseOverview);

module.exports = router;
