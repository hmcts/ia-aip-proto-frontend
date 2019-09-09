const express = require('express');
const paths = require('./paths');

/* eslint-disable-next-line new-cap */
const router = express.Router({});

function getLandingPage(req, res) {
  return res.redirect(`${paths.ccd}${paths.ccdListCase}`);
}

function getCcdList(req, res) {
  return res.render('ccd/index.html');
}

router.get('/', getLandingPage);
router.get(paths.ccdListCase, getCcdList);

module.exports = router;
