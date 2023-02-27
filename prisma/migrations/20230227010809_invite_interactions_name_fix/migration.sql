/*
  Warnings:

  - You are about to drop the `inviteinteraction` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `inviteinteraction` DROP FOREIGN KEY `InviteInteraction_inviteId_fkey`;

-- DropForeignKey
ALTER TABLE `inviteinteraction` DROP FOREIGN KEY `InviteInteraction_userId_fkey`;

-- DropTable
DROP TABLE `inviteinteraction`;

-- CreateTable
CREATE TABLE `invite_interactions` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `type` ENUM('Aceito', 'Rejeitado') NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `inviteId` INTEGER NOT NULL,
    `userId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `invite_interactions` ADD CONSTRAINT `invite_interactions_inviteId_fkey` FOREIGN KEY (`inviteId`) REFERENCES `Invite`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `invite_interactions` ADD CONSTRAINT `invite_interactions_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
