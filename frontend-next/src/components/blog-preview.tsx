'use client';
import { MatomoService } from '@/services/matomo';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

interface Article {
  id: string;
  title: string;
  order: number;
  image: string;
  category: string;
  bon_geste: string;
  content: string;
  slug: string;
  excerpt?: string;
}

export default function BlogPreview() {
  const [posts, setPosts] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('/api/articles?limit=3');
        if (response.ok) {
          const data = await response.json();
          setPosts(data.articles);
        } else {
          console.error('Erreur lors du chargement des articles');
        }
      } catch (error) {
        console.error('Erreur lors du chargement des articles:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) {
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
            {[1, 2, 3].map((i) => (
              <div key={i} className='animate-pulse'>
                <div className='aspect-[16/9] w-full rounded-2xl bg-gray-200'></div>
                <div className='mt-8 h-4 bg-gray-200 rounded w-24'></div>
                <div className='mt-3 h-6 bg-gray-200 rounded w-full'></div>
                <div className='mt-5 h-4 bg-gray-200 rounded w-full'></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

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
          {posts.slice(0, 3).map((post) => (
            <article
              key={post.id}
              className='flex flex-col items-start justify-between'
            >
              <div className='relative w-full'>
                <Image
                  width={400}
                  height={225}
                  src={post.image}
                  alt={post.title}
                  className='aspect-[16/9] w-full rounded-2xl bg-gray-100 object-cover sm:aspect-[2/1] lg:aspect-[3/2]'
                />
                <div className='absolute inset-0 rounded-2xl ring-1 ring-inset ring-gray-900/10' />
              </div>
              <div className='max-w-xl'>
                <div className='mt-8 flex items-center gap-x-4 text-xs'>
                  <span className='relative z-10 rounded-full bg-app-primary px-3 py-1.5 font-medium text-white '>
                    {post.category}
                  </span>
                </div>
                <div className='group relative'>
                  <h3 className='mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600'>
                    <Link
                      href={`/articles/${post.slug}`}
                      onClick={() =>
                        MatomoService.trackClick(`article-${post.id}-clicked`)
                      }
                    >
                      <span className='absolute inset-0' />
                      {post.title}
                    </Link>
                  </h3>
                  <p className='mt-5 line-clamp-3 text-sm leading-6 text-gray-600'>
                    {post.bon_geste}
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
            className=' text-center border-b border-black border-spacing-2 mx-auto  text-black font-semibold'
          >
            Voir tous les articles
          </Link>
        </div>
      </div>
    </div>
  );
}
