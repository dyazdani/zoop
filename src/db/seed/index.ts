const { PrismaClient } = require("@prisma/client");
const { users, zoops, faves } = require('./seedData.json');
const prisma = new PrismaClient();

const load = async () => {
    try {
        await prisma.fave.deleteMany();
        console.log("Deleted records in faves table")

        await prisma.zoop.deleteMany();
        console.log("Deleted records in zoops table");
        
        await prisma.user.deleteMany();
        console.log("Deleted records in users table");

        await prisma.$executeRaw`ALTER SEQUENCE "User_id_seq" RESTART WITH 1;`;
        console.log("reset user auto increment to 1")

        await prisma.$executeRaw`ALTER SEQUENCE "Zoop_id_seq" RESTART WITH 1;`;
        console.log("reset zoop auto increment to 1")

        await prisma.$executeRaw`ALTER SEQUENCE "Fave_id_seq" RESTART WITH 1;`;
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
    } finally {
        await prisma.$disconnect()
        process.exit(0);
    }
}

load();

