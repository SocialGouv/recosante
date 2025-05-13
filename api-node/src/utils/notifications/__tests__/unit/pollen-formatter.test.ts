import { formatPollenNotification } from '../../pollen-formatter';
import { PollensRiskNumberEnum } from '~/types/api/pollens';
import { type PollenAllergyRisk } from '@prisma/client';

// Mock des imports
jest.mock('../../../indicators/pollen', () => ({
  getPollensStatus: jest.fn((value) => {
    switch (value) {
      case 1:
        return 'Très faible';
      case 2:
        return 'Faible';
      case 3:
        return 'Modéré';
      case 4:
        return 'Élevé';
      case 5:
        return 'Très élevé';
      case 6:
        return 'Extrêmement élevé';
      default:
        return 'Aucune donnée';
    }
  }),
  getPollensDotColor: jest.fn((value) => {
    switch (value) {
      case 1:
        return '⚪';
      case 2:
        return '🟢';
      case 3:
        return '🟡';
      case 4:
        return '🟠';
      case 5:
        return '🔴';
      case 6:
        return '🟣';
      default:
        return null;
    }
  }),
}));

describe('formatPollenNotification', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return null when no pollen data is available', () => {
    const result = formatPollenNotification(null);

    expect(result.pollenData).toBeNull();
    expect(result.notificationText).toBeNull();
  });

  it('should return data without notification text for a low level (1-2)', () => {
    // Création d'un objet pollen avec uniquement les propriétés nécessaires
    const pollen = {
      id: 'pollen-id-123',
      total: PollensRiskNumberEnum.LOW,
    } as unknown as PollenAllergyRisk;

    const result = formatPollenNotification(pollen);

    expect(result.pollenData).not.toBeNull();
    expect(result.pollenData?.id).toBe('pollen-id-123');
    expect(result.pollenData?.value).toBe(PollensRiskNumberEnum.LOW);
    expect(result.pollenData?.status).toBe('Faible');
    expect(result.notificationText).toBeNull();
  });

  it('should correctly format a moderate level (3)', () => {
    const pollen = {
      id: 'pollen-id-456',
      total: PollensRiskNumberEnum.MODERATE,
    } as unknown as PollenAllergyRisk;

    const result = formatPollenNotification(pollen);

    expect(result.pollenData).not.toBeNull();
    expect(result.pollenData?.id).toBe('pollen-id-456');
    expect(result.pollenData?.value).toBe(PollensRiskNumberEnum.MODERATE);
    expect(result.pollenData?.status).toBe('Modéré');
    expect(result.pollenData?.dotColor).toBe('🟡');
    expect(result.notificationText).toBe('🌿 Risque pollens : Modéré 🟡');
    expect(result.position).toBe(3); // Default position (not main)
  });

  it('should correctly format a high level (4)', () => {
    const pollen = {
      id: 'pollen-id-789',
      total: PollensRiskNumberEnum.HIGH,
    } as unknown as PollenAllergyRisk;

    const result = formatPollenNotification(pollen, true); // Main indicator

    expect(result.pollenData?.value).toBe(PollensRiskNumberEnum.HIGH);
    expect(result.pollenData?.status).toBe('Élevé');
    expect(result.pollenData?.dotColor).toBe('🟠');
    expect(result.notificationText).toBe('🌿 Risque pollens : Élevé 🟠');
    expect(result.position).toBe(0); // Main position
  });

  it('should correctly format a very high level (5)', () => {
    const pollen = {
      id: 'pollen-id-101',
      total: PollensRiskNumberEnum.VERY_HIGH,
    } as unknown as PollenAllergyRisk;

    const result = formatPollenNotification(pollen);

    expect(result.pollenData?.value).toBe(PollensRiskNumberEnum.VERY_HIGH);
    expect(result.pollenData?.status).toBe('Très élevé');
    expect(result.pollenData?.dotColor).toBe('🔴');
    expect(result.notificationText).toBe('🌿 Risque pollens : Très élevé 🔴');
  });

  it('should correctly format an extremely high level (6)', () => {
    const pollen = {
      id: 'pollen-id-102',
      total: PollensRiskNumberEnum.EXTREMEMLY_HIGH,
    } as unknown as PollenAllergyRisk;

    const result = formatPollenNotification(pollen);

    expect(result.pollenData?.value).toBe(
      PollensRiskNumberEnum.EXTREMEMLY_HIGH,
    );
    expect(result.pollenData?.status).toBe('Extrêmement élevé');
    expect(result.pollenData?.dotColor).toBe('🟣');
    expect(result.notificationText).toBe(
      '🌿 Risque pollens : Extrêmement élevé 🟣',
    );
  });

  it('should correctly handle when total is null', () => {
    const pollen = {
      id: 'pollen-id-103',
      total: null,
    } as unknown as PollenAllergyRisk;

    const result = formatPollenNotification(pollen);

    expect(result.pollenData?.value).toBe(0);
    expect(result.pollenData?.status).toBe('Aucune donnée');
    expect(result.notificationText).toBeNull();
  });
  it('should correctly handle when total is 0', () => {
    const pollen = {
      id: 'pollen-id-103',
      total: 0,
    } as unknown as PollenAllergyRisk;

    const result = formatPollenNotification(pollen);

    expect(result.pollenData?.value).toBe(0);
    expect(result.pollenData?.status).toBe('Aucune donnée');
    expect(result.notificationText).toBeNull();
  });
});
