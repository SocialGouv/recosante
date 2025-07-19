import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

const articlesDirectory = path.join(process.cwd(), 'src/content/articles');

export interface Article {
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

export function getAllArticles(): Article[] {
  // Récupérer tous les fichiers .md du dossier articles
  const fileNames = fs.readdirSync(articlesDirectory);
  const allArticlesData = fileNames
    .filter((fileName) => fileName.endsWith('.md'))
    .map((fileName) => {
      // Supprimer l'extension ".md" du nom de fichier pour obtenir l'id
      const id = fileName.replace(/\.md$/, '');
      const slug = id;

      // Lire le fichier markdown en tant que chaîne
      const fullPath = path.join(articlesDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');

      // Utiliser gray-matter pour parser la section frontmatter du post
      const matterResult = matter(fileContents);

      // Créer un extrait du contenu (premiers 150 caractères)
      const contentWithoutFrontmatter = matterResult.content;
      const excerpt = contentWithoutFrontmatter
        .replace(/[#*`]/g, '') // Supprimer les marqueurs markdown
        .substring(0, 150)
        .trim() + '...';

      // Combiner les données avec l'id
      return {
        id,
        slug,
        excerpt,
        content: contentWithoutFrontmatter,
        ...(matterResult.data as {
          title: string;
          order: number;
          image: string;
          category: string;
          bon_geste: string;
        }),
      };
    });

  // Trier les articles par ordre
  return allArticlesData.sort((a, b) => a.order - b.order);
}

export function getArticleBySlug(slug: string): Article | null {
  try {
    const fullPath = path.join(articlesDirectory, `${slug}.md`);
    const fileContents = fs.readFileSync(fullPath, 'utf8');

    // Utiliser gray-matter pour parser la section frontmatter du post
    const matterResult = matter(fileContents);

    // Utiliser remark pour convertir markdown en HTML
    const processedContent = remark()
      .use(html)
      .processSync(matterResult.content);
    const contentHtml = processedContent.toString();

    // Créer un extrait
    const excerpt = matterResult.content
      .replace(/[#*`]/g, '')
      .substring(0, 150)
      .trim() + '...';

    // Combiner les données avec l'id
    return {
      id: slug,
      slug,
      excerpt,
      content: contentHtml,
      ...(matterResult.data as {
        title: string;
        order: number;
        image: string;
        category: string;
        bon_geste: string;
      }),
    };
  } catch (error) {
    return null;
  }
}

export function getArticlesByCategory(category: string): Article[] {
  const allArticles = getAllArticles();
  return allArticles.filter(article => article.category === category);
}

export function getLatestArticles(limit: number = 3): Article[] {
  const allArticles = getAllArticles();
  return allArticles.slice(0, limit);
} 