import { PrismaClient } from '../generated/prisma';
export declare const prisma: PrismaClient<import("../generated/prisma").Prisma.PrismaClientOptions, never, import("@/generated/prisma/runtime/client").DefaultArgs>;
export declare function testDatabaseConnection(): Promise<boolean>;
export declare function disconnectDatabase(): Promise<void>;
export default prisma;
//# sourceMappingURL=database.service.d.ts.map