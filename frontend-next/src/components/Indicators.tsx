"use client";

import React from 'react';
import IndiceAtmo from './IndiceAtmo';
import Raep from './raep/Raep';
import VigilanceMeteo from './vigilanceMeteo/VigilanceMeteo';
import IndiceUv from './indiceUv/IndiceUv';
import Baignades from './baignades/Baignades';
import PotentielRadon from './potentielRadon/PotentielRadon';

interface IndicatorsProps {
  place: {
    code: string;
    nom: string;
  };
  date?: string;
}

export default function Indicators({ place, date }: IndicatorsProps) {
  // Pour l'instant, on utilise des données mockées
  // TODO: Intégrer les vrais composants d'indicateurs
  
  return (
    <section className="mx-auto max-w-6xl">
      <div className="flex flex-col gap-y-6 md:hidden">
        <IndiceAtmo place={place} date={date} />
        <Raep place={place} date={date} />
        <IndiceUv place={place} date={date} />
        <Baignades place={place} />
        <VigilanceMeteo place={place} date={date} />
        <PotentielRadon place={place} />
      </div>
      <div className="hidden md:flex">
        <div className="flex w-1/2 flex-col gap-y-6 pr-3">
          <IndiceAtmo place={place} date={date} />
          <Raep place={place} date={date} />
          <IndiceUv place={place} date={date} />
          <Baignades place={place} />
        </div>
        <div className="flex w-1/2 flex-col gap-y-6 pl-3">
          <VigilanceMeteo place={place} date={date} />
          <PotentielRadon place={place} />
        </div>
      </div>
    </section>
  );
} 