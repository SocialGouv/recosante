"use client";

import React from 'react';
import IndiceAtmo from './IndiceAtmo';
import Raep from './raep/Raep';
import VigilanceMeteo from './vigilanceMeteo/VigilanceMeteo';
import IndiceUv from './indiceUv/IndiceUv';
import Baignades from './baignades/Baignades';
import PotentielRadon from './potentielRadon/PotentielRadon';
import { useIndicators } from '@/hooks/useIndicators';
import { IndicatorService } from '@/services/indicator';

interface IndicatorsProps {
  place?: {
    code: string;
    nom: string;
  };
  date?: string;
  day?: 'j0' | 'j1';
}

export default function Indicators({ place, date, day = 'j0' }: IndicatorsProps) {
const defaultMunicipalityCode = place?.code || '75056'; // Paris par défaut
  
  console.log('Indicators: Utilisation du code commune:', defaultMunicipalityCode);
  
  const { indicators, loading, error, refetch } = useIndicators({
    municipalityCode: defaultMunicipalityCode,
  });

  // Récupérer les indicateurs spécifiques
  const indiceAtmo = IndicatorService.getIndicatorBySlug(indicators, 'indice_atmospheric');
  const indiceUv = IndicatorService.getIndicatorBySlug(indicators, 'indice_uv');
  const pollens = IndicatorService.getIndicatorBySlug(indicators, 'pollen_allergy');
  const vigilanceMeteo = IndicatorService.getIndicatorBySlug(indicators, 'weather_alert');
  const baignades = IndicatorService.getIndicatorBySlug(indicators, 'bathing_water');

  console.log('Indicators: Données récupérées:', { indicators, indiceAtmo, indiceUv, pollens, vigilanceMeteo, baignades });

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
              <p className="text-xs">URL API: {process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'}/api/indicators/website</p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-6xl">
      <div className="flex flex-col gap-y-6 md:hidden">
        <IndiceAtmo 
          place={place} 
          date={date} 
          data={indiceAtmo}
          day={day}
        />
        <Raep 
          place={place} 
          date={date} 
          data={pollens}
          day={day}
        />
        <IndiceUv 
          place={place} 
          date={date} 
          data={indiceUv}
          day={day}
        />
        {baignades && (
          <Baignades 
            place={place} 
            data={baignades}
            day={day}
          />
        )}
        <VigilanceMeteo 
          place={place} 
          date={date} 
          data={vigilanceMeteo}
          day={day}
        />
        <PotentielRadon place={place} />
      </div>
      <div className="hidden md:flex">
        <div className="flex w-1/2 flex-col gap-y-6 pr-3">
          <IndiceAtmo 
            place={place} 
            date={date} 
            data={indiceAtmo}
            day={day}
          />
          <Raep 
            place={place} 
            date={date} 
            data={pollens}
            day={day}
          />
          <IndiceUv 
            place={place} 
            date={date} 
            data={indiceUv}
            day={day}
          />
          {baignades && (
            <Baignades 
              place={place} 
              data={baignades}
              day={day}
            />
          )}
        </div>
        <div className="flex w-1/2 flex-col gap-y-6 pl-3">
          <VigilanceMeteo 
            place={place} 
            date={date} 
            data={vigilanceMeteo}
            day={day}
          />
          <PotentielRadon place={place} />
        </div>
      </div>
    </section>
  );
} 