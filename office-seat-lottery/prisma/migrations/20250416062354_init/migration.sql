/*
  Warnings:

  - The primary key for the `Seat` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Seat` table. All the data in the column will be lost.
  - The primary key for the `Table` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Table` table. All the data in the column will be lost.
  - Added the required column `Seatid` to the `Seat` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Tableid` to the `Table` table without a default value. This is not possible if the table is not empty.

*/
-- CreateTable
CREATE TABLE "User" (
    "userId" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "employeeNumber" TEXT NOT NULL,
    "adminFlag" BOOLEAN NOT NULL,
    "deleteFlag" BOOLEAN NOT NULL
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_AdjacentTable" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "tableId" INTEGER NOT NULL,
    "adjacentTableId" INTEGER NOT NULL
);
INSERT INTO "new_AdjacentTable" ("adjacentTableId", "id", "tableId") SELECT "adjacentTableId", "id", "tableId" FROM "AdjacentTable";
DROP TABLE "AdjacentTable";
ALTER TABLE "new_AdjacentTable" RENAME TO "AdjacentTable";
CREATE TABLE "new_PastPosition" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "date" DATETIME NOT NULL,
    "seatId" INTEGER NOT NULL,
    "lotteryNumber" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL
);
INSERT INTO "new_PastPosition" ("date", "id", "lotteryNumber", "seatId", "userId") SELECT "date", "id", "lotteryNumber", "seatId", "userId" FROM "PastPosition";
DROP TABLE "PastPosition";
ALTER TABLE "new_PastPosition" RENAME TO "PastPosition";
CREATE TABLE "new_Seat" (
    "Seatid" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "tableId" INTEGER NOT NULL,
    "seatNumber" TEXT NOT NULL,
    "isFixed" BOOLEAN NOT NULL,
    "imageX" INTEGER NOT NULL,
    "imageY" INTEGER NOT NULL
);
INSERT INTO "new_Seat" ("imageX", "imageY", "isFixed", "seatNumber", "tableId") SELECT "imageX", "imageY", "isFixed", "seatNumber", "tableId" FROM "Seat";
DROP TABLE "Seat";
ALTER TABLE "new_Seat" RENAME TO "Seat";
CREATE TABLE "new_Table" (
    "Tableid" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL
);
INSERT INTO "new_Table" ("name") SELECT "name" FROM "Table";
DROP TABLE "Table";
ALTER TABLE "new_Table" RENAME TO "Table";
CREATE TABLE "new_TodayPosition" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "date" DATETIME NOT NULL,
    "seatId" INTEGER NOT NULL,
    "lotteryNumber" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL
);
INSERT INTO "new_TodayPosition" ("date", "id", "lotteryNumber", "seatId", "userId") SELECT "date", "id", "lotteryNumber", "seatId", "userId" FROM "TodayPosition";
DROP TABLE "TodayPosition";
ALTER TABLE "new_TodayPosition" RENAME TO "TodayPosition";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
