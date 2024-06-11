/*
  Warnings:

  - You are about to drop the column `sellerUserEmail` on the `Product` table. All the data in the column will be lost.
  - You are about to alter the column `price` on the `Product` table. The data in that column could be lost. The data in that column will be cast from `Int` to `UnsignedInt`.
  - You are about to alter the column `stock` on the `Product` table. The data in that column could be lost. The data in that column will be cast from `Int` to `UnsignedInt`.
  - You are about to drop the column `buyerUserEmail` on the `Transaction` table. All the data in the column will be lost.
  - You are about to alter the column `price` on the `Transaction` table. The data in that column could be lost. The data in that column will be cast from `Int` to `UnsignedInt`.
  - You are about to drop the column `quantity` on the `TransactionsOnProducts` table. All the data in the column will be lost.
  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `password` on the `User` table. The data in that column could be lost. The data in that column will be cast from `VarChar(255)` to `VarChar(72)`.
  - A unique constraint covering the columns `[email]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `sellerUserId` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `buyerUserId` to the `Transaction` table without a default value. This is not possible if the table is not empty.
  - Added the required column `productQuantity` to the `TransactionsOnProducts` table without a default value. This is not possible if the table is not empty.
  - The required column `id` was added to the `User` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- DropForeignKey
ALTER TABLE `Product` DROP FOREIGN KEY `FK_d608e42121244bad93a5c47efe6`;

-- DropForeignKey
ALTER TABLE `Transaction` DROP FOREIGN KEY `FK_578bfd518f89f1c012d8950af17`;

-- AlterTable
ALTER TABLE `Product` DROP COLUMN `sellerUserEmail`,
    ADD COLUMN `sellerUserId` VARCHAR(36) NOT NULL,
    MODIFY `price` INTEGER UNSIGNED NOT NULL,
    MODIFY `stock` INTEGER UNSIGNED NOT NULL;

-- AlterTable
ALTER TABLE `Transaction` DROP COLUMN `buyerUserEmail`,
    ADD COLUMN `buyerUserId` VARCHAR(36) NOT NULL,
    MODIFY `price` INTEGER UNSIGNED NOT NULL;

-- AlterTable
ALTER TABLE `TransactionsOnProducts` DROP COLUMN `quantity`,
    ADD COLUMN `productQuantity` INTEGER UNSIGNED NOT NULL;

-- AlterTable
ALTER TABLE `User` DROP PRIMARY KEY,
    ADD COLUMN `firstName` VARCHAR(191) NULL,
    ADD COLUMN `id` VARCHAR(36) NOT NULL,
    ADD COLUMN `lastName` VARCHAR(191) NULL,
    MODIFY `email` VARCHAR(320) NOT NULL,
    MODIFY `password` VARCHAR(72) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- CreateIndex
CREATE INDEX `FK_d608e42121244bad93a5c47efe6` ON `Product`(`sellerUserId`);

-- CreateIndex
CREATE INDEX `FK_578bfd518f89f1c012d8950af17` ON `Transaction`(`buyerUserId`);

-- CreateIndex
CREATE UNIQUE INDEX `User_email_key` ON `User`(`email`);

-- AddForeignKey
ALTER TABLE `Product` ADD CONSTRAINT `FK_d608e42121244bad93a5c47efe6` FOREIGN KEY (`sellerUserId`) REFERENCES `User`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `Transaction` ADD CONSTRAINT `FK_578bfd518f89f1c012d8950af17` FOREIGN KEY (`buyerUserId`) REFERENCES `User`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
