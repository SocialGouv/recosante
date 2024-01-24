import 'dotenv/config';
import '~/prisma';

import * as Sentry from '@sentry/node';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import logger from 'morgan';

import { ENVIRONMENT, PORT, SENTRY_KEY, VERSION } from './config.ts';
import { sendError } from './middlewares/errors.ts';
import versionCheck from './middlewares/version-check';
import { capture } from './third-parties/sentry.ts';

import eventRouter from './controllers/event.ts';
import environmentRouter from './controllers/environment.ts';
import userRouter from './controllers/user.ts';
import indicatorsRouter from './controllers/indicators.ts';
import packageJson from '../package.json';

// Put together a schema
const app = express();

app.use(logger('dev'));

const sentryEnabled = ENVIRONMENT !== 'development' && ENVIRONMENT !== 'test';

if (sentryEnabled) {
  Sentry.init({
    dsn: SENTRY_KEY,
    environment: `api-${ENVIRONMENT}`,
    release: VERSION,
    integrations: [
      // enable HTTP calls tracing
      new Sentry.Integrations.Http({ tracing: true }),
      // enable Express.js middleware tracing
      new Sentry.Integrations.Express({ app }),
      // Automatically instrument Node.js libraries and frameworks
      ...Sentry.autoDiscoverNodePerformanceMonitoringIntegrations(),
    ],

    // Set tracesSampleRate to 1.0 to capture 100%
    // of transactions for performance monitoring.
    // We recommend adjusting this value in production
    tracesSampleRate: 0.05,
  });
}

app.use(Sentry.Handlers.requestHandler());
app.use(Sentry.Handlers.tracingHandler());

app.use(cors());

// kube probe
app.get('/healthz', async (req, res) => {
  res.send('Hello World');
});

// hello world
const now = new Date();
app.get('/', async (req, res) => {
  res.send(
    `Hello World at ${now.toISOString()} version ${packageJson.version}`,
  );
});
app.get('/config.js', async (req, res) => {
  res.send({ VERSION });
});

// Add header with API version to compare with client.
app.use((_req, res, next) => {
  res.header('X-API-VERSION', VERSION);
  // See: https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Access-Control-Expose-Headers
  res.header('Access-Control-Expose-Headers', 'X-API-VERSION');
  next();
});

// Pre middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json({ limit: '50mb' }));
app.use(helmet());

// sentry context/user
app.use(async (req, res, next) => {
  const { appversion, appbuild, appdevice, currentroute } = req.headers || {};
  if (appversion) Sentry.setTag('appversion', appversion as string);
  if (appbuild) Sentry.setTag('appbuild', appbuild as string);
  if (appdevice) Sentry.setTag('appdevice', appdevice as string);
  if (currentroute) Sentry.setTag('currentroute', currentroute as string);
  next();
});

app.post('/sentry-check', async (req, res) => {
  capture('sentry-check', { extra: { test: 'test' } });
  res.status(200).send({ ok: true, data: 'Sentry checked!' });
});

// check version before checking other controllers
// @ts-expect-error TODO: Fix this when using version-check.ts
app.use(versionCheck);

// Routes
app.use('/environment', environmentRouter);
app.use('/event', eventRouter);
app.use('/user', userRouter);
app.use('/indicators', indicatorsRouter);

app.use(Sentry.Handlers.errorHandler());
app.use(sendError);

// Start the server
app.listen(PORT, () => {
  console.log(`RUN ON PORT ${PORT}`);
});
