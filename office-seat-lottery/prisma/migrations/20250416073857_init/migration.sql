/*
  Warnings:

  - Added the required column `password` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_User" (
    "userId" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "employeeNumber" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "adminFlag" BOOLEAN NOT NULL,
    "deleteFlag" BOOLEAN NOT NULL
);
INSERT INTO "new_User" ("adminFlag", "deleteFlag", "employeeNumber", "userId") SELECT "adminFlag", "deleteFlag", "employeeNumber", "userId" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
