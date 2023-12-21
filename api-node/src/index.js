import "dotenv/config";

import * as Sentry from "@sentry/node";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import logger from "morgan";

import { PORT, VERSION, MOBILE_VERSION } from "./config.js";
import { sendError } from "./middlewares/errors.js";
import versionCheck from "./middlewares/versionCheck.js";
import { capture } from "./third-parties/sentry.js";

import testRouter from "./controllers/test.js";
import eventRouter from "./controllers/event.js";
import userRouter from "./controllers/user.js";

// Put together a schema
const app = express();
// if (process.env.NODE_ENV === "development") {
app.use(logger("dev"));
// }

app.use(Sentry.Handlers.requestHandler());
app.use(Sentry.Handlers.tracingHandler());

app.use(cors());

// kube probe
app.get("/healthz", async (req, res) => {
  res.send(`Hello World`);
});

// hello world
const now = new Date();
app.get("/", async (req, res) => {
  res.send(`Hello World at ${now.toISOString()}`);
});
app.get("/config.js", async (req, res) => {
  res.send({ VERSION, MOBILE_VERSION });
});

// Add header with API version to compare with client.
app.use((_req, res, next) => {
  res.header("X-API-VERSION", VERSION);
  // See: https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Access-Control-Expose-Headers
  res.header("Access-Control-Expose-Headers", "X-API-VERSION");
  next();
});

//
app.set("json replacer", (k, v) => (v === null ? undefined : v));

// Pre middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json({ limit: "50mb" }));
app.use(helmet());

// sentry context/user
app.use(async (req, res, next) => {
  const { matomoId } = req.body || {};
  const { appversion, appdevice, currentroute } = req.headers || {};
  if (matomoId) Sentry.setUser({ id: matomoId });
  if (appversion) Sentry.setTag("appversion", appversion);
  if (appdevice) Sentry.setTag("appdevice", appdevice);
  if (currentroute) Sentry.setTag("currentroute", currentroute);
  next();
});

app.post("/sentry-check", async (req, res) => {
  capture("sentry-check", { extra: { test: "test" } });
  res.status(200).send({ ok: true, data: `Sentry checked!` });
});

app.use("/db-check", testRouter);

// check version before checking other controllers
app.use(versionCheck);

// Routes

app.use("/event", eventRouter);
app.use("/user", userRouter);

app.use(Sentry.Handlers.errorHandler());
app.use(sendError);

// Start the server
app.listen(PORT, () => console.log(`RUN ON PORT ${PORT}`));
