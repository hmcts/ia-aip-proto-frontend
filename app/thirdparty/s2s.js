const rp = require('request-promise');
const serviceAuthProviderClient = require('@hmcts/div-service-auth-provider-client');
const config = require('config');
const { Logger } = require('@hmcts/nodejs-logging');

const microservice = config.get('microservice');
const s2sSecret = config.get('s2s.secret');
const s2sUrl = config.get('s2s.url');
const idamUrl = config.get('idam.url');
const systemUpdateUser = config.get('idam.user');
const systemUpdatePassword = config.get('idam.password');
const clientSecret = config.get('idam.clientSecret');
const redirectUrl = config.get('idam.redirectUrl');

const logger = Logger.getLogger('question.ts');

const timeout = 5000;

async function generateServiceHeader() {
  const client = serviceAuthProviderClient.init({
    apiBaseUrl: s2sUrl,
    microservice: 'sscs',
    secret: s2sSecret
  });

  const header = await client.lease();
  return header;
}

async function authorize() {
  try {
    const body = await rp.post({
      uri: `${idamUrl}/oauth2/authorize`,
      json: true,
      headers: {
        Accept: 'application/json'
      },
      auth: {
        user: systemUpdateUser,
        pass: systemUpdatePassword
      },
      form: {
        response_type: 'code',
        client_id: microservice,
        redirect_uri: redirectUrl
      },
      timeout
    });

    return Promise.resolve(body);
  } catch (error) {
    logger.error('Error authorize', error);
  }
  return Promise.resolve(null);
}

async function getToken(code) {
  try {
    const body = await rp.post({
      uri: `${idamUrl}/oauth2/token`,
      json: true,
      form: {
        code,
        grant_type: 'authorization_code',
        redirect_uri: redirectUrl,
        client_id: microservice,
        client_secret: clientSecret
      },
      timeout
    });
    return Promise.resolve(body);
  } catch (error) {
    logger.error('Error getToken', error);
  }

  return Promise.resolve(null);
}

async function getUerDetails(headers) {
  try {
    const body = await rp.get({
      uri: `${idamUrl}/details`,
      headers,
      json: true,
      timeout
    });
    return Promise.resolve(body);
  } catch (error) {
    logger.error('Error getToken', error);
  }

  return Promise.resolve(null);
}


async function generateUserHeader() {
  const authorizeToken = await authorize();
  const tokenResponse = await getToken(authorizeToken.code);
  return tokenResponse.access_token;
}

async function generateHeaders() {
  const userHeader = await generateUserHeader();
  const serviceHeader = await generateServiceHeader();
  return {
    Authorization: `Bearer ${userHeader}`,
    ServiceAuthorization: `Bearer ${serviceHeader}`
  };
}

module.exports = {
  generateHeaders,
  getUerDetails
};
