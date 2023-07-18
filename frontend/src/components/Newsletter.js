import { useLocation } from "@reach/router";
import { Link, graphql, navigate, useStaticQuery } from "gatsby";
import React, { useContext, useEffect, useRef } from "react";
import styled from "styled-components";

import Markdown from "components/base/Markdown";
import Section from "components/base/Section";
import useOnScreen from "hooks/useOnScreen";
import { useLocalUser } from "hooks/useUser";
import ModalContext from "utils/ModalContext";
import Mockup from "./newsletter/Mockup";
import Notifications from "./newsletter/Notifications";

const Content = styled.div`
  width: 41.75rem;
  margin-right: 2rem;

  ${(props) => props.theme.mq.medium} {
    width: auto;
    margin-right: 0;
    margin-bottom: 2rem;
  }
  ${(props) => props.theme.mq.small} {
    margin-right: 0;
    margin-bottom: 1rem;
  }

  h1 {
    font-size: ${(props) => (props.seo ? 2 : 4)}rem;

    ${(props) => props.theme.mq.small} {
      font-size: 1.5rem;
    }
  }

  p {
    max-width: 35.5rem;
    margin-bottom: 1em;
    font-size: 1.25rem;

    ${(props) => props.theme.mq.medium} {
      max-width: none;
    }

    ${(props) => props.theme.mq.small} {
      font-size: 1rem;
    }
  }
`;

export default function Newsletter(props) {
  const { setSubscription } = useContext(ModalContext);
  const { mutateUser } = useLocalUser();

  const data = useStaticQuery(
    graphql`
      query {
        mdx(fields: { slug: { eq: "introduction" } }) {
          body
        }
      }
    `
  );

  const ref = useRef();

  const isOnScreen = useOnScreen(ref, "0px", 0.7);

  const location = useLocation();
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const indicateurs = params
      .getAll("indicateur")
      .filter((i) =>
        ["indice_atmo", "raep", "vigilance_meteo", "indice_uv"].includes(i)
      );
    if (indicateurs.length > 0) {
      mutateUser({
        indicateurs: indicateurs,
      });
      setSubscription("indicators");
      params.delete("indicateur");
      navigate(
        `${location.pathname}${
          Array.from(params).length > 0 ? "?" + params.toString() : ""
        }`,
        { replace: true }
      );
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      <Section
        className="flex max-w-prose flex-col p-6 xl:mt-32 xl:max-w-none xl:flex-row [&_h2]:xl:text-6xl"
        id="newsletter"
      >
        <Content ref={ref} seo={props.seo}>
          <Markdown>{(props.data || data).mdx.body}</Markdown>
          <div className="flex w-full justify-center">
            {props.type === "baignades" ? (
              <Link
                className="rounded-full bg-main px-6 py-2 text-center text-white xl:px-8 xl:py-3 xl:text-xl xl:font-medium"
                to="/"
              >
                Consulter la qualité de l’eau de baignade
              </Link>
            ) : (
              <button
                type="button"
                className="rounded-full bg-main px-6 py-2 text-center text-white xl:px-8 xl:py-3 xl:text-xl xl:font-medium"
                onClick={() => {
                  mutateUser({
                    indicateurs: props.indicateurs || ["indice_atmo", "raep"],
                  });
                  setSubscription("indicators");
                  window?._paq?.push([
                    "trackEvent",
                    "Subscription",
                    "Infolettre",
                  ]);
                }}
              >
                M'abonner à Recosanté
              </button>
            )}
          </div>
        </Content>
        <div className="relative min-h-[100vw] flex-1 overflow-hidden sm:min-h-[40rem] sm:overflow-visible xl:min-h-0 xl:overflow-visible">
          <Mockup type={props.type} isOnScreen={isOnScreen} />
        </div>
      </Section>
      {!["qa", "uv", "baignades"].includes(props.type) && <Notifications />}
    </>
  );
}
