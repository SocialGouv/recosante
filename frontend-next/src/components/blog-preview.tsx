'use client';
import { MatomoService } from '@/services/matomo';
import Link from 'next/link';

const PATH = 'https://frontend-recosante-preprod.dev.fabrique.social.gouv.fr';

const posts = [
  {
    id: 1,
    title: 'Les plantes améliorent-elles la qualité de l’air intérieur ?',
    href: '/articles/les-plantes-ameliorent-elles-la-qualite-de-l-air-interieur/',
    description:
      'Pour améliorer l’air intérieur, aérer deux fois par jour pendant au moins 10 minutes et pendant les activités de nettoyage, cuisson et bricolage.',
    imageUrl: `${PATH}/static/38cf0297022fc36eae38fa9c65b1b4f5/a4aa2/les-plantes-ameliorent-elles-la-qualite-de-l-air-interieur.webp`,
    category: { title: 'A la maison' },
  },
  {
    id: 2,
    title: 'Comment adapter sa pratique sportive selon la qualité de l’air ?',
    href: '/articles/comment-adapter-sa-pratique-sportive-selon-la-qualite-de-l-air/',
    description:
      'Pour connaître la qualité de l’air autour de chez soi, consulter l’indice national de qualité de l’air calculé par Associations agréées de surveillance de la qualité de l’air (AASQA).',
    imageUrl: `${PATH}/static/be66f964700e076c6ab71b404e3b57e1/53b6a/comment-adapter-sa-pratique-sportive-selon-la-qualite-de-l-air.webp`,
    category: { title: 'Pollution' },
  },
  {
    id: 3,
    title:
      '­À quelle période de l’année y a-t-il le plus de pollen dans l’air ?',
    href: '/articles/a-quelle-periode-de-l-annee-y-a-t-il-le-plus-de-pollen-dans-l-air/',
    description:
      'Veiller à éteindre les guirlandes en cas d’absence ou la nuit pour éviter tout risque d’incendie (chaleur excessive des lampes, court-circuit…).',
    imageUrl: `${PATH}/static/2d814a97c12e2b6cfe6cffff21b92c43/38f0f/a-quelle-periode-de-l-annee-y-a-t-il-le-plus-de-pollen-dans-l-air.webp`,
    category: { title: 'Allergies aux pollens' },
  },
];

export default function BlogPreview() {
  return (
    <div className='bg-white py-24 sm:py-32'>
      <div className='mx-auto max-w-7xl px-6 lg:px-8'>
        <h2 className='text-4xl font-medium tracking-tight text-gray-900 font-marianneBold'>
          Le blog de Recosanté
        </h2>
        <p className='mt-2 text-lg leading-8 text-gray-600'>
          Découvrez nos derniers articles et actualités.
        </p>
        <div className='mx-auto mt-16 grid items-start max-w-2xl grid-cols-1 gap-x-8 gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-3'>
          {posts.map((post) => (
            <article
              key={post.id}
              className='flex flex-col items-start justify-between'
            >
              <div className='relative w-full'>
                <img
                  src={post.imageUrl}
                  alt=''
                  className='aspect-[16/9] w-full rounded-2xl bg-gray-100 object-cover sm:aspect-[2/1] lg:aspect-[3/2]'
                />
                <div className='absolute inset-0 rounded-2xl ring-1 ring-inset ring-gray-900/10' />
              </div>
              <div className='max-w-xl'>
                <div className='mt-8 flex items-center gap-x-4 text-xs'>
                  <span className='relative z-10 rounded-full bg-app-primary px-3 py-1.5 font-medium text-white '>
                    {post.category.title}
                  </span>
                </div>
                <div className='group relative'>
                  <h3 className='mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600'>
                    <Link
                      href={post.href}
                      target='_blank'
                      onClick={() =>
                        MatomoService.trackClick(`article-${post.id}-clicked`)
                      }
                    >
                      <span className='absolute inset-0' />
                      {post.title}
                    </Link>
                  </h3>
                  <p className='mt-5 line-clamp-3 text-sm leading-6 text-gray-600'>
                    {post.description}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className='text-center mt-12'>
          <Link
            onClick={() => MatomoService.trackClick('blog-see-all')}
            href='/articles'
            target='_blank'
            className=' text-center border-b border-black border-spacing-2 mx-auto  text-black font-semibold'
          >
            Voir tous les articles
          </Link>
        </div>
      </div>
    </div>
  );
}
