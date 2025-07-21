'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Article } from '@/utils/articles';
import Header from '@/components/Header';

export default function ArticlesPage() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [filterCategories, setFilterCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await fetch('/api/articles/');
        const data = await response.json();
        setArticles(data.articles);
        setLoading(false);
      } catch (error) {
        console.error('Erreur lors du chargement des articles:', error);
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  // Extraire toutes les catégories uniques
  const allCategories = Array.from(new Set(articles.map(article => article.category)));

  // Filtrer les articles par catégorie
  const filteredArticles = filterCategories.length > 0
    ? articles.filter(article => 
        filterCategories.includes(article.category)
      )
    : articles;

  const toggleCategory = (category: string) => {
    setFilterCategories(prev => 
      prev.includes(category)
        ? prev.filter(cat => cat !== category)
        : [...prev, category]
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="flex justify-center items-center min-h-[60vh]">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-main"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Titre et filtres */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-6">Nos <strong className='text-main'>articles</strong> </h1>
          
          {/* Filtres par catégorie */}
          <div className="flex flex-wrap gap-2 mb-6">
            {allCategories.map(category => (
              <button
                key={category}
                onClick={() => toggleCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  filterCategories.includes(category)
                    ? 'bg-main text-white'
                    : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
          
          {/* Compteur d'articles */}
          <p className="text-gray-600">
            {filteredArticles.length} article{filteredArticles.length > 1 ? 's' : ''} trouvé{filteredArticles.length > 1 ? 's' : ''}
          </p>
        </div>

        {/* Grille d'articles */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredArticles.map((article) => (
            <article key={article.slug} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              {/* Image de l'article */}
              <div className="relative h-48 bg-gray-200">
                {article.image && (
                  <Image
                    src={article.image}
                    alt={article.title}
                    fill
                    className="object-cover"
                  />
                )}
              </div>
              
              {/* Contenu de l'article */}
              <div className="p-6">
                {/* Catégorie */}
                {article.category && (
                  <div className="mb-3">
                    <div className='flex items-center gap-x-4 text-xs'>
                  <span className='relative z-10 rounded-full bg-app-primary px-3 py-1.5 font-medium text-white '>
                    {article.category}
                  </span>
                </div>
                  </div>
                )}
                
                {/* Titre */}
                <h2 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">
                  {article.title}
                </h2>
                
                {/* Extrait */}
                <p className="text-gray-600 mb-4 line-clamp-3">
                  {article.excerpt}
                </p>
                
                {/* Actions */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                   
                    
                    {/* Icône Partager */}
                    <button className="text-gray-400 hover:text-main transition-colors">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                      </svg>
                    </button>
                    
                    {/* Icône Télécharger */}
                   
                  </div>
                  
                  {/* Lien "Lire plus" */}
                  <Link
                    href={`/articles/${article.slug}`}
                    className="inline-flex items-center text-main hover:text-main/80 font-medium transition-colors"
                  >
                    Lire plus
                    <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
        
        {/* Message si aucun article trouvé */}
        {filteredArticles.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">
              Aucun article trouvé pour les catégories sélectionnées.
            </p>
          </div>
        )}
      </main>
    </div>
  );
} 