-- CreateTable
CREATE TABLE `product` (
    `uuid` VARCHAR(36) NOT NULL,
    `name` VARCHAR(255) NOT NULL,
    `price` INTEGER NOT NULL,
    `description` VARCHAR(255) NOT NULL,
    `createdAt` DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    `modifiedAt` DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    `stock` INTEGER NOT NULL,
    `sellerUserEmail` VARCHAR(255) NULL,

    INDEX `FK_d608e42121244bad93a5c47efe6`(`sellerUserEmail`),
    PRIMARY KEY (`uuid`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `transaction` (
    `price` INTEGER NOT NULL,
    `createdAt` DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    `updatedAt` DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    `buyerUserEmail` VARCHAR(255) NULL,
    `uuid` VARCHAR(36) NOT NULL,

    INDEX `FK_578bfd518f89f1c012d8950af17`(`buyerUserEmail`),
    PRIMARY KEY (`uuid`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `transaction_product` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `quantity` INTEGER NOT NULL,
    `createdAt` DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    `updatedAt` DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    `productUuid` VARCHAR(36) NULL,
    `transactionUuid` VARCHAR(36) NULL,

    INDEX `FK_861090f78e109917f904969388a`(`productUuid`),
    INDEX `FK_e978405d315a22df73ea16501af`(`transactionUuid`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `user` (
    `email` VARCHAR(255) NOT NULL,
    `password` VARCHAR(255) NOT NULL,
    `createdAt` DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    `modifiedAt` DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),

    PRIMARY KEY (`email`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `product` ADD CONSTRAINT `FK_d608e42121244bad93a5c47efe6` FOREIGN KEY (`sellerUserEmail`) REFERENCES `user`(`email`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `transaction` ADD CONSTRAINT `FK_578bfd518f89f1c012d8950af17` FOREIGN KEY (`buyerUserEmail`) REFERENCES `user`(`email`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `transaction_product` ADD CONSTRAINT `FK_861090f78e109917f904969388a` FOREIGN KEY (`productUuid`) REFERENCES `product`(`uuid`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `transaction_product` ADD CONSTRAINT `FK_e978405d315a22df73ea16501af` FOREIGN KEY (`transactionUuid`) REFERENCES `transaction`(`uuid`) ON DELETE NO ACTION ON UPDATE NO ACTION;

