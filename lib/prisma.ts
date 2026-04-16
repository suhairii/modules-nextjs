import { PrismaClient } from "@prisma/client";

// Prisma 7 requires explicit connection URL in the constructor 
// if it's not defined in the .prisma file
const prismaClientSingleton = () => {
  return new PrismaClient({
    datasourceUrl: "file:./dev.db",
  });
};

declare global {
  var prismaGlobal: undefined | ReturnType<typeof prismaClientSingleton>;
}

export const prisma = globalThis.prismaGlobal ?? prismaClientSingleton();

if (process.env.NODE_ENV !== "production") globalThis.prismaGlobal = prisma;
