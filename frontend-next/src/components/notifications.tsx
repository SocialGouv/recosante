'use client';

// import { toast } from 'sonner';
// import { Button } from './Button';
// import Notification1 from '@/images/screenshot/notif.png';
// import Notification2 from '@/images/screenshot/notif2.png';
// import Notification3 from '@/images/screenshot/notif3.png';
import { useInView } from 'react-intersection-observer';
// import Image from 'next/image';
// import { useEffect } from 'react';
const cards = [
  {
    name: 'Les nouvelles matinales',
    description: 'Notification pour bien commencer la journée à 7h. ',
    icon: '☕️',
  },
  {
    name: 'Les nouvelles de soirée',
    description:
      'Terminez votre journée en beauté ! Recevez une notification à 19h',
    icon: '🌇',
  },
  {
    name: "Les alertes d'urgence",
    description:
      'Soyez informé immédiatement en cas de seuil critique atteint.',
    icon: '⚠️',
  },
];

export function Notification() {
  const { ref, inView, entry } = useInView({
    delay: 600,
  });
  // useEffect(() => {
  //   if (inView) {
  //     toast.custom((t) => (
  //       <div className='w-[400px] '>
  //         <Image
  //           src={Notification1}
  //           alt='Notification screenshot'
  //           className='w-[400px] h-auto '
  //         />
  //       </div>
  //     ));
  //     setTimeout(() => {
  //       toast.custom((t) => (
  //         <div className='w-[400px] '>
  //           <Image
  //             src={Notification2}
  //             alt='Notification screenshot'
  //             className='w-[400px] h-auto '
  //           />
  //         </div>
  //       ));
  //     }, 2000);
  //     setTimeout(() => {
  //       toast.custom((t) => (
  //         <div className='w-[400px] '>
  //           <Image
  //             src={Notification3}
  //             alt='Notification screenshot'
  //             className='w-[400px] h-auto '
  //           />
  //         </div>
  //       ));
  //     }, 4000);
  //   }
  // }, [inView]);

  return (
    <div className='relative isolate overflow-hidden bg-gray-900 py-24 sm:py-32'>
      <div className='hidden sm:absolute sm:-top-10 sm:right-1/2 sm:-z-10 sm:mr-10 sm:block sm:transform-gpu sm:blur-3xl'>
        <div
          className='aspect-[1097/845] w-[68.5625rem] bg-gradient-to-tr from-[#F2D072] to-[#3343BD] opacity-20'
          style={{
            clipPath:
              'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
          }}
        />
      </div>
      <div className='absolute -top-52 left-1/2 -z-10 -translate-x-1/2 transform-gpu blur-3xl sm:top-[-28rem] sm:ml-16 sm:translate-x-0 sm:transform-gpu'>
        <div
          className='aspect-[1097/845] w-[68.5625rem] bg-gradient-to-tr from-[#F2D072] to-[#3343BD] opacity-20'
          style={{
            clipPath:
              'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
          }}
        />
      </div>
      <div className='mx-auto max-w-7xl px-6 lg:px-8'>
        <div className='mx-auto  lg:mx-0'>
          <h2 className='text-4xl font-bold tracking-tight text-white sm:text-6xl'>
            Recevez vos notifications
          </h2>

          <p className='mt-6 text-lg leading-8 text-gray-100 max-w-2xl'>
            Restez toujours informé et réagissez rapidement grâce à nos
            notifications en temps réel.
          </p>
        </div>
        <div
          ref={ref}
          className='mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-6 sm:mt-20 lg:mx-0 lg:max-w-none lg:grid-cols-3 lg:gap-12'
        >
          {cards.map((card) => (
            <div
              key={card.name}
              className=' gap-x-4 rounded-xl bg-white/5 p-6 ring-1 ring-inset ring-white/10'
            >
              <div className='flex items-center space-x-4'>
                <span className='text-3xl '>{card.icon}</span>
                <h3 className='font-semibold text-white'>{card.name}</h3>
              </div>
              <div className='text-base leading-7'>
                <p className='mt-2 text-gray-300'>{card.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
