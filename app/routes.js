const express = require('express');
const paths = require('./paths');
const locale = require('./locale/en.json');

const homeOfficeController = require('./middleware/home-office-details');
const personalDetailsController = require('./middleware/persoanl-details');
const dateOfBirthController = require('./middleware/date-of-birth');
const contactDetailsController = require('./middleware/contact-details');
const typeOfAppealController = require('./middleware/type-of-appeal');
const reasonsForAppealController = require('./middleware/case-building/reasons-for-appeal');
const checkAnswersController = require('./middleware/check-answers');
const questionsController = require('./middleware/case-building/question');

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
setupFormController(paths.checkAnswers, checkAnswersController);

router.get(paths.reasonsForAppeal, reasonsForAppealController.get);
router.post(paths.reasonsForAppeal, reasonsForAppealController.validation(locale), reasonsForAppealController.post);

router.get(paths.question, questionsController.get);
router.post(paths.question, questionsController.validation(locale), questionsController.post);

router.use(paths.appealSubmitted, require('./middleware/appeal-submitted'));
router.use(paths.health, require('./middleware/health'));
router.use(paths.readiness, (req, res) => res.json({}));
router.use(paths.liveness, (req, res) => res.json({}));
router.use(paths.robots, require('./middleware/robots'));
router.use(paths.endSession, require('./middleware/end-session'));
router.use(paths.signIn, require('./middleware/idam/sign-in'));
router.use(paths.register, require('./middleware/idam/register'));
router.use(paths.checkYourEmail, require('./middleware/idam/check-your-email'));
router.use(paths.createPassword, require('./middleware/idam/create-password'));
router.use(paths.accountCreated, require('./middleware/idam/account-created'));
router.use(paths.caseBuildingOverview, require('./middleware/case-building/overview'));
router.use(paths.questionsFromTribunal, require('./middleware/case-building/questions-from-tribunal'));
router.use(paths.questionCheckAnswers, require('./middleware/case-building/questions-check-answers'));
router.use(paths.whyAppealingDescription, require('./middleware/case-building/why-appealing-description'));
router.use(paths.caseBuildingCheckAnswers, require('./middleware/case-building/check-answers'));
router.use(paths.caseBuildingSubmitted, require('./middleware/case-building/submitted'));
router.use(paths.start, require('./middleware/start'));
router.use(paths.index, require('./middleware/start'));

module.exports = router;
