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
const ccdController = require('./ccd-routes');
const anythingElseToAddController = require('./middleware/case-building/anything-else-to-add');
const anythingElseToAddQuestionController = require('./middleware/case-building/anything-else-to-add-question');
const hearingAppellantComing = require('./middleware/hearing-requirements/appellant-coming');
const hearingGiveEvidence = require('./middleware/hearing-requirements/give-evidence');
const hearingWitnesses = require('./middleware/hearing-requirements/witnesses');
const hearingWitnessesNumber = require('./middleware/hearing-requirements/witnesses-number');
const hearingInterpreter = require('./middleware/hearing-requirements/interpreter');
const hearingInterpreterDetails = require('./middleware/hearing-requirements/interpreter-details');
const hearingStepFree = require('./middleware/hearing-requirements/step-free');
const hearingLoop = require('./middleware/hearing-requirements/hearing-loop');
const hearingVulnerabilities = require('./middleware/hearing-requirements/vulnerabilities');
const hearingVulnerabilitiesList = require('./middleware/hearing-requirements/vulnerabilities-list');
const hearingVulnerabilitiesDescription = require('./middleware/hearing-requirements/vulnerabilities-description');
const hearingMultimediaEvidence = require('./middleware/hearing-requirements/multimedia-evidence');
// eslint-disable-next-line max-len
const hearingMultimediaEvidenceDescription = require('./middleware/hearing-requirements/multimedia-evidence-description');
const hearingAllMaleFemaleCourt = require('./middleware/hearing-requirements/all-male-female-court');
const hearingAllMaleFemaleCourtSelection = require('./middleware/hearing-requirements/all-male-female-court-selection');
// eslint-disable-next-line max-len
const hearingAllMaleFemaleCourtDescription = require('./middleware/hearing-requirements/all-male-female-court-description');
const hearingInCameraCourt = require('./middleware/hearing-requirements/in-camera-court');

/* eslint-disable new-cap */
const router = express.Router({});
/* eslint-enable new-cap */

function setupFormController(path, formController) {
  const formControllerInstance = formController.createFormController();
  router.get(path, formControllerInstance.get);
  router.post(path, formControllerInstance.validation(locale), formControllerInstance.post);
}

// CCD Routes
router.use(paths.ccd, ccdController);
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
router.use(paths.questionSubmitted, require('./middleware/case-building/questions-submitted'));
router.use(paths.whyAppealingDescription, require('./middleware/case-building/why-appealing-description'));
router.use(paths.caseBuildingCheckAnswers, require('./middleware/case-building/check-answers'));
router.use(paths.caseBuildingSubmitted, require('./middleware/case-building/submitted'));
router.get(paths.anythingElseToAdd, anythingElseToAddController.get);
router.post(paths.anythingElseToAdd, anythingElseToAddController.post);
router.get(paths.anythingElseToAddQuestion, anythingElseToAddQuestionController.get);
// eslint-disable-next-line max-len
router.post(paths.anythingElseToAddQuestion, anythingElseToAddQuestionController.validation(locale), anythingElseToAddQuestionController.post);
// eslint-disable-next-line max-len
router.use(paths.emailQuestions, require('./middleware/email/questions'));
router.use(paths.emailReasonsForAppeal, require('./middleware/email/reasons-for-appeal'));
router.use(paths.emailRegister, require('./middleware/email/regsiter'));
router.use(paths.flow, require('./middleware/flow'));

router.use(paths.hearingAppellantTaskList, require('./middleware/hearing-requirements/task-list'));
setupFormController(paths.hearingAppellantComing, hearingAppellantComing);
setupFormController(paths.hearingGiveEvidence, hearingGiveEvidence);
setupFormController(paths.hearingWitnesses, hearingWitnesses);
setupFormController(paths.hearingWitnessesNumber, hearingWitnessesNumber);
setupFormController(paths.hearingInterpreter, hearingInterpreter);
setupFormController(paths.hearingInterpreterDetails, hearingInterpreterDetails);
setupFormController(paths.hearingStepFree, hearingStepFree);
setupFormController(paths.hearingHearingLoop, hearingLoop);
setupFormController(paths.hearingVulnerabilities, hearingVulnerabilities);
setupFormController(paths.hearingVulnerabilitiesList, hearingVulnerabilitiesList);
setupFormController(paths.hearingVulnerabilitiesDescription, hearingVulnerabilitiesDescription);
setupFormController(paths.hearingMultimediaEvidence, hearingMultimediaEvidence);
setupFormController(paths.hearingMultimediaEvidenceDescription, hearingMultimediaEvidenceDescription);
setupFormController(paths.hearingAllMaleFemaleCourt, hearingAllMaleFemaleCourt);
setupFormController(paths.hearingAllMaleFemaleCourtSelection, hearingAllMaleFemaleCourtSelection);
setupFormController(paths.hearingAllMaleFemaleCourtDescription, hearingAllMaleFemaleCourtDescription);
setupFormController(paths.hearingInCameraCourt, hearingInCameraCourt);

router.use(paths.start, require('./middleware/start'));
router.use(paths.index, require('./middleware/start'));

module.exports = router;
