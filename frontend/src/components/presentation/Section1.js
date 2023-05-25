import { graphql, useStaticQuery } from "gatsby";
import { StaticImage } from "gatsby-plugin-image";
import React from "react";

import Markdown from "components/base/Markdown";
import Wrapper from "./Wrapper";

export default function Section1() {
  const data = useStaticQuery(
    graphql`
      query {
        content: mdx(fields: { slug: { eq: "medecins-comment" } }) {
          body
        }
      }
    `
  );

  return (
    <Wrapper>
      <Wrapper.Content>
        <Markdown>{data.content.body}</Markdown>
      </Wrapper.Content>
      <Wrapper.Image width="35.5rem">
        <StaticImage src={"./images/section1.jpg"} alt="" />
      </Wrapper.Image>
    </Wrapper>
  );
}
