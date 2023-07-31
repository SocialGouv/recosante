import React from "react";
import { Link, useStaticQuery, graphql } from "gatsby";

import Newsletter from "components/Newsletter";

import Testimonies from "components/Testimonies";
import Markdown from "components/base/Markdown";

export default function Home() {
  const queries = useStaticQuery(
    graphql`
      query {
        dataSource: mdx(fields: { slug: { eq: "data-source" } }) {
          body
        }
        about: mdx(fields: { slug: { eq: "about" } }) {
          body
        }
      }
    `
  );

  return (
    <>
      <Newsletter />
      <Testimonies />
      <section className="mx-auto mb-10 max-w-prose px-6 xl:mb-40 xl:max-w-6xl">
        <h2>
          Nos <strong>articles santé</strong>
        </h2>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi ipsa
          aperiam at quod impedit adipisci quae! Qui deleniti itaque
          consequuntur, beatae perspiciatis voluptatibus deserunt eligendi autem
          commodi aut porro nulla.
        </p>
        <Link
          className="inline font-medium underline decoration-main"
          to="/articles"
        >
          Consultez le catalogue
          <CircledArrow />
        </Link>
      </section>
      <section className="mx-auto mb-10 hidden max-w-prose px-6 xl:mb-40 xl:block xl:max-w-6xl">
        <h2>
          Nos <strong>recommandations</strong>
        </h2>
        <p>
          Vous pouvez consulter le{" "}
          <Link to="/recommandations">catalogue des recommandations</Link> sur
          la santé environnement constitué dans le cadre de la construction du
          service Recosanté et validé par le{" "}
          <a
            href="https://www.santepubliquefrance.fr/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Santé publique France
          </a>
          .
        </p>
        <p>
          Les recommandations sont classées suivant leur thématique et sont
          adaptées à une situation environnementale donnée.
        </p>
        <Link
          className="inline font-medium underline decoration-main"
          to="/recommandations"
        >
          Consultez les recommandations
          <CircledArrow />
        </Link>
      </section>
      <section className="mx-auto mb-10 max-w-prose px-6 xl:mb-40 xl:hidden">
        <h2>
          <strong>En savoir plus</strong> sur Recosanté
        </h2>
        <details className="border-b border-main py-2 [&_div]:scale-y-0 [&_div]:open:scale-y-100 [&_h2]:hidden [&_h3]:open:mb-4 [&_svg]:open:rotate-180">
          <summary className="no-marker list-none">
            <h3 className="mb-0 flex w-full items-center justify-between text-lg font-medium">
              Qui sommes-nous ? <ArrowSummary />
            </h3>
          </summary>
          <div className="origin-top transition-transform">
            <Markdown>{queries.about.body}</Markdown>
          </div>
        </details>
        <details className="border-b border-main py-2 [&_div]:scale-y-0 [&_div]:open:scale-y-100 [&_h2]:hidden [&_h3]:open:mb-4 [&_svg]:open:rotate-180">
          <summary className="no-marker list-none">
            <h3 className="mb-0 flex w-full items-center justify-between text-lg font-medium">
              D'où viennent les données Recosanté ?<ArrowSummary />
            </h3>
          </summary>
          <div className="origin-top transition-transform">
            <Markdown>{queries.dataSource.body}</Markdown>
          </div>
        </details>
        <details className="border-b border-main py-2 [&_div]:scale-y-0 [&_div]:open:scale-y-100 [&_h2]:hidden [&_h3]:open:mb-4 [&_svg]:open:rotate-180">
          <summary className="no-marker list-none">
            <h3 className="mb-0 flex w-full items-center justify-between text-lg font-medium">
              Nos recommandations
              <ArrowSummary />
            </h3>
          </summary>
          <div className="origin-top transition-transform">
            <p>
              Vous pouvez consulter le{" "}
              <Link to="/recommandations">catalogue des recommandations</Link>{" "}
              sur la santé environnement constitué dans le cadre de la
              construction du service Recosanté et validé par le{" "}
              <a
                href="https://www.santepubliquefrance.fr/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Santé publique France
              </a>
              .
            </p>
            <p>
              Les recommandations sont classées suivant leur thématique et sont
              adaptées à une situation environnementale donnée.
            </p>
            <Link
              className="mb-4 inline-block font-medium underline decoration-main"
              to="/recommandations"
            >
              Consultez les recommandations
              <CircledArrow />
            </Link>
          </div>
        </details>
      </section>
      <section className="mx-auto mb-10 hidden max-w-prose px-6 xl:mb-40 xl:block xl:max-w-6xl">
        <Markdown>{queries.dataSource.body}</Markdown>
      </section>
    </>
  );
}

function CircledArrow() {
  return (
    <svg
      className="ml-1 inline h-4 w-4"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M7.33334 6.7335V4.9335L9.73334 7.3335L7.33334 9.7335V7.9335H4.93334V6.7335H7.33334ZM7.33334 1.3335C10.6453 1.3335 13.3333 4.0215 13.3333 7.3335C13.3333 10.6455 10.6453 13.3335 7.33334 13.3335C4.02134 13.3335 1.33334 10.6455 1.33334 7.3335C1.33334 4.0215 4.02134 1.3335 7.33334 1.3335ZM7.33334 12.1335C9.98534 12.1335 12.1333 9.9855 12.1333 7.3335C12.1333 4.6815 9.98534 2.5335 7.33334 2.5335C4.68134 2.5335 2.53334 4.6815 2.53334 7.3335C2.53334 9.9855 4.68134 12.1335 7.33334 12.1335Z"
        fill="#000091"
      />
    </svg>
  );
}

function ArrowSummary() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      className="transform transition-transform duration-300"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M8.00001 7.29277L11.3 10.5928L12.2427 9.65011L8.00001 5.40744L3.75734 9.65011L4.70001 10.5928L8.00001 7.29277Z"
        fill="#000091"
      />
    </svg>
  );
}
