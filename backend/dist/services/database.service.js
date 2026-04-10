"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.prisma = void 0;
exports.testDatabaseConnection = testDatabaseConnection;
exports.disconnectDatabase = disconnectDatabase;
const prisma_1 = require("../generated/prisma");
// Global Prisma client instance
const globalForPrisma = globalThis;
// DATABASE_URL is read from environment variables automatically
exports.prisma = globalForPrisma.prisma ?? new prisma_1.PrismaClient();
if (process.env.NODE_ENV !== 'production')
    globalForPrisma.prisma = exports.prisma;
// Database connection test
async function testDatabaseConnection() {
    try {
        await exports.prisma.$queryRaw `SELECT 1`;
        console.log('✅ Database connection successful');
        return true;
    }
    catch (error) {
        console.error('❌ Database connection failed:', error);
        return false;
    }
}
// Graceful shutdown
async function disconnectDatabase() {
    await exports.prisma.$disconnect();
    console.log('Database disconnected');
}
exports.default = exports.prisma;
//# sourceMappingURL=database.service.js.map