"use client";

import React from 'react';
import IndiceAtmo from './IndiceAtmo';
import Raep from './raep/Raep';
import VigilanceMeteo from './vigilanceMeteo/VigilanceMeteo';
import IndiceUv from './indiceUv/IndiceUv';
import Baignades from './baignades/Baignades';
import PotentielRadon from './potentielRadon/PotentielRadon';
import { useIndicators } from '@/hooks/useIndicators';
import { useFavorites } from '@/hooks/useFavorites';
import { IndicatorService } from '@/services/indicator';
import StarIcon from './StarIcon';

interface IndicatorsProps {
  place?: {
    code: string;
    nom: string;
  };
  date?: string;
  day?: 'j0' | 'j1';
}

const IndicatorWithFavorite = React.memo(({ 
  indicator, 
  isFavorite, 
  toggleFavorite 
}: { 
  indicator: any;
  isFavorite: (slug: string) => boolean;
  toggleFavorite: (slug: string) => void;
}) => {
  const Component = indicator.component;
  const isFav = isFavorite(indicator.slug);
  
  return (
    <div className="relative">
      <div className="absolute top-2 right-2 z-10">
        <button
          onClick={() => toggleFavorite(indicator.slug)}
          className="transition-all duration-200 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-full p-1 bg-white/80 backdrop-blur-sm"
          aria-label={isFav ? 'Retirer des favoris' : 'Ajouter aux favoris'}
        >
          <StarIcon 
            isFilled={isFav}
            size="md"
            className={isFav 
              ? 'text-yellow-500 fill-current' 
              : 'text-gray-400 hover:text-yellow-400'
            }
          />
        </button>
      </div>
      
      <Component {...indicator.props} data={indicator.data} />
    </div>
  );
});

IndicatorWithFavorite.displayName = 'IndicatorWithFavorite';

export default function Indicators({ place, date, day = 'j0' }: IndicatorsProps) {
const defaultMunicipalityCode = place?.code || '75056'; // Paris par défaut
  
  console.log('Indicators: Utilisation du code commune:', defaultMunicipalityCode);
  
  const { indicators, loading, error, refetch } = useIndicators({
    municipalityCode: defaultMunicipalityCode,
  });

  const { favorites, toggleFavorite, isFavorite } = useFavorites();

  // Récupérer les indicateurs spécifiques
  const indiceAtmo = IndicatorService.getIndicatorBySlug(indicators, 'indice_atmospheric');
  const indiceUv = IndicatorService.getIndicatorBySlug(indicators, 'indice_uv');
  const pollens = IndicatorService.getIndicatorBySlug(indicators, 'pollen_allergy');
  const vigilanceMeteo = IndicatorService.getIndicatorBySlug(indicators, 'weather_alert');
  const baignades = IndicatorService.getIndicatorBySlug(indicators, 'bathing_water');

  console.log('Indicators: Données récupérées:', { indicators, indiceAtmo, indiceUv, pollens, vigilanceMeteo, baignades });

  // Fonction pour trier les indicateurs (favoris en premier)
  const sortIndicators = React.useCallback((indicators: any[]) => {
    return indicators.sort((a, b) => {
      const aIsFavorite = isFavorite(a.slug);
      const bIsFavorite = isFavorite(b.slug);
      
      if (aIsFavorite && !bIsFavorite) return -1;
      if (!aIsFavorite && bIsFavorite) return 1;
      return 0;
    });
  }, [isFavorite]);

  // Préparer les indicateurs avec leurs données et les trier
  interface IndicatorConfig {
    component: React.ComponentType<any>;
    data: any;
    slug: string;
    props: Record<string, any>;
  }

  const allIndicators: IndicatorConfig[] = [
    { component: IndiceAtmo, data: indiceAtmo, slug: 'indice_atmospheric', props: { place, day } },
    { component: Raep, data: pollens, slug: 'pollen_allergy', props: { place, date, day } },
    { component: IndiceUv, data: indiceUv, slug: 'indice_uv', props: { day } },
    { component: Baignades, data: baignades, slug: 'bathing_water', props: { place, day } },
    { component: VigilanceMeteo, data: vigilanceMeteo, slug: 'weather_alert', props: { place, day } },
  ].filter(indicator => indicator.data); // Filtrer les indicateurs sans données

  // Trier les indicateurs (favoris en premier)
  const sortedIndicators = sortIndicators(allIndicators);

  if (loading) {
    return (
      <section className="mx-auto max-w-6xl">
        <div className="flex items-center justify-center py-12">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Chargement des indicateurs...</p>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="mx-auto max-w-6xl">
        <div className="flex items-center justify-center py-12">
          <div className="text-center">
            <p className="text-red-600 mb-4">Erreur: {error}</p>
            <button
              onClick={refetch}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Réessayer
            </button>
            <div className="mt-4 p-4 bg-gray-100 rounded">
              <p className="text-sm text-gray-600 mb-2">Debug info:</p>
              <p className="text-xs">Code commune: {defaultMunicipalityCode}</p>
              <p className="text-xs">URL API: {process.env.NEXT_PUBLIC_API_URL}/api/indicators/website</p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-6xl">
      {/* Version mobile - une colonne */}
      <div className="lg:hidden space-y-6">
        {sortedIndicators.map((indicator, index) => (
          <IndicatorWithFavorite 
            key={`${indicator.slug}-${index}`} 
            indicator={indicator}
            isFavorite={isFavorite}
            toggleFavorite={toggleFavorite}
          />
        ))}
      </div>

      {/* Version desktop - deux colonnes */}
      <div 
        className="hidden lg:block"
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '1.5rem',
          width: '100%'
        }}
      >
        {/* Colonne gauche */}
        <div className="space-y-6">
          {sortedIndicators
            .filter((_, index) => index % 2 === 0)
            .map((indicator, index) => (
              <IndicatorWithFavorite 
                key={`left-${indicator.slug}-${index}`} 
                indicator={indicator}
                isFavorite={isFavorite}
                toggleFavorite={toggleFavorite}
              />
            ))}
        </div>

        {/* Colonne droite */}
        <div className="space-y-6">
          {sortedIndicators
            .filter((_, index) => index % 2 === 1)
            .map((indicator, index) => (
              <IndicatorWithFavorite 
                key={`right-${indicator.slug}-${index}`} 
                indicator={indicator}
                isFavorite={isFavorite}
                toggleFavorite={toggleFavorite}
              />
            ))}
        </div>
      </div>
    </section>
  );
} 