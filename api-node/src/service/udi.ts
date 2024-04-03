// import { type udis } from '@prisma/client';
// import prisma from '~/prisma';

export async function getUdiByCoordinates(coordinates: number[]) {
  // TODO: implement this function when the database is ready
  // const longitude = coordinates[0];
  // const latitude = coordinates[1];
  return {
    code_udi: '038001345',
  };
  // const udi: udis = await prisma.$queryRaw`
  //         SELECT code_udi
  //         FROM public.udis
  //         WHERE ST_Within(
  //             ST_SetSRID(ST_MakePoint(${longitude}, ${latitude}), 4326),
  //             wkb_geometry
  //         );
  //     `;
  // return udi;
}
