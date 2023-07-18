import { Link, graphql, useStaticQuery } from "gatsby";
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
      <p className="text-center xl:text-left">Les données sont fournies par:</p>
      <ul className="-mx-4 flex items-center justify-center overflow-x-hidden p-0">
        {data.mdx.frontmatter.data.map((logo) => (
          <li key={logo.link}>
            <Link
              className="w-8 shrink p-4"
              to={logo.link}
              aria-label={logo.title}
            >
              <GatsbyImage image={getImage(logo.image)} alt={logo.title} />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
