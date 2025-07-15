"use client";

import React from 'react';

interface PotentielRadonProps {
  place?: {
    code: string;
    nom: string;
  };
  data?: any;
  day?: 'j0' | 'j1';
}

// Fonction utilitaire pour mapper les valeurs de radon aux couleurs
const getRadonColor = (value: number): string => {
  switch (value) {
    case 1: return '#4FCBAD'; // Faible - vert (même que ATMO)
    case 2: return '#F0E65F'; // Moyen - jaune (même que ATMO)
    case 3: return '#FFB400'; // Élevé - orange (même que ATMO)
    default: return '#D9D9EF'; // Par défaut
  }
};

export default function PotentielRadon({ }: PotentielRadonProps) {
  // Données mockées pour le potentiel radon (données statiques)
  const mockData = {
    potentiel_radon: {
      indice: {
        value: 2,
        label: "Potentiel\u00A0moyen"
      },
      advice: {
        main: "Le potentiel radon de votre commune est moyen. Il est recommandé de mesurer la concentration en radon dans votre logement, particulièrement dans les pièces de vie du rez-de-chaussée et du sous-sol. Des mesures simples peuvent être mises en place pour réduire l'exposition."
      },
      validity: {
        area: "votre commune"
      },
      sources: [
        {
          label: "IRSN",
          url: "https://www.irsn.fr"
        }
      ]
    }
  };

  // Données de l'indicateur principal
  const indicatorData = {
    slug: 'potentiel-radon',
    label: mockData.potentiel_radon.indice?.label || 'Potentiel Radon',
    value: mockData.potentiel_radon.indice?.value || 2,
    unit: 'sur 3',
    validity: {
      start: new Date().toISOString(),
      end: new Date().toISOString(),
    },
    advice: mockData.potentiel_radon.advice?.main || 'Le potentiel radon de votre commune est moyen.',
    about: 'Le radon est un gaz radioactif naturel présent dans le sol et les roches. Il peut s\'accumuler dans les bâtiments et présenter un risque pour la santé en cas d\'exposition prolongée. Le potentiel radon d\'une commune indique la probabilité de trouver des concentrations élevées de radon dans les bâtiments.',
  };

  const currentColor = getRadonColor(indicatorData.value);
  const maxValue = 3;
  const progressPercentage = (indicatorData.value / maxValue) * 100;

  return (
    <article className="relative bg-white rounded-lg shadow-md p-4 flex flex-col gap-4">
      {/* Titre avec couleur variable */}
      <h2 className="text-lg font-bold uppercase tracking-wide mb-2"
          style={{ color: currentColor }}>
        POTENTIEL RADON : {indicatorData.label.toUpperCase()}
      </h2>

      {/* Barre horizontale + valeur */}
      <div className="flex flex-col items-center w-full mb-2">
        <div className="w-full flex items-center gap-2 relative">
          <span className="text-xs text-gray-400">1</span>
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
        <div className="text-sm text-blue-900">{indicatorData.advice}</div>
      </div>

      {/* Bloc à propos en gris */}
      <div className="bg-gray-50 rounded-md p-3">
        <h3 className="text-sm font-semibold text-gray-700 mb-1">À propos du potentiel radon</h3>
        <div className="text-sm text-gray-900 whitespace-pre-line">{indicatorData.about}</div>
      </div>

      {/* Validité et source */}
      {!!mockData?.potentiel_radon?.validity?.area && (
        <p className="mb-0 text-xs font-light text-neutral-700 xl:mt-2">
          Données statiques valides pour {mockData.potentiel_radon.validity.area}.
          Données fournies par{" "}
          {mockData.potentiel_radon.sources && (
            <a
              href={mockData.potentiel_radon.sources[0].url}
              target="_blank"
              rel="noopener noreferrer"
              className="underline"
            >
              {mockData.potentiel_radon.sources[0].label}
            </a>
          )}
        </p>
      )}
    </article>
  );
} 