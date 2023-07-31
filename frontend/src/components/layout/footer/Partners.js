import { graphql, useStaticQuery } from "gatsby";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import React from "react";

export default function Partners() {
  const data = useStaticQuery(
    graphql`
      query {
        mdx(fields: { slug: { eq: "partenaires" } }) {
          body
          frontmatter {
            data {
              title
              image {
                childImageSharp {
                  gatsbyImageData(width: 80)
                }
              }
              link
            }
          }
        }
      }
    `
  );
  return (
    <div>
      <p className="text-center">Les données sont fournies par:</p>
      <ul className="-mx-4 flex items-center justify-center overflow-x-hidden p-0">
        {data.mdx.frontmatter.data.map((logo) => (
          <li key={logo.link} className=" shrink grow basis-8">
            <a
              className="flex items-center justify-center p-2"
              href={logo.link}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={logo.title}
            >
              <GatsbyImage
                className="shrink"
                image={getImage(logo.image)}
                alt={logo.title}
              />
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
