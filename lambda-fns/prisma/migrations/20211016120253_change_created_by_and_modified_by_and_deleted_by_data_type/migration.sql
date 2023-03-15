/*
  Warnings:

  - The `deleted_by` column on the `companies` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `deleted_by` column on the `customers` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `deleted_by` column on the `pickupAddresses` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `deleted_by` column on the `tasks` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Changed the type of `created_by` on the `companies` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `modified_by` on the `companies` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `created_by` on the `customers` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `modified_by` on the `customers` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `created_by` on the `pickupAddresses` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `modified_by` on the `pickupAddresses` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `created_by` on the `tasks` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `modified_by` on the `tasks` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "companies" DROP COLUMN "created_by",
ADD COLUMN     "created_by" INTEGER NOT NULL,
DROP COLUMN "modified_by",
ADD COLUMN     "modified_by" INTEGER NOT NULL,
DROP COLUMN "deleted_by",
ADD COLUMN     "deleted_by" INTEGER;

-- AlterTable
ALTER TABLE "customers" DROP COLUMN "created_by",
ADD COLUMN     "created_by" INTEGER NOT NULL,
DROP COLUMN "modified_by",
ADD COLUMN     "modified_by" INTEGER NOT NULL,
DROP COLUMN "deleted_by",
ADD COLUMN     "deleted_by" INTEGER;

-- AlterTable
ALTER TABLE "pickupAddresses" DROP COLUMN "created_by",
ADD COLUMN     "created_by" INTEGER NOT NULL,
DROP COLUMN "modified_by",
ADD COLUMN     "modified_by" INTEGER NOT NULL,
DROP COLUMN "deleted_by",
ADD COLUMN     "deleted_by" INTEGER;

-- AlterTable
ALTER TABLE "tasks" DROP COLUMN "created_by",
ADD COLUMN     "created_by" INTEGER NOT NULL,
DROP COLUMN "modified_by",
ADD COLUMN     "modified_by" INTEGER NOT NULL,
DROP COLUMN "deleted_by",
ADD COLUMN     "deleted_by" INTEGER;
