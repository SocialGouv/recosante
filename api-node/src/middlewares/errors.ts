import { type CustomError } from '~/types/error';
import { capture } from '../third-parties/sentry.js';
import type express from 'express';
import type { RequestWithUser } from '~/types/request';
/*
  Catch Errors Handler

  With async/await, you need some way to catch errors
  Instead of using try{} catch(e) {} in each controller, we wrap the function in
  catchErrors(), catch any errors they throw, and pass it along to our express middleware with next()
*/
type MiddlewareFn<T extends express.Request> = (
  req: T,
  res: express.Response,
  next: express.NextFunction,
) => Promise<void> | void;

export const catchErrors = <T extends express.Request>(fn: MiddlewareFn<T>) => {
  return async (req: T, res: express.Response, next: express.NextFunction) => {
    try {
      await fn(req, res, next);
    } catch (error) {
      // Log détaillé des erreurs Prisma
      if (error && typeof error === 'object' && 'code' in error) {
        console.error('Database error:', {
          code: (error as any).code,
          message: (error as any).message,
          meta: (error as any).meta,
          url: req.url,
          method: req.method,
          body: req.body,
          headers: req.headers
        });
      }

      // Log des erreurs de validation Prisma
      if (error instanceof Error && error.message.includes('PrismaClientValidationError')) {
        console.error('Prisma validation error:', {
          message: error.message,
          url: req.url,
          method: req.method,
          body: req.body,
          stack: error.stack
        });
      }

      next(error);
    }
  };
};

/*
  Not Found Error Handler

  If we hit a route that is not found, we mark it as 404 and pass it along to the next error handler to display
*/
const notFound = (
  req: express.Request | RequestWithUser,
  _res: express.Response,
  next: express.NextFunction,
) => {
  const url = req.protocol + '://' + req.get('host') + req.originalUrl;
  const customError = new Error(`Url not Found : ${url}`) as CustomError;
  customError.status = 404;
  next(customError);
};

/*
  Development Error Handler

  In development we show good error messages so if we hit a syntax error or any other previously un-handled error, we can show good info on what happened
*/
const sendError = (
  // TODO: Check this error type
  err: CustomError,
  req: express.Request | RequestWithUser,
  res: express.Response,
  _next: express.NextFunction,
) => {
  const { body, query, params, route, method, originalUrl, headers } = req;
  const { auth, appversion, appbuild, appdevice } = headers;
  capture(err, {
    extra: {
      body,
      query,
      params,
      route,
      method,
      originalUrl,
      appversion,
      appbuild,
      appdevice,
      auth,
      headers,
    },
    user: (req as RequestWithUser).user,
  });

  return res.status(err.status ?? 500).send({
    ok: false,
    code: 'SERVER_ERROR',
    error: "Désolé, une erreur est survenue, l'équipe technique est prévenue.",
  });
};

export { notFound, sendError };
