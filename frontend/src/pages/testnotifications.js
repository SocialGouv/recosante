import { graphql, useStaticQuery } from "gatsby";
import React from "react";

import Button from "components/base/Button";
import Section from "components/base/Section";
import Web from "components/layout/Web";
import useNotificationsPrompt from "hooks/useNotificationsPrompt";
import useUrlB64ToUint8Array from "hooks/useUrlB64ToUint8Array";

export default function TestNotifications() {
  const data = useStaticQuery(
    graphql`
      query {
        applicationServerKey {
          application_server_key
        }
      }
    `
  );
  const publicKey = useUrlB64ToUint8Array(
    data.applicationServerKey.application_server_key
  );

  const notifications = useNotificationsPrompt("/sw-push.js", publicKey);

  return (
    <Web title={"Test"}>
      <Section first small>
        <Button.Wrapper>
          <Button
            onClick={() =>
              notifications
                .subscribe()
                .then((pushSubscription) => console.log(pushSubscription))
            }
          >
            Souscris moi !
          </Button>
          <Button
            onClick={() => {
              const title = "Toulouse, le vendredi 23 juin";
              const options = {
                body: `Indice de qualité de l'air : Moyen`,
                data: "https://recosante.beta.gouv.fr",
                icon: "/favicon.png",
                actions: [
                  {
                    action: "https://recosante.beta.gouv.fr",
                    title: "Voir tous les indicateurs",
                  },
                ],
              };
              navigator.serviceWorker.ready.then(function (serviceWorker) {
                console.log("serviceWorker is ready");
                serviceWorker.showNotification(title, options);
              });
              console.log("notified");
            }}
          >
            Notifie moi !
          </Button>
          <Button
            onClick={() => {
              const title = "Toulouse, le vendredi 23 juin";
              const options = {};
              navigator.serviceWorker.ready.then(function (serviceWorker) {
                console.log("serviceWorker is ready");
                serviceWorker.showNotification(title, options);
              });
              console.log("notified");
            }}
          >
            Notifie moi, mais mal
          </Button>
        </Button.Wrapper>
      </Section>
    </Web>
  );
}
