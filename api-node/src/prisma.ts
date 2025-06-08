import { PrismaClient } from '@prisma/client';

let prisma: PrismaClient;

if (process.env.NODE_ENV === 'production') {
  console.log('📦 DATABASE_URL (from prisma.ts):', process.env.DATABASE_URL);
  
  try {
    prisma = new PrismaClient({
      log: ['error', 'warn'],
      errorFormat: 'pretty',
    });
    
    prisma.$connect()
      .then(() => console.log('Successfully connected to database'))
      .catch((e) => {
        console.error('Failed to connect to database:', e);
        process.exit(1); 
      });
      
  } catch (e) {
    console.error('Failed to initialize Prisma Client:', e);
    process.exit(1);
  }
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
    // globalWithPrisma.prisma.$on('query', (e) => {
    //   console.log(formatSQLQueryWithParams(e));
    // });
    // function formatSQLQueryWithParams(queryOutput: any) {
    //   const { query, params } = queryOutput;

    //   let formattedParams = JSON.parse(params);
    //   let finalQuery = query;

    //   for (let i = 0; i < formattedParams.length; i++) {
    //     finalQuery = finalQuery.replace(`$${i + 1}`, `'${formattedParams[i]}'`);
    //   }

    //   return finalQuery;
    // }
  }
  prisma = globalWithPrisma.prisma;
}

export default prisma;
