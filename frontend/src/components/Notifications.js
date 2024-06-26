import { graphql, useStaticQuery } from "gatsby";
import { useQueryParam } from "hooks/useQueryParam";
import React, { useState } from "react";

import Alert from "components/base/Alert";
import Button from "components/base/Button";
import Section from "components/base/Section";
import UnloggedForm from "components/misc/UnloggedForm";
import useNotificationsPrompt from "hooks/useNotificationsPrompt";
import { useUser, useUserMutation } from "hooks/useUser";

export default function Notifications() {
  const { applicationServerKey } = useStaticQuery(
    graphql`
      query {
        applicationServerKey {
          application_server_key
        }
      }
    `
  );
  const notifications = useNotificationsPrompt(
    "/sw-push.js",
    applicationServerKey.application_server_key
  );

  const [user] = useQueryParam("user");
  const [token] = useQueryParam("token");
  const { error, data } = useUser();
  const mutation = useUserMutation();
  const [success, setSuccess] = useState(false);

  return user && token && !error ? (
    <Section first small>
      <h1>
        Activer les <strong>notifications</strong>
        <br />
        sur cet appareil
      </h1>
      {data && (
        <>
          {data.indicateurs_media[0] === "mail" ? (
            <>
              <p>
                Vous recevez pour l'instant les{" "}
                <strong>indicateurs par mail</strong>.
              </p>
              <p>
                Si vous souhaitez changer pour activer les notifications sur cet
                appareil, cliquez ci-dessous (vous ne recevrez plus de mail).
              </p>
            </>
          ) : success ? (
            <p>
              Vous recevrez maintenant les{" "}
              <strong>indicateurs par notifications</strong> sur cet appareil !
            </p>
          ) : (
            <>
              <p>
                Vous recevez pour l'instant les{" "}
                <strong>indicateurs par notifications.</strong>
              </p>
              <p>
                Si vous souhaitez les recevoir sur cet appareil en particulier,
                cliquez ci-dessous (vous continuerez de les recevoir sur vos
                autres appareils)
              </p>
            </>
          )}
          <Button.Wrapper vertical>
            {!success && (
              <Button
                fetching={notifications.prompting}
                onClick={() => {
                  notifications.subscribe().then((pushSubscription) => {
                    if (pushSubscription) {
                      setSuccess(true);
                      mutation.mutate({
                        indicateurs_media: ["notifications_web"],
                        webpush_subscriptions_info:
                          JSON.stringify(pushSubscription),
                      });
                    }
                  });
                }}
              >
                Activer les notifications sur cet appareil
              </Button>
            )}
            <Button to={`/profil/?user=${user}&token=${token}`} hollow>
              Voir mon profil
            </Button>
          </Button.Wrapper>
        </>
      )}
      {notifications.error && (
        <Alert error>
          Vous devez accepter les notifications web pour pouvoir continuer
        </Alert>
      )}
      {mutation.isError && (
        <Alert error>
          Une erreur est survenue. Vos préférences n'ont pas été mises à jour
        </Alert>
      )}
    </Section>
  ) : (
    <Section first>
      <UnloggedForm unauthorized={!!error} />
    </Section>
  );
}
