import dayjs from 'dayjs';

let now = Date.now();

/**
 * Enregistre la durée de chaque étape du processus de récupération des données de pollens
 */
export function logStep(step: string) {
  console.info(`[POLLENS] Duration: ${Date.now() - now}ms`.padEnd(40), step);
  now = Date.now();
}

/**
 * Calcule la date de fin de validité à partir d'une date de diffusion
 */
export function calculateValidityEndDate(diffusionDate: Date): Date {
  return dayjs(diffusionDate).add(7, 'days').utc().endOf('day').toDate();
}
