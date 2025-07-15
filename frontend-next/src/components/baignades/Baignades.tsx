"use client";

import React, { useState, useEffect } from 'react';
import { type Indicator } from '@/services/indicator';

interface BaignadesProps {
  place?: {
    code: string;
    nom: string;
  };
  data?: Indicator & {
    j0?: any;
    j1?: any;
  };
  day?: 'j0' | 'j1';
}

// Fonction utilitaire pour mapper les valeurs de baignade aux couleurs
const getBaignadeColor = (value: number): string => {
  switch (value) {
    case 1: return '#4FCBAD'; // Bon - vert
    case 2: return '#F0E65F'; // Moyen - jaune
    case 3: return '#FFB400'; // Mauvais - orange
    case 4: return '#FF5354'; // Très mauvais - rouge
    default: return '#D9D9EF'; // Par défaut
  }
};

export default function Baignades({ data, day = 'j0' }: BaignadesProps) {
  const [showSeeMorePlages, setSeeMorePlages] = useState(false);
  const [showSeeMorePlagesButton, setShowSeeMorePlagesButton] = useState(false);

  // Utiliser les données de l'API si disponibles
  const baignadesData = data;
  
  // Utiliser les données d'aujourd'hui (j0) par défaut
  const currentData = baignadesData?.[day] || baignadesData?.j0 || baignadesData?.j1;
  
  // Vérifier si on a des données
  const hasData = currentData && currentData.summary && currentData.summary.value !== null;
  const isHorsSaison = currentData?.summary?.status === "Aucune donnée" && 
                      currentData?.help_text?.includes("saison");
  const hasValues = currentData?.values && currentData.values.length > 0;
  
  const plages = hasValues ? currentData.values : [];
  const minimumPlagesInView = 5;

  useEffect(() => {
    setShowSeeMorePlagesButton((plages?.length || 0) > minimumPlagesInView);
  }, [plages?.length]);

  // Fonction pour obtenir le label selon la valeur
  const getValueLabel = (value: number) => {
    if (value === 1) return "Bon résultat";
    if (value === 2) return "Résultat moyen";
    if (value === 3) return "Mauvais résultat";
    if (value === 4) return "Baignade interdite";
    return "Pas de résultat";
  };

  // Données de l'indicateur principal
  const indicatorData = hasData ? {
    slug: 'baignades',
    label: currentData.summary?.status || 'Qualité des eaux de baignade',
    value: currentData.summary?.value || 1,
    unit: 'sur 4',
    validity: {
      start: currentData.diffusion_date || new Date().toISOString(),
      end: new Date().toISOString(),
    },
    advice: currentData.summary?.recommendations?.[0] || currentData.help_text || 'La qualité des eaux de baignade est bonne.',
    about: currentData.about || 'La qualité des eaux de baignade est évaluée selon des critères microbiologiques. Les résultats permettent d\'informer les baigneurs sur la qualité sanitaire des eaux.',
  } : {
    slug: 'baignades',
    label: isHorsSaison ? 'Hors saison' : 'Pas de données',
    value: 1,
    unit: 'sur 4',
    validity: {
      start: new Date().toISOString(),
      end: new Date().toISOString(),
    },
    advice: isHorsSaison 
      ? "La saison de baignade n'a pas encore officiellement débuté dans cette commune."
      : "Il n'y a pas de sites de baignade en eau de mer ou en eau douce recensés pour cette commune.",
    about: 'La qualité des eaux de baignade est évaluée selon des critères microbiologiques. Les résultats permettent d\'informer les baigneurs sur la qualité sanitaire des eaux.',
  };

  const currentColor = getBaignadeColor(indicatorData.value);
  const maxValue = 4;
  const progressPercentage = (indicatorData.value / maxValue) * 100;

  return (
    <article className="relative bg-white rounded-lg shadow-md p-4 flex flex-col gap-4">
      {/* Titre avec couleur variable */}
      <h2 className="text-lg font-bold uppercase tracking-wide mb-2">
        EAU DE BAIGNADE : {indicatorData.label}
      </h2>

      {/* Barre horizontale + valeur */}
      <div className="flex flex-col items-center w-full mb-2">
        <div className="w-full flex items-center gap-2 relative">
          <span className="text-xs text-gray-400">0</span>
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

      {/* Sous-indicateurs par site de baignade */}
      {hasValues && plages && plages.length > 0 && (
        <div className="space-y-3">
          {plages
            ?.filter((_el: any, index: number) => {
              if (showSeeMorePlages) return true;
              return index < minimumPlagesInView;
            })
            .map((element: any) => {
              const siteColor = getBaignadeColor(element.value);
              const siteProgressPercentage = (element.value / maxValue) * 100;
              
              return (
                <div key={element.slug} className="border border-gray-200 rounded-md p-3">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-sm font-semibold text-gray-800">
                      {element.link ? (
                        <a
                          href={element.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="underline hover:text-blue-600"
                        >
                          {element.name}
                        </a>
                      ) : (
                        element.name
                      )}
                    </h4>
                    {element.value === 4 && (
                      <div className="flex items-center gap-1 text-red-600">
                        <span className="text-xs">🚫</span>
                        <span className="text-xs font-medium">Baignade interdite</span>
                      </div>
                    )}
                  </div>
                  
                  {/* Barre de progression pour le site */}
                  <div className="flex items-center gap-2 relative">
                    <span className="text-xs text-gray-400">0</span>
                    <div className="relative flex-1 h-2 bg-gray-200 rounded-full">
                      <div
                        className="absolute top-0 left-0 h-2 rounded-full transition-all"
                        style={{ width: `${siteProgressPercentage}%`, background: siteColor }}
                      />
                      {/* Cercle avec la valeur pour le site */}
                      <span
                        className="absolute top-1/2 -translate-y-1/2"
                        style={{ left: `calc(${siteProgressPercentage}% - 8px)` }}
                      >
                        <span className="flex items-center justify-center w-4 h-4 rounded-full text-xs font-bold shadow-sm border border-white"
                          style={{ background: siteColor, color: '#fff' }}>
                          {element.value}
                        </span>
                      </span>
                    </div>
                    <span className="text-xs text-gray-400">{maxValue}</span>
                  </div>
                  
                  <p className="mt-1 text-xs text-gray-600">
                    {getValueLabel(element.value)}
                  </p>
                </div>
              );
            })}
          
          {/* Bouton "Voir plus" pour les sites */}
          {showSeeMorePlagesButton && (
            <button
              onClick={() => setSeeMorePlages(!showSeeMorePlages)}
              className="w-full text-center text-sm text-blue-600 hover:text-blue-800 underline"
            >
              {!showSeeMorePlages
                ? `Voir plus d'indicateurs +`
                : "Voir moins"}
            </button>
          )}
        </div>
      )}

      {/* Bloc à propos en gris */}
      <div className="bg-gray-50 rounded-md p-3">
        <h3 className="text-sm font-semibold text-gray-700 mb-1">À propos de la qualité des eaux de baignade</h3>
        <div className="text-sm text-gray-900 whitespace-pre-line">{indicatorData.about}</div>
      </div>


      {/* Validité et source */}
      {currentData?.diffusion_date && (
        <p className="mb-0 text-xs font-light text-neutral-700 xl:mt-2">
          Données du {new Date(currentData.diffusion_date).toLocaleDateString("fr", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}.{" "}
          Données fournies par le{" "}
          <a
            href="https://baignades.sante.gouv.fr"
            target="_blank"
            rel="noopener noreferrer"
            className="underline"
          >
            Ministère de la Santé et de la Prévention
          </a>
        </p>
      )}
    </article>
  );
} 