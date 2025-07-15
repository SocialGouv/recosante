"use client";

import React, { useState, useRef, useCallback } from "react";
import SubscribeButton from "../SubscribeButton";
import { useModalContext } from "../../app/providers/ModalProvider";

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

export default function VigilanceMeteo({ place, data, day = 'j0' }: VigilanceMeteoProps) {
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
    advice: currentData.help_text || 'Pas de vigilance particulière. Conditions météorologiques normales.',
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

  const { setModal } = useModalContext();
  const [showSeeMoreAdvice, setShowSeeMoreAdvice] = useState(false);
  const [seeMoreAdvice, setSeeMoreAdvice] = useState(false);

  const adviceRef = useRef<HTMLDivElement | null>(null);
  const onRefChange = useCallback((node: HTMLDivElement | null) => {
    if (node === null) {
      // DOM node referenced by ref has been unmounted
    } else {
      adviceRef.current = node;
      if (node.scrollHeight > node.clientHeight) {
        if (!showSeeMoreAdvice) setShowSeeMoreAdvice(true);
      }
    }
  }, [showSeeMoreAdvice]);


  const vigilanceValue = ["Vert", "Jaune", "Orange", "Rouge"].indexOf(
    indicatorData?.value.toString()
  );

  const currentColor = getVigilanceColor(vigilanceValue);
  const progressPercentage = ((vigilanceValue + 1) / 4) * 100;
  const maxValue = 4;

  return (
    <article className="relative bg-white rounded-lg shadow-md p-4 flex flex-col gap-4">
      {/* Titre avec couleur variable */}
      <h2 className="text-lg font-bold uppercase tracking-wide mb-2"
          style={{ color: currentColor }}>
        Vigilance météo : {indicatorData.label}
      </h2>

      {/* Barre horizontale + valeur */}
      <div className="flex flex-col items-center w-full mb-2">
        <div className="w-full flex items-center gap-2 relative">
          <span className="text-xs text-gray-400">1</span>
          <div className="relative flex-1 h-3 bg-gray-200 rounded-full">
            <div
              className="absolute top-0 left-0 h-3 rounded-full transition-all"
              style={{ width: `${(indicatorData.value + 1) / maxValue * 100}%`, background: currentColor }}
            />
            {/* Cercle avec la valeur */}
            <span
              className="absolute top-1/2 -translate-y-1/2"
              style={{ left: `calc(${(indicatorData.value + 1) / maxValue * 100}% - 18px)` }}
            >
              <span className="flex items-center justify-center w-9 h-9 rounded-full font-bold text-base shadow-md border-2 border-white"
                style={{ background: currentColor, color: '#fff' }}>
                {indicatorData.value + 1}
              </span>
            </span>
          </div>
          <span className="text-xs text-gray-400">{maxValue}</span>
        </div>
      </div>

      {/* Bloc recommandations en bleu */}
      <div className="bg-blue-50 rounded-md p-3">
        <h3 className="text-sm font-semibold text-blue-700 mb-1">Recommandations</h3>
        <div className="text-sm text-blue-900" dangerouslySetInnerHTML={{ __html: indicatorData.advice }} />
      </div>

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