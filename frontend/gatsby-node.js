const axios = require(`axios`)

exports.sourceNodes = async ({
  actions: { createNode },
  createContentDigest,
}) =>
  axios
    .get(
      `${process.env.GATSBY_API_BASE_URL ||
      'https://api.recosante.beta.gouv.fr'
      }/_application_server_key`
    )
    .then((res) => res.data)
    .then((data) =>
      createNode({
        application_server_key: data.application_server_key,
        id: `application-server-key`,
        parent: null,
        children: [],
        internal: {
          type: `ApplicationServerKey`,
          contentDigest: createContentDigest(data),
        },
      })
    )
    .catch(() => {
      createNode({
        application_server_key: 12,
        id: `application-server-key`,
        parent: null,
        children: [],
        internal: {
          type: `ApplicationServerKey`,
          contentDigest: createContentDigest('12'),
        },
      })
    })

exports.createPages = ({ graphql, actions: { createPage } }) => {
  const articles = graphql(
    `
      {
        allMdx(filter: { fileAbsolutePath: { regex: "/articles/" } }) {
          edges {
            node {
              slug
            }
          }
        }
      }
    `
  ).then((result) => {
    if (result.errors) {
      Promise.reject(result.errors)
    }
    result.data.allMdx.edges.forEach((article) => {
      createPage({
        path: `articles/${article.node.slug}`,
        component: require.resolve('./src/templates/article.js'),
        context: {
          slug: article.node.slug,
        },
      })
    })
  })
  const pages = graphql(
    `
      {
        allMdx(filter: { fileAbsolutePath: { regex: "/pages/" } }) {
          edges {
            node {
              slug
            }
          }
        }
      }
    `
  ).then((result) => {
    if (result.errors) {
      Promise.reject(result.errors)
    }
    result.data.allMdx.edges.forEach((post) => {
      createPage({
        path: `${post.node.slug}`,
        component: require.resolve('./src/templates/page.js'),
        context: {
          slug: post.node.slug,
        },
      })
    })
  })
  const { formatPlaceUrl } = require('./src/utils/formatPlaceUrl')
  const places = axios
    .get(
      'https://geo.api.gouv.fr/communes/?fields=departement,codesPostaux,population'
    )
    .then((res) => res.data)
    .then((res) =>
      res.forEach((place) => {
        place.departement &&
          createPage({
            path: formatPlaceUrl(place),
            component: require.resolve('./src/templates/place.js'),
            context: { place },
            defer: place.population < 20000,
          })
      })
    )
  const recommandations = axios
    .get(
      `${process.env.GATSBY_API_BASE_URL ||
      'https://api.recosante.beta.gouv.fr'
      }/v1/recommandations`
    )
    .then((res) => res.data)
    .then((res) => {
      createPage({
        path: `/recommandations`,
        component: require.resolve('./src/templates/recommandations.js'),
        context: { recommandations: res},
      })
    })

  return Promise.all([articles, pages, places, recommandations])
}
