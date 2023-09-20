import { graphql, useStaticQuery } from "gatsby";
import React, { useContext, useEffect } from "react";
import { toast } from "react-toastify";
import styled from "styled-components";

import Option from "components/subscription/question/Option";
import useNotificationsPrompt from "hooks/useNotificationsPrompt";
import { useUser, useUserMutation } from "hooks/useUser";
import ModalContext from "utils/ModalContext";

export default function Step({ large, step }) {
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

  const { setModal } = useContext(ModalContext);

  const { data } = useUser();
  const mutation = useUserMutation();

  useEffect(() => {
    if (mutation.isSuccess) {
      toast.dismiss();
      toast.success("Informations mises à jour.");
    }
  }, [mutation.isSuccess]);
  useEffect(() => {
    if (mutation.isError) {
      toast.dismiss();
      toast.error(`Vos modifications n'ont pas été sauvegardées.`);
    }
  }, [mutation.isError]);

  //     const Wrapper = styled.div`
  //   margin-top: ${(props) => (props.large ? 3 : 0)}rem;
  //   padding-top: ${(props) => (props.large ? 3 : 0)}rem;
  //   border-top: ${(props) => (props.large ? 0.25 : 0)}rem solid
  //     rgba(${(props) => props.theme.colors.mainAlpha}, 0.2);
  // `;

  const SectionTag = large ? "h2" : "h3";

  return (
    <div className="mb-8 md:mb-20">
      <SectionTag>{step.title}</SectionTag>
      <p
        dangerouslySetInnerHTML={{
          __html: step.label,
        }}
      />
      {data && (
        <div className="relative flex flex-col flex-wrap items-stretch justify-start md:flex-row md:items-start">
          {step.options.map((option, index) => (
            <Option
              key={option.value}
              option={option}
              isLast={index === step.options.length - 1}
              active={data[step.name] && data[step.name].includes(option.value)}
              onClick={() => {
                mutation.mutate({
                  [step.name]: step.exclusive
                    ? [option.value]
                    : data[step.name] && data[step.name].includes(option.value)
                    ? data[step.name].filter(
                        (userOption) => userOption !== option.value
                      )
                    : [...(data[step.name] || []), option.value],
                });
                if (option.value === "notifications_web") {
                  notifications.subscribe().then((pushSubscription) => {
                    pushSubscription &&
                      mutation.mutate({
                        webpush_subscriptions_info:
                          JSON.stringify(pushSubscription),
                      });
                  });
                }
              }}
              setModal={setModal}
              checkbox={!step.exclusive}
            />
          ))}
        </div>
      )}
    </div>
  );
}
