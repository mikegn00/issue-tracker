-- AlterTable
ALTER TABLE `issue` ADD COLUMN `createdUser` INTEGER NOT NULL DEFAULT 0,
    ADD COLUMN `updatedUser` INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE `project` ADD COLUMN `createdUser` INTEGER NOT NULL DEFAULT 0,
    ADD COLUMN `updatedUser` INTEGER NOT NULL DEFAULT 0;

-- CreateTable
CREATE TABLE `ProjectOnUser` (
    `projectId` INTEGER NOT NULL,
    `userId` INTEGER NOT NULL,

    PRIMARY KEY (`projectId`, `userId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `IssueOnUser` (
    `issueId` INTEGER NOT NULL,
    `userId` INTEGER NOT NULL,

    PRIMARY KEY (`issueId`, `userId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `ProjectOnUser` ADD CONSTRAINT `ProjectOnUser_projectId_fkey` FOREIGN KEY (`projectId`) REFERENCES `Project`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ProjectOnUser` ADD CONSTRAINT `ProjectOnUser_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `IssueOnUser` ADD CONSTRAINT `IssueOnUser_issueId_fkey` FOREIGN KEY (`issueId`) REFERENCES `Issue`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `IssueOnUser` ADD CONSTRAINT `IssueOnUser_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
