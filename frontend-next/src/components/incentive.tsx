import mockup from '@/images/mockup.jpg';
import Image from 'next/image';

const incentives = [
  {
    name: 'Simple et gratuit',
    imageSrc:
      'https://tailwindui.com/img/ecommerce/icons/icon-shipping-simple.svg',
    description:
      "Disponible sur l'App Store et le Play Store. Sans création de compte et personnalisable.",
  },
  {
    name: 'Sans collecte de données',
    imageSrc:
      'https://tailwindui.com/img/ecommerce/icons/icon-warranty-simple.svg',
    description: 'Sans publicité, pas de collecte de données',
  },
  {
    name: 'Personnalisable',
    imageSrc:
      'https://tailwindui.com/img/ecommerce/icons/icon-exchange-simple.svg',
    description:
      'Choisissez les indicateurs qui vous intéressent et recevez des alertes en fonction de votre localisation.',
  },
];

export function Incentive() {
  return (
    <div className='bg-gray-50'>
      <div className='mx-auto max-w-7xl py-24 sm:px-2 sm:py-32 lg:px-4'>
        <div className='mx-auto max-w-2xl px-4 lg:max-w-none'>
          <div className='grid grid-cols-1 items-center gap-x-16 gap-y-10 lg:grid-cols-2'>
            <div>
              <h2 className='text-4xl font-bold tracking-tight text-gray-900'>
                Une application facile,
                <br /> gratuite, <br /> et sans collecte de données.
              </h2>
              <p className='mt-4 text-gray-500'>
                Pas de publicité, pas de collecte de données, pas de frais, pas
                de création de compte.
                <br /> Juste une application pour vous aider à protéger votre
                santé et celle de votre famille.
              </p>
            </div>
            <div className='aspect-h-2 aspect-w-3 overflow-hidden rounded-lg bg-gray-100'>
              <Image
                src={mockup}
                alt=''
                className='object-cover object-center'
              />
            </div>
          </div>
          <div className='mt-16 grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-3'>
            {incentives.map((incentive) => (
              <div key={incentive.name} className='sm:flex lg:block'>
                <div className='sm:flex-shrink-0'>
                  <img className='h-16 w-16' src={incentive.imageSrc} alt='' />
                </div>
                <div className='mt-4 sm:ml-6 sm:mt-0 lg:ml-0 lg:mt-6'>
                  <h3 className='text-sm font-medium text-gray-900'>
                    {incentive.name}
                  </h3>
                  <p className='mt-2 text-sm text-gray-500'>
                    {incentive.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
