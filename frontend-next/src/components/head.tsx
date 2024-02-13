'use client';

import Head from 'next/head';
import { usePathname } from 'next/navigation';

interface MetaProps {
  title: string;
  description: string;
}

export function Meta(props: MetaProps) {
  const path = usePathname();
  return (
    <Head>
      <title>{props.title}</title>
      <meta name='description' content={props.description} key='description' />
      <meta property='og:title' content={props.title} key='og:title' />
      <meta
        property='og:description'
        content={props.description}
        key='og:description'
      />
      <meta property='og:type' content='website' key='og:type' />
      <meta property='og:url' content={path!} key='og:url' />
      <meta
        property='og:image'
        content='http://recosante.beta.gouv.fr/app-og-image.png'
      />
      <meta name='application-name' content={props.title} />
      <meta name='apple-mobile-web-app-capable' content='yes' />
      <meta name='apple-mobile-web-app-status-bar-style' content='default' />
      <meta name='apple-mobile-web-app-title' content={props.title} />
      <meta name='format-detection' content='telephone=no' />
      <meta name='mobile-web-app-capable' content='yes' />
      <meta name='msapplication-TileColor' content='#2c2c2c' />
      <meta name='msapplication-tap-highlight' content='no' />
      <meta name='theme-color' content='#2c2c2c' />

      <link rel='manifest' href='/manifest.json' />
      <link
        rel='mask-icon'
        href='/icons/safari-pinned-tab.svg'
        color='#5bbad5'
      />

      <meta name='twitter:card' content='summary' />
      <meta name='twitter:url' content='http://recosante.beta.gouv.fr' />
      <meta
        name='twitter:title'
        content="Recosanté - Voyez l'impact de l'environnement sur votre santé, et agissez."
      />
      <meta
        name='twitter:description'
        content='Télécharger l’application Recosanté.'
      />
      <meta
        name='twitter:image'
        content='http://recosante.beta.gouv.fr/app-og-image.png'
      />

      <meta property='og:url' content='http://recosante.beta.gouv.fr' />
      <link rel='icon' href='/favicon.ico' sizes='any' />
    </Head>
  );
}
