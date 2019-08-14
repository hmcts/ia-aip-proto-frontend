const express = require('express');
const paths = require('./paths');

const homeOfficeController = require('./middleware/home-office-details');

/* eslint-disable new-cap */
const router = express.Router({});
/* eslint-enable new-cap */

router.use(paths.taskList, require('./middleware/task-list'));
router.get(paths.homeOfficeDetails, homeOfficeController.get);
router.post(paths.homeOfficeDetails, homeOfficeController.validation(), homeOfficeController.post);
router.use(paths.checkAnswers, require('./middleware/check-answers'));
router.use(paths.health, require('./middleware/health'));
router.use(paths.robots, require('./middleware/robots'));
router.use(paths.endSession, require('./middleware/end-session'));
router.use(paths.index, require('./middleware/start'));

module.exports = router;
