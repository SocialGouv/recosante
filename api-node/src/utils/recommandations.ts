import { LocalRecommandationService } from '~/service/local-recommandations';

export async function getRecommandationsFromLocalFile() {
  const service = new LocalRecommandationService();
  await service.syncRecommandations();
}
