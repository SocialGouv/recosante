import { PrismaClient } from '@prisma/client';

let prisma: PrismaClient;

if (process.env.NODE_ENV === 'production') {
  prisma = new PrismaClient();
} else {
  const globalWithPrisma = global as typeof globalThis & {
    prisma: PrismaClient;
  };
  if (!globalWithPrisma.prisma) {
    globalWithPrisma.prisma = new PrismaClient({
      log: [
        {
          emit: 'event',
          level: 'query',
        },
      ],
    });
    globalWithPrisma.prisma.$on('query', (e) => {
      console.log(formatSQLQueryWithParams(e));
    });
  }
  prisma = globalWithPrisma.prisma;
}

function formatSQLQueryWithParams(queryOutput) {
  const { query, params } = queryOutput;

  let formattedParams = JSON.parse(params);
  let finalQuery = query;

  for (let i = 0; i < formattedParams.length; i++) {
    finalQuery = finalQuery.replace(`$${i + 1}`, `'${formattedParams[i]}'`);
  }

  return finalQuery;
}

export default prisma;
