import { type PollenAllergyRisk } from '@prisma/client';
import { getPollensStatus, getPollensDotColor } from '../indicators/pollen';
import { PollensRiskNumberEnum } from '~/types/api/pollens';

export interface NotificationPollenData {
  id: string;
  text?: string;
  value?: number;
  status?: string;
  dotColor?: string;
}

export interface FormatPollenNotificationResult {
  pollenData: NotificationPollenData | null;
  notificationText: string | null;
  position?: number; // Position suggérée dans le tableau des notifications
}

/**
 * @param pollen Données de pollen du jour (peut être null si non disponibles)
 * @param isMainIndicator Indique si le pollen est l'indicateur principal
 * @returns Objet contenant les données formatées pour la notification
 */
export function formatPollenNotification(
  pollen: PollenAllergyRisk | null,
  isMainIndicator: boolean = false,
): FormatPollenNotificationResult {
  if (!pollen) {
    return {
      pollenData: null,
      notificationText: null,
    };
  }

  // Données de base pour la notification
  const pollenData: NotificationPollenData = {
    id: pollen.id,
  };
 
  const pollenValue = pollen.total ?? 0;
  const pollenStatus = getPollensStatus(pollenValue);
  const pollenDotColor = getPollensDotColor(pollenValue);

  // Si le niveau est trop bas pour être significatif
  if (!pollenDotColor || pollenValue < PollensRiskNumberEnum.MODERATE) {
    return {
      pollenData: {
        ...pollenData,
        value: pollenValue,
        status: pollenStatus,
      },
      notificationText: null,
    };
  }

  // Créer le texte de notification avec l'émoji, le statut et la couleur
  const notificationText = `🌿 Risque pollens : ${pollenStatus} ${pollenDotColor}`;

  pollenData.text = notificationText;
  pollenData.value = pollenValue;
  pollenData.status = pollenStatus;
  pollenData.dotColor = pollenDotColor;

  // Position recommandée (0 si principal, 3 sinon)
  const position = isMainIndicator ? 0 : 3;

  return {
    pollenData,
    notificationText,
    position,
  };
}
