/*
  Warnings:

  - You are about to alter the column `latitude` on the `companies` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Decimal(4,2)`.
  - You are about to alter the column `longitude` on the `companies` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Decimal(4,2)`.
  - The `latitude` column on the `customers` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `longitude` column on the `customers` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to alter the column `amount` on the `tasks` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Decimal(10,2)`.
  - You are about to alter the column `vat_in_percent` on the `tasks` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Decimal(2,2)`.
  - You are about to alter the column `distance_in_meter` on the `tasks` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Decimal(7,2)`.

*/
-- AlterTable
ALTER TABLE "companies" ALTER COLUMN "latitude" SET DATA TYPE DECIMAL(4,2),
ALTER COLUMN "longitude" SET DATA TYPE DECIMAL(4,2);

-- AlterTable
ALTER TABLE "customers" DROP COLUMN "latitude",
ADD COLUMN     "latitude" DECIMAL(4,2),
DROP COLUMN "longitude",
ADD COLUMN     "longitude" DECIMAL(4,2);

-- AlterTable
ALTER TABLE "tasks" ALTER COLUMN "amount" SET DATA TYPE DECIMAL(10,2),
ALTER COLUMN "vat_in_percent" SET DATA TYPE DECIMAL(2,2),
ALTER COLUMN "distance_in_meter" SET DATA TYPE DECIMAL(7,2);
