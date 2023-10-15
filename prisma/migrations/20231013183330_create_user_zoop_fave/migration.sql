-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "dateCreated" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "username" VARCHAR(60) NOT NULL,
    "password" VARCHAR(60) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Zoop" (
    "id" SERIAL NOT NULL,
    "dateCreated" TIMESTAMP(3) NOT NULL,
    "dateUpdated" TIMESTAMP(3) NOT NULL,
    "content" VARCHAR(255) NOT NULL,
    "authorId" INTEGER NOT NULL,
    "receiverId" INTEGER NOT NULL,

    CONSTRAINT "Zoop_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Fave" (
    "id" SERIAL NOT NULL,
    "dateCreated" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "faverId" INTEGER NOT NULL,
    "zoopId" INTEGER NOT NULL,

    CONSTRAINT "Fave_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "Zoop_dateCreated_key" ON "Zoop"("dateCreated");

-- AddForeignKey
ALTER TABLE "Zoop" ADD CONSTRAINT "Zoop_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Zoop" ADD CONSTRAINT "Zoop_receiverId_fkey" FOREIGN KEY ("receiverId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Fave" ADD CONSTRAINT "Fave_faverId_fkey" FOREIGN KEY ("faverId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Fave" ADD CONSTRAINT "Fave_zoopId_fkey" FOREIGN KEY ("zoopId") REFERENCES "Zoop"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
