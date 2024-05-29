/*
  Warnings:

  - You are about to drop the `product` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `transaction` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `transaction_product` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `user` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `product` DROP FOREIGN KEY `FK_d608e42121244bad93a5c47efe6`;

-- DropForeignKey
ALTER TABLE `transaction` DROP FOREIGN KEY `FK_578bfd518f89f1c012d8950af17`;

-- DropForeignKey
ALTER TABLE `transaction_product` DROP FOREIGN KEY `FK_861090f78e109917f904969388a`;

-- DropForeignKey
ALTER TABLE `transaction_product` DROP FOREIGN KEY `FK_e978405d315a22df73ea16501af`;

-- DropTable
DROP TABLE `product`;

-- DropTable
DROP TABLE `transaction`;

-- DropTable
DROP TABLE `transaction_product`;

-- DropTable
DROP TABLE `user`;

-- CreateTable
CREATE TABLE `Product` (
    `id` VARCHAR(36) NOT NULL,
    `price` INTEGER NOT NULL,
    `stock` INTEGER NOT NULL,
    `name` VARCHAR(255) NOT NULL,
    `description` VARCHAR(255) NOT NULL,
    `createdAt` DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    `updatedAt` DATETIME(6) NOT NULL,
    `sellerUserEmail` VARCHAR(255) NULL,

    INDEX `FK_d608e42121244bad93a5c47efe6`(`sellerUserEmail`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Transaction` (
    `id` VARCHAR(36) NOT NULL,
    `price` INTEGER NOT NULL,
    `createdAt` DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    `updatedAt` DATETIME(6) NOT NULL,
    `buyerUserEmail` VARCHAR(255) NULL,

    INDEX `FK_578bfd518f89f1c012d8950af17`(`buyerUserEmail`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `TransactionsOnProducts` (
    `quantity` INTEGER NOT NULL,
    `createdAt` DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    `updatedAt` DATETIME(6) NOT NULL,
    `productId` VARCHAR(36) NOT NULL,
    `transactionId` VARCHAR(36) NOT NULL,

    INDEX `FK_861090f78e109917f904969388a`(`productId`),
    INDEX `FK_e978405d315a22df73ea16501af`(`transactionId`),
    PRIMARY KEY (`transactionId`, `productId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `User` (
    `email` VARCHAR(255) NOT NULL,
    `password` VARCHAR(255) NOT NULL,
    `createdAt` DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    `updatedAt` DATETIME(6) NOT NULL,

    PRIMARY KEY (`email`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Product` ADD CONSTRAINT `FK_d608e42121244bad93a5c47efe6` FOREIGN KEY (`sellerUserEmail`) REFERENCES `User`(`email`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `Transaction` ADD CONSTRAINT `FK_578bfd518f89f1c012d8950af17` FOREIGN KEY (`buyerUserEmail`) REFERENCES `User`(`email`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `TransactionsOnProducts` ADD CONSTRAINT `FK_861090f78e109917f904969388a` FOREIGN KEY (`productId`) REFERENCES `Product`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `TransactionsOnProducts` ADD CONSTRAINT `FK_e978405d315a22df73ea16501af` FOREIGN KEY (`transactionId`) REFERENCES `Transaction`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
