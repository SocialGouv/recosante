import { graphql, useStaticQuery } from "gatsby";
import React, { useContext, useRef } from "react";

import Markdown from "components/base/Markdown";
import Section from "components/base/Section";
import { useLocalUser } from "hooks/useUser";
import ModalContext from "utils/ModalContext";
import Images from "./notifications/Images";

import useOnScreen from "hooks/useOnScreen";

export default function Notifications() {
  const data = useStaticQuery(
    graphql`
      query {
        mdx(fields: { slug: { eq: "introduction-notifications" } }) {
          body
        }
      }
    `
  );

  const { setSubscription } = useContext(ModalContext);
  const { mutateUser } = useLocalUser();

  const ref = useRef();
  const isOnScreen = useOnScreen(ref);

  return (
    <Section
      ref={ref}
      className="flex w-full max-w-xl flex-col-reverse gap-y-6 p-6 xl:flex-row"
      id="notifications"
    >
      <div className="relative flex-1 sm:h-56 xl:h-auto">
        <Images isOnScreen={isOnScreen} />
      </div>
      <div className="xl:basis-1/2">
        <Markdown>{data.mdx.body}</Markdown>
        <div className="flex w-full justify-center xl:justify-end">
          <button
            type="button"
            className="rounded-full border-2 border-main bg-white px-6 py-2 text-main xl:px-8 xl:py-3 xl:text-xl xl:font-medium"
            onClick={() => {
              mutateUser({
                indicateurs: ["indice_atmo", "raep"],
              });
              setSubscription("indicators");
              window?._paq?.push([
                "trackEvent",
                "Subscription",
                "Indicateur",
                "Tous",
              ]);
            }}
          >
            Choisir mes indicateurs
          </button>
        </div>
      </div>
    </Section>
  );
}
