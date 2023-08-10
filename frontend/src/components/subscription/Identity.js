import React, { useEffect, useState } from "react";
import styled from "styled-components";

import Alert from "components/base/Alert";
import MagicLink from "components/base/MagicLink";
import TextInput from "components/base/TextInput";
import SearchInput from "components/search/SearchInput";
import { useAvailability } from "hooks/useSearch";
import { useLocalUser, useUserMutation } from "hooks/useUser";
import Error from "./identity/Error";

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
  const { user, mutateUser } = useLocalUser();

  const { data: availability } = useAvailability(user.commune?.code);
  const mutation = useUserMutation();

  console.log({ mutation });

  useEffect(() => {
    if (mutation.isSuccess) {
      onNextStep();
    }
  }, [mutation.isSuccess]);

  const [error, setError] = useState(false);

  return (
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
          if (!user.commune) {
            setError(true);
          } else {
            setError(false);
            mutation.mutate(user);
          }
        }}
      >
        <MailInput
          type="email"
          name="email"
          className="mx-auto max-w-xs xl:max-w-2xl"
          title="Entrez votre email (obligatoire)"
          placeholder="Entrez votre email (obligatoire)"
          value={user.mail}
          onChange={({ value }) => mutateUser({ mail: value })}
          required
          autoComplete="email"
        />
      </form>
      <div className="relative order-2 mx-auto mb-4 w-full max-w-2xl">
        <SearchInput
          numberOfSuggestions={4}
          initialValue={user.commune && user.commune.nom}
          className={[
            "left-0 right-0 top-0 mx-auto w-full !transform-none text-[1.125rem]",
            error && !user.commune ? "!border-error" : "",
          ].join(" ")}
          handlePlaceSelection={(place) => {
            mutateUser({ commune: place });
          }}
        />
      </div>
      {availability && !availability.availability && (
        <StyledAlert error>
          Les indicateurs de cette commune ne sont pas disponibles. Vous pouvez
          quand même vous inscrire à la lettre d'information hebdomadaire si
          vous le souhaitez
        </StyledAlert>
      )}

      <p className="order-5 mb-12 pb-8 text-xs font-light text-footer">
        Les{" "}
        <MagicLink to="https://recosante.beta.gouv.fr/donnees-personnelles">
          données collectées
        </MagicLink>{" "}
        lors de votre inscription sont utilisées dans le cadre d’une mission de
        service public dont les responsables de traitement sont la DGS et la
        DGPR. Recosanté suit l’ouverture et les interactions avec les emails
        reçus. Vous pouvez à tout moment vous opposer à ces traitements en vous
        désinscrivant.
      </p>
      <Error error={mutation.error} reset={mutation.reset} />
    </div>
  );
}
