'use client';

import { getAllArticles, getArticlesWithRedirects, getArticlesWithoutRedirects } from '../utils/articles';
import { useHasSanteFrRedirect } from '../hooks/useSanteFrRedirect';
import Link from 'next/link';

interface ArticlesListProps {
  showRedirects?: boolean; // Afficher seulement les articles avec redirections
  showLocalOnly?: boolean; // Afficher seulement les articles sans redirections
  limit?: number; // Limiter le nombre d'articles affichés
}

export default function ArticlesList({ 
  showRedirects = false, 
  showLocalOnly = false, 
  limit 
}: ArticlesListProps) {
  let articles = getAllArticles();
  
  if (showRedirects) {
    articles = getArticlesWithRedirects();
  } else if (showLocalOnly) {
    articles = getArticlesWithoutRedirects();
  }
  
  if (limit) {
    articles = articles.slice(0, limit);
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {articles.map((article) => (
        <ArticleCard key={article.id} article={article} />
      ))}
    </div>
  );
}

interface ArticleCardProps {
  article: {
    id: string;
    slug: string;
    title: string;
    excerpt?: string;
    image: string;
    category: string;
    redirectToSanteFr?: string;
  };
}

function ArticleCard({ article }: ArticleCardProps) {
  const hasRedirect = useHasSanteFrRedirect(article.slug);

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      {article.image && (
        <div className="relative h-48">
          <img 
            src={article.image} 
            alt={article.title}
            className="w-full h-full object-cover"
          />
          {hasRedirect && (
            <div className="absolute top-2 right-2">
              <span className="bg-blue-600 text-white text-xs px-2 py-1 rounded-full">
                Redirection sante.fr
              </span>
            </div>
          )}
        </div>
      )}
      
      <div className="p-6">
        <div className="flex items-center gap-2 mb-3">
          <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
            {article.category}
          </span>
          {hasRedirect && (
            <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
              → sante.fr
            </span>
          )}
        </div>
        
        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          {article.title}
        </h3>
        
        {article.excerpt && (
          <p className="text-gray-600 text-sm mb-4 line-clamp-3">
            {article.excerpt}
          </p>
        )}
        
        <div className="flex justify-between items-center">
          {hasRedirect ? (
            <a 
              href={article.redirectToSanteFr}
              className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium"
              target="_blank"
              rel="noopener noreferrer"
            >
              Lire sur sante.fr
              <svg className="ml-1 w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          ) : (
            <Link 
              href={`/articles/${article.slug}`}
              className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium"
            >
              Lire l'article
              <svg className="ml-1 w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
} 