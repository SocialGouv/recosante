import { getArticleBySlug, getAllArticles } from '@/utils/articles';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import Header from '@/components/Header';
import SafeHtml from '@/components/SafeHtml';

interface ArticlePageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  const articles = getAllArticles();
  return articles.map((article) => ({
    slug: article.slug,
  }));
}

export default function ArticlePage({ params }: ArticlePageProps) {
  const article = getArticleBySlug(params.slug);

  if (!article) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Bouton retour */}
        <div className="mb-6">
          <Link
            href="/articles"
            className="inline-flex items-center text-main hover:text-main/80 font-medium transition-colors"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Retour aux articles
          </Link>
        </div>

        {/* Image de l'article */}
        {article.image && (
          <div className="relative h-64 md:h-96 bg-gray-200 rounded-lg overflow-hidden mb-8">
            <Image
              src={article.image}
              alt={article.title}
              fill
              className="object-cover"
            />
          </div>
        )}

        {/* Contenu de l'article */}
        <article className="bg-white rounded-lg shadow-md p-8">
          {/* Catégorie */}
          {article.category && (
            <div className="mb-4">
              <span className="px-3 py-1 bg-main/10 text-main text-sm font-medium rounded-full">
                {article.category}
              </span>
            </div>
          )}

          {/* Titre */}
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            {article.title}
          </h1>

          {/* Contenu */}
          <SafeHtml
            html={article.content}
            className="prose prose-lg max-w-none"
          />

          {/* Bon geste */}
          {article.bon_geste && (
            <div className="mt-8 p-6 bg-green-50 border border-green-200 rounded-lg">
              <h3 className="text-lg font-semibold text-green-800 mb-3">
                Bon geste
              </h3>
              <p className="text-green-700">
                {article.bon_geste}
              </p>
            </div>
          )}
        </article>
      </main>
    </div>
  );
} 