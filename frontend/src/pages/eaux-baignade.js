import { graphql, useStaticQuery } from "gatsby";
import React from "react";
import styled from "styled-components";

import AboutBaignades from "components/AboutBaignades";
import Search from "components/Search";
import Web from "components/layout/Web";
import useIframe from "hooks/useIframe";
import Newsletter from "components/Newsletter";

const StyledSearch = styled(Search)`
  margin-bottom: 0;
`;
export default function EauBaignade() {
  const iframe = useIframe();
  const data = useStaticQuery(
    graphql`
      query {
        mdx(fields: { slug: { eq: "introduction-baignades" } }) {
          body
        }
      }
    `
  );

  return (
    <Web title={`Eaux de baignade`}>
      <Newsletter data={data} type={"baignades"} seo />
      <AboutBaignades />
      {!iframe && (
        <>
          <StyledSearch />
        </>
      )}
    </Web>
  );
}
