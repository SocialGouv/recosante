import { NextResponse } from 'next/server';
import { getAllArticles, getLatestArticles } from '@/utils/articles';

export async function GET(
  request: Request,
  { searchParams }: { searchParams: URLSearchParams }
) {
  try {
   
    if (!searchParams) {
      const articles = getAllArticles();
      return NextResponse.json({ articles });
    }

    const limit = searchParams.get('limit');
    const category = searchParams.get('category');

    let articles;

    if (category) {
      // Filtrer par catégorie
      const allArticles = getAllArticles();
      articles = allArticles.filter(article => article.category === category);
    } else if (limit) {
      // Récupérer les derniers articles
      articles = getLatestArticles(parseInt(limit));
    } else {
      // Récupérer tous les articles
      articles = getAllArticles();
    }

    return NextResponse.json({ articles });
  } catch (error) {
    console.error('Erreur lors de la récupération des articles:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la récupération des articles' },
      { status: 500 }
    );
  }
} 