import IframeResizer from "iframe-resizer-react";
import React, { useState } from "react";
import styled from "styled-components";

import Section from "components/base/Section";
import Code from "components/widget/Code";
import Options from "components/widget/Options";
import useWindowSize from "hooks/useWindowSize";
import { formatPlaceUrl } from "utils/formatPlaceUrl";

const StyledIframe = styled(IframeResizer)`
  display: block;
  width: 36rem;
  border: none;

  ${(props) => props.theme.mq.medium} {
    width: 100%;
  }
`;

export default function Widget(props) {
  const [defaultPlace, setDefaultPlace] = useState(null);

  const url = "https://recosante.beta.gouv.fr";

  const { width } = useWindowSize();

  if (width <= 700 && props.home) return null;

  const Title = props.main ? "h1" : "h2";

  return (
    <Section className="flex flex-col items-center justify-between pt-16 xl:flex-row xl:items-start xl:pt-32">
      <div className="max-w-sm xl:mt-8">
        <Title className="xl:w-96">
          Intégrez <strong>Recosanté</strong>
          <br /> sur votre site
        </Title>
        <Code defaultPlace={defaultPlace} url={url} />
        <Options setDefaultPlace={setDefaultPlace} />
      </div>
      <StyledIframe
        src={`${url}${
          defaultPlace ? formatPlaceUrl(defaultPlace) : "/"
        }?iframe=1`}
        allowFullScreen={true}
        allow="geolocation"
      />
    </Section>
  );
}
