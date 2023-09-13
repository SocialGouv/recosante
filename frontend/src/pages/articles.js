import Web from "components/layout/Web";
import { graphql, Link } from "gatsby";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import React, { useState } from "react";

export default function Articles({
  data: {
    allMdx: { edges: articles },
    categories: { group: _categories },
  },
}) {
  const [filterCategories, setFilterCategories] = useState([]);

  return (
    <Web title={"Nos articles"}>
      <section className="relative mx-auto flex max-w-sm flex-col px-4 pt-10 md:max-w-6xl md:px-6 xl:pt-20">
        <h1>
          Nos <strong>articles</strong>
        </h1>
        <div className="mb-4">
          {_categories.map(({ fieldValue }) => {
            return (
              <button
                key={fieldValue}
                onClick={() => {
                  if (filterCategories.includes(fieldValue)) {
                    setFilterCategories(
                      filterCategories.filter((c) => c !== fieldValue)
                    );
                  } else {
                    setFilterCategories([...filterCategories, fieldValue]);
                  }
                }}
                className={`${
                  filterCategories.includes(fieldValue)
                    ? "bg-main text-white"
                    : "bg-main/10 text-main"
                } mb-2 mr-2 rounded-full px-2 py-0.5 text-sm font-light md:px-4 md:py-1`}
              >
                {fieldValue}
              </button>
            );
          })}
        </div>
        {articles
          .filter(({ node }) => {
            if (!filterCategories.length) return true;
            return filterCategories.includes(node.frontmatter.category);
          })
          .map(({ node }) => {
            return (
              <Link
                to={node.fields.slug}
                className="mx-auto mb-6 flex w-full flex-col items-stretch bg-white drop-shadow-lg md:mx-0 md:max-w-full md:flex-row md:items-stretch"
                key={node.fields.slug}
              >
                <div
                  id="image-container"
                  className="flex max-h-fit w-full flex-col items-center justify-center object-cover md:mb-0 md:shrink-0 md:basis-1/3 md:self-stretch"
                >
                  <GatsbyImage
                    image={getImage(node.frontmatter.image)}
                    className="h-full object-cover"
                    alt={node.frontmatter.title}
                  />
                </div>
                <div className="flex grow flex-col items-start gap-y-4 p-6">
                  {node.frontmatter.category && (
                    <span className="rounded-full bg-main px-2 py-1 text-xs font-light text-white">
                      {node.frontmatter.category}
                    </span>
                  )}
                  <h2
                    className="m-0 text-lg font-normal text-main"
                    dangerouslySetInnerHTML={{ __html: node.frontmatter.title }}
                  />
                  <p className="m-0 line-clamp-5 text-sm font-light text-text">
                    {node.excerpt}
                  </p>
                  <svg
                    width="32"
                    height="32"
                    viewBox="0 0 32 32"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="ml-auto h-8 w-8 fill-main"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M21.5627 14.6662L14.4107 7.51424L16.296 5.62891L26.6667 15.9996L16.296 26.3702L14.4107 24.4849L21.5627 17.3329H5.33337V14.6662H21.5627Z"
                    />
                  </svg>
                </div>
              </Link>
            );
          })}
      </section>
    </Web>
  );
}

export const articlesQuery = graphql`
  {
    allMdx(
      filter: { internal: { contentFilePath: { regex: "/articles/" } } }
      sort: { frontmatter: { order: DESC } }
    ) {
      edges {
        node {
          fields {
            slug
          }
          excerpt(pruneLength: 250)
          frontmatter {
            title
            order
            category
            image {
              childImageSharp {
                gatsbyImageData(width: 500)
              }
            }
          }
        }
      }
    }
    categories: allMdx(
      filter: { internal: { contentFilePath: { regex: "/articles/" } } }
    ) {
      group(field: { frontmatter: { category: SELECT } }) {
        fieldValue
      }
    }
  }
`;
