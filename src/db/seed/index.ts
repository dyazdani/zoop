const { PrismaClient } = require("@prisma/client");
import { User, Zoop, Fave } from '@prisma/client'
const { users, zoops, faves } = require('./seedData.json');
// TODO: We're getting an error, "cannot find module './seedData.json'"
const prisma = new PrismaClient();

const load = async () => {
    try {
        await prisma.fave.deleteMany();
        console.log("Deleted records in faves table")

        await prisma.zoop.deleteMany();
        console.log("Deleted records in zoops table");
        
        await prisma.user.deleteMany();
        console.log("Deleted records in users table");

        await prisma.$queryRaw<User>`ALTER TABLE User AUTO_INCREMENT = 1`
        console.log("reset user auto increment to 1")

        await prisma.$queryRaw<Zoop>`ALTER TABLE Zoop AUTO_INCREMENT = 1`
        console.log("reset zoop auto increment to 1")

        await prisma.$queryRaw<Fave>`ALTER TABLE Fave AUTO_INCREMENT = 1`
        console.log("reset fave auto increment to 1")

        await prisma.user.createMany({
            data: users
        });
        console.log("Added user data");

        await prisma.zoop.createMany({
            data: zoops
        });
        console.log("added zoop data")

        await prisma.fave.createMany({
            data: faves
        });
        console.log("addes fave data")

    } catch(e) {
        console.error(e);
        process.exit(1);
    } finally {
        await prisma.$disconnect()
    }
}

load();

