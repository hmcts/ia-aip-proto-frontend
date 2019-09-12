const { formController } = require('../form-controller');
const { check } = require('express-validator');
const paths = require('../../paths');

function validation(locale) {
  return [
    // eslint-disable-next-line max-len
    check('vulnerabilities-list').not().isEmpty().withMessage(locale.hearingRequirements.vulnerabilitiesList.errors.selectAnOption)
  ];
}

function extractBody(req) {
  const vulnerabilities = req.body['vulnerabilities-list'] ? req.body['vulnerabilities-list'] : [];

  return {
    hearingImpairment: vulnerabilities.indexOf('Hearing impairment') > -1,
    physicalDisability: vulnerabilities.indexOf('Physical disability') > -1,
    illHealth: vulnerabilities.indexOf('Ill health') > -1,
    cognitiveImpairment: vulnerabilities.indexOf('Cognitive impairment') > -1,
    learningDisability: vulnerabilities.indexOf('Learning disability') > -1,
    mentalHealthDisorder: vulnerabilities.indexOf('Mental health disorder') > -1,
    // eslint-disable-next-line max-len
    domesticViolence: vulnerabilities.indexOf('Experience if domestic violence, sexual abuse, trafficking or torture') > -1,
    other: vulnerabilities.indexOf('Other') > -1
  };
}

function createFormController() {
  return formController(
    'hearing-requirements/vulnerabilities-list.html',
    'hearingRequirements',
    'vulnerabilities',
    validation,
    extractBody,
    false,
    false,
    paths.hearingAppellantTaskList,
    paths.hearingVulnerabilities
  );
}

module.exports = {
  createFormController
};
