const posts = [
  {
    id: 1,
    title: 'Quels gestes adopter en cas de vigilance météo avalanche ?',
    href: 'https://recosante.beta.gouv.fr/articles/quels-gestes-adopter-en-cas-de-vigilance-meteo-avalanche/',
    description:
      'Avant une sortie en montagne, consulter les bulletins avalanches disponibles sur le site de Météo France.      ',
    imageUrl:
      'https://recosante.beta.gouv.fr/static/eaf85bc3642cb9838e984963fc21c89b/c3195/quels-gestes-adopter-en-cas-de-vigilance-meteo-avalanche.webp',
    category: { title: 'Phénomènes météorologiques', href: '#' },
  },
  {
    id: 2,
    title: 'Les microcapteurs de qualité de l’air ambiant sont-ils fiables ?',
    href: 'https://recosante.beta.gouv.fr/articles/les-microcapteurs-de-qualite-de-l-air-ambiant-sont-ils-fiables/',
    description:
      'Pour connaître la qualité de l’air autour de chez soi, consulter l’indice national de qualité de l’air calculé par Associations agréées de surveillance de la qualité de l’air (AASQA).',
    imageUrl:
      'https://recosante.beta.gouv.fr/static/5e66503198d761e612c6ad3e5d21361d/09444/les-microcapteurs-de-qualite-de-l-air-ambiant-sont-ils-fiables.webp',
    category: { title: 'Pollution', href: '#' },
  },
  {
    id: 3,
    title:
      'Quels gestes adopter pour profiter du sapin de Noël en toute sécurité à la maison ?',
    href: 'https://recosante.beta.gouv.fr/articles/quels-gestes-adopter-pour-profiter-du-sapin-de-noel-en-toute-securite-a-la-maison/',
    description:
      'Veiller à éteindre les guirlandes en cas d’absence ou la nuit pour éviter tout risque d’incendie (chaleur excessive des lampes, court-circuit…).',
    imageUrl:
      'https://recosante.beta.gouv.fr/static/3c51500a3c4e0d9c840adb5dcf4c02f1/b7ef5/quels-gestes-adopter-pour-profiter-du-sapin-de-noel-en-toute-securite-a-la-maison.webp',
    category: { title: 'Pollution', href: '#' },
  },
];

export default function BlogPreview() {
  return (
    <div className='bg-white py-24 sm:py-32'>
      <div className='mx-auto max-w-7xl px-6 lg:px-8'>
        <div className='mx-auto max-w-2xl text-center'>
          <h2 className='text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl'>
            Le blog de Recosanté
          </h2>
          <p className='mt-2 text-lg leading-8 text-gray-600'>
            Découvrez nos derniers articles et actualités.
          </p>
        </div>
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
                  <a
                    href='#'
                    className='relative z-10 rounded-full bg-app-primary px-3 py-1.5 font-medium text-white hover:bg-gray-100'
                  >
                    {post.category.title}
                  </a>
                </div>
                <div className='group relative'>
                  <h3 className='mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600'>
                    <a href={post.href} target='_blank'>
                      <span className='absolute inset-0' />
                      {post.title}
                    </a>
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
          <a
            href='https://recosante.beta.gouv.fr/articles/'
            target='_blank'
            className=' text-center border-b border-black border-spacing-2 mx-auto  text-black font-semibold'
          >
            Voir tous les articles
          </a>
        </div>
      </div>
    </div>
  );
}
