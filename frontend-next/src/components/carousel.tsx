'use client';

import React, { useEffect, useState } from 'react';
import { InfiniteMovingCards } from './infinite-moving-cards';

const punch = [
  'Courez au bon moment, pour bien respirer.',
  'Pour votre ami qui se mouche tout le temps au mois de mai.',
  'Pour nos grands-parents qui sont à risque.',
  'Pour éviter les gros coups de soleil.',
  'Pour une brasse dans les meilleures conditions.',
  'Pour ne plus oublier votre parapluie.',
  'Gardez le rythme sans larmes pour votre peau.',
  'Pour des sorties sans surprise, même sous la pluie.',
  'Respirez sans encombre, même au printemps.',
  'Protégez vos poumons à chaque foulée.',
  'Pour bronzer sans risque, même en plein été.',
  'Des eaux calmes pour des baignades sereines.',
  'Pour un jogging sans toux à chaque foulée.',
  'Évitez les allergies, même au pic du pollen.',
  'Soyez prévoyant, même face aux tempêtes.',
  'Pour des balades tranquilles, sans mauvaise surprise.',
  "Pensez a la vitamine D quand y'a zero uv",
  'eviter d’être KO avec les antistaminiques tout le printemps',
  'eviter de tousser apres un jogging',
  'eviter de sortir fluo de l’eau',
  'préparez la canicule',
  'eviter le melanome',
  'buvez la bonne eau',
  'Vous etes joggeur, piéton ou cycliste ? Allergique ? Enceinte ou préoccupé par votre santé ?',
  'Sachez comment prendre soin de votre santé',
];
export function Carousel() {
  return (
    <div className=' rounded-md flex flex-col antialiased items-center justify-center relative overflow-hidden'>
      <InfiniteMovingCards items={punch} direction='left' speed='slow' />
    </div>
  );
}
