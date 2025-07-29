"use client";

import React, { useState, useEffect } from 'react';
import SafeHtml from '../SafeHtml';

interface VigilanceMeteoProps {
  place?: {
    code: string;
    nom: string;
  };
  data?: any;
  day?: 'j0' | 'j1';
}

// Fonction utilitaire pour mapper les valeurs de vigilance aux couleurs
const getVigilanceColor = (value: number): string => {
  switch (value) {
    case 0: return '#10B981'; // Vert
    case 1: return '#F59E0B'; // Jaune
    case 2: return '#F97316'; // Orange
    case 3: return '#EF4444'; // Rouge
    default: return '#10B981'; // Vert par défaut
  }
};

// Fonction pour obtenir le label selon la valeur
const getValueLabel = (value: number) => {
  if (value === 0) return "Pas de vigilance particulière";
  if (value === 1) return "Soyez attentifs";
  if (value === 2) return "Soyez très vigilant";
  if (value === 3) return "Une vigilance absolue s'impose";
  return "Pas de vigilance particulière";
};

// Mapping des phénomènes météo
const phenomenes = {
  violent_wind: { name: 'Vent violent', icon: '🌪️' },
  rain_flood: { name: 'Pluie-Inondation', icon: '🌧️' },
  storm: { name: 'Orages', icon: '🌩️' },
  flood: { name: 'Crues', icon: '🌊' },
  snow_ice: { name: 'Neige-verglas', icon: '⛸️' },
  heat_wave: { name: 'Canicule', icon: '🥵' },
  cold_wave: { name: 'Grand Froid', icon: '🥶' },
  avalanche: { name: 'Avalanches', icon: '🌨️' },
  waves_submersion: { name: 'Vagues-Submersion', icon: '🌊' },
};

