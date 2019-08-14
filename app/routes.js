const express = require('express');
const paths = require('./paths');

/* eslint-disable new-cap */
const router = express.Router({});
/* eslint-enable new-cap */

router.use(paths.taskList, require('./middleware/task-list'));
router.use(paths.health, require('./middleware/health'));
router.use(paths.robots, require('./middleware/robots'));
router.use(paths.index, require('./middleware/start'));

module.exports = router;
