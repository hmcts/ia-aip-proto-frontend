const express = require('express');
const paths = require('./paths');
const locale = require('./locale/en.json');

const homeOfficeController = require('./middleware/home-office-details');
const personalDetailsController = require('./middleware/persoanl-details');
const dateOfBirthController = require('./middleware/date-of-birth');
const contactDetailsController = require('./middleware/contact-details');
const typeOfAppealController = require('./middleware/type-of-appeal');
const reasonsForAppealController = require('./middleware/reasons-for-appeal');
const checkAnswersController = require('./middleware/check-answers');

/* eslint-disable new-cap */
const router = express.Router({});
/* eslint-enable new-cap */

function setupFormController(path, formController) {
  const formControllerInstance = formController.createFormController();
  router.get(path, formControllerInstance.get);
  router.post(path, formControllerInstance.validation(locale), formControllerInstance.post);
}

router.use(paths.taskList, require('./middleware/task-list'));

setupFormController(paths.homeOfficeDetails, homeOfficeController);
setupFormController(paths.personalDetails, personalDetailsController);
setupFormController(paths.dateOfBirth, dateOfBirthController);
setupFormController(paths.contactDetails, contactDetailsController);
setupFormController(paths.typeOfAppeal, typeOfAppealController);
setupFormController(paths.reasonsForAppeal, reasonsForAppealController);
setupFormController(paths.checkAnswers, checkAnswersController);

router.use(paths.appealSubmitted, require('./middleware/appeal-submitted'));
router.use(paths.health, require('./middleware/health'));
router.use(paths.robots, require('./middleware/robots'));
router.use(paths.endSession, require('./middleware/end-session'));
router.use(paths.index, require('./middleware/start'));

module.exports = router;
