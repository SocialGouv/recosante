const { version, mobileAppVersion } = require("../package.json");

const PORT = process.env.PORT || 3000;
const ENVIRONMENT = process.env.ENVIRONMENT || process.env.NODE_ENV || "development";

const PGHOST = process.env.PGHOST;
const PGPORT = process.env.PGPORT;
const PGUSER = process.env.PGUSER;
const PGPASSWORD = process.env.PGPASSWORD || null;
const PGDATABASE = process.env.PGDATABASE;
const DATABASE_URL = process.env.DATABASE_URL;

const SENTRY_KEY =
  process.env.SENTRY_KEY || "https://3451d3d9799d44d59ef0e63eb0f2cdf7@sentry.fabrique.social.gouv.fr/95";

const VERSION = version;
const MOBILE_VERSION = mobileAppVersion;

const TIPIMAIL_API_USER = process.env.TIPIMAIL_API_USER;
const TIPIMAIL_API_KEY = process.env.TIPIMAIL_API_KEY;
const TIPIMAIL_EMAIL_TO = process.env.TIPIMAIL_EMAIL_TO;
const TIPIMAIL_EMAIL_FROM = process.env.TIPIMAIL_EMAIL_FROM;

const PUSH_NOTIFICATION_GCM_ID = process.env.PUSH_NOTIFICATION_GCM_ID;
const PUSH_NOTIFICATION_APN_KEY = process.env.PUSH_NOTIFICATION_APN_KEY?.replace(/\\n/g, "\n");
const PUSH_NOTIFICATION_APN_KEY_ID = process.env.PUSH_NOTIFICATION_APN_KEY_ID;
const PUSH_NOTIFICATION_APN_TEAM_ID = process.env.PUSH_NOTIFICATION_APN_TEAM_ID;

const MATOMO_URL = process.env.MATOMO_URL;
const MATOMO_IDSITE_1 = "100";

module.exports = {
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
  MOBILE_VERSION,
  TIPIMAIL_API_USER,
  TIPIMAIL_API_KEY,
  TIPIMAIL_EMAIL_TO,
  TIPIMAIL_EMAIL_FROM,
  PUSH_NOTIFICATION_GCM_ID,
  PUSH_NOTIFICATION_APN_KEY,
  PUSH_NOTIFICATION_APN_KEY_ID,
  PUSH_NOTIFICATION_APN_TEAM_ID,
  MATOMO_URL,
  MATOMO_IDSITE_1,
};
