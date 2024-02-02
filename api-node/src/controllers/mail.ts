import {
  TIPIMAIL_EMAIL_TO,
  TIPIMAIL_EMAIL_FROM,
  TIPIMAIL_API_USER,
  TIPIMAIL_API_KEY,
} from '~/config';
import { catchErrors } from '~/middlewares/errors';
import { capture } from '~/third-parties/sentry';
import { type RequestWithUser } from '~/types/request';
import express from 'express';

export const mailRouter = express.Router();

mailRouter.post(
  '/',
  catchErrors(async (req: RequestWithUser, res: express.Response) => {
    let { to, replyTo, replyToName, subject, text, html, attachments } =
      req.body || {};

    if (!subject || (!text && !html)) {
      res.status(400).json({ ok: false, error: 'wrong parameters' });
    }

    if (!to) {
      to = TIPIMAIL_EMAIL_TO;
    }

    if (!replyTo) {
      replyTo = undefined;
      replyToName = undefined;
    }

    const from = TIPIMAIL_EMAIL_FROM;
    const fromName = 'Recosanté';
    const apiRes = await fetch('https://api.tipimail.com/v1/messages/send', {
      method: 'POST',
      headers: {
        'X-Tipimail-ApiUser': TIPIMAIL_API_USER ?? '',
        'X-Tipimail-ApiKey': TIPIMAIL_API_KEY ?? '',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        apiKey: TIPIMAIL_API_KEY,
        to: [
          {
            address: to,
          },
        ],
        msg: {
          from: {
            address: from,
            personalName: fromName,
          },
          replyTo: replyTo && {
            address: replyTo,
            personalName: replyToName,
          },
          subject,
          text,
          html,
          attachments,
        },
      }),
    }).catch((err) => {
      capture(err, { extra: { route: 'POST /mail', body: req.body } });
    });

    if (apiRes?.ok) {
      res.status(200).json({ ok: true });
    } else {
      res.status(500).json({ ok: false, error: 'error while sending email' });
    }
  }),
);
