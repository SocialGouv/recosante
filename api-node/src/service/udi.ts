import prisma from '~/prisma';
import { type udis as UdiType } from '@prisma/client';

export namespace UdiService {
  export async function findUdiByCoordinates(
    latitude: number,
    longitude: number,
  ): Promise<UdiType[]> {
    const udi: Array<UdiType> = await prisma.$queryRaw`
    SELECT code_udi
    FROM public.udis
    WHERE ST_Within(
        ST_SetSRID(ST_MakePoint(${longitude}, ${latitude}), 4326),
        wkb_geometry
    );
    `;
    return udi;
  }

  export async function countUdisByMunicipalityInseeCode(
    municipality_insee_code: string,
  ): Promise<number> {
    const udisCountURL = new URL(
      'https://hubeau.eaufrance.fr/api/v1/qualite_eau_potable/communes_udi',
    );
    udisCountURL.searchParams.append('annee', '2023');
    udisCountURL.searchParams.append('code_commune', municipality_insee_code);
    const udisCountURLResponse = await fetch(udisCountURL.toString());
    const json = await udisCountURLResponse.json();
    return json.count;
  }
}
