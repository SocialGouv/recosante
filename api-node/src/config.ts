import packageJson from '../package.json';
const version = packageJson.version;

const PORT = process.env.PORT || 3000;
const ENVIRONMENT =
  process.env.ENVIRONMENT || process.env.NODE_ENV || 'development';

const PGHOST = process.env.PGHOST;
const PGPORT = process.env.PGPORT;
const PGUSER = process.env.PGUSER;
const PGPASSWORD = process.env.PGPASSWORD || null;
const PGDATABASE = process.env.PGDATABASE;
const DATABASE_URL = process.env.DATABASE_URL;

const SENTRY_KEY =
  process.env.SENTRY_KEY ||
  'https://3451d3d9799d44d59ef0e63eb0f2cdf7@sentry.fabrique.social.gouv.fr/95';

const VERSION = version;

const TIPIMAIL_API_USER = process.env.TIPIMAIL_API_USER;
const TIPIMAIL_API_KEY = process.env.TIPIMAIL_API_KEY;
const TIPIMAIL_EMAIL_TO = process.env.TIPIMAIL_EMAIL_TO;
const TIPIMAIL_EMAIL_FROM = process.env.TIPIMAIL_EMAIL_FROM;

const MATOMO_URL = process.env.MATOMO_URL;
const MATOMO_IDSITE_1 = '100';

export {
  PORT,
  PGHOST,
  PGPORT,
  PGUSER,
  PGPASSWORD,
  PGDATABASE,
  DATABASE_URL,
  ENVIRONMENT,
  SENTRY_KEY,
  VERSION,
  TIPIMAIL_API_USER,
  TIPIMAIL_API_KEY,
  TIPIMAIL_EMAIL_TO,
  TIPIMAIL_EMAIL_FROM,
  MATOMO_URL,
  MATOMO_IDSITE_1,
};