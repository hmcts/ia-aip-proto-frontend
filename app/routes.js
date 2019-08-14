const express = require('express');
const paths = require('./paths');

/* eslint-disable new-cap */
const router = express.Router({});
/* eslint-enable new-cap */

router.use(paths.index, require('./middleware/start'));
router.use(paths.health, require('./middleware/health'));
router.use(paths.robots, require('./middleware/robots'));

module.exports = router;
