const axios = require("axios");
const path = require("path");
const { createFilePath } = require("gatsby-source-filesystem");
const { formatPlaceUrl } = require("./src/utils/formatPlaceUrl");

const API_URL =
  process.env.GATSBY_API_BASE_URL || "https://api.recosante.beta.gouv.fr";

exports.sourceNodes = async ({
  actions: { createNode },
  createContentDigest,
}) => {
  try {
    const { data } = await axios.get(`${API_URL}/_application_server_key`);

    createNode({
      application_server_key: data.application_server_key,
      id: `application-server-key`,
      parent: null,
      children: [],
      internal: {
        type: `ApplicationServerKey`,
        contentDigest: createContentDigest(data),
      },
    });
  } catch {
    createNode({
      application_server_key: 12,
      id: `application-server-key`,
      parent: null,
      children: [],
      internal: {
        type: `ApplicationServerKey`,
        contentDigest: createContentDigest("12"),
      },
    });
  }
};

exports.onCreateNode = ({ node, getNode, actions: { createNodeField } }) => {
  if (node.internal.type === "Mdx") {
    createNodeField({
      node,
      name: "slug",
      value: createFilePath({ node, getNode }).slice(1, -1),
    });
  }
};

exports.createPages = async ({ graphql, actions: { createPage } }) => {
  try {
    const [articles, pages, { data: places }, { data: recommandations }] =
      await Promise.all([
        graphql(
          `
            {
              allMdx(
                filter: {
                  internal: { contentFilePath: { regex: "/articles/" } }
                }
              ) {
                edges {
                  node {
                    fields {
                      slug
                    }
                    internal {
                      contentFilePath
                    }
                  }
                }
              }
            }
          `
        ),
        graphql(
          `
            {
              allMdx(
                filter: { internal: { contentFilePath: { regex: "/pages/" } } }
              ) {
                edges {
                  node {
                    fields {
                      slug
                    }
                    internal {
                      contentFilePath
                    }
                  }
                }
              }
            }
          `
        ),
        axios.get(
          "https://geo.api.gouv.fr/communes/?fields=departement,codesPostaux,population"
        ),
        axios.get(`${API_URL}/v1/recommandations`),
      ]);

    if (articles.errors) {
      throw result.errors;
    }

    if (pages.errors) {
      throw pages.errors;
    }

    articles.data.allMdx.edges.forEach((article) => {
      const {
        node: {
          fields: { slug },
          internal: { contentFilePath },
        },
      } = article;
      createPage({
        path: `articles/${slug}`,
        component: `${require.resolve(
          "./src/templates/article.js"
        )}?__contentFilePath=${contentFilePath}`,
        context: {
          slug,
        },
      });
    });

    pages.data.allMdx.edges.forEach((page) => {
      const {
        node: {
          fields: { slug },
          internal: { contentFilePath },
        },
      } = page;
      createPage({
        path: `${slug}`,
        component: `${require.resolve(
          "./src/templates/page.js"
        )}?__contentFilePath=${contentFilePath}`,
        context: {
          slug,
        },
      });
    });

    places.forEach((place) => {
      place.departement &&
        createPage({
          path: formatPlaceUrl(place),
          component: require.resolve("./src/templates/place.js"),
          context: { place },
          defer: place.population < 20000,
        });
    });

    const contentFilePath = path.join(
      __dirname,
      "content",
      "texts",
      "recommandations.md"
    );
    createPage({
      path: `/recommandations`,
      component: `${require.resolve(
        "./src/templates/recommandations.js"
      )}?__contentFilePath=${contentFilePath}`,
      context: { recommandations, slug: "recommandations" },
    });
  } catch (e) {
    console.error(`Could not create pages`, e);
  }
};

