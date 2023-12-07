import React, { useEffect, useState } from "react";
import styled from "styled-components";

import Alert from "components/base/Alert";
import MagicLink from "components/base/MagicLink";
import TextInput from "components/base/TextInput";
import SearchInput from "components/search/SearchInput";
import { useAvailability } from "hooks/useSearch";
import APIV2 from "../../utils/api-node";

const StyledAlert = styled(Alert)`
  margin: -2rem 0 1rem;
  order: 3;
`;
const MailInput = styled(TextInput)`
  display: block;
  margin-left: auto;
  margin-right: auto;

  ${(props) => props.theme.mq.small} {
    width: 100%;
  }

  &::placeholder {
    color: ${(props) => props.theme.colors.text};
    opacity: 0.8;
  }
`;

export default function Identity({ onNextStep }) {
  const [email, setEmail] = useState("arnaud@ambroselli.io");
  const [commune, setCommune] = useState({ nom: "Parisot", code: "81202" });
  const { data: availability } = useAvailability(commune?.code);

  const [error] = useState(false);

  useEffect(() => {
    window.onNativePushToken = function handleNativePushToken(
      push_notif_token
    ) {
      APIV2.post({
        path: "/user",
        body: { email, commune, push_notif_token },
      }).then(() => {
        // onNextStep();
      });
    };
    setTimeout(() => {
      window.ReactNativeWebView?.postMessage("request-native-get-expo-token");
    }, 250);
  }, [commune, email]);

  return (
    <>
      <div className="z-[2] flex flex-1 flex-col overflow-y-auto pt-6">
        <p className="order-1 font-light">
          Vos choix ont bien été pris en compte&nbsp;! Merci de renseigner votre
          email et votre ville ci-dessous afin de recevoir vos indicateurs.
        </p>
        <form
          id="subscription-form-email"
          className="order-4"
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            window.ReactNativeWebView.postMessage(
              "request-native-expo-push-permission"
            );
          }}
        >
          <MailInput
            type="email"
            name="email"
            className="mx-auto max-w-xs xl:max-w-2xl"
            title="Entrez votre email (obligatoire)"
            placeholder="Entrez votre email (obligatoire)"
            value={email}
            onChange={({ value }) => setEmail(value)}
            required
            autoComplete="email"
          />
        </form>
        <div className="relative order-2 mx-auto mb-4 w-full max-w-2xl">
          <SearchInput
            numberOfSuggestions={4}
            initialValue={commune?.nom}
            className={[
              "left-0 right-0 top-0 mx-auto w-full !transform-none text-[1.125rem]",
              error && !commune ? "!border-error" : "",
            ].join(" ")}
            handlePlaceSelection={(place) => {
              setCommune(place);
            }}
          />
        </div>
        {availability && !availability.availability && (
          <StyledAlert error>
            Les indicateurs de cette commune ne sont pas disponibles. Vous
            pouvez quand même vous inscrire à la lettre d'information
            hebdomadaire si vous le souhaitez
          </StyledAlert>
        )}

        <p className="order-5 mb-12 pb-8 text-xs font-light text-footer">
          Les{" "}
          <MagicLink to="https://recosante.beta.gouv.fr/donnees-personnelles">
            données collectées
          </MagicLink>{" "}
          lors de votre inscription sont utilisées dans le cadre d’une mission
          de service public dont les responsables de traitement sont la DGS et
          la DGPR. Recosanté suit l’ouverture et les interactions avec les
          emails reçus. Vous pouvez à tout moment vous opposer à ces traitements
          en vous désinscrivant.
        </p>
      </div>
      {/* <Error error={mutation.error} reset={mutation.reset} /> */}
    </>
  );
}
