import { Metadata } from 'next';
import { MunicipalityService } from '@/services/municipality';

interface PlaceLayoutProps {
  children: React.ReactNode;
  params: {
    code: string;
    nom: string;
  };
}

export async function generateMetadata({ params }: PlaceLayoutProps): Promise<Metadata> {
  try {
    const municipality = await MunicipalityService.getMunicipalityByCode(params.code);
    
    if (municipality) {
      const title = `Indicateurs environnementaux - ${municipality.nom} | Recosanté`;
      const description = `Découvrez les indicateurs environnementaux de ${municipality.nom} : qualité de l'air, indice UV, pollens, vigilance météo et qualité des eaux de baignade.`;
      
      return {
        title,
        description,
        openGraph: {
          title,
          description,
          type: 'website',
          url: `https://recosante.beta.gouv.fr/place/${params.code}/${params.nom}/`,
        },
        twitter: {
          card: 'summary_large_image',
          title,
          description,
        },
      };
    }
  } catch (error) {
    console.error('Erreur lors de la génération des métadonnées:', error);
  }

  // Métadonnées par défaut
  return {
    title: 'Indicateurs environnementaux | Recosanté',
    description: 'Découvrez les indicateurs environnementaux de votre commune.',
  };
}

export default function PlaceLayout({ children }: PlaceLayoutProps) {
  return (
    <div className="min-h-screen">
      {children}
    </div>
  );
} 