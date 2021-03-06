const { Express } = require('@hmcts/nodejs-logging');
// const { Logger } = require('@hmcts/nodejs-logging');

const appInsights = require('./app-insights');
const express = require('express');
const nunjucks = require('nunjucks');
const security = require('./security');

const locale = require('./app/locale/en.json');
const routes = require('./app/routes');

const session = require('express-session');
// const redis = require('redis');
// const RedisStore = require('connect-redis')(session);
const config = require('config');
const bodyParser = require('body-parser');
const createModel = require('./app/middleware/create-model');
const moment = require('moment');

// const logger = Logger.getLogger('server.js');


const notFoundHandler = require('./app/middleware/errors/404-not-found');
const internalServerErrorHandler = require('./app/middleware/errors/500-internal-server-error');

function dateFilter(dateObj) {
  const {
    day,
    month,
    year,
    hours,
    minutes,
    seconds
  } = dateObj;

  return moment(`${day}-${month}-${year} ${hours}:${minutes}:${seconds}`).format('DD/MM/YYYY HH:mm:ss');
}

function isString(obj) {
  return typeof obj === 'string';
}

function create(options) {
  const opts = options || {};
  if (!opts.disableAppInsights) {
    appInsights.enable();
  }

  const app = express();

  // const redisClient = redis.createClient();
  // redisClient.on('error', error => {
  //   logger.error(`Redis error: ${error}`);
  // });

  app.use(bodyParser.urlencoded({
    extended: true
  }));

  // const sessionUrl = config.get('session.redis.url');
  // const ttlInSeconds = config.get('session.redis.ttlInSeconds');
  const sessionSecret = config.get('session.redis.secret');
  // app.use(session({
  //   secret: sessionSecret,
  //   name: 'ia-aip-proto-frontend',
  //   resave: false,
  //   saveUninitialized: true,
  //   cookie: { secure: false },
  //   store: new RedisStore({ url: sessionUrl, client: redisClient, ttl: ttlInSeconds })
  // }));

  app.use(session({
    secret: sessionSecret,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
  }));

  security.apply(app);

  nunjucks.configure([
    './app/views',
    './node_modules/govuk-frontend/',
    './node_modules/govuk-frontend/govuk/components/'
  ], {
    autoescape: true,
    express: app
  })
    .addFilter('dateFilter', dateFilter)
    .addFilter('is_string', isString);

  app.use(Express.accessLogger());
  app.use(createModel);
  app.use('/assets', express.static('./public/govuk-frontend/assets'));
  app.use('/public', express.static('./public'));
  app.use('/', routes);
  app.use(notFoundHandler);
  app.use(internalServerErrorHandler);

  app.locals.i18n = locale;

  return app;
}

module.exports = { create };
