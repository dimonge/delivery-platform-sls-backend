-- AlterTable
ALTER TABLE "companies" ALTER COLUMN "latitude" DROP NOT NULL,
ALTER COLUMN "longitude" DROP NOT NULL,
ALTER COLUMN "deleted_at" DROP NOT NULL,
ALTER COLUMN "deleted_by" DROP NOT NULL;

-- AlterTable
ALTER TABLE "customers" ALTER COLUMN "apartment_no" DROP NOT NULL,
ALTER COLUMN "latitude" DROP NOT NULL,
ALTER COLUMN "longitude" DROP NOT NULL,
ALTER COLUMN "deleted_at" DROP NOT NULL,
ALTER COLUMN "deleted_by" DROP NOT NULL;

-- AlterTable
ALTER TABLE "pickupAddresses" ALTER COLUMN "deleted_at" DROP NOT NULL,
ALTER COLUMN "deleted_by" DROP NOT NULL;
