const PrismaClient = require("@prisma/client").PrismaClient;

const prisma = new PrismaClient();


exports.PrismaClient = PrismaClient;
exports.prisma = prisma;
exports.User = prisma.user;
exports.Result = prisma.result;
exports.Info = prisma.info;