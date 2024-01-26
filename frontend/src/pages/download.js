import React from "react";
import { Helmet } from "react-helmet";
import Web from "components/layout/Web";
import { Script } from "gatsby";

const ANDROID_APP_ID = "com.recosante.recosante";
const IOS_APP_ID = "6476136888";
const ROOT_URL = "https://recosante.beta.gouv.fr";
const ANDROID_URL = `https://play.google.com/store/apps/details?id=${ANDROID_APP_ID}`;
const IOS_URL = `https://apps.apple.com/fr/app/id${IOS_APP_ID}`;

export default function Download() {
  return (
    <Web title="Télécharger Recosanté">
      <Helmet title="Télécharger Recosanté">
        <meta charset="UTF-8" />
        <title>Télécharger Recosanté</title>
        <meta
          property="og:title"
          content="Télécharger Recosanté"
          key="Download"
        />
        <meta
          name="description"
          content="Télécharger Recosanté - Agir pour protéger votre santé"
          key="Download"
        />
        <meta
          property="og:description"
          content="Télécharger Recosanté - Agir pour protéger votre santé"
          key="Download"
        />
        {/* <meta property="og:image" content="/images/logo_oz.png" /> handled by gatsby */}
        <meta property="og:type" content="article" />
        {/* <meta property="fb:app_id" content="TODO" /> */}
        {/* <meta property="al:ios:url" content="recosante://welcome /> */}
        <meta property="al:ios:app_store_id" content={IOS_APP_ID} />
        <meta property="al:ios:app_name" content="Recosanté" />
        {/* <meta property="al:android:url" content="recosante://welcome /> */}
        <meta property="al:android:app_name" content="Recosanté" />
        <meta property="al:android:package" content={ANDROID_APP_ID} />
        <meta property="al:web:url" content={ROOT_URL} />
        <meta property="al:web:should_fallback" content="false" />
        <Script
          id="redirect-to-stores"
          dangerouslySetInnerHTML={{
            __html: `
  function redirect() {
    var userAgent = navigator.userAgent || navigator.vendor || window.opera;
    var ios = /iPad|iPhone|iPod/.test(userAgent) && !window.MSStream;
    if (ios) {
      window.location = recosante://welcome;
      window.setTimeout(() => {
        window.location.replace('${IOS_URL}');
      }, 25)
      return
    }
    var android = /android/i.test(userAgent);
    if (android) {
      window.location = recosante://welcome;
      window.setTimeout(() => {
        window.location.replace('${ANDROID_URL}');
      }, 25)
      return
    }
    // window.location.replace('${ROOT_URL}')
  }
  redirect()
`,
          }}
        />
      </Helmet>
      <section className="relative mx-auto flex max-w-sm flex-col px-4 pt-10 md:max-w-6xl md:px-6 xl:pt-20">
        <div className="mx-auto">
          <div className="flex w-full items-center text-center">
            <div>
              <h1>
                Télécharger <strong>Recosanté</strong>
              </h1>
              <p className="mb-5 text-lg  leading-normal lg:text-2xl lg:leading-9">
                Agir pour protéger votre santé
              </p>
              <div className="mx-auto mb-7 mt-3 grid max-w-sm grid-flow-col gap-3">
                <a href={ANDROID_URL}>
                  <img
                    className="w-full object-contain"
                    src="/google-play-fr.png"
                    alt="disponible sur google play"
                  />
                </a>
                <a href={IOS_URL}>
                  <img
                    className="w-full object-contain"
                    src="/app-store-fr.png"
                    alt="télécharger dans l'app store"
                  />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Web>
  );
}
