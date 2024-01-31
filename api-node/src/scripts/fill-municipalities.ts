import { updateMunicipalitiesWithBathingWaterSites } from '~/utils/bathing_water';
import { fillOrUpdateMunicipalitiesInDB } from '~/utils/municipalities';

// this file is to execut the functions manually
// they also run in a cronjob
(async () => {
  await fillOrUpdateMunicipalitiesInDB();
  await updateMunicipalitiesWithBathingWaterSites();
  process.exit(0);
})();
