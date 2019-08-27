const rp = require('request-promise');
const config = require('config');
const { getUerDetails } = require('./s2s');

const ccdBaseUrl = config.get('ccd.url');
const jurisdictionId = config.get('ccd.jurisdictionId');
const caseType = config.get('ccd.caseType');

function submitCase(headers, userDetails, startCaseResponse, appealData, next, errorFunction) {
  const options = {
    method: 'POST',
    // eslint-disable-next-line max-len
    uri: `${ccdBaseUrl}/caseworkers/${userDetails.id}/jurisdictions/${jurisdictionId}/case-types/${caseType}/cases?ignore-warning=true`,
    headers: {
      Authorization: headers.Authorization,
      ServiceAuthorization: headers.ServiceAuthorization,
      'content-type': 'application/json'
    },
    body: {
      event: {
        id: startCaseResponse.event_id,
        summary: 'summary',
        description: 'description'
      },
      // eslint-disable-next-line id-blacklist
      data: {
        appellantGivenNames: appealData.yourDetails.personalDetails.givenNames,
        appellantFamilyName: appealData.yourDetails.personalDetails.familyName,
        homeOfficeReferenceNumber: appealData.yourDetails.homeOffice.refNumber
      },
      event_token: startCaseResponse.token
    },
    json: true
  };
  rp(options).then(response => {
    // eslint-disable-next-line no-console
    console.log(response);

    return next();
  }).catch(error => errorFunction(error));
}

function createCase(headers, appealData, next, errorFunction) {
  getUerDetails(headers).then(userDetails => {
    const options = {
      method: 'GET',
      // eslint-disable-next-line max-len
      uri: `${ccdBaseUrl}/caseworkers/${userDetails.id}/jurisdictions/${jurisdictionId}/case-types/${caseType}/event-triggers/startAppeal/token`,
      headers: {
        Authorization: headers.Authorization,
        ServiceAuthorization: headers.ServiceAuthorization,
        'content-type': 'application/json'
      },
      json: true
    };
    rp(options).then(response => {
      // eslint-disable-next-line no-console
      console.log(response);

      return submitCase(headers, userDetails, response, appealData, next);
    }).catch(error => errorFunction(error));
  });
}

module.exports = {
  createCase
};