export default function VigilanceMeteo({ place, data, day = 'j0' }: VigilanceMeteoProps) {
  const [showSeeMorePhenomenes, setSeeMorePhenomenes] = useState(false);
  const [showSeeMorePhenomenesButton, setShowSeeMorePhenomenesButton] = useState(false);

  const currentData = data?.[day] || data?.j0 || data?.j1;
  const hasData = currentData && currentData.summary && currentData.summary.value !== null;
  
  // Utiliser les données de l'API si disponibles
  const indicatorData = hasData ? {
    slug: 'alerte-meteo',
    label: currentData.summary.status,
    value: currentData.summary.value,
    unit: 'sur 4',
    validity: {
      start: currentData.diffusion_date || new Date().toISOString(),
      end: new Date().toISOString(),
    },
    advice: currentData.summary.recommendations.join(' '),
    about: currentData.about || 'La vigilance météorologique est un dispositif de prévention qui permet d\'informer la population sur les risques météorologiques dans les 24 heures à venir.',
  } : {
    slug: 'alerte-meteo',
    label: 'Aucun risque',
    value: 0,
    unit: 'sur 4',
    validity: {
      start: new Date().toISOString(),
      end: new Date().toISOString(),
    },
    advice: 'Pas de vigilance particulière. Conditions météorologiques normales.',
    about: 'La vigilance météorologique est un dispositif de prévention qui permet d\'informer la population sur les risques météorologiques dans les 24 heures à venir.',
  };

  // Extraire les phénomènes avec leurs valeurs
  const phenomenesData = hasData && currentData.values ? currentData.values : [];
  const minimumPhenomenesInView = 5;

  useEffect(() => {
    setShowSeeMorePhenomenesButton((phenomenesData?.length || 0) > minimumPhenomenesInView);
  }, [phenomenesData?.length]);

  const vigilanceValue = ["Vert", "Jaune", "Orange", "Rouge"].indexOf(
    indicatorData?.value.toString()
  );

  const currentColor = getVigilanceColor(vigilanceValue);
  const maxValue = 4;
  const minValue = 0;
  const progressPercentage = (indicatorData.value / maxValue) * 100;

  return (
    <article className="relative bg-white rounded-lg shadow-md p-4 flex flex-col gap-4">
      {/* Titre avec couleur variable */}
      <h2 className="text-lg font-bold uppercase tracking-wide mb-2">
        VIGILANCE MÉTÉO : {indicatorData.label}
      </h2>

      {/* Barre horizontale + valeur */}
      <div className="flex flex-col items-center w-full mb-2">
        <div className="w-full flex items-center gap-2 relative">
          <span className="text-xs text-gray-400">{minValue}</span>
          <div className="relative flex-1 h-3 bg-gray-200 rounded-full">
            <div
              className="absolute top-0 left-0 h-3 rounded-full transition-all"
              style={{ width: `${progressPercentage}%`, background: currentColor }}
            />
            {/* Cercle avec la valeur */}
            <span
              className="absolute top-1/2 -translate-y-1/2"
              style={{ left: `calc(${progressPercentage}% - 18px)` }}
            >
              <span className="flex items-center justify-center w-9 h-9 rounded-full font-bold text-base shadow-md border-2 border-white"
                style={{ background: currentColor, color: '#fff' }}>
                {indicatorData.value}
              </span>
            </span>
          </div>
          <span className="text-xs text-gray-400">{maxValue}</span>
        </div>
      </div>

      {/* Bloc recommandations en bleu */}
      <div className="bg-blue-50 rounded-md p-3">
        <h3 className="text-sm font-semibold text-blue-700 mb-1">Recommandations</h3>
        <SafeHtml
          html={indicatorData.advice || 'Aucune vigilance particulière.'}
          className="text-sm text-blue-900"
        />
      </div>

      {/* Sous-indicateurs par phénomène météo */}
      {hasData && phenomenesData && phenomenesData.length > 0 && (
        <div className="space-y-3">
          {phenomenesData
            ?.filter((_el: any, index: number) => {
              if (showSeeMorePhenomenes) return true;
              return index < minimumPhenomenesInView;
            })
            .map((phenomene: any) => {
              const phenomeneColor = getVigilanceColor(phenomene.value - 1);
              const phenomeneProgressPercentage = (phenomene.value / maxValue) * 100;
              const phenomeneInfo = phenomenes[phenomene.slug as keyof typeof phenomenes];
              
              return (
                <div key={phenomene.slug} className="border border-gray-200 rounded-md p-3">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-sm font-semibold text-gray-800 flex items-center gap-2">
                      <span>{phenomeneInfo?.icon}</span>
                      {phenomeneInfo?.name}
                    </h4>
                    {phenomene.value >= 3 && (
                      <div className="flex items-center gap-1 text-red-600">
                        <span className="text-xs">⚠️</span>
                        <span className="text-xs font-medium">Vigilance élevée</span>
                      </div>
                    )}
                  </div>
                  
                  {/* Barre de progression pour le phénomène */}
                  <div className="flex items-center gap-2 relative">
                    <span className="text-xs text-gray-400">{minValue}</span>
                    <div className="relative flex-1 h-2 bg-gray-200 rounded-full">
                      <div
                        className="absolute top-0 left-0 h-2 rounded-full transition-all"
                        style={{ width: `${phenomeneProgressPercentage}%`, background: phenomeneColor }}
                      />
                      {/* Cercle avec la valeur pour le phénomène */}
                      <span
                        className="absolute top-1/2 -translate-y-1/2"
                        style={{ left: `calc(${phenomeneProgressPercentage}% - 8px)` }}
                      >
                        <span className="flex items-center justify-center w-4 h-4 rounded-full text-xs font-bold shadow-sm border border-white"
                          style={{ background: phenomeneColor, color: '#fff' }}>
                          {phenomene.value}
                        </span>
                      </span>
                    </div>
                    <span className="text-xs text-gray-400">{maxValue}</span>
                  </div>
                  
                  <p className="mt-1 text-xs text-gray-600">
                    {getValueLabel(phenomene.value - 1)}
                  </p>
                </div>
              );
            })}
          
          {/* Bouton "Voir plus" pour les phénomènes */}
          {showSeeMorePhenomenesButton && (
            <button
              onClick={() => setSeeMorePhenomenes(!showSeeMorePhenomenes)}
              className="w-full text-center text-sm text-blue-600 hover:text-blue-800 underline"
            >
              {!showSeeMorePhenomenes
                ? `Voir plus d'indicateurs +`
                : "Voir moins"}
            </button>
          )}
        </div>
      )}

      {/* Bloc à propos en gris */}
      <div className="bg-gray-50 rounded-md p-3">
        <h3 className="text-sm font-semibold text-gray-700 mb-1">À propos de la vigilance météo</h3>
        <div className="text-sm text-gray-900 whitespace-pre-line">{indicatorData.about}</div>
      </div>

      {/* Validité et source */}
      <p className="mb-0 text-xs font-light text-neutral-700 xl:mt-2">
        Prévision pour le {new Date(indicatorData.validity.start).toLocaleDateString("fr", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })} dans votre région.
      </p>
    </article>
  );
} 