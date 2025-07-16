"use client";

import React, { useState, useRef, useCallback } from "react";
import Chart from "./Chart";

interface IndiceUvProps {
  data?: any;
  day?: 'j0' | 'j1';
}

const maxValue = 11;

const getUvLabel = (value: number) => {
  if (value <= 2) return "FAIBLE";
  if (value <= 5) return "MODÉRÉ";
  if (value <= 7) return "FORT";
  if (value <= 10) return "TRÈS FORT";
  return "EXTRÊME";
};

const getUvColor = (value: number) => {
  if (value === 0) return '#D9D9EF';
  if (value === 1 || value === 2) return '#73c8ae';
  if (value === 3 || value === 4 || value === 5) return '#fcbf49';
  if (value === 6 || value === 7) return '#E38136';
  if (value === 8 || value === 9 || value === 10) return '#FF797A';
  if (value === 11) return '#965f9b';
  return '#D9D9EF';
};

export default function IndiceUv({ data, day = 'j0' }: IndiceUvProps) {
  const currentData = data?.[day] || data?.j0 || data?.j1;
  const hasData = currentData && currentData.summary && currentData.summary.value !== null;

  const indicatorData = hasData ? {
    slug: 'indice-uv',
    label: getUvLabel(currentData.summary.value),
    value: currentData.summary.value,
    unit: 'sur 11',
    validity: {
      start: currentData.diffusion_date || new Date().toISOString(),
      end: new Date().toISOString(),
    },
    advice: currentData.help_text || 'Protection nécessaire. Évitez l\'exposition entre 12h et 16h. Recherchez l\'ombre et portez des vêtements protecteurs.',
    about: currentData.about || `Les ultraviolets naturels (UV) font partie des rayonnements émis par le soleil. Si une exposition occasionnelle présente un effet bénéfique (vitamine D), une exposition trop importante peut engendrer des risques immédiats (coups de soleil) ou de long terme (cancer de la peau).

Pour communiquer sur le niveau de risque d’une exposition au soleil, l’Organisation mondiale de la météorologie et l’Organisation mondiale de la santé recommandent d’utiliser une échelle universelle appelée « Indice UV ».`
  } : {
    slug: 'indice-uv',
    label: 'MODÉRÉ',
    value: 5,
    unit: 'sur 11',
    validity: {
      start: new Date().toISOString(),
      end: new Date().toISOString(),
    },
    advice: 'Protection nécessaire. Évitez l\'exposition entre 12h et 16h. Recherchez l\'ombre et portez des vêtements protecteurs.',
    about: `Les ultraviolets naturels (UV) font partie des rayonnements émis par le soleil. Si une exposition occasionnelle présente un effet bénéfique (vitamine D), une exposition trop importante peut engendrer des risques immédiats (coups de soleil) ou de long terme (cancer de la peau).

Pour communiquer sur le niveau de risque d’une exposition au soleil, l’Organisation mondiale de la météorologie et l’Organisation mondiale de la santé recommandent d’utiliser une échelle universelle appelée « Indice UV ».`
  };

  // Gestion du "voir plus" pour les recommandations
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

  return (
    <article className="relative bg-white rounded-lg shadow-md p-4 flex flex-col gap-4">
      {/* Titre */}
      <h2 className="text-lg font-bold uppercase tracking-wide mb-2">
        Indice UV : {indicatorData.label}
      </h2>

      {/* Barre horizontale + valeur */}
      <div className="flex flex-col items-center w-full mb-2">
        <div className="w-full flex items-center gap-2 relative">
          <span className="text-xs text-gray-400">0</span>
          <div className="relative flex-1 h-3 bg-orange-100 rounded-full">
            <div
              className="absolute top-0 left-0 h-3 rounded-full transition-all"
              style={{ width: `${(indicatorData.value / maxValue) * 100}%`, background: getUvColor(indicatorData.value) }}
            />
            {/* Cercle avec la valeur */}
            <span
              className="absolute top-1/2 -translate-y-1/2"
              style={{ left: `calc(${(indicatorData.value / maxValue) * 100}% - 18px)` }}
            >
              <span className="flex items-center justify-center w-9 h-9 rounded-full font-bold text-base shadow-md border-2 border-white"
                style={{ background: getUvColor(indicatorData.value), color: '#fff' }}>
                {indicatorData.value}
              </span>
            </span>
          </div>
          <span className="text-xs text-gray-400">{maxValue}</span>
        </div>
      </div>

      <div className="bg-blue-50 rounded-md p-3">
        <h3 className="text-sm font-semibold text-blue-700 mb-1">Recommandations</h3>
        <div className="text-sm text-blue-900" dangerouslySetInnerHTML={{ __html: indicatorData.advice }} />
      </div>

      {/* Bloc à propos */}
      <div className="bg-gray-50 rounded p-3">
        <h3 className="text-sm font-semibold mb-2 text-gray-700 uppercase tracking-wide">À propos de l'indice UV</h3>
        <p className="text-xs text-gray-700 whitespace-pre-line">
          {indicatorData.about}
        </p>
      </div>

      {/* Validité */}
      {indicatorData.validity?.start && (
        <p className="mb-0 text-xs font-light text-neutral-700 xl:mt-2">
          Prévision pour le {new Date(indicatorData.validity.start).toLocaleDateString("fr", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })} dans votre région.
        </p>
      )}
    </article>
  );
} 