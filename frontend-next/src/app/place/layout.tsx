import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Recosanté - Indicateurs environnementaux',
  description: 'Découvrez les indicateurs environnementaux de votre commune : qualité de l\'air, indice UV, pollens, vigilance météo et qualité des eaux de baignade.',
  openGraph: {
    title: 'Recosanté - Indicateurs environnementaux',
    description: 'Découvrez les indicateurs environnementaux de votre commune',
    type: 'website',
  },
};

export default function PlaceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen">
      {children}
    </div>
  );
} 