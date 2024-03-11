import { PageBuilderService } from '@/services/page-builder';
import { MetadataRoute } from 'next';
const BASE_URL = 'https://recosante.beta.gouv.fr';
const municipalitesParam = PageBuilderService.getMunicipalitiesParams();
const cities = municipalitesParam.map((param) => param.params.city);
const indicators = municipalitesParam.map((param) => param.params.indicator);

export async function generateSitemaps() {
  // Fetch the total number of products and calculate the number of sitemaps needed
  return indicators.map((_, index) => {
    return {
      id: index,
    };
  });
}

export default async function sitemap({
  id,
}: {
  id: number;
}): Promise<MetadataRoute.Sitemap> {
  return cities.map((city) => ({
    url: `${BASE_URL}/${city}/${indicators[id]}/`,
    lastModified: new Date(),
  }));
}
