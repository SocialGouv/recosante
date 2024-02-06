require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
});

module.exports = {
  siteMetadata: {
    title: `Recosanté - Voyez l'impact de l'environnement sur votre santé, et agissez.`,
    author: `Recosante`,
    description: `Télécharger l’application Recosanté.`,
    siteUrl: `https://recosante.beta.gouv.fr`,
    image: "app-og-image.png",
    twitterUsername: "recosante",
  },
  plugins: [
    // {
    //   resolve: `gatsby-plugin-gatsby-cloud`,
    //   options: {
    //     mergeSecurityHeaders: false,
    //   },
    // },
    `gatsby-plugin-image`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    `gatsby-plugin-use-query-params`,
    `gatsby-plugin-styled-components`,
    {
      resolve: `gatsby-plugin-mdx`,
      options: {
        extensions: [".mdx", ".md"],
        mdxOptions: {
          remarkPlugins: [
            {
              resolve: "gatsby-remark-external-links",
            },
            {
              resolve: "gatsby-remark-images",
            },
          ],
        },
      },
    },
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-root-import`,
    {
      resolve: `gatsby-plugin-sitemap`,
      options: {
        // excludes: [`/place/*/*`],
      },
    },
    `gatsby-transformer-json`,
    {
      resolve: "gatsby-plugin-web-font-loader",
      options: {
        custom: {
          families: ["Marianne:n3,n5,n7,n8"],
          urls: ["/fonts/fonts.css"],
        },
      },
    },
    /* {
      resolve: `gatsby-plugin-polyfill-io`,
      options: {
        features: [`IntersectionObserver`],
      },
    },*/

    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/texts`,
        name: `texts`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/articles`,
        name: `articles`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/pages`,
        name: `pages`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/assets`,
        name: `assets`,
      },
    },
    {
      resolve: "gatsby-plugin-matomo",
      options: {
        siteId: "100",
        matomoUrl: "https://matomo.fabrique.social.gouv.fr",
        siteUrl: "https://recosante.beta.gouv.fr",
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Recosante`,
        short_name: `Recosante`,
        start_url: `/`,
        background_color: `#ffffff`,
        theme_color: `#000091`,
        display: `minimal-ui`,
        icon: "static/favicon.png",
      },
    },
    {
      resolve: `gatsby-plugin-offline`,
      options: {
        appendScript: `static/sw-push.js`,
      },
    },
    `gatsby-plugin-postcss`,
  ],
};
