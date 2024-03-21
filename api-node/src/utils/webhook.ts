import { MATERMOST_WEBHOOK_URL } from '~/config';
import { capture } from '~/third-parties/sentry';
import { type RequestWithMatomoEvent } from '~/types/request';

export namespace WebhookService {
  export async function sendToMattermost(request: RequestWithMatomoEvent) {
    const app_device = (request.headers.appdevice ?? '') as string;
    const app_build = (request.headers.appbuild ?? '') as string;
    const currentDate = new Date().toLocaleString('fr-FR', {
      timeZone: 'Europe/Paris',
    });

    await fetch(MATERMOST_WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        text: `:rocket: Nouvelle installation:\n ${currentDate}\n Matomo Id: ${
          request.body.userId
        }\n ${app_device?.toUpperCase()}-${app_build}`,
        username: 'Jean-Pierre le gentil robot',
        icon_url: '👴',
      }),
    })
      .then((res) => {
        console.log(res);
      })

      .catch((err) => {
        capture(err, {
          extra: { route: 'POST Matermost Webhook', body: request.body },
        });
      });
  }
}
