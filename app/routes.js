const express = require('express');
const paths = require('./paths');

const homeOfficeController = require('./middleware/home-office-details');
const personalDetailsController = require('./middleware/persoanl-details');
const contactDetailsController = require('./middleware/contact-details');

/* eslint-disable new-cap */
const router = express.Router({});
/* eslint-enable new-cap */

function setupFormController(path, formController) {
  const formControllerInstance = formController.createFormController();
  router.get(path, formControllerInstance.get);
  router.post(path, formControllerInstance.validation(), formControllerInstance.post);
}

router.use(paths.taskList, require('./middleware/task-list'));

setupFormController(paths.homeOfficeDetails, homeOfficeController);
setupFormController(paths.personalDetails, personalDetailsController);
setupFormController(paths.contactDetails, contactDetailsController);

router.use(paths.checkAnswers, require('./middleware/check-answers'));
router.use(paths.health, require('./middleware/health'));
router.use(paths.robots, require('./middleware/robots'));
router.use(paths.endSession, require('./middleware/end-session'));
router.use(paths.index, require('./middleware/start'));

module.exports = router;
