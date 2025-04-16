-- CreateTable
CREATE TABLE "Seat" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "tableId" INTEGER NOT NULL,
    "seatNumber" TEXT NOT NULL,
    "isFixed" BOOLEAN NOT NULL,
    "imageX" INTEGER NOT NULL,
    "imageY" INTEGER NOT NULL,
    CONSTRAINT "Seat_tableId_fkey" FOREIGN KEY ("tableId") REFERENCES "Table" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Table" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "AdjacentTable" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "tableId" INTEGER NOT NULL,
    "adjacentTableId" INTEGER NOT NULL,
    CONSTRAINT "AdjacentTable_tableId_fkey" FOREIGN KEY ("tableId") REFERENCES "Table" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "AdjacentTable_adjacentTableId_fkey" FOREIGN KEY ("adjacentTableId") REFERENCES "Table" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "TodayPosition" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "date" DATETIME NOT NULL,
    "seatId" INTEGER NOT NULL,
    "lotteryNumber" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    CONSTRAINT "TodayPosition_seatId_fkey" FOREIGN KEY ("seatId") REFERENCES "Seat" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "PastPosition" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "date" DATETIME NOT NULL,
    "seatId" INTEGER NOT NULL,
    "lotteryNumber" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    CONSTRAINT "PastPosition_seatId_fkey" FOREIGN KEY ("seatId") REFERENCES "Seat" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
