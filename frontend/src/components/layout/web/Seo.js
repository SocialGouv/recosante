import { useLocation } from "@reach/router";
import { graphql, useStaticQuery } from "gatsby";
import React from "react";
import { Helmet } from "react-helmet";

const SEO = (props) => {
  const { pathname } = useLocation();
  const { site } = useStaticQuery(graphql`
    query SEO {
      site {
        siteMetadata {
          defaultTitle: title
          defaultDescription: description
          siteUrl
          defaultImage: image
          twitterUsername
        }
      }
    }
  `);

  const {
    defaultTitle,
    defaultDescription,
    siteUrl,
    defaultImage,
    twitterUsername,
  } = site.siteMetadata;

  const seo = {
    title: props.title ? `${props.title} | ${defaultTitle}` : defaultTitle,
    description: props.description || defaultDescription,
    image: `${siteUrl}/${props.image || defaultImage}`,
    url: `${siteUrl}${pathname}`,
  };

  return (
    <Helmet title={seo.title}>
      <meta name="description" content={seo.description} />
      <meta name="image" content={seo.image} />

      {seo.url && <meta property="og:url" content={seo.url} />}

      {(props.article ? true : null) && (
        <meta property="og:type" content="article" />
      )}

      {seo.title && <meta property="og:title" content={seo.title} />}

      {seo.description && (
        <meta property="og:description" content={seo.description} />
      )}

      {seo.image && <meta property="og:image" content={seo.image} />}

      <meta name="twitter:card" content="summary_large_image" />

      {twitterUsername && (
        <meta name="twitter:creator" content={twitterUsername} />
      )}

      {seo.title && <meta name="twitter:title" content={seo.title} />}

      {seo.description && (
        <meta name="twitter:description" content={seo.description} />
      )}

      {seo.image && <meta name="twitter:image" content={seo.image} />}
      <meta
        name="google-site-verification"
        content="B5n63rvRKk7tboZXL2L6x56_O4gbl8NQbD_lNhzih0M"
      />
    </Helmet>
  );
};

export default SEO;
