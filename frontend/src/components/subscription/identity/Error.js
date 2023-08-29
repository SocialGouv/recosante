import React, { useContext } from "react";
import styled from "styled-components";
import ModalContext from "utils/ModalContext";
import { useLocalUser, useSendProfileLink } from "hooks/useUser";

const Wrapper = styled.div`
  position: absolute;
  z-index: 1200;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: stretch;
  padding: 2.5rem 2rem 1.5rem;
  background: ${(props) => props.theme.colors.background};
  border-radius: 2rem;
  opacity: ${(props) => (props.visible ? 1 : 0)};
  pointer-events: ${(props) => (props.visible ? "inherit" : "none")};
  transition: opacity ${(props) => (props.visible ? 300 : 0)}ms;
`;
const Title = styled.h3`
  max-width: 31.5rem;
  margin: 0 auto 1rem;
  font-size: 2.5rem;
  text-align: center;

  ${(props) => props.theme.mq.smallish} {
    font-size: 1.5rem;
  }
`;
const Text = styled.p`
  font-size: 1.25rem;
  text-align: center;

  ${(props) => props.theme.mq.smallish} {
    font-size: 1rem;
  }
`;

export default function Error(props) {
  const mutation = useSendProfileLink();
  const { user } = useLocalUser();
  const { setSubscription, setNeedConfirmation } = useContext(ModalContext);
  return (
    <Wrapper visible={props.error}>
      {props?.error?.response?.data?.errors?.mail === "mail already used" ? (
        mutation.isSuccess ? (
          <>
            <Title>Un compte est déjà associé à cet email</Title>
            <Text>
              Vous avez reçu un email contenant un lien pour modifier vos
              préférences à l'adresse&nbsp;: {user.mail}
            </Text>
            <div
              className="absolute bottom-0 left-0 right-0 z-[4] flex justify-end gap-x-2 bg-background p-4"
              style={{ boxShadow: "0 -0.25rem 0.5rem rgba(0, 0, 0, 0.1)" }}
            >
              <button
                className="inline-flex items-center gap-x-2 rounded-full border-2 border-main bg-main px-4 py-3 text-white disabled:opacity-50"
                type="button"
                onClick={() => {
                  setSubscription(null);
                }}
              >
                Retourner à l'accueil
              </button>
            </div>
          </>
        ) : (
          <>
            <Title>Un compte est déjà associé à cet email</Title>
            <Text>
              Souhaitez-vous recevoir un email à cette adresse pour vous
              permettre d'éditer votre compte&nbsp;?
            </Text>
            <div
              className="absolute bottom-0 left-0 right-0 z-[4] flex justify-between gap-x-2 bg-background p-4"
              style={{ boxShadow: "0 -0.25rem 0.5rem rgba(0, 0, 0, 0.1)" }}
            >
              <button
                className="inline-flex items-center gap-x-2 rounded-full border-2 border-main bg-white px-4 py-3 text-main"
                type="button"
                onClick={props.reset}
              >
                Essayer avec une autre adresse
              </button>
              <button
                className="inline-flex items-center gap-x-2 rounded-full border-2 border-main bg-main px-4 py-3 text-white disabled:opacity-50"
                type="button"
                onClick={() => {
                  setNeedConfirmation(false);
                  mutation.mutate(user.mail);
                }}
                fetching={mutation.isLoading}
              >
                Recevoir un email
              </button>
            </div>
          </>
        )
      ) : (
        <>
          <Title>Une erreur est survenue :(</Title>
          <Text>
            Vous pouvez réessayer dans quelques minutes. Si le problème
            persiste, n'hésitez pas à nous contacter pour nous le signaler.
          </Text>
          <div
            className="absolute bottom-0 left-0 right-0 z-[5] flex justify-between gap-x-2 bg-background p-4 shadow-md"
            style={{ boxShadow: "0 -0.25rem 0.5rem rgba(0, 0, 0, 0.1)" }}
          >
            <button
              className="inline-flex items-center gap-x-2 rounded-full border-2 border-main bg-white px-4 py-3 text-main"
              type="button"
              to={"mailto:contact@recosante.beta.gouv.fr"}
            >
              Nous contacter
            </button>
            <button
              onClick={props.reset}
              className="inline-flex items-center gap-x-2 rounded-full border-2 border-main bg-main px-4 py-3 text-white disabled:opacity-50"
            >
              Réessayer
            </button>
          </div>
        </>
      )}
    </Wrapper>
  );
}
