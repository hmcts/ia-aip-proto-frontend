const express = require('express');
const paths = require('./paths');

/* eslint-disable new-cap */
const router = express.Router({});
/* eslint-enable new-cap */

router.use(paths.taskList, require('./middleware/task-list'));
router.get(paths.homeOfficeDetails, require('./middleware/home-office-details').get);
router.post(paths.homeOfficeDetails, require('./middleware/home-office-details').post);
router.use(paths.health, require('./middleware/health'));
router.use(paths.robots, require('./middleware/robots'));
router.use(paths.index, require('./middleware/start'));

module.exports = router;
