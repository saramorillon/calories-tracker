-- CreateTable
CREATE TABLE `Water` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `date` CHAR(10) NOT NULL,
    `ml` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
