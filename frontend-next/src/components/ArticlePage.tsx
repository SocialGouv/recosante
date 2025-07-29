'use client';

import { useSanteFrRedirect } from '../hooks/useSanteFrRedirect';
import SanteFrRedirect from './SanteFrRedirect';
import { getArticleBySlug } from '../utils/articles';

interface ArticlePageProps {
  slug: string;
}

export default function ArticlePage({ slug }: ArticlePageProps) {
  const { hasRedirect, redirectUrl, isLoading } = useSanteFrRedirect(slug);
  const article = getArticleBySlug(slug);

  // Si l'article a une redirection vers sante.fr, afficher le composant de redirection
  if (hasRedirect && redirectUrl) {
    return (
      <SanteFrRedirect 
        redirectUrl={redirectUrl}
        delay={2000} // Délai de 2 secondes avant la redirection
        showRedirectMessage={true}
      />
    );
  }

  // Si l'article n'existe pas
  if (!article) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] p-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">
          Article non trouvé
        </h1>
        <p className="text-gray-600">
          L'article que vous recherchez n'existe pas.
        </p>
      </div>
    );
  }

  // Affichage normal de l'article
  return (
    <article className="max-w-4xl mx-auto px-4 py-8">
      <header className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          {article.title}
        </h1>
        
        {article.image && (
          <div className="mb-6">
            <img 
              src={article.image} 
              alt={article.title}
              className="w-full h-64 object-cover rounded-lg"
            />
          </div>
        )}
        
        <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
          <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full">
            {article.category}
          </span>
        </div>
        
        {article.bon_geste && (
          <div className="bg-green-50 border-l-4 border-green-400 p-4 mb-6">
            <p className="text-green-800">
              <strong>Bon geste :</strong> {article.bon_geste}
            </p>
          </div>
        )}
      </header>
      
      <div 
        className="prose prose-lg max-w-none"
        dangerouslySetInnerHTML={{ __html: article.content }}
      />
      
      {article.excerpt && (
        <div className="mt-8 p-4 bg-gray-50 rounded-lg">
          <h3 className="text-lg font-semibold mb-2">Résumé</h3>
          <p className="text-gray-700">{article.excerpt}</p>
        </div>
      )}
    </article>
  );
} 