"use client";

import React from 'react';
import { type Indicator } from '@/services/indicator';

interface RaepProps {
  place?: {
    code: string;
    nom: string;
  };
  date?: string;
  data?: any; // Changé pour accepter la structure réelle de l'API
}

export default function Raep({ place, date, data }: RaepProps) {
  const isSuspended = true; // TODO: À configurer selon les besoins

  const j0Data = data?.j0;
  const j1Data = data?.j1;
  
  const currentData = j0Data || j1Data;
  
  const hasData = currentData && currentData.summary && currentData.summary.value !== null;
  
  const indicatorData = hasData ? {
    slug: 'pollens',
    label: currentData.summary.status,
    value: currentData.summary.value,
    unit: 'sur 5',
    validity: {
      start: currentData.diffusion_date || new Date().toISOString(),
      end: new Date().toISOString(),
    },
    advice: currentData.help_text || 'Risque allergique faible à modéré',
  } : {
    slug: 'pollens',
    label: 'Risque allergique aux pollens',
    value: 2,
    unit: 'sur 5',
    validity: {
      start: new Date().toISOString(),
      end: new Date().toISOString(),
    },
    advice: 'Risque allergique faible à modéré',
  };

  return (
    <article className="relative">
      <div className={`relative w-full overflow-hidden rounded-t-lg bg-white drop-shadow-xl ${isSuspended ? 'opacity-50' : ''}`}>
        <div className={`flex w-full cursor-pointer items-baseline justify-between px-2 py-4 text-base font-medium ${isSuspended ? 'bg-gray-100 text-gray-500' : 'bg-green-600/5 text-green-600'}`}>
          <h2 className={`m-0 basis-3/4 text-left text-base font-medium ${isSuspended ? 'text-gray-500' : 'text-green-600'}`}>
            Risque allergique aux pollens
          </h2>
          <span className={`inline-flex h-4 w-4 items-center justify-center rounded-full border-2 text-xs ${isSuspended ? 'border-gray-400 text-gray-400' : 'border-green-600 text-green-600'}`}>
            ?
          </span>
        </div>
        <div className="flex flex-col items-center justify-center p-3">
          {isSuspended ? (
            // État suspendu
            <div className="flex w-full flex-col items-center justify-center gap-x-4 gap-y-2 xs:flex-row xs:items-start">
              <div className="flex flex-col items-center">
                <div className="h-16 w-16 rounded-full bg-gray-100 flex items-center justify-center">
                  <span className="text-2xl font-bold text-gray-400">⏸️</span>
                </div>
                <p className="-mt-4 text-center font-medium text-gray-500">
                  Temporairement suspendu
                </p>
              </div>
              <div className="flex flex-col">
                <p className="hyphens-auto text-justify font-light text-gray-600">
                  L'indicateur revient bientôt
                </p>
              </div>
            </div>
          ) : (
            // État normal
            <div className="flex w-full flex-col items-center justify-center gap-x-4 gap-y-2 xs:flex-row xs:items-start">
              <div className="flex flex-col items-center">
                <div className="h-16 w-16 rounded-full bg-green-100 flex items-center justify-center">
                  <span className="text-2xl font-bold text-green-600">{indicatorData.value}</span>
                </div>
                <p className="-mt-4 text-center font-medium text-green-600">
                  {indicatorData.label}
                </p>
              </div>
              <div className="flex flex-col">
                <p className="hyphens-auto text-justify font-light">
                  {indicatorData.advice}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
      {!isSuspended && indicatorData.validity?.start && (
        <p className="mb-0 text-xs font-light text-neutral-700 xl:mt-2">
          Prévision pour le{" "}
          {new Date(indicatorData.validity.start).toLocaleDateString("fr", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}{" "}
          dans votre région.
        </p>
      )}
    </article>
  );
} 