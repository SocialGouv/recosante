jest.mock('~/prisma', () => ({
  __esModule: true,
  default: {
    $connect: jest.fn(),
    $disconnect: jest.fn(),
    municipality: {
      findMany: jest.fn(),
      findUnique: jest.fn(),
    },
    pollenAllergyRisk: {
      count: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
    },
    indiceUv: {
      findFirst: jest.fn(),
    },
  },
})); 