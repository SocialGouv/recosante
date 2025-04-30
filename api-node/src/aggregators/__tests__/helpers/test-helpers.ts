/**
 * Fonctions d'aide pour les tests d'intégration
 */

import { type PrismaClient, type Municipality } from '@prisma/client';

/**
 * Crée une municipalité de test pour les tests d'intégration
 * @param prisma Client Prisma à utiliser
 * @returns La municipalité créée ou trouvée
 */
export async function setupTestMunicipality(
  prisma: PrismaClient,
): Promise<Municipality> {
  try {
    // Essayer de trouver une municipalité existante
    const existingMunicipality = await prisma.municipality.findFirst();

    if (existingMunicipality) {
      return existingMunicipality;
    }

    // Sinon créer une municipalité de test
    return await prisma.municipality.create({
      data: {
        COM: 'TEST01',
        TYPECOM: 'COM',
        REG: '01',
        DEP: '01',
        NCC: 'VILLE TEST',
        LIBELLE: 'Ville de Test',
        bathing_water_sites: 0,
      },
    });
  } catch (error) {
    console.error(
      'Erreur lors de la création de la municipalité de test:',
      error,
    );
    throw error;
  }
}

/**
 * Nettoie la base de données de test après les tests
 * @param prisma Client Prisma à utiliser
 */
export async function clearDatabase(prisma: PrismaClient): Promise<void> {
  try {
    // Supprimer les données d'indice UV
    await prisma.indiceUv.deleteMany({
      where: {
        municipality_insee_code: 'TEST01',
      },
    });

    // Si la municipalité de test a été créée, la supprimer
    await prisma.municipality.deleteMany({
      where: {
        COM: 'TEST01',
      },
    });
  } catch (error) {
    console.error(
      'Erreur lors du nettoyage de la base de données de test:',
      error,
    );
    // Ne pas propager l'erreur pour que les tests puissent se terminer
  }
}
