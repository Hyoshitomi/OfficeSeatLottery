-- CreateTable
CREATE TABLE "Seat" (
    "Seatid" SERIAL NOT NULL,
    "tableId" INTEGER NOT NULL,
    "seatNumber" TEXT NOT NULL,
    "isFixed" BOOLEAN NOT NULL,
    "imageX" INTEGER NOT NULL,
    "imageY" INTEGER NOT NULL,

    CONSTRAINT "Seat_pkey" PRIMARY KEY ("Seatid")
);

-- CreateTable
CREATE TABLE "Table" (
    "Tableid" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Table_pkey" PRIMARY KEY ("Tableid")
);

-- CreateTable
CREATE TABLE "AdjacentTable" (
    "AdjacentTableId" SERIAL NOT NULL,
    "tableId" INTEGER NOT NULL,
    "adjacentTableId" INTEGER NOT NULL,

    CONSTRAINT "AdjacentTable_pkey" PRIMARY KEY ("AdjacentTableId")
);

-- CreateTable
CREATE TABLE "TodayPosition" (
    "id" SERIAL NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "seatId" INTEGER NOT NULL,
    "lotteryNumber" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "TodayPosition_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PastPosition" (
    "id" SERIAL NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "seatId" INTEGER NOT NULL,
    "lotteryNumber" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "PastPosition_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "userId" SERIAL NOT NULL,
    "employeeNumber" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "adminFlag" BOOLEAN NOT NULL,
    "deleteFlag" BOOLEAN NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("userId")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_employeeNumber_key" ON "User"("employeeNumber");
