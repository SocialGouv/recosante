'use client';

import React from "react";
import SafeHtml from './SafeHtml';

interface IndiceAtmoProps {
  place?: {
    code: string;
    nom: string;
  };
  data?: any;
  day?: 'j0' | 'j1';
}

// Fonction utilitaire pour la couleur ATMO (alignée mobile)
const getAtmoColor = (value: number) => {
  if (value === 1) return '#4FCBAD'; // Bon
  if (value === 2) return '#F0E65F'; // Moyen
  if (value === 3) return '#FFB400'; // Dégradé
  if (value === 4) return '#FF5354'; // Mauvais
  if (value === 5) return '#A83559'; // Très mauvais
  if (value === 6) return '#7D237D'; // Extrêmement mauvais
  return '#D9D9EF'; // Par défaut
};

// Fonction pour obtenir le label du polluant
const getPollutantLabel = (slug: string) => {
  const labels: { [key: string]: string } = {
    'code_no2': 'Dioxyde d\'azote (NO₂)',
    'code_o3': 'Ozone (O₃)',
    'code_pm10': 'Particules fines (PM₁₀)',
    'code_pm25': 'Particules fines (PM₂,₅)',
    'code_so2': 'Dioxyde de soufre (SO₂)',
  };
  return labels[slug] || slug;
};

// Fonction pour obtenir le label selon la valeur
const getValueLabel = (value: number) => {
  if (value === 1) return "Bon";
  if (value === 2) return "Moyen";
  if (value === 3) return "Dégradé";
  if (value === 4) return "Mauvais";
  if (value === 5) return "Très mauvais";
  if (value === 6) return "Extrêmement mauvais";
  return "Pas de résultat";
};

export default function IndiceAtmo({ data, day = 'j0' }: IndiceAtmoProps) {
  const currentData = data?.[day] || data?.j0 || data?.j1;
  const hasData = currentData && currentData.summary && currentData.summary.value !== null;

  const indicatorData = hasData ? {
    slug: 'indice-atmo',
    label: currentData.summary.status,
    value: currentData.summary.value,
    unit: 'sur 6',
    validity: {
      start: currentData.diffusion_date || new Date().toISOString(),
      end: new Date().toISOString(),
    },
    advice: currentData.summary.recommendations ? currentData.summary.recommendations.join(' ') : "La qualité de l'air est bonne.",
    about: currentData.about || "L'indice ATMO est un indicateur de la qualité de l'air ambiant calculé à partir de plusieurs polluants réglementés. Il permet d'informer la population sur le niveau de pollution de l'air.",
    values: currentData.values || [],
  } : {
    slug: 'indice-atmo',
    label: 'Qualité de l\'air',
    value: 1,
    unit: 'sur 6',
    validity: {
      start: new Date().toISOString(),
      end: new Date().toISOString(),
    },
    advice: "La qualité de l'air est bonne.",
    about: "L'indice ATMO est un indicateur de la qualité de l'air ambiant calculé à partir de plusieurs polluants réglementés. Il permet d'informer la population sur le niveau de pollution de l'air.",
    values: [],
  };

  const maxValue = 6;
  const currentColor = getAtmoColor(indicatorData.value);

  // Filtrer les valeurs valides (non nulles et non zéro)
  const validPollutants = indicatorData.values.filter((pollutant: any) => 
    pollutant.value && pollutant.value > 0 && pollutant.value <= 6
  );

  return (
    <article className="relative bg-white rounded-lg shadow-md p-4 flex flex-col gap-4">
      {/* Titre avec couleur variable */}
      <h2 className="text-lg font-bold uppercase tracking-wide mb-2"
          >
        INDICE ATMO : {indicatorData.label}
      </h2>

      {/* Barre horizontale + valeur */}
      <div className="flex flex-col items-center w-full mb-2">
        <div className="w-full flex items-center gap-2 relative">
          <span className="text-xs text-gray-400">1</span>
          <div className="relative flex-1 h-3 bg-gray-200 rounded-full">
            <div
              className="absolute top-0 left-0 h-3 rounded-full transition-all"
              style={{ width: `${(indicatorData.value / maxValue) * 100}%`, background: currentColor }}
            />
            {/* Cercle avec la valeur */}
            <span
              className="absolute top-1/2 -translate-y-1/2"
              style={{ left: `calc(${(indicatorData.value / maxValue) * 100}% - 18px)` }}
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

      {/* Bloc recommandations */}
      <div className="bg-blue-50 rounded-md p-3">
        <h3 className="text-sm font-semibold text-blue-700 mb-1">Recommandations</h3>
        <SafeHtml
          html={indicatorData.advice}
          className="text-sm text-blue-900"
        />
      </div>

      {/* Sous-indicateurs (polluants) - style identique à Baignades */}
      {validPollutants.length > 0 && (
        <div className="space-y-3">
          {validPollutants.map((pollutant: any, index: number) => {
            const pollutantColor = getAtmoColor(pollutant.value);
            const pollutantProgressPercentage = (pollutant.value / maxValue) * 100;
            
            return (
              <div key={pollutant.slug || index} className="border border-gray-200 rounded-md p-3">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-sm font-semibold text-gray-800">
                    {getPollutantLabel(pollutant.slug)}
                  </h4>
                </div>
                
                {/* Barre de progression pour le polluant */}
                <div className="flex items-center gap-2 relative">
                  <span className="text-xs text-gray-400">1</span>
                  <div className="relative flex-1 h-2 bg-gray-200 rounded-full">
                    <div
                      className="absolute top-0 left-0 h-2 rounded-full transition-all"
                      style={{ width: `${pollutantProgressPercentage}%`, background: pollutantColor }}
                    />
                    {/* Cercle avec la valeur pour le polluant */}
                    <span
                      className="absolute top-1/2 -translate-y-1/2"
                      style={{ left: `calc(${pollutantProgressPercentage}% - 8px)` }}
                    >
                      <span className="flex items-center justify-center w-4 h-4 rounded-full text-xs font-bold shadow-sm border border-white"
                        style={{ background: pollutantColor, color: '#fff' }}>
                        {pollutant.value}
                      </span>
                    </span>
                  </div>
                  <span className="text-xs text-gray-400">{maxValue}</span>
                </div>
                
                <p className="mt-1 text-xs text-gray-600">
                  {getValueLabel(pollutant.value)}
                </p>
              </div>
            );
          })}
        </div>
      )}

      {/* Bloc à propos */}
      <div className="bg-gray-50 rounded-md p-3">
        <h3 className="text-sm font-semibold text-gray-700 mb-1">À propos de l'indice ATMO</h3>
        <div className="text-sm text-gray-900 whitespace-pre-line">{indicatorData.about}</div>
      </div>

      {/* Validité et source */}
      <p className="mb-0 text-xs font-light text-neutral-700 xl:mt-2">
        Prévision pour le {new Date(indicatorData.validity.start).toLocaleDateString("fr", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })}.
      </p>
    </article>
  );
} 